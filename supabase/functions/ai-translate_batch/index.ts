import { serve } from 'https://deno.land/std/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js';
import { corsHeaders } from '../_shared/cors.ts';
import { decrypt } from '../_shared/crypto.ts';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

async function getCachedTranslation(
  text: string,
  sourceLang: string,
  targetLang: string,
) {
  const { data, error } = await supabase
    .from('translations_cache')
    .select('translation_text')
    .eq('source_text', text)
    .eq('source_lang', sourceLang)
    .eq('translation_lang', targetLang)
    .single();

  if (error) {
    console.error('Error checking cache:', error);
    return null;
  }

  return data?.translation_text || null;
}

async function saveTranslationToCache(
  text: string,
  sourceLang: string,
  targetLang: string,
  translation: string,
) {
  const { error } = await supabase.from('translations_cache').upsert([
    {
      source_text: text,
      source_lang: sourceLang,
      translation_lang: targetLang,
      translation_text: translation,
    },
  ]);

  if (error) {
    console.error('Error saving translation to cache:', error);
  }
}

serve(async (req) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { text, source, targets } = await req.json();
    console.warn('text', text);
    console.warn('source', source);
    console.warn('targets', targets);

    if (!text || !source || !Array.isArray(targets)) {
      return new Response('Invalid request body', { status: 400 });
    }

    const authHeader = req.headers.get('Authorization') || '';
    const jwt = authHeader.replace('Bearer ', '');

    const {
      data: { user },
    } = await supabase.auth.getUser(jwt);

    if (!user) return new Response('Unauthorized', { status: 401 });

    const { data: settings, error } = await supabase
      .from('profile_settings')
      .select('openai_api_key_encrypted')
      .eq('user_id', user.id)
      .single();

    if (error || !settings?.openai_api_key_encrypted) {
      return new Response('No API key found', { status: 400 });
    }

    const encryptedKey = settings.openai_api_key_encrypted;
    const apiKey = await decrypt(
      encryptedKey,
      Deno.env.get('ENCRYPTION_SECRET')!,
    );

    console.warn('apiKey', apiKey);

    const translations: Record<
      string,
      { status: number; value?: string; error?: string }
    > = {};

    for (const target of targets) {
      // 1. check DB cache

      // First, check if translation is already in cache
      const cachedTranslation = await getCachedTranslation(
        text,
        source,
        target,
      );

      if (cachedTranslation) {
        console.log(
          `Found cached translation for ${target}: ${cachedTranslation}`,
        );
        translations[target] = {
          status: 200,
          value: cachedTranslation,
        };
        continue;
      }

      // const prompt = `Translate the following from ${source} to ${target}: "${text}"`;
      const prompt = `Translate the following word from ${source} to ${target}, without any extra explanations, just the translated word: "${text}"`;
      console.warn('prompt', prompt);

      try {
        const response = await fetch(
          'https://api.openai.com/v1/chat/completions',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model: 'gpt-3.5-turbo',
              messages: [{ role: 'user', content: prompt }],
            }),
          },
        );

        const result = await response.json();

        if (!response.ok || result.error) {
          console.error(
            `Translation error for ${target}:`,
            result.error?.message || response.statusText,
          );
          translations[target] = {
            status: response.status,
            error: result.error?.code || response.statusText,
          };
          continue;
        }

        const translated = result.choices?.[0]?.message?.content?.trim();
        translations[target] = {
          status: 200,
          value: translated || '[Empty translation]',
        };

        // cache the translation for future use
        await saveTranslationToCache(
          text,
          source,
          target,
          translated || '[Empty translation]',
        );
      } catch (err) {
        console.error(`Unexpected error for ${target}:`, err);
        translations[target] = {
          status: 500,
          error: 'Unexpected error',
        };
      }
    }

    return new Response(JSON.stringify({ translations }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(err);
    return new Response('Internal server error', { status: 500 });
  }
});

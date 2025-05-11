import { serve } from 'https://deno.land/std/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js';
import { corsHeaders } from '../_shared/cors.ts';

serve(async (req) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  const { text, source, target } = await req.json();
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  );

  const authHeader = req.headers.get('Authorization') || '';
  const jwt = authHeader.replace('Bearer ', '');

  const {
    data: { user },
  } = await supabase.auth.getUser(jwt);

  if (!user) return new Response('Unauthorized', { status: 401 });

  const { data, error } = await supabase
    .from('profile_settings')
    .select('openai_api_key_encrypted')
    .eq('user_id', user.id)
    .single();

  if (error || !data) return new Response('No API key', { status: 400 });

  const encryptedKey = data.openai_api_key_encrypted;

  // You may optionally decrypt here in Deno, but it’s safer to decrypt client-side
  // For now, just forward the encrypted key (or require decrypted from client if you prefer)

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${atob(encryptedKey)}`, // Only if key isn't encrypted anymore
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `Translate this from ${source} to ${target}: ${text}`,
        },
      ],
    }),
  });

  const result = await response.json();
  const translation = result.choices?.[0]?.message?.content?.trim();

  return new Response(JSON.stringify({ translation }), {
    headers: { 'Content-Type': 'application/json' },
  });
});

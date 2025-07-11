import { serve } from 'https://deno.land/std/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js';
import { corsHeaders } from '../_shared/cors.ts';
import { encrypt } from '../_shared/crypto.ts';

serve(async (req) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  let body;
  try {
    body = await req.json();
  } catch (err) {
    console.error('Failed to parse JSON body:', err);
    return new Response('Invalid or missing JSON body', {
      status: 400,
      headers: corsHeaders,
    });
  }

  const { openai_api_key } = body;
  if (!openai_api_key) return new Response('Missing key', { status: 400 });

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  );

  const jwt = req.headers.get('Authorization')?.replace('Bearer ', '');
  const {
    data: { user },
  } = await supabase.auth.getUser(jwt);

  if (!user) return new Response('Unauthorized', { status: 401 });

  const secret = Deno.env.get('ENCRYPTION_SECRET')!;

  const encrypted = await encrypt(openai_api_key, secret!);

  const { error } = await supabase.from('profile_settings').upsert({
    user_id: user.id,
    openai_api_key_encrypted: encrypted,
  });

  if (error) return new Response('DB error', { status: 500 });

  return new Response(
    JSON.stringify({ message: 'API key saved successfully' }),
    {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    },
  );
});

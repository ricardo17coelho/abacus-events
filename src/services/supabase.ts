import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY as string;

// Regular client for frontend operations
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storageKey: 'supabase-auth-storage-key',
  },
});

import { createClient } from '@supabase/supabase-js';
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY as string;

const supabaseClient = createClient(supabaseUrl, supabaseKey, {});

export const supabase = () => supabaseClient;

export default { supabase };

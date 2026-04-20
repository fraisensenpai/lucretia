import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || "";

// createClient requires non-empty strings.
export const supabase = (supabaseUrl && supabaseKey) 
  ? createClient(supabaseUrl, supabaseKey) 
  : null as any;

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase URL veya Publishable Key bulunamadı! .env dosyasını kontrol edin.');
}

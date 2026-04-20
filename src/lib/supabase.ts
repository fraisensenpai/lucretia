import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

// createClient requires non-empty strings. Conditional init prevents the "supabaseUrl is required" crash.
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null as any;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL veya Anon Key bulunamadı! .env dosyasını veya Vercel ortam değişkenlerini kontrol edin.');
}

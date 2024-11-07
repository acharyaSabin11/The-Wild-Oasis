import { createClient } from '@supabase/supabase-js'
const supabaseKey = import.meta.env.VITE_API_KEY;

const supabaseUrl = 'https://arkbrvopaakzvaewtjya.supabase.co'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;

export { supabaseUrl };
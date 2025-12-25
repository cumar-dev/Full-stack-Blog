import {createClient} from "@supabase/supabase-js"
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON
if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Missing Supabase Env Variables:", { supabaseUrl, supabaseAnonKey });
}
const Supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
     persistSession: true,
     autoRefreshToken: true
    },
    realtime: {
        params: {
            eventsPerSecond: 10
        }
    }
})

export default Supabase;
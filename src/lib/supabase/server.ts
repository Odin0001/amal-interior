import 'server-only'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AdminClient = SupabaseClient<any, any, any>

let client: AdminClient | undefined

/** Service-role Supabase client. Server-only — bypasses RLS, never expose to the browser. */
export function getSupabaseAdmin(): AdminClient {
  if (client) return client

  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set')
  }

  // No generated Database types for this project — explicitly typing the
  // generic parameters as `any` keeps `.from(table)` query builders usable
  // instead of collapsing to `never` (a known supabase-js inference quirk
  // when Database is left to its default with no type args supplied at all).
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  client = createClient<any, any, any>(url, key, {
    auth: { persistSession: false },
  })
  return client
}

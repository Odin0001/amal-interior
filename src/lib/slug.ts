import 'server-only'
import { getSupabaseAdmin } from '@/lib/supabase/server'

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || 'project'
}

/** Appends -2, -3, ... until the slug is free. `excludeId` lets edits keep their own slug. */
export async function ensureUniqueSlug(base: string, excludeId?: string): Promise<string> {
  const supabase = getSupabaseAdmin()
  const slug = slugify(base)

  let candidate = slug
  let attempt = 1
  // Small dataset (portfolio projects) — a loop of exact-match checks is simplest and clear.
  for (;;) {
    let query = supabase.from('projects').select('id').eq('slug', candidate)
    if (excludeId) query = query.neq('id', excludeId)
    const { data, error } = await query.maybeSingle()
    if (error) throw new Error(`ensureUniqueSlug: ${error.message}`)
    if (!data) return candidate
    attempt += 1
    candidate = `${slug}-${attempt}`
  }
}

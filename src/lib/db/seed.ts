/**
 * One-off migration of the site's previously-hardcoded projects/clients/awards
 * into Supabase. Run once after `supabase/schema.sql` has been applied:
 *
 *   npm run db:seed
 *
 * This script runs standalone via `tsx` (outside Next's build pipeline), so it
 * deliberately avoids importing anything that pulls in the `server-only`
 * package — that package only works correctly when Next's bundler resolves
 * its conditional export, and otherwise always throws.
 */
import { createClient } from '@supabase/supabase-js'
import { translations } from '@/lib/translations'
import type { ProjectCategory } from '@/lib/constants'

const url = process.env.SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!url || !key) {
  console.error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env.local')
  process.exit(1)
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const supabase = createClient<any, any, any>(url, key, { auth: { persistSession: false } })

function slugify(input: string): string {
  return (
    input
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 80) || 'project'
  )
}

async function ensureUniqueSlug(base: string): Promise<string> {
  const slug = slugify(base)
  let candidate = slug
  let attempt = 1
  for (;;) {
    const { data, error } = await supabase.from('projects').select('id').eq('slug', candidate).maybeSingle()
    if (error) throw new Error(`ensureUniqueSlug: ${error.message}`)
    if (!data) return candidate
    attempt += 1
    candidate = `${slug}-${attempt}`
  }
}

// Mirrors the PROJECTS array previously hardcoded in src/components/GalleryGrid.tsx
const SEED_PROJECTS: { title: string; location: string; category: ProjectCategory; year: string; cover: string }[] = [
  { title: 'The Alcott Residence', location: 'Upper West Side, New York', category: 'residential', year: '2024', cover: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80&auto=format&fit=crop' },
  { title: 'Meridian Hotel Lobby', location: 'Chicago, Illinois', category: 'hospitality', year: '2024', cover: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80&auto=format&fit=crop' },
  { title: 'Grove Creative HQ', location: 'Silver Lake, Los Angeles', category: 'commercial', year: '2023', cover: '/project1.jpg' },
  { title: 'Pemberton Penthouse', location: 'Tribeca, New York', category: 'residential', year: '2023', cover: '/project2.jpg' },
  { title: 'Haven Wellness Spa', location: 'Aspen, Colorado', category: 'hospitality', year: '2023', cover: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80&auto=format&fit=crop' },
  { title: 'Cross Street Gallery', location: 'Chelsea, New York', category: 'cultural', year: '2022', cover: '/project3.jpg' },
  { title: 'The Kessler Loft', location: 'Williamsburg, Brooklyn', category: 'residential', year: '2022', cover: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80&auto=format&fit=crop' },
  { title: 'Forum Members Club', location: 'Mayfair, London', category: 'hospitality', year: '2022', cover: '/project4.jpg' },
  { title: 'Northcutt Villa', location: 'Bel Air, Los Angeles', category: 'residential', year: '2023', cover: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1200&q=80&auto=format&fit=crop' },
  { title: 'The Hartwell Suite', location: 'South Beach, Miami', category: 'hospitality', year: '2023', cover: '/project5.jpg' },
  { title: 'Solaris Penthouse', location: 'Downtown Dubai', category: 'residential', year: '2024', cover: '/project5.jpg' },
  { title: 'Birchwood Country House', location: 'Cotswolds, England', category: 'residential', year: '2022', cover: 'https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?w=1200&q=80&auto=format&fit=crop' },
  { title: 'Vesper Restaurant', location: 'West Village, New York', category: 'commercial', year: '2024', cover: '/project6.jpg' },
  { title: 'Jade Private Club', location: 'Hong Kong', category: 'hospitality', year: '2023', cover: '/img2.jpg' },
  { title: 'The Marlowe Townhouse', location: 'Notting Hill, London', category: 'residential', year: '2023', cover: '/hero.jpg' },
  { title: 'Cascade Retreat', location: 'Lake Como, Italy', category: 'residential', year: '2024', cover: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80&auto=format&fit=crop' },
  { title: 'One Hyde Park Studio', location: 'Knightsbridge, London', category: 'commercial', year: '2022', cover: '/project1.jpg' },
  { title: 'The Fielding Estate', location: 'Greenwich, Connecticut', category: 'residential', year: '2024', cover: '/project2.jpg' },
  { title: 'Atrium Office Park', location: 'Century City, Los Angeles', category: 'commercial', year: '2023', cover: '/project3.jpg' },
  { title: 'Indigo Beach Club', location: 'Mykonos, Greece', category: 'hospitality', year: '2024', cover: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1200&q=80&auto=format&fit=crop' },
]

const CLIENT_GROUP_CATEGORY: Record<string, ProjectCategory> = {
  'Private Residences': 'residential',
  'Hospitality & Hotels': 'hospitality',
  'Commercial & Corporate': 'commercial',
  'Cultural Institutions': 'cultural',
}

async function seedProjects() {
  const { count } = await supabase.from('projects').select('*', { count: 'exact', head: true })
  if (count && count > 0) {
    console.log(`projects: ${count} rows already present, skipping`)
    return
  }

  for (const p of SEED_PROJECTS) {
    const slug = await ensureUniqueSlug(p.title)
    const { error } = await supabase.from('projects').insert({
      slug,
      category: p.category,
      title_en: p.title,
      title_ar: p.title,
      location_en: p.location,
      location_ar: p.location,
      year: p.year,
      description_en: '',
      description_ar: '',
      cover_image_url: p.cover,
    })
    if (error) throw new Error(`seedProjects (${p.title}): ${error.message}`)
  }
  console.log(`projects: inserted ${SEED_PROJECTS.length} rows`)
}

async function seedClients() {
  const { count } = await supabase.from('clients').select('*', { count: 'exact', head: true })
  if (count && count > 0) {
    console.log(`clients: ${count} rows already present, skipping`)
    return
  }

  const rows = translations.en.clients.clientGroups.flatMap(({ category, clients }) =>
    clients.map((name) => ({
      name,
      category: CLIENT_GROUP_CATEGORY[category],
      logo_url: null,
    }))
  )
  const { error } = await supabase.from('clients').insert(rows)
  if (error) throw new Error(`seedClients: ${error.message}`)
  console.log(`clients: inserted ${rows.length} rows (no logos yet — upload via /admin/clients)`)
}

async function seedAwards() {
  const { count } = await supabase.from('awards').select('*', { count: 'exact', head: true })
  if (count && count > 0) {
    console.log(`awards: ${count} rows already present, skipping`)
    return
  }

  const en = translations.en.awards.awardsByYear
  const ar = translations.ar.awards.awardsByYear

  const rows = en.flatMap(({ year, items }, yearIdx) =>
    items.map((item, itemIdx) => ({
      year,
      title_en: item.title,
      title_ar: ar[yearIdx].items[itemIdx].title,
      org_en: item.org,
      org_ar: ar[yearIdx].items[itemIdx].org,
      sort_order: itemIdx,
    }))
  )
  const { error } = await supabase.from('awards').insert(rows)
  if (error) throw new Error(`seedAwards: ${error.message}`)
  console.log(`awards: inserted ${rows.length} rows`)
}

async function main() {
  await seedProjects()
  await seedClients()
  await seedAwards()
  console.log('Seed complete.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

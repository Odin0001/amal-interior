import 'server-only'
import { getSupabaseAdmin } from '@/lib/supabase/server'
import { PROJECT_CATEGORIES, type ProjectCategory } from '@/lib/constants'
import type { Award, Client, Project, ProjectImage, ProjectWithImages } from './types'

function unwrap<T>(result: { data: T | null; error: { message: string } | null }, action: string): T {
  if (result.error) throw new Error(`${action}: ${result.error.message}`)
  if (result.data === null) throw new Error(`${action}: no data returned`)
  return result.data
}

// ---------- Projects ----------

export async function listProjects(): Promise<Project[]> {
  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })
  if (error) throw new Error(`listProjects: ${error.message}`)
  return (data ?? []) as unknown as Project[]
}

export async function listFeaturedProjects(limit = 3): Promise<Project[]> {
  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('featured', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })
    .limit(limit)
  if (error) throw new Error(`listFeaturedProjects: ${error.message}`)
  return (data ?? []) as unknown as Project[]
}

export async function listProjectsByCategory(category: ProjectCategory): Promise<Project[]> {
  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('category', category)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })
  if (error) throw new Error(`listProjectsByCategory: ${error.message}`)
  return (data ?? []) as unknown as Project[]
}

/** Project count + a cover image per category, for the /projects landing page. */
export async function getProjectCategorySummaries(): Promise<
  Record<ProjectCategory, { count: number; coverImage: string | null }>
> {
  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase
    .from('projects')
    .select('category, cover_image_url, sort_order, created_at')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })
  if (error) throw new Error(`getProjectCategorySummaries: ${error.message}`)

  const rows = (data ?? []) as unknown as Pick<Project, 'category' | 'cover_image_url'>[]
  const summary = Object.fromEntries(
    PROJECT_CATEGORIES.map((c) => [c, { count: 0, coverImage: null as string | null }])
  ) as Record<ProjectCategory, { count: number; coverImage: string | null }>

  for (const row of rows) {
    summary[row.category].count += 1
    if (!summary[row.category].coverImage) summary[row.category].coverImage = row.cover_image_url
  }
  return summary
}

export async function getProjectBySlug(slug: string): Promise<ProjectWithImages | null> {
  const supabase = getSupabaseAdmin()
  const { data: project, error } = await supabase.from('projects').select('*').eq('slug', slug).maybeSingle()
  if (error) throw new Error(`getProjectBySlug: ${error.message}`)
  if (!project) return null

  const { data: images, error: imagesError } = await supabase
    .from('project_images')
    .select('*')
    .eq('project_id', (project as unknown as Project).id)
    .order('sort_order', { ascending: true })
  if (imagesError) throw new Error(`getProjectBySlug images: ${imagesError.message}`)

  return { ...(project as unknown as Project), images: (images ?? []) as unknown as ProjectImage[] }
}

export async function getProjectById(id: string): Promise<ProjectWithImages | null> {
  const supabase = getSupabaseAdmin()
  const { data: project, error } = await supabase.from('projects').select('*').eq('id', id).maybeSingle()
  if (error) throw new Error(`getProjectById: ${error.message}`)
  if (!project) return null

  const { data: images, error: imagesError } = await supabase
    .from('project_images')
    .select('*')
    .eq('project_id', id)
    .order('sort_order', { ascending: true })
  if (imagesError) throw new Error(`getProjectById images: ${imagesError.message}`)

  return { ...(project as unknown as Project), images: (images ?? []) as unknown as ProjectImage[] }
}

export type ProjectInput = {
  slug: string
  category: ProjectCategory
  title_en: string
  title_ar: string
  location_en: string
  location_ar: string
  year: string
  description_en: string
  description_ar: string
  cover_image_url: string
  featured: boolean
}

export async function createProject(input: ProjectInput, galleryImageUrls: string[]): Promise<Project> {
  const supabase = getSupabaseAdmin()
  const inserted = unwrap(
    await supabase.from('projects').insert(input).select('*').single(),
    'createProject'
  ) as unknown as Project

  if (galleryImageUrls.length > 0) {
    const rows = galleryImageUrls.map((image_url, i) => ({ project_id: inserted.id, image_url, sort_order: i }))
    const { error } = await supabase.from('project_images').insert(rows)
    if (error) throw new Error(`createProject images: ${error.message}`)
  }

  return inserted
}

export async function updateProject(
  id: string,
  input: Partial<ProjectInput>,
  newGalleryImageUrls: string[] = []
): Promise<Project> {
  const supabase = getSupabaseAdmin()
  const updated = unwrap(
    await supabase.from('projects').update(input).eq('id', id).select('*').single(),
    'updateProject'
  ) as unknown as Project

  if (newGalleryImageUrls.length > 0) {
    const { data: existing } = await supabase
      .from('project_images')
      .select('sort_order')
      .eq('project_id', id)
      .order('sort_order', { ascending: false })
      .limit(1)
    const start = ((existing?.[0] as unknown as ProjectImage | undefined)?.sort_order ?? -1) + 1
    const rows = newGalleryImageUrls.map((image_url, i) => ({ project_id: id, image_url, sort_order: start + i }))
    const { error } = await supabase.from('project_images').insert(rows)
    if (error) throw new Error(`updateProject images: ${error.message}`)
  }

  return updated
}

export async function deleteProject(id: string): Promise<void> {
  const supabase = getSupabaseAdmin()
  const { error } = await supabase.from('projects').delete().eq('id', id)
  if (error) throw new Error(`deleteProject: ${error.message}`)
}

export async function deleteProjectImage(imageId: string): Promise<string> {
  const supabase = getSupabaseAdmin()
  const row = unwrap(
    await supabase.from('project_images').select('image_url').eq('id', imageId).single(),
    'deleteProjectImage'
  ) as unknown as Pick<ProjectImage, 'image_url'>
  const { error } = await supabase.from('project_images').delete().eq('id', imageId)
  if (error) throw new Error(`deleteProjectImage: ${error.message}`)
  return row.image_url
}

// ---------- Clients ----------

export async function listClients(): Promise<Client[]> {
  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })
  if (error) throw new Error(`listClients: ${error.message}`)
  return (data ?? []) as unknown as Client[]
}

export async function getClientById(id: string): Promise<Client | null> {
  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase.from('clients').select('*').eq('id', id).maybeSingle()
  if (error) throw new Error(`getClientById: ${error.message}`)
  return data as unknown as Client | null
}

export type ClientInput = {
  name: string
  category: ProjectCategory
  logo_url: string | null
}

export async function createClient(input: ClientInput): Promise<Client> {
  const supabase = getSupabaseAdmin()
  return unwrap(await supabase.from('clients').insert(input).select('*').single(), 'createClient') as unknown as Client
}

export async function updateClient(id: string, input: Partial<ClientInput>): Promise<Client> {
  const supabase = getSupabaseAdmin()
  return unwrap(
    await supabase.from('clients').update(input).eq('id', id).select('*').single(),
    'updateClient'
  ) as unknown as Client
}

export async function deleteClient(id: string): Promise<void> {
  const supabase = getSupabaseAdmin()
  const { error } = await supabase.from('clients').delete().eq('id', id)
  if (error) throw new Error(`deleteClient: ${error.message}`)
}

// ---------- Awards ----------

export async function listAwards(): Promise<Award[]> {
  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase
    .from('awards')
    .select('*')
    .order('year', { ascending: false })
    .order('sort_order', { ascending: true })
  if (error) throw new Error(`listAwards: ${error.message}`)
  return (data ?? []) as unknown as Award[]
}

export async function getAwardById(id: string): Promise<Award | null> {
  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase.from('awards').select('*').eq('id', id).maybeSingle()
  if (error) throw new Error(`getAwardById: ${error.message}`)
  return data as unknown as Award | null
}

export type AwardInput = {
  year: string
  title_en: string
  title_ar: string
  org_en: string
  org_ar: string
}

export async function createAward(input: AwardInput): Promise<Award> {
  const supabase = getSupabaseAdmin()
  return unwrap(await supabase.from('awards').insert(input).select('*').single(), 'createAward') as unknown as Award
}

export async function updateAward(id: string, input: Partial<AwardInput>): Promise<Award> {
  const supabase = getSupabaseAdmin()
  return unwrap(
    await supabase.from('awards').update(input).eq('id', id).select('*').single(),
    'updateAward'
  ) as unknown as Award
}

export async function deleteAward(id: string): Promise<void> {
  const supabase = getSupabaseAdmin()
  const { error } = await supabase.from('awards').delete().eq('id', id)
  if (error) throw new Error(`deleteAward: ${error.message}`)
}

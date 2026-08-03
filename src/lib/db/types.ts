import type { ProjectCategory } from '@/lib/constants'

export type Project = {
  id: string
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
  sort_order: number
  featured: boolean
  created_at: string
}

export type ProjectImage = {
  id: string
  project_id: string
  image_url: string
  sort_order: number
}

export type ProjectWithImages = Project & { images: ProjectImage[] }

export type Client = {
  id: string
  name: string
  category: ProjectCategory
  logo_url: string | null
  sort_order: number
  created_at: string
}

export type Award = {
  id: string
  year: string
  title_en: string
  title_ar: string
  org_en: string
  org_ar: string
  sort_order: number
  created_at: string
}

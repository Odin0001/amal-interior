import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import GalleryGrid, { type GalleryProject } from '@/components/GalleryGrid'
import { listProjectsByCategory } from '@/lib/db/queries'
import { PROJECT_CATEGORIES, type ProjectCategory } from '@/lib/constants'
import { hasLocale, type Locale } from '@/lib/translations'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>
}): Promise<Metadata> {
  const { category } = await params
  const label = category.charAt(0).toUpperCase() + category.slice(1)
  return {
    title: `${label} Projects — AMAL Interior Design Studio`,
  }
}

function isProjectCategory(value: string): value is ProjectCategory {
  return (PROJECT_CATEGORIES as readonly string[]).includes(value)
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ lang: string; category: string }>
}) {
  const { lang, category } = await params
  if (!hasLocale(lang)) notFound()
  if (!isProjectCategory(category)) notFound()

  const isAr = lang === 'ar'
  const rows = await listProjectsByCategory(category)

  const projects: GalleryProject[] = rows.map((p, i) => ({
    slug: p.slug,
    number: String(i + 1).padStart(2, '0'),
    title: isAr ? p.title_ar : p.title_en,
    description: `${isAr ? p.location_ar : p.location_en} · ${p.year}`,
    url: p.cover_image_url,
  }))

  return (
    <GalleryGrid
      projects={projects}
      viewLabel={isAr ? 'عرض التفاصيل' : 'View Project'}
      basePath={`/${lang as Locale}/projects/${category}`}
    />
  )
}

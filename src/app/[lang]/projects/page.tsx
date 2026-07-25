import type { Metadata } from 'next'
import ProjectCategories, { type CategoryCard } from '@/components/ProjectCategories'
import { getProjectCategorySummaries } from '@/lib/db/queries'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Projects — AMAL Interior Design Studio',
}

const CATEGORY_ORDER = ['residential', 'commercial', 'hospitality', 'cultural'] as const
const FALLBACK_IMAGE: Record<(typeof CATEGORY_ORDER)[number], string> = {
  residential: '/hero.jpg',
  commercial: '/project1.jpg',
  hospitality: '/project4.jpg',
  cultural: '/project3.jpg',
}

export default async function ProjectsPage() {
  const summaries = await getProjectCategorySummaries()

  const categories: CategoryCard[] = CATEGORY_ORDER.map((slug, i) => ({
    slug,
    num: String(i + 1).padStart(2, '0'),
    image: summaries[slug].coverImage ?? FALLBACK_IMAGE[slug],
    count: summaries[slug].count,
  }))

  return <ProjectCategories categories={categories} />
}

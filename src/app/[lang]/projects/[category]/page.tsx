import type { Metadata } from 'next'
import GalleryGrid from '@/components/GalleryGrid'

const CATEGORIES = ['residential', 'commercial', 'hospitality', 'cultural']

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ category }))
}

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

export default function CategoryPage() {
  return <GalleryGrid />
}

import type { Metadata } from 'next'
import ProjectCategories from '@/components/ProjectCategories'

export const metadata: Metadata = {
  title: 'Projects — AMAL Interior Design Studio',
}

export default function ProjectsPage() {
  return <ProjectCategories />
}

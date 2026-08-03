'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { verifySession } from '@/lib/auth/dal'
import { projectSchema } from '@/lib/validation'
import { ensureUniqueSlug } from '@/lib/slug'
import { uploadImage, deleteImage } from '@/lib/supabase/storage'
import {
  createProject,
  updateProject,
  deleteProject,
  deleteProjectImage,
  getProjectById,
} from '@/lib/db/queries'

export type ProjectFormState = { error?: string; fieldErrors?: Record<string, string[] | undefined> } | undefined

function readProjectFields(formData: FormData) {
  return {
    category: formData.get('category'),
    title_en: formData.get('title_en'),
    title_ar: formData.get('title_ar'),
    location_en: formData.get('location_en'),
    location_ar: formData.get('location_ar'),
    year: formData.get('year'),
    description_en: formData.get('description_en') ?? '',
    description_ar: formData.get('description_ar') ?? '',
    featured: formData.get('featured') === 'on',
  }
}

function nonEmptyFiles(files: FormDataEntryValue[]) {
  return files.filter((f): f is File => f instanceof File && f.size > 0)
}

export async function createProjectAction(
  _prevState: ProjectFormState,
  formData: FormData
): Promise<ProjectFormState> {
  await verifySession()

  const parsed = projectSchema.safeParse(readProjectFields(formData))
  if (!parsed.success) {
    return { error: 'Please fix the errors below.', fieldErrors: parsed.error.flatten().fieldErrors }
  }

  const cover = formData.get('cover')
  if (!(cover instanceof File) || cover.size === 0) {
    return { error: 'A cover image is required.' }
  }

  const galleryFiles = nonEmptyFiles(formData.getAll('gallery'))

  const coverUrl = await uploadImage(cover, 'projects')
  const galleryUrls = await Promise.all(galleryFiles.map((f) => uploadImage(f, 'projects')))

  const slug = await ensureUniqueSlug(parsed.data.title_en)
  await createProject({ ...parsed.data, slug, cover_image_url: coverUrl }, galleryUrls)

  revalidatePath('/', 'layout')
  redirect('/admin/projects')
}

export async function updateProjectAction(
  id: string,
  _prevState: ProjectFormState,
  formData: FormData
): Promise<ProjectFormState> {
  await verifySession()

  const parsed = projectSchema.safeParse(readProjectFields(formData))
  if (!parsed.success) {
    return { error: 'Please fix the errors below.', fieldErrors: parsed.error.flatten().fieldErrors }
  }

  const existing = await getProjectById(id)
  if (!existing) return { error: 'Project not found.' }

  const cover = formData.get('cover')
  const galleryFiles = nonEmptyFiles(formData.getAll('gallery'))

  let coverUrl = existing.cover_image_url
  if (cover instanceof File && cover.size > 0) {
    coverUrl = await uploadImage(cover, 'projects')
    await deleteImage(existing.cover_image_url)
  }

  const galleryUrls = await Promise.all(galleryFiles.map((f) => uploadImage(f, 'projects')))

  let slug = existing.slug
  if (parsed.data.title_en !== existing.title_en) {
    slug = await ensureUniqueSlug(parsed.data.title_en, id)
  }

  await updateProject(id, { ...parsed.data, slug, cover_image_url: coverUrl }, galleryUrls)

  revalidatePath('/', 'layout')
  redirect(`/admin/projects/${id}/edit`)
}

export async function deleteProjectAction(id: string) {
  await verifySession()
  const existing = await getProjectById(id)
  if (existing) {
    await deleteImage(existing.cover_image_url)
    await Promise.all(existing.images.map((img) => deleteImage(img.image_url)))
  }
  await deleteProject(id)
  revalidatePath('/', 'layout')
  redirect('/admin/projects')
}

export async function deleteProjectImageAction(projectId: string, imageId: string) {
  await verifySession()
  const url = await deleteProjectImage(imageId)
  await deleteImage(url)
  revalidatePath('/', 'layout')
  redirect(`/admin/projects/${projectId}/edit`)
}

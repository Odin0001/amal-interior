'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { verifySession } from '@/lib/auth/dal'
import { awardSchema } from '@/lib/validation'
import { createAward, updateAward, deleteAward, getAwardById } from '@/lib/db/queries'

export type AwardFormState = { error?: string; fieldErrors?: Record<string, string[] | undefined> } | undefined

function readAwardFields(formData: FormData) {
  return {
    year: formData.get('year'),
    title_en: formData.get('title_en'),
    title_ar: formData.get('title_ar'),
    org_en: formData.get('org_en'),
    org_ar: formData.get('org_ar'),
  }
}

export async function createAwardAction(_prevState: AwardFormState, formData: FormData): Promise<AwardFormState> {
  await verifySession()

  const parsed = awardSchema.safeParse(readAwardFields(formData))
  if (!parsed.success) {
    return { error: 'Please fix the errors below.', fieldErrors: parsed.error.flatten().fieldErrors }
  }

  await createAward(parsed.data)

  revalidatePath('/', 'layout')
  redirect('/admin/awards')
}

export async function updateAwardAction(
  id: string,
  _prevState: AwardFormState,
  formData: FormData
): Promise<AwardFormState> {
  await verifySession()

  const parsed = awardSchema.safeParse(readAwardFields(formData))
  if (!parsed.success) {
    return { error: 'Please fix the errors below.', fieldErrors: parsed.error.flatten().fieldErrors }
  }

  const existing = await getAwardById(id)
  if (!existing) return { error: 'Award not found.' }

  await updateAward(id, parsed.data)

  revalidatePath('/', 'layout')
  redirect('/admin/awards')
}

export async function deleteAwardAction(id: string) {
  await verifySession()
  await deleteAward(id)
  revalidatePath('/', 'layout')
  redirect('/admin/awards')
}

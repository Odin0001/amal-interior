'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { verifySession } from '@/lib/auth/dal'
import { clientSchema } from '@/lib/validation'
import { uploadImage, deleteImage } from '@/lib/supabase/storage'
import { createClient, updateClient, deleteClient, getClientById } from '@/lib/db/queries'

export type ClientFormState = { error?: string; fieldErrors?: Record<string, string[] | undefined> } | undefined

function readClientFields(formData: FormData) {
  return {
    name: formData.get('name'),
    category: formData.get('category'),
  }
}

export async function createClientAction(
  _prevState: ClientFormState,
  formData: FormData
): Promise<ClientFormState> {
  await verifySession()

  const parsed = clientSchema.safeParse(readClientFields(formData))
  if (!parsed.success) {
    return { error: 'Please fix the errors below.', fieldErrors: parsed.error.flatten().fieldErrors }
  }

  const logo = formData.get('logo')
  if (!(logo instanceof File) || logo.size === 0) {
    return { error: 'A logo image is required.' }
  }

  const logoUrl = await uploadImage(logo, 'clients')
  await createClient({ ...parsed.data, logo_url: logoUrl })

  revalidatePath('/', 'layout')
  redirect('/admin/clients')
}

export async function updateClientAction(
  id: string,
  _prevState: ClientFormState,
  formData: FormData
): Promise<ClientFormState> {
  await verifySession()

  const parsed = clientSchema.safeParse(readClientFields(formData))
  if (!parsed.success) {
    return { error: 'Please fix the errors below.', fieldErrors: parsed.error.flatten().fieldErrors }
  }

  const existing = await getClientById(id)
  if (!existing) return { error: 'Client not found.' }

  const logo = formData.get('logo')
  let logoUrl = existing.logo_url
  if (logo instanceof File && logo.size > 0) {
    logoUrl = await uploadImage(logo, 'clients')
    if (existing.logo_url) await deleteImage(existing.logo_url)
  }

  await updateClient(id, { ...parsed.data, logo_url: logoUrl })

  revalidatePath('/', 'layout')
  redirect('/admin/clients')
}

export async function deleteClientAction(id: string) {
  await verifySession()
  const existing = await getClientById(id)
  if (existing?.logo_url) await deleteImage(existing.logo_url)
  await deleteClient(id)
  revalidatePath('/', 'layout')
  redirect('/admin/clients')
}

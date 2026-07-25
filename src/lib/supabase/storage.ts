import 'server-only'
import { getSupabaseAdmin } from './server'

const BUCKET = 'media'

function extensionFor(file: File) {
  const fromName = file.name.split('.').pop()
  if (fromName && fromName.length <= 5) return fromName.toLowerCase()
  const fromType = file.type.split('/').pop()
  return fromType || 'bin'
}

/** Uploads a file to the public `media` bucket and returns its public URL. */
export async function uploadImage(file: File, folder: 'projects' | 'clients') {
  const supabase = getSupabaseAdmin()
  const path = `${folder}/${crypto.randomUUID()}.${extensionFor(file)}`

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    contentType: file.type || undefined,
    upsert: false,
  })
  if (error) throw new Error(`Failed to upload image: ${error.message}`)

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return data.publicUrl
}

/** Deletes a previously uploaded image given its public URL. Best-effort — ignores not-found. */
export async function deleteImage(publicUrl: string) {
  const marker = `/object/public/${BUCKET}/`
  const idx = publicUrl.indexOf(marker)
  if (idx === -1) return
  const path = publicUrl.slice(idx + marker.length)
  const supabase = getSupabaseAdmin()
  await supabase.storage.from(BUCKET).remove([path])
}

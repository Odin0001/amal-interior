import 'server-only'
import { cache } from 'react'
import { redirect } from 'next/navigation'
import { decrypt, getSessionCookieValue } from './session'

/** Redirects to /admin/login if there is no valid session. Call at the top of every admin page/Server Action. */
export const verifySession = cache(async () => {
  const token = await getSessionCookieValue()
  const session = await decrypt(token)

  if (!session) {
    redirect('/admin/login')
  }

  return session
})

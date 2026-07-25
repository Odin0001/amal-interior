'use server'

import { redirect } from 'next/navigation'
import bcrypt from 'bcryptjs'
import { loginSchema } from '@/lib/validation'
import { createSession } from '@/lib/auth/session'

export type LoginState = { error: string } | undefined

export async function login(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
  })
  if (!parsed.success) {
    return { error: 'Enter a username and password.' }
  }

  const adminUsername = process.env.ADMIN_USERNAME
  const adminPasswordHashB64 = process.env.ADMIN_PASSWORD_HASH
  if (!adminUsername || !adminPasswordHashB64) {
    return { error: 'Admin credentials are not configured on the server.' }
  }
  // ADMIN_PASSWORD_HASH is stored base64-encoded (see scripts/hash-password.ts)
  // to survive this project's env-var $-expansion, which otherwise mangles
  // the literal "$" characters in a raw bcrypt hash.
  const adminPasswordHash = Buffer.from(adminPasswordHashB64, 'base64').toString('utf8')

  const { username, password } = parsed.data
  const validPassword = await bcrypt.compare(password, adminPasswordHash)
  if (username !== adminUsername || !validPassword) {
    return { error: 'Invalid username or password.' }
  }

  await createSession()
  redirect('/admin')
}

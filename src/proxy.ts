import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decrypt, SESSION_COOKIE_NAME } from '@/lib/auth/session'

const locales = ['en', 'ar']
const defaultLocale = 'en'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // /admin is a single, non-localized interface — gate it here instead of
  // running it through the locale-prefix redirect below.
  if (pathname.startsWith('/admin')) {
    if (pathname === '/admin/login') return NextResponse.next()

    const session = await decrypt(request.cookies.get(SESSION_COOKIE_NAME)?.value)
    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
    return NextResponse.next()
  }

  const hasLocale = locales.some(
    (l) => pathname.startsWith(`/${l}/`) || pathname === `/${l}`
  )
  if (hasLocale) return
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)', '/'],
}

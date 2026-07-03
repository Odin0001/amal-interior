'use client'
import { usePathname } from 'next/navigation'
import { translations, type Locale } from './translations'

export function useLocale() {
  const pathname = usePathname()
  const locale: Locale = pathname.startsWith('/ar') ? 'ar' : 'en'
  return { locale, t: translations[locale], isRTL: locale === 'ar' }
}

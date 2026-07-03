import type { Metadata } from 'next'
import {  Cormorant_Garamond, Geist } from 'next/font/google'
import '../globals.css'
import Navbar from '@/components/Navbar'
import ConditionalFooter from '@/components/ConditionalFooter'
import SmoothScroll from '@/components/SmoothScroll'
import { hasLocale } from '@/lib/translations'
import { notFound } from 'next/navigation'

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
})

const cormorantGaramond = Cormorant_Garamond({
  variable: '--font-cormorant-garamond',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'AMAL — Interior Design Studio',
  description:
    'Award-winning interior design studio crafting transformative spaces since 2012.',
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ar' }]
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params

  if (!hasLocale(lang)) {
    notFound()
  }

  return (
    <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <body
        className={`${geist.className} ${cormorantGaramond.className} bg-void text-frost antialiased`}
      >
        <SmoothScroll>
          <div id="content" className="relative z-[1] bg-void">
            <Navbar />
            <main>{children}</main>
          </div>
          <ConditionalFooter />
        </SmoothScroll>
      </body>
    </html>
  )
}

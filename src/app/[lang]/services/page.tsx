import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { translations, hasLocale, type Locale } from '@/lib/translations'
import WaveServices from '@/components/WaveServices'

export const metadata: Metadata = {
  title: 'Services — AMAL Interior Design Studio',
}

// One image per service — order matches translations.services.services
const SERVICE_IMAGES = [
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=90', // Residential
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=90', // Commercial
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=90', // Space Planning
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1920&q=90',    // Material & Furniture
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1920&q=90',    // Art Consultation
  'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1920&q=90', // Design Consultation
]

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  const services = translations[lang as Locale].services.services.map((s, i) => ({
    num: s.num,
    title: s.title,
    subtitle: s.subtitle,
    image: SERVICE_IMAGES[i] ?? '',
  }))

  return <WaveServices services={services} />
}

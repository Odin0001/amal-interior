import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { translations, hasLocale, type Locale } from '@/lib/translations'
import PageHero from '@/components/PageHero'
import SpotlightCard from '@/components/blocks/SpotlightCard'
import LogoLoop, { type LogoLoopItem } from '@/components/blocks/LogoLoop'
import ElegantCarousel from '@/components/ui/ElegentCarousel'

export const metadata: Metadata = {
  title: 'Collaboration — AMAL Interior Design Studio',
}

export default async function CollaborationPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const t = translations[lang as Locale]
  const c = t.collaboration
  const isAr = lang === 'ar'
  const dir = isAr ? 'rtl' : 'ltr'

  const heroTitle = [c.heroTitle, c.heroTitleAccent].filter(Boolean).join(' ')

  const nameItem = (name: string): LogoLoopItem => ({
    node: (
      <span className="whitespace-nowrap border border-border px-5 py-2.5 text-sm text-frost/70 hover:text-frost hover:border-frost/30 transition-colors">
        {name}
      </span>
    ),
  })

  return (
    <>
      <PageHero title={heroTitle} dir={dir} />

      {/* Process */}
      <section className="bg-glass py-24 lg:py-36 border-t border-b border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="mb-16">
            <p className="text-frost text-[11px] tracking-[0.4em] uppercase mb-4">
              {c.processLabel}
            </p>
            <h2 className="font-display font-bold text-frost text-3xl lg:text-5xl">
              {c.processTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {c.process.map(({ step, title, desc }) => (
              <SpotlightCard key={step} className="bg-glass border border-border p-8">
                <p className="font-display font-bold text-4xl text-frost/30 mb-6">{step}</p>
                <h3 className="font-display font-bold text-xl text-frost mb-4">{title}</h3>
                <p className="text-muted text-sm leading-relaxed">{desc}</p>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="bg-void py-24 lg:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="mb-14">
            <p className="text-frost text-[11px] tracking-[0.35em] uppercase mb-4">
              {c.partnersLabel}
            </p>
            <h2 className="font-display font-bold text-frost text-3xl lg:text-5xl">{c.partnersTitle}</h2>
          </div>

          {/* <div className="flex flex-col gap-10">
            {c.partnerGroups.map(({ category, partners }, i) => (
              <div key={category}>
                <p className="text-[10px] tracking-[0.3em] uppercase text-frost/60 mb-5">
                  {category}
                </p>
                <LogoLoop
                  logos={partners.map(nameItem)}
                  direction={i % 2 === 0 ? 'left' : 'right'}
                  speed={32}
                  gap={20}
                  fadeOut
                  ariaLabel={category}
                />
              </div>
            ))}
          </div> */}

          <ElegantCarousel />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-glass py-24 lg:py-32 border-t border-border text-center">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <p className="text-frost text-[11px] tracking-[0.4em] uppercase mb-6">
            {c.ctaLabel}
          </p>
          <h2 className="font-display font-bold text-frost text-3xl lg:text-5xl mb-8">
            {c.ctaTitle}
          </h2>
          <p className="text-muted text-lg max-w-xl mx-auto mb-10">
            {c.ctaBody}
          </p>
          <Link
            href={`/${lang}/contact`}
            className="inline-block bg-frost text-void text-xs tracking-[0.25em] uppercase px-10 py-4 font-semibold hover:bg-frost transition-colors duration-300"
          >
            {c.ctaButton}
          </Link>
        </div>
      </section>
    </>
  )
}

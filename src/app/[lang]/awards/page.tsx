import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { translations, hasLocale, type Locale } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Awards — AMAL Interior Design Studio',
}

export default async function AwardsPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const t = translations[lang as Locale]
  const a = t.awards
  const isAr = lang === 'ar'

  return (
    <>
      {/* Hero */}
      <section className="relative bg-void min-h-[60vh] flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tl from-stone-950/30 to-void pointer-events-none" />
        <span
          aria-hidden
          className="absolute -left-4 bottom-0 font-display font-black text-[14vw] text-frost/[0.025] leading-none select-none pointer-events-none"
        >
          {isAr ? 'جوائز' : 'Awards'}
        </span>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-12 w-full pb-20 pt-40">
          <p className="text-frost text-[11px] tracking-[0.45em] uppercase mb-8">
            {a.heroLabel}
          </p>
          <h1 className="font-display font-bold text-frost text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.92] max-w-3xl">
            {a.heroTitle}{' '}
            <span className="text-frost">{a.heroTitleAccent}</span>
          </h1>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-glass border-b border-border py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {a.stats.map(({ value, label }) => (
              <div key={label} className="bg-glass p-8 lg:p-10 text-center group hover:bg-surface transition-colors duration-300">
                <p className="font-display font-bold text-4xl lg:text-5xl text-frost mb-2">{value}</p>
                <p className="text-[11px] tracking-[0.2em] uppercase text-muted group-hover:text-frost/60 transition-colors">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-void py-24 lg:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            <div className="lg:col-span-5">
              <p className="text-frost text-[11px] tracking-[0.4em] uppercase mb-6">
                {a.introLabel}
              </p>
              <h2 className="font-display font-bold text-frost text-3xl lg:text-4xl leading-[1.1]">
                {a.introTitle}
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="text-muted text-lg leading-relaxed">{a.introBody}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Awards by year */}
      <section className="bg-glass py-24 lg:py-36 border-t border-b border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="mb-14">
            <p className="text-frost text-[11px] tracking-[0.35em] uppercase mb-4">
              {a.awardsLabel}
            </p>
            <h2 className="font-display font-bold text-frost text-3xl lg:text-5xl">{a.awardsTitle}</h2>
          </div>

          <div className="flex flex-col divide-y divide-border">
            {a.awardsByYear.map(({ year, items }) => (
              <div key={year} className="grid grid-cols-12 gap-4 py-8 group px-4 -mx-4">
                <div className="col-span-3 sm:col-span-2">
                  <p className="font-display font-bold text-2xl lg:text-3xl text-frost">{year}</p>
                </div>
                <div className="col-span-9 sm:col-span-10 flex flex-col gap-4">
                  {items.map(({ title, org }) => (
                    <div key={`${year}-${title}`} className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 hover:bg-void/30 transition-colors -mx-2 px-2 py-1">
                      <p className="text-frost font-medium text-base lg:text-lg">{title}</p>
                      <p className="text-muted text-sm">{org}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press */}
      <section className="bg-void py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="mb-14">
            <p className="text-frost text-[11px] tracking-[0.35em] uppercase mb-4">
              {a.pressLabel}
            </p>
            <h2 className="font-display font-bold text-frost text-3xl lg:text-5xl">{a.pressTitle}</h2>
          </div>

          <div className="flex flex-wrap gap-x-12 gap-y-6">
            {a.press.map((name) => (
              <p key={name} className="font-display text-xl lg:text-2xl text-frost/50 hover:text-frost transition-colors">
                {name}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-glass py-24 lg:py-32 border-t border-border text-center">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <p className="text-frost text-[11px] tracking-[0.4em] uppercase mb-6">
            {a.ctaLabel}
          </p>
          <h2 className="font-display font-bold text-frost text-3xl lg:text-5xl mb-8">
            {a.ctaTitle}
          </h2>
          <p className="text-muted text-lg max-w-xl mx-auto mb-10">
            {a.ctaBody}
          </p>
          <Link
            href={`/${lang}/contact`}
            className="inline-block bg-frost text-void text-xs tracking-[0.25em] uppercase px-10 py-4 font-semibold hover:bg-frost transition-colors duration-300"
          >
            {a.ctaButton}
          </Link>
        </div>
      </section>
    </>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { translations, hasLocale, type Locale } from '@/lib/translations'

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

  return (
    <>
      {/* Hero */}
      <section className="relative bg-void min-h-[60vh] flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tl from-stone-950/30 to-void pointer-events-none" />
        <span
          aria-hidden
          className="absolute -left-4 bottom-0 font-display font-black text-[14vw] text-frost/[0.025] leading-none select-none pointer-events-none"
        >
          {isAr ? 'تعاون' : 'Collaboration'}
        </span>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-12 w-full pb-20 pt-40">
          <p className="text-frost text-[11px] tracking-[0.45em] uppercase mb-8">
            {c.heroLabel}
          </p>
          <h1 className="font-display font-bold text-frost text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.92] max-w-3xl">
            {c.heroTitle}{' '}
            <span className="text-frost">{c.heroTitleAccent}</span>
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-glass py-24 lg:py-36 border-b border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            <div className="lg:col-span-5">
              <p className="text-frost text-[11px] tracking-[0.4em] uppercase mb-6">
                {c.introLabel}
              </p>
              <h2 className="font-display font-bold text-frost text-3xl lg:text-4xl leading-[1.1]">
                {c.introTitle}
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="text-muted text-lg leading-relaxed">{c.introBody}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Types */}
      <section className="bg-void py-24 lg:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="mb-16">
            <p className="text-frost text-[11px] tracking-[0.4em] uppercase mb-4">
              {c.typesLabel}
            </p>
            <h2 className="font-display font-bold text-frost text-3xl lg:text-5xl">
              {c.typesTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
            {c.types.map(({ num, title, desc }) => (
              <div key={num} className="bg-void p-8 lg:p-12 group hover:bg-glass transition-colors duration-300">
                <p className="text-frost/30 text-xs tracking-[0.3em] mb-8 group-hover:text-frost/60 transition-colors">{num}</p>
                <h3 className="font-display font-bold text-2xl text-frost group-hover:text-frost mb-5 transition-colors">{title}</h3>
                <p className="text-muted text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {c.process.map(({ step, title, desc }) => (
              <div key={step}>
                <p className="font-display font-bold text-4xl text-frost/30 mb-6">{step}</p>
                <h3 className="font-display font-bold text-xl text-frost mb-4">{title}</h3>
                <p className="text-muted text-sm leading-relaxed">{desc}</p>
              </div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {c.partnerGroups.map(({ category, partners }) => (
              <div key={category}>
                <p className="text-[10px] tracking-[0.3em] uppercase text-frost/60 border-b border-border pb-4 mb-6">
                  {category}
                </p>
                <ul className="flex flex-col gap-3">
                  {partners.map((partner) => (
                    <li key={partner} className="text-muted text-sm hover:text-frost transition-colors">
                      {partner}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
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

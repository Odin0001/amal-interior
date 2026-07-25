import Link from 'next/link'
import Hero from '@/components/Hero'
import AboutBlock from '@/components/Aboutblock'
import { Preview } from '@/components/Preview'
import { RecentProjects } from '@/components/Services'
import { notFound } from 'next/navigation'
import { translations, hasLocale, type Locale } from '@/lib/translations'
import ArchScroll from '@/components/ArchScroll'

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const t = translations[lang as Locale]

  return (
    <>
      {/* Hero — sticky behind content, recedes as sections slide over it */}
      <section
        id="hero-section"
        className="sticky top-0 h-screen z-[0] overflow-hidden"
      >
        <Hero />
      </section>

      {/* Content — slides over the hero */}
      <div className="relative z-[1] bg-void">

        {/* Intro + AboutBlock */}
        <section className="bg-void">
          <AboutBlock />
        </section>

        {/* Recent Projects */}
        <ArchScroll />

        {/* Services Teaser */}
        <RecentProjects />

        {/* Pull Quote */}
        <section className="bg-void py-24 lg:py-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="max-w-4xl mx-auto text-center">
              <blockquote className="font-display font-bold text-frost text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-[1.1]">
                {t.home.pullQuote}
              </blockquote>
              <div className="mt-10 flex items-center justify-center gap-4">
                <div className="w-8 h-px bg-frost/30" />
                <p className="text-muted text-xs tracking-widest">{t.home.pullQuoteAuthor}</p>
                <div className="w-8 h-px bg-frost/30" />
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-glass py-24 lg:py-36 border-t border-border">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
              <div>
                <p className="text-frost text-[11px] tracking-[0.4em] uppercase mb-6">
                  {t.home.readyLabel}
                </p>
                <h2 className="font-display font-bold text-frost text-4xl lg:text-5xl xl:text-6xl leading-[1.0]">
                  {t.home.readyTitle}
                </h2>
              </div>
              <div>
                <p className="text-muted text-lg leading-relaxed mb-10">
                  {t.home.readyBody}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href={`/${lang}/contact`}
                    className="bg-frost text-void text-xs tracking-[0.25em] uppercase px-8 py-4 font-semibold hover:bg-frost transition-colors duration-300 text-center"
                  >
                    {t.home.ctaConversation}
                  </Link>
                  <Link
                    href={`/${lang}/services`}
                    className="border border-border text-frost/50 text-xs tracking-[0.25em] uppercase px-8 py-4 hover:border-frost/30 hover:text-frost transition-all text-center"
                  >
                    {t.home.ctaServices}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  )
}

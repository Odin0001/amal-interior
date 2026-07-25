import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { translations, hasLocale, type Locale } from '@/lib/translations'
import { parseStatValue } from '@/lib/utils'
import { listAwards } from '@/lib/db/queries'
import PageHero from '@/components/PageHero'
import CountUp from '@/components/blocks/CountUp'
import SpotlightCard from '@/components/blocks/SpotlightCard'
import LogoLoop, { type LogoLoopItem } from '@/components/blocks/LogoLoop'
import { ZoomParallax } from '@/components/ui/zoom-parallax'
import { cn } from '@/lib/utils';

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Awards — AMAL Interior Design Studio',
}

export default async function AwardsPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {

  const images = [
		{
			src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
			alt: 'Modern architecture building',
		},
		{
			src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
			alt: 'Urban cityscape at sunset',
		},
		{
			src: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=800&fit=crop&crop=entropy&auto=format&q=80',
			alt: 'Abstract geometric pattern',
		},
		{
			src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
			alt: 'Mountain landscape',
		},
		{
			src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=800&fit=crop&crop=entropy&auto=format&q=80',
			alt: 'Minimalist design elements',
		},
		{
			src: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
			alt: 'Ocean waves and beach',
		},
		{
			src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
			alt: 'Forest trees and sunlight',
		},
	];
  
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const t = translations[lang as Locale]
  const a = t.awards
  const isAr = lang === 'ar'
  const dir = isAr ? 'rtl' : 'ltr'

  const heroTitle = [a.heroTitle, a.heroTitleAccent].filter(Boolean).join(' ')

  const awardRows = await listAwards()
  const awardsByYear: { year: string; items: { title: string; org: string }[] }[] = []
  for (const award of awardRows) {
    const title = isAr ? award.title_ar : award.title_en
    const org = isAr ? award.org_ar : award.org_en
    const last = awardsByYear[awardsByYear.length - 1]
    if (last && last.year === award.year) {
      last.items.push({ title, org })
    } else {
      awardsByYear.push({ year: award.year, items: [{ title, org }] })
    }
  }

  const pressItem = (name: string): LogoLoopItem => ({
    node: (
      <span className="whitespace-nowrap font-display text-xl lg:text-2xl text-frost/50 hover:text-frost transition-colors">
        {name}
      </span>
    ),
  })

  return (
    <>
      <PageHero title={heroTitle} dir={dir} />

      {/* Stats */}
      <section className="bg-glass border-b border-border py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {a.stats.map(({ value, label }) => {
              const { prefix, number, suffix } = parseStatValue(value)
              return (
                <div key={label} className="bg-glass p-8 lg:p-10 text-center group hover:bg-surface transition-colors duration-300">
                  <p className="font-display font-bold text-4xl lg:text-5xl text-frost mb-2">
                    {prefix}
                    <CountUp to={number} duration={2} />
                    {suffix}
                  </p>
                  <p className="text-[11px] tracking-[0.2em] uppercase text-muted group-hover:text-frost/60 transition-colors">{label}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="min-h-screen w-full">
        <div className="relative flex h-[50vh] items-center justify-center">
          {/* Radial spotlight */}
          <div
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute -top-1/2 left-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 rounded-full',
              'bg-[radial-gradient(ellipse_at_center,--theme(--color-foreground/.1),transparent_50%)]',
              'blur-[30px]',
            )}
          />
          <h1 className="text-center text-4xl font-bold">
            Scroll Down for Zoom Parallax
          </h1>
        </div>
        <ZoomParallax images={images} />
        <div className="h-[50vh]"/>
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

          <div className="flex flex-col gap-4">
            {awardsByYear.map(({ year, items }) => (
              <SpotlightCard key={year} className="bg-void border border-border">
                <div className="grid grid-cols-12 gap-4 p-6 lg:p-8">
                  <div className="col-span-3 sm:col-span-2">
                    <p className="font-display font-bold text-2xl lg:text-3xl text-frost">{year}</p>
                  </div>
                  <div className="col-span-9 sm:col-span-10 flex flex-col gap-4">
                    {items.map(({ title, org }) => (
                      <div key={`${year}-${title}`} className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                        <p className="text-frost font-medium text-base lg:text-lg">{title}</p>
                        <p className="text-muted text-sm">{org}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
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

          <LogoLoop
            logos={a.press.map(pressItem)}
            direction="left"
            speed={36}
            gap={64}
            fadeOut
            ariaLabel={a.pressTitle}
          />
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

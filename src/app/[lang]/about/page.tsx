import OurTeam from '@/components/OurTeam'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { translations, hasLocale, type Locale } from '@/lib/translations'
import { Timeline } from '@/components/ui/timeline'
import AboutHero from '@/components/AboutHero'
import {
  LightbulbIcon,
  SealCheckIcon,
  MagnifyingGlassIcon,
  UsersThreeIcon,
  SparkleIcon,
  HandshakeIcon,
} from '@phosphor-icons/react/dist/ssr'

const valueIcons = [LightbulbIcon, SealCheckIcon, MagnifyingGlassIcon, UsersThreeIcon, SparkleIcon, HandshakeIcon]

export const metadata: Metadata = {
  title: 'About — AMAL Interior Design Studio',
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const t = translations[lang as Locale]
  const a = t.about

  const imgClass = "h-20 w-full object-cover md:h-44 lg:h-60"

  const milestoneImages = [
    [
      { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop', alt: 'SoHo studio' },
      { src: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&auto=format&fit=crop', alt: 'First commission' },
    ],
    [
      { src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop', alt: 'The Fig Hotel lobby' },
      { src: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&auto=format&fit=crop', alt: 'Hotel suite' },
    ],
    [
      { src: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&auto=format&fit=crop', alt: 'Mercer Street atelier' },
      { src: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&auto=format&fit=crop', alt: 'Design process' },
    ],
    [
      { src: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop', alt: 'Bespoke sofa' },
      { src: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&auto=format&fit=crop', alt: 'Craftsmanship detail' },
    ],
    [
      { src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&auto=format&fit=crop', alt: 'Award project' },
      { src: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=600&auto=format&fit=crop', alt: 'Studio team' },
    ],
    [
      { src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&auto=format&fit=crop', alt: 'Award project' },
      { src: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=600&auto=format&fit=crop', alt: 'Studio team' },
    ],
  ]

  const data = a.milestones.map((milestone, i) => ({
    title: milestone.year,
    content: (
      <div key={milestone.year}>
        <p key="label" className="mb-3 text-4xl font-semibold uppercase tracking-[0.15em] text-frost">{milestone.label}</p>
        <p key="body" className="mb-6 text-lg font-bold text-muted leading-relaxed">{milestone.desc}</p>
        <div key="imgs" className="grid grid-cols-2 gap-3">
          {milestoneImages[i]?.map((img) => (
            <img key={img.src} src={img.src} alt={img.alt} className={imgClass} />
          ))}
        </div>
      </div>
    ),
  }));

  return (
    <>
      {/* Hero */}
      {/* <section className="relative bg-void min-h-[70vh] flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-void to-stone-950/40 pointer-events-none" />
        <span
          aria-hidden
          className="absolute right-0 bottom-0 font-display font-black text-[18vw] text-frost/[0.025] leading-none select-none pointer-events-none"
        >
          {lang === 'ar' ? 'عن' : 'About'}
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
      </section> */}

      <AboutHero />

      {/* Story */}
      <section className="py-24 lg:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            <div className="lg:col-span-5">
              <h2 className="font-display font-bold text-frost text-3xl lg:text-4xl leading-[1.1]">
                {a.originTitle}
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="text-muted text-lg leading-relaxed mb-6">{a.storyP1}</p>
              <p className="text-muted text-lg leading-relaxed mb-6">{a.storyP2}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 lg:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <div className="aspect-[4/3] w-full overflow-hidden mb-8">
                <img
                  src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=900&auto=format&fit=crop"
                  alt={a.missionImageAlt}
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="font-display font-bold text-frost text-2xl lg:text-3xl mb-4">
                {a.missionTitle}
              </h3>
              <p className="text-muted text-lg leading-relaxed">{a.missionBody}</p>
            </div>

            <div>
              <div className="aspect-[4/3] w-full overflow-hidden mb-8">
                <img
                  src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=900&auto=format&fit=crop"
                  alt={a.visionImageAlt}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-display font-bold text-frost text-2xl lg:text-3xl mb-4">
                {a.visionTitle}
              </h3>
              <p className="text-muted text-lg leading-relaxed">{a.visionBody}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-void py-24 lg:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="mb-16">
            <h2 className="font-display font-bold text-frost text-3xl lg:text-5xl">
              {a.valuesTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {a.values.map(({ title, desc }, i) => {
              const ValueIcon = valueIcons[i]
              return (
                <div key={title} className="bg-void p-8 lg:p-12 group hover:bg-glass transition-colors duration-300">
                  <ValueIcon size={32} weight="light" className="text-frost/60 mb-8 group-hover:text-frost transition-colors" />
                  <h3 className="font-display font-bold text-2xl text-frost group-hover:text-frost mb-5 transition-colors">{title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <OurTeam />

      {/* Timeline */}
      <section className="bg-void py-24 lg:py-36">

        <Timeline data={data} />
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

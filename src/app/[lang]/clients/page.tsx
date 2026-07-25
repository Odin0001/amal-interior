import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { translations, hasLocale, type Locale } from '@/lib/translations'
import { parseStatValue } from '@/lib/utils'
import { PROJECT_CATEGORIES } from '@/lib/constants'
import { listClients } from '@/lib/db/queries'
import type { Client } from '@/lib/db/types'
import PageHero from '@/components/PageHero'
import CountUp from '@/components/blocks/CountUp'
import SpotlightCard from '@/components/blocks/SpotlightCard'
import LogoLoop, { type LogoLoopItem } from '@/components/blocks/LogoLoop'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Clients — AMAL Interior Design Studio',
}

const testimonials = [
  {
    quote: "Amal didn't just design our home — they understood it. Every room feels like us, only better than we could have imagined.",
    quoteAr: 'لم يصمّم فورما منزلنا فحسب — بل فهمه. كل غرفة تعكس شخصيتنا بصورة أجمل مما تخيّلنا.',
    author: 'Catherine Alcott',
    role: 'Private Residence, New York',
    roleAr: 'إقامة خاصة، نيويورك',
  },
  {
    quote: "The lobby they created for us has become one of the most talked-about spaces in Chicago. Guests photograph it constantly.",
    quoteAr: 'أصبح البهو الذي أنشأوه لنا واحداً من أكثر المساحات إثارة للحديث في شيكاغو. يلتقط الضيوف له صوراً باستمرار.',
    author: 'James Whitfield',
    role: 'General Manager, Meridian Hotel',
    roleAr: 'مدير عام، فندق ميريديان',
  },
  {
    quote: "Working with Elena and her team was the most enjoyable creative process I've experienced in 20 years of building businesses.",
    quoteAr: 'كان العمل مع إيلينا وفريقها أكثر تجربة إبداعية استمتعت بها خلال 20 عاماً من بناء الأعمال.',
    author: 'Sarah Kim',
    role: 'Founder, Grove Creative',
    roleAr: 'مؤسسة، Grove Creative',
  },
]

export default async function ClientsPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const t = translations[lang as Locale]
  const c = t.clients
  const isAr = lang === 'ar'
  const dir = isAr ? 'rtl' : 'ltr'

  const heroTitle = [c.heroTitle, c.heroTitleAccent, c.heroTitleEnd].filter(Boolean).join(' ')

  const allClients = await listClients()
  const clientsByCategory = PROJECT_CATEGORIES.map((category, i) => ({
    category,
    label: c.clientGroups[i]?.category ?? category,
    clients: allClients.filter((client) => client.category === category),
  })).filter((group) => group.clients.length > 0)

  const clientItem = (client: Client): LogoLoopItem => ({
    node: client.logo_url ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={client.logo_url}
        alt={client.name}
        className="h-10 w-auto max-w-[160px] object-contain opacity-70 hover:opacity-100 transition-opacity"
      />
    ) : (
      <span className="whitespace-nowrap border border-border px-5 py-2.5 text-sm text-frost/70 hover:text-frost hover:border-frost/30 transition-colors">
        {client.name}
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
            {c.stats.map(({ value, label }) => {
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

      {/* Client Roster */}
      <section className="bg-void py-24 lg:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="mb-14">
            <p className="text-frost text-[11px] tracking-[0.35em] uppercase mb-4">
              {c.rosterLabel}
            </p>
            <h2 className="font-display font-bold text-frost text-3xl lg:text-5xl">{c.rosterTitle}</h2>
          </div>

          <div className="flex flex-col gap-10">
            {clientsByCategory.map(({ category, label, clients }, i) => (
              <div key={category}>
                <p className="text-[10px] tracking-[0.3em] uppercase text-frost/60 mb-5">
                  {label}
                </p>
                <LogoLoop
                  logos={clients.map(clientItem)}
                  direction={i % 2 === 0 ? 'left' : 'right'}
                  speed={32}
                  gap={20}
                  fadeOut
                  ariaLabel={label}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-glass py-24 lg:py-36 border-t border-b border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="mb-14">
            <p className="text-frost text-[11px] tracking-[0.35em] uppercase mb-4">
              {c.testimonialsLabel}
            </p>
            <h2 className="font-display font-bold text-frost text-3xl lg:text-5xl">{c.testimonialsTitle}</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {testimonials.map(({ quote, quoteAr, author, role, roleAr }) => (
              <SpotlightCard
                key={author}
                className="flex flex-col bg-void border border-border p-8 group"
              >
                <p className="font-display font-black text-[5rem] leading-none text-frost/[0.06] mb-2">&quot;</p>
                <blockquote className="font-display text-frost/85 text-lg font-medium leading-relaxed mb-8 flex-1">
                  &quot;{isAr ? quoteAr : quote}&quot;
                </blockquote>
                <div>
                  <p className="text-frost font-semibold text-sm">{author}</p>
                  <p className="text-frost/50 text-[10px] tracking-widest uppercase mt-1">{isAr ? roleAr : role}</p>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-glass py-24 lg:py-32 text-center border-t border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <p className="text-frost text-[11px] tracking-[0.35em] uppercase mb-6">
            {c.ctaLabel}
          </p>
          <h2 className="font-display font-bold text-frost text-3xl lg:text-5xl mb-6">
            {c.ctaTitle}
          </h2>
          <p className="text-muted text-lg max-w-lg mx-auto mb-10">
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

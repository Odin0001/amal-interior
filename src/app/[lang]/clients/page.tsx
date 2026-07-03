import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { translations, hasLocale, type Locale } from '@/lib/translations'

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
    gradient: 'from-stone-950 via-neutral-900 to-stone-950',
  },
  {
    quote: "The lobby they created for us has become one of the most talked-about spaces in Chicago. Guests photograph it constantly.",
    quoteAr: 'أصبح البهو الذي أنشأوه لنا واحداً من أكثر المساحات إثارة للحديث في شيكاغو. يلتقط الضيوف له صوراً باستمرار.',
    author: 'James Whitfield',
    role: 'General Manager, Meridian Hotel',
    roleAr: 'مدير عام، فندق ميريديان',
    gradient: 'from-neutral-950 via-zinc-900 to-neutral-950',
  },
  {
    quote: "Working with Elena and her team was the most enjoyable creative process I've experienced in 20 years of building businesses.",
    quoteAr: 'كان العمل مع إيلينا وفريقها أكثر تجربة إبداعية استمتعت بها خلال 20 عاماً من بناء الأعمال.',
    author: 'Sarah Kim',
    role: 'Founder, Grove Creative',
    roleAr: 'مؤسسة، Grove Creative',
    gradient: 'from-zinc-950 via-stone-900 to-zinc-950',
  },
]

const recognitions = [
  { body: 'Architectural Digest', honour: 'AD100 List', year: '2018 – 2024' },
  { body: 'NYCxDesign', honour: 'Studio of the Year', year: '2024' },
  { body: 'Interior Design Magazine', honour: 'Best of Year Award', year: '2022' },
  { body: 'ELLE Decor', honour: 'A-List Interior Designer', year: '2020 – 2023' },
  { body: 'Dezeen Awards', honour: 'Residential Interior of the Year', year: '2021' },
  { body: 'Fast Company', honour: 'Innovation by Design', year: '2019' },
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

  return (
    <>
      {/* Hero */}
      <section className="relative bg-void min-h-[60vh] flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tl from-stone-950/30 to-void pointer-events-none" />
        <span
          aria-hidden
          className="absolute -left-4 bottom-0 font-display font-black text-[14vw] text-frost/[0.025] leading-none select-none pointer-events-none"
        >
          {isAr ? 'عملاء' : 'Clients'}
        </span>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-12 w-full pb-20 pt-40">
          <p className="text-frost text-[11px] tracking-[0.45em] uppercase mb-8">
            {c.heroLabel}
          </p>
          <h1 className="font-display font-bold text-frost text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.92] max-w-3xl">
            {c.heroTitle}{' '}
            <span className="text-frost">{c.heroTitleAccent}</span>{' '}
            {c.heroTitleEnd}
          </h1>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-glass border-b border-border py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {c.stats.map(({ value, label }) => (
              <div key={label} className="bg-glass p-8 lg:p-10 text-center group hover:bg-surface transition-colors duration-300">
                <p className="font-display font-bold text-4xl lg:text-5xl text-frost mb-2">{value}</p>
                <p className="text-[11px] tracking-[0.2em] uppercase text-muted group-hover:text-frost/60 transition-colors">{label}</p>
              </div>
            ))}
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {c.clientGroups.map(({ category, clients }) => (
              <div key={category}>
                <p className="text-[10px] tracking-[0.3em] uppercase text-frost/60 border-b border-border pb-4 mb-6">
                  {category}
                </p>
                <ul className="flex flex-col gap-3">
                  {clients.map((client) => (
                    <li key={client} className="text-muted text-sm hover:text-frost transition-colors">
                      {client}
                    </li>
                  ))}
                </ul>
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
            {testimonials.map(({ quote, quoteAr, author, role, roleAr, gradient }) => (
              <div key={author} className="flex flex-col group">
                <div className={`aspect-[4/3] bg-gradient-to-br ${gradient} mb-6 relative overflow-hidden border border-border group-hover:border-frost/20 transition-colors duration-500`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="font-display font-black text-[6rem] text-frost/[0.04]">&quot;</p>
                  </div>
                </div>
                <blockquote className="font-display text-frost/85 text-lg font-medium leading-relaxed mb-6 flex-1">
                  &quot;{isAr ? quoteAr : quote}&quot;
                </blockquote>
                <div>
                  <p className="text-frost font-semibold text-sm">{author}</p>
                  <p className="text-frost/50 text-[10px] tracking-widest uppercase mt-1">{isAr ? roleAr : role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recognition */}
      <section className="bg-void py-24 lg:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="mb-14">
            <p className="text-frost text-[11px] tracking-[0.35em] uppercase mb-4">
              {c.recognitionLabel}
            </p>
            <h2 className="font-display font-bold text-frost text-3xl lg:text-5xl">{c.recognitionTitle}</h2>
          </div>

          <div className="flex flex-col divide-y divide-border">
            {recognitions.map(({ body, honour, year }) => (
              <div key={`${body}-${year}`} className="grid grid-cols-12 gap-4 py-6 group hover:bg-glass/50 transition-colors px-4 -mx-4">
                <div className="col-span-5 sm:col-span-4">
                  <p className="text-muted text-sm group-hover:text-frost/60 transition-colors">{body}</p>
                </div>
                <div className="col-span-5 sm:col-span-6">
                  <p className="text-frost font-medium text-sm group-hover:text-frost transition-colors">{honour}</p>
                </div>
                <div className="col-span-2 text-right">
                  <p className="text-muted text-xs">{year}</p>
                </div>
              </div>
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

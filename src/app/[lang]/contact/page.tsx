import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'
import { notFound } from 'next/navigation'
import { translations, hasLocale, type Locale } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Contact — AMAL Interior Design Studio',
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const t = translations[lang as Locale]
  const ct = t.contact

  return (
    <>
      {/* Hero */}
      <section className="relative bg-void min-h-[55vh] flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-void via-void/90 to-stone-950/20 pointer-events-none" />
        <span
          aria-hidden
          className="absolute right-0 bottom-0 font-display font-black text-[16vw] text-frost/[0.025] leading-none select-none pointer-events-none"
        >
          {lang === 'ar' ? 'تواصل' : 'Contact'}
        </span>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-12 w-full pb-20 pt-40">
          <p className="text-frost text-[11px] tracking-[0.45em] uppercase mb-8">
            {ct.heroLabel}
          </p>
          <h1 className="font-display font-bold text-frost text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.92] max-w-2xl">
            {ct.heroTitle}{' '}
            <span className="text-frost">{ct.heroTitleAccent}</span>
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-glass py-20 lg:py-32 border-t border-b border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">

            {/* Form Column */}
            <div className="lg:col-span-7">
              <div className="mb-10">
                <p className="text-frost text-[11px] tracking-[0.35em] uppercase mb-3">
                  {ct.enquiryLabel}
                </p>
                <h2 className="font-display font-bold text-frost text-3xl lg:text-4xl leading-[1.05]">
                  {ct.enquiryTitle}
                </h2>
                <p className="text-muted text-base mt-4 leading-relaxed">
                  {ct.enquiryBody}
                </p>
              </div>
              <ContactForm />
            </div>

            {/* Info Column */}
            <div className="lg:col-span-4 lg:col-start-9">
              <div className="lg:sticky lg:top-28 flex flex-col gap-9">

                {ct.studioInfo.map(({ label, lines }) => (
                  <div key={label}>
                    <p className="text-[10px] tracking-[0.3em] uppercase text-frost/60 mb-3">{label}</p>
                    {lines.map((line) => (
                      <p key={line} className="text-muted text-sm leading-relaxed">{line}</p>
                    ))}
                  </div>
                ))}

                <div className="h-px bg-border" />

                {/* Socials */}
                <div>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-frost/60 mb-4">
                    {ct.followLabel}
                  </p>
                  <div className="flex flex-col gap-2">
                    {[
                      { name: 'Instagram', handle: '@amal.studio' },
                      { name: 'Pinterest', handle: 'Amal Studio' },
                      { name: 'LinkedIn',  handle: 'Amal Studio' },
                    ].map(({ name, handle }) => (
                      <div key={name} className="flex items-center justify-between group cursor-pointer">
                        <span className="text-xs text-muted/50 group-hover:text-muted transition-colors">{name}</span>
                        <span className="text-sm text-muted group-hover:text-frost transition-colors">{handle}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <div className="mx-auto max-w-7xl px-6 lg:px-12 py-12 lg:py-20">
        <div className="aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] bg-glass relative overflow-hidden border border-border">
          <div className="absolute inset-0 bg-gradient-to-br from-void/50 via-transparent to-stone-950/20" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="w-2 h-2 bg-frost rounded-full mb-1" />
              <div className="w-px h-8 bg-gradient-to-b from-frost/60 to-transparent" />
            </div>
          </div>

          <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center gap-1">
            <p className="font-display font-bold text-frost text-sm">142 Mercer Street</p>
            <p className="text-frost/50 text-[10px] tracking-widest uppercase">SoHo, New York — NY 10012</p>
          </div>
        </div>
      </div>
    </>
  )
}

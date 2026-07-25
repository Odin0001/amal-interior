import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { hasLocale, type Locale } from '@/lib/translations'
import { getProjectBySlug } from '@/lib/db/queries'
import PageHero from '@/components/PageHero'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; category: string; slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  return {
    title: project ? `${project.title_en} — AMAL Interior Design Studio` : 'Project — AMAL Interior Design Studio',
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ lang: string; category: string; slug: string }>
}) {
  const { lang, category, slug } = await params
  if (!hasLocale(lang)) notFound()

  const project = await getProjectBySlug(slug)
  if (!project || project.category !== category) notFound()

  const isAr = lang === 'ar'
  const dir = isAr ? 'rtl' : 'ltr'
  const title = isAr ? project.title_ar : project.title_en
  const location = isAr ? project.location_ar : project.location_en
  const description = isAr ? project.description_ar : project.description_en

  return (
    <>
      <PageHero title={title} dir={dir} />

      <section className="bg-void py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-6 lg:px-12">
          <div className={`flex flex-wrap items-baseline gap-x-6 gap-y-2 mb-10 ${isAr ? 'flex-row-reverse text-right' : ''}`}>
            <p className="text-frost text-sm tracking-[0.15em] uppercase">{location}</p>
            <p className="text-muted text-sm">{project.year}</p>
            <p className="text-muted text-sm tracking-[0.15em] uppercase">
              {project.category}
            </p>
          </div>

          {description && (
            <p className={`text-frost/80 text-lg leading-relaxed max-w-3xl mb-16 ${isAr ? 'text-right' : ''}`} dir={dir}>
              {description}
            </p>
          )}

          {project.images.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.images.map((img) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={img.id}
                  src={img.image_url}
                  alt=""
                  className="w-full aspect-[4/3] object-cover border border-border"
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-glass py-16 lg:py-24 border-t border-border text-center">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <Link
            href={`/${lang}/projects/${category}`}
            className="inline-block border border-border text-frost/70 text-xs tracking-[0.25em] uppercase px-8 py-4 hover:border-frost/40 hover:text-frost transition-colors"
          >
            {isAr ? 'العودة إلى المشاريع' : 'Back to Projects'}
          </Link>
        </div>
      </section>
    </>
  )
}

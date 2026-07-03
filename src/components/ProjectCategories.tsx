'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { useLocale } from '@/lib/use-locale'

const CATEGORIES = [
  { slug: 'residential', num: '01', image: '/hero.jpg',     count: 9 },
  { slug: 'commercial',  num: '02', image: '/project1.jpg', count: 4 },
  { slug: 'hospitality', num: '03', image: '/project4.jpg', count: 6 },
  { slug: 'cultural',    num: '04', image: '/project3.jpg', count: 1 },
] as const

type CategorySlug = (typeof CATEGORIES)[number]['slug']

export default function ProjectCategories() {
  const { locale, t, isRTL } = useLocale()
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[]
    gsap.fromTo(
      cards,
      { opacity: 0, y: 48 },
      { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', stagger: 0.13, delay: 0.05 }
    )
  }, [])

  return (
    <div className="min-h-screen bg-void pt-[72px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-2 sm:h-[calc(100vh-72px)] gap-px bg-frost/20">
        {CATEGORIES.map((cat, i) => {
          const label = t.projects.categories[cat.slug as CategorySlug]
          return (
            <div
              key={cat.slug}
              ref={el => { cardsRef.current[i] = el }}
              className="group relative overflow-hidden h-[55vh] sm:h-auto cursor-pointer bg-void"
            >
              {/* Transparent link overlay — captures clicks across the full card */}
              <Link
                href={`/${locale}/projects/${cat.slug}`}
                className="absolute inset-0 z-20"
                aria-label={label}
              />

              {/* Background image — zooms on hover */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.07] will-change-transform"
                style={{ backgroundImage: `url(${cat.image})` }}
              />

              {/* Vignette overlays */}
              <div className="absolute inset-0 bg-black/30 transition-opacity duration-500 group-hover:opacity-[0.15]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

              {/* Card content */}
              <div
                className={`absolute inset-0 z-10 flex flex-col justify-end p-8 lg:p-12 ${
                  isRTL ? 'items-end text-right' : ''
                }`}
              >
                {/* Category number */}
                <p className="text-white/35 text-[11px] tracking-[0.38em] uppercase font-mono mb-3">
                  {cat.num}
                </p>

                {/* Category name — lifts on hover */}
                <h2 className="text-white text-4xl lg:text-5xl xl:text-[3.5rem] font-bold tracking-tight leading-none mb-5 translate-y-0 transition-transform duration-500 ease-out group-hover:-translate-y-3">
                  {label}
                </h2>

                {/* Explore row — fades + slides up on hover */}
                <div
                  className={`flex items-center gap-3 opacity-0 translate-y-3 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0 ${
                    isRTL ? 'flex-row-reverse' : ''
                  }`}
                >
                  <span className="text-white/60 text-[11px] tracking-[0.32em] uppercase">
                    {isRTL ? 'استكشف' : 'Explore'}
                  </span>
                  <svg
                    width="18"
                    height="9"
                    viewBox="0 0 18 9"
                    fill="none"
                    className={`text-white/60 ${isRTL ? 'rotate-180' : ''}`}
                  >
                    <path
                      d="M0 4.5H16M12.5 1L16 4.5L12.5 8"
                      stroke="currentColor"
                      strokeWidth="1.1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Project count — top corner */}
              <div
                className={`absolute top-5 z-10 text-white/25 text-[11px] tracking-[0.22em] uppercase font-mono ${
                  isRTL ? 'left-5' : 'right-5'
                }`}
              >
                {cat.count} {t.projects.projectsCount}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

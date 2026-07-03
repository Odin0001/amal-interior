'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLocale } from '@/lib/use-locale'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { locale, t } = useLocale()

  // Compute alternate locale URL: swap /en/ ↔ /ar/
  const altLocale = locale === 'en' ? 'ar' : 'en'
  const altPath = pathname.replace(/^\/(en|ar)(\/|$)/, `/${altLocale}$2`) || `/${altLocale}`

  const navLinks = [
    { href: `/${locale}/about`,    label: t.nav.about    },
    { href: `/${locale}/services`, label: t.nav.services },
    { href: `/${locale}/projects`, label: t.nav.projects },
    { href: `/${locale}/clients`,  label: t.nav.clients  },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[9999] transition-all duration-500 ${
        scrolled
          ? 'bg-void/60 backdrop-blur-sm shadow shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12 flex items-center justify-between h-18">
        {/* Logo */}
        <Link
          href={`/${locale}`}
          className="font-display font-bold text-lg tracking-[0.35em] uppercase text-frost"
        >
          {t.common.logoText}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`relative text-sm font-bold tracking-[0.22em] uppercase transition-colors duration-300 group ${
                pathname === href ? 'text-frost' : 'text-frost/80 hover:text-frost'
              }`}
            >
              {label}
              <span
                className={`absolute -bottom-1 left-0 h-px bg-frost transition-all duration-300 ${
                  pathname === href ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </Link>
          ))}
        </nav>

        {/* Desktop right side: lang switcher + CTA */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language switcher */}
          <Link
            href={altPath}
            className="text-sm tracking-[0.25em] uppercase text-frost bg-white border border-frost hover:border-frost/50 px-3 py-1.5 transition-all duration-300 font-semibold"
            aria-label={`Switch to ${altLocale === 'ar' ? 'Arabic' : 'English'}`}
          >
            {altLocale === 'ar' ? 'AR' : 'EN'}
          </Link>

          {/* CTA */}
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center text-sm tracking-[0.2em] uppercase border border-white text-white font-bold px-5 py-2 bg-frost hover:bg-white hover:text-frost transition-all duration-300"
          >
            {t.nav.startProject}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen((o) => !o)}
          className="md:hidden flex flex-col justify-center gap-[5px] p-2 -mr-2"
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`block h-px w-6 bg-frost transition-all duration-300 ${
                open && i === 0 ? 'rotate-45 translate-y-[7px]' :
                open && i === 1 ? 'opacity-0' :
                open && i === 2 ? '-rotate-45 -translate-y-[7px]' : ''
              }`}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 bg-glass border-b border-border ${
          open ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        <nav className="flex flex-col px-8 py-10 gap-7">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`font-display text-3xl font-semibold transition-colors ${
                pathname === href ? 'text-frost' : 'text-frost/70 hover:text-frost'
              }`}
            >
              {label}
            </Link>
          ))}
          <div className="flex items-center gap-5 mt-2">
            <Link
              href={`/${locale}/contact`}
              className="self-start border border-frost/40 text-frost text-[10px] tracking-[0.25em] uppercase px-6 py-3 hover:bg-frost hover:text-void transition-all"
            >
              {t.nav.startAProject}
            </Link>
            <Link
              href={altPath}
              className="text-xs tracking-[0.2em] uppercase text-frost/50 hover:text-frost transition-colors font-semibold"
            >
              {altLocale === 'ar' ? 'عربي' : 'English'}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}

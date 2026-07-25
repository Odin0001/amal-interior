"use client";
import Link from "next/link";
import { useLocale } from "@/lib/use-locale";

export default function Footer() {
  const { locale, t } = useLocale();

  const navLinks = [
    { href: `/${locale}/about`,          label: t.nav.about          },
    { href: `/${locale}/services`,       label: t.nav.services       },
    { href: `/${locale}/projects`,       label: t.nav.projects       },
    { href: `/${locale}/clients`,        label: t.nav.clients        },
    { href: `/${locale}/collaboration`,  label: t.nav.collaboration  },
    { href: `/${locale}/awards`,         label: t.nav.awards         },
    { href: `/${locale}/contact`,        label: t.nav.contact        },
  ];

  return (
    <footer className="bg-frost text-void">
      <div id="footer-container">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-10">

          {/* Logo */}
          <div className="mb-16">
            <Link
              href={`/${locale}`}
              className="font-display font-bold text-2xl tracking-[0.35em] uppercase text-frost"
            >
              {t.common.logoText}
            </Link>
          </div>

          {/* 3-column group */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20 pb-16 border-b border-void/10">

            {/* Left — address + map */}
            <div className="flex flex-col gap-8">
              <p className="text-void/60 text-sm leading-[1.9]">
                Riyadh, Saudi Arabia<br />
                hello@amal-studio.com<br />
                TEL. +966 11 000 0000
              </p>
              <Link
                href="https://maps.app.goo.gl/vWZMinYyYpDGY7Aq9"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 text-xs tracking-[0.3em] uppercase text-void/50 hover:text-void transition-colors duration-300 w-fit"
              >
                <span>Map</span>
                <span
                  className="relative inline-block w-8 h-px bg-void/30 overflow-hidden
                    after:content-[''] after:absolute after:inset-0 after:bg-void
                    after:translate-x-[-100%] group-hover:after:translate-x-0 after:transition-transform after:duration-300"
                />
                <span className="translate-x-0 group-hover:translate-x-1 transition-transform duration-300">→</span>
              </Link>
            </div>

            {/* Center — nav */}
            <nav>
              <ul className="flex flex-col gap-4">
                {navLinks.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm tracking-[0.15em] uppercase text-void/50 hover:text-void transition-colors duration-300"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Right — CTA */}
            <div className="flex flex-col gap-8">
              <p className="text-void/60 text-sm leading-[1.9]">
                For consultations and quotations,<br />
                please don't hesitate to contact us.
              </p>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center self-start
                  text-xs tracking-[0.3em] uppercase font-semibold
                  bg-void text-frost px-8 py-4
                  hover:bg-frost hover:text-void transition-colors duration-300"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 flex items-center justify-end">
            <p className="text-void/30 text-xs tracking-widest">
              &copy; {new Date().getFullYear()} AMAL. All rights reserved.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}

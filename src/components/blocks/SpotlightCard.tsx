'use client'

/**
 * Ported from reactbits.dev (src/content/Components/SpotlightCard) — MIT licensed.
 * https://reactbits.dev/components/spotlight-card
 * Colors/shape re-themed to match this site's palette; interaction logic unchanged.
 */

import { useRef, type ReactNode, type MouseEvent } from 'react'
import './SpotlightCard.css'

interface SpotlightCardProps {
  children: ReactNode
  className?: string
  spotlightColor?: string
}

export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(28, 26, 22, 0.07)',
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = divRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
    el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
    el.style.setProperty('--spotlight-color', spotlightColor)
  }

  return (
    <div ref={divRef} onMouseMove={handleMouseMove} className={`card-spotlight ${className}`}>
      {children}
    </div>
  )
}

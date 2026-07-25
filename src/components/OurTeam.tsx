'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const teamMembers = [
  { name: 'Emily Kim', role: 'Founder', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&fit=crop', alt: 'Emily Kim' },
  { name: 'Michael Steward', role: 'Creative Director', image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=800&fit=crop', alt: 'Michael Steward' },
  { name: 'Emma Rodriguez', role: 'Lead Developer', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&fit=crop', alt: 'Emma Rodriguez' },
  { name: 'Julia Gimmel', role: 'UX Designer', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&fit=crop', alt: 'Julia Gimmel' },
  { name: 'Lisa Anderson', role: 'Marketing Manager', image: 'https://images.unsplash.com/photo-1655249481446-25d575f1c054?w=800&fit=crop', alt: 'Lisa Anderson' },
  { name: 'James Wilson', role: 'Product Manager', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&fit=crop', alt: 'James Wilson' },
]

export default function OurTeam() {
  const [activeIndex, setActiveIndex] = useState(0)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const memberInfoRef = useRef<HTMLDivElement>(null)
  const memberNameRef = useRef<HTMLHeadingElement>(null)
  const memberRoleRef = useRef<HTMLParagraphElement>(null)
  const isAnimatingRef = useRef(false)
  const currentIndexRef = useRef(0)

  const updateCarousel = useCallback((newIndex: number) => {
    if (isAnimatingRef.current) return
    isAnimatingRef.current = true

    const total = teamMembers.length
    const idx = ((newIndex % total) + total) % total
    currentIndexRef.current = idx
    setActiveIndex(idx)

    const isMobile = window.innerWidth <= 768
    const xGap1 = isMobile ? 140 : 220
    const xGap2 = isMobile ? 240 : 400

    cardsRef.current.forEach((card, i) => {
      if (!card) return
      let offset = i - idx
      if (offset > Math.floor(total / 2)) offset -= total
      if (offset < -Math.floor(total / 2)) offset += total

      let x = 0, z = 0, scale = 1, opacity = 1, grayscale = 100
      const zIndex = 10 - Math.abs(offset)

      if (offset === 0) {
        scale = 1.1; grayscale = 0
      } else if (offset === 1) {
        x = xGap1; z = -100; scale = 0.9; opacity = 0.9
      } else if (offset === -1) {
        x = -xGap1; z = -100; scale = 0.9; opacity = 0.9
      } else if (offset === 2) {
        x = xGap2; z = -300; scale = 0.8; opacity = 0.7
      } else if (offset === -2) {
        x = -xGap2; z = -300; scale = 0.8; opacity = 0.7
      } else {
        x = offset > 0 ? 500 : -500; z = -400; scale = 0.5; opacity = 0
      }

      gsap.set(card, { zIndex })
      gsap.to(card, {
        x, z, scale, opacity,
        filter: `grayscale(${grayscale}%)`,
        duration: 0.8,
        ease: 'power3.out',
      })
    })

    gsap.to(memberInfoRef.current, {
      opacity: 0,
      y: 10,
      duration: 0.3,
      onComplete: () => {
        if (memberNameRef.current) memberNameRef.current.textContent = teamMembers[idx].name
        if (memberRoleRef.current) memberRoleRef.current.textContent = teamMembers[idx].role
        gsap.to(memberInfoRef.current, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' })
      },
    })

    setTimeout(() => { isAnimatingRef.current = false }, 800)
  }, [])

  useEffect(() => {
    updateCarousel(0)

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') updateCarousel(currentIndexRef.current - 1)
      if (e.key === 'ArrowRight') updateCarousel(currentIndexRef.current + 1)
    }

    let touchStartX = 0
    const handleTouchStart = (e: TouchEvent) => { touchStartX = e.changedTouches[0].screenX }
    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndX = e.changedTouches[0].screenX
      if (touchStartX - touchEndX > 50) updateCarousel(currentIndexRef.current + 1)
      if (touchEndX - touchStartX > 50) updateCarousel(currentIndexRef.current - 1)
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('touchstart', handleTouchStart)
    document.addEventListener('touchend', handleTouchEnd)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [updateCarousel])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-[#070707] overflow-hidden text-white">

      <h1
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] pointer-events-none whitespace-nowrap text-transparent z-0 text-[clamp(8rem,20vw,18rem)] [font-family:var(--font-bebas-neue)]"
        style={{ WebkitTextStroke: '2px rgba(255,255,255,0.05)' }}
      >
        OUR TEAM
      </h1>

      <div className="relative w-full max-w-[1200px] h-[450px] z-[2] [perspective:1200px]">
        <button
          className="absolute top-1/2 -translate-y-1/2 left-[5%] bg-transparent text-white/50 text-[3rem] border-none cursor-pointer z-20 transition duration-300 leading-none p-0 hover:text-white"
          onClick={() => updateCarousel(currentIndexRef.current - 1)}
          aria-label="Previous member"
        >
          ‹
        </button>

        <div className="relative w-full h-full flex justify-center items-center [transform-style:preserve-3d]">
          {teamMembers.map((member, i) => (
            <div
              key={i}
              className="absolute w-[280px] h-[380px] max-md:w-[220px] max-md:h-[300px] bg-[#111] overflow-hidden cursor-pointer shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
              ref={el => { cardsRef.current[i] = el }}
              onClick={() => updateCarousel(i)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={member.image} draggable={false} alt={member.alt} className="w-full h-full object-cover block select-none" />
            </div>
          ))}
        </div>

        <button
          className="absolute top-1/2 -translate-y-1/2 right-[5%] bg-transparent text-white/50 text-[3rem] border-none cursor-pointer z-20 transition duration-300 leading-none p-0 hover:text-white"
          onClick={() => updateCarousel(currentIndexRef.current + 1)}
          aria-label="Next member"
        >
          ›
        </button>
      </div>

      <div ref={memberInfoRef} className="text-center mt-10 z-[2]">
        <h2
          ref={memberNameRef}
          className="text-white text-[2rem] sm:text-[3.5rem] tracking-[0.05em] mb-[5px] [font-family:var(--font-bebas-neue)]"
        >
          {teamMembers[0].name}
        </h2>
        <p ref={memberRoleRef} className="text-[#888] text-base font-medium uppercase tracking-[0.2em]">
          {teamMembers[0].role}
        </p>
      </div>

      <div className="flex gap-3 mt-10 z-[2]">
        {teamMembers.map((_, i) => (
          <div
            key={i}
            onClick={() => updateCarousel(i)}
            className={`w-2 h-2 rounded-full cursor-pointer transition duration-300 ${
              i === activeIndex ? 'bg-white scale-150' : 'bg-white/20'
            }`}
          />
        ))}
      </div>
    </section>
  )
}

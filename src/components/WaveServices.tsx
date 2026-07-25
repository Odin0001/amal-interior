'use client'

import { useCallback, useEffect, useRef } from 'react'
import gsap from 'gsap'

const BG_PARTS = 24
const TEXT_H = 64
const CHANGE_AT = 0.5
const WAVE_START_DELAY = 0.2
const WAVE_STAGGER = 0.013
const STAGGER_VAL = 65
const STAGGER_STEP = 4
const PART_W = 100 / BG_PARTS

export interface ServiceSlide {
  num: string
  title: string
  subtitle: string
  image: string
}

export default function WaveServices({ services }: { services: ServiceSlide[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const headingRefs = useRef<(HTMLDivElement | null)[]>([])

  // partsByCol[col][page] — populated by JSX ref callbacks, guaranteed set before useEffect
  const partsByCol = useRef<(HTMLDivElement | null)[][]>(
    Array.from({ length: BG_PARTS }, () => [])
  )

  const curPageRef = useRef(1)
  const colIdxRef = useRef(1)
  const waveBusyRef = useRef(false)
  const deltaYRef = useRef(0)
  const headingsYRef = useRef(0)
  const winWRef = useRef(0)
  const winHRef = useRef(0)

  const numOfPages = services.length

  // Helpers — access refs directly so stale closures are never an issue
  const validHeadings = () =>
    headingRefs.current.filter((h): h is HTMLDivElement => h !== null)

  const col = (i: number): HTMLDivElement[] =>
    (partsByCol.current[i] ?? []).filter((el): el is HTMLDivElement => el !== null)

  const targetY = () => (curPageRef.current - 1) * winHRef.current * -1
  const targetTY = () => TEXT_H * (curPageRef.current - 1) * -1

  const changePages = useCallback(() => {
    const y = targetY()
    const ty = targetTY()
    const idx = colIdxRef.current

    const c0 = col(idx - 1)
    if (c0.length) gsap.to(c0, { y, duration: CHANGE_AT })

    for (let i = idx - 2; i >= 0; i--) {
      const d = (idx - 1 - i) * WAVE_STAGGER
      const parts = col(i)
      if (parts.length) gsap.to(parts, { y, duration: Math.max(0.05, CHANGE_AT - d), delay: d })
    }

    for (let j = idx; j < BG_PARTS; j++) {
      const d = (j - idx + 1) * WAVE_STAGGER
      const parts = col(j)
      if (parts.length) gsap.to(parts, { y, duration: Math.max(0.05, CHANGE_AT - d), delay: d })
    }

    gsap.to(validHeadings(), { y: ty, duration: CHANGE_AT })
  }, [])

  const waveChange = useCallback(() => {
    waveBusyRef.current = true
    const y = targetY()
    const ty = targetTY()
    let lastD = 0

    for (let i = 0; i < BG_PARTS; i++) {
      const d = i * WAVE_STAGGER + WAVE_START_DELAY
      lastD = d
      const parts = col(i)
      if (parts.length) gsap.to(parts, { y, duration: CHANGE_AT, delay: d })
    }
    gsap.to(validHeadings(), { y: ty, duration: CHANGE_AT, delay: lastD })

    const ms = (CHANGE_AT + WAVE_STAGGER * (BG_PARTS - 1) + WAVE_START_DELAY) * 1000
    setTimeout(() => { waveBusyRef.current = false }, ms)
  }, [])

  const moveSingleCol = useCallback((parts: HTMLDivElement[], rawY: number) => {
    const adjustedY = rawY - (curPageRef.current - 1) * winHRef.current
    const headY = headingsYRef.current - (curPageRef.current - 1) * TEXT_H
    gsap.to(parts, { y: adjustedY, duration: CHANGE_AT, ease: 'power3.out' })
    gsap.to(validHeadings(), { y: headY, duration: CHANGE_AT })
  }, [])

  const moveParts = useCallback((rawY: number, idx: number) => {
    let stagLeft = 0, stagRight = 0, stagStepL = 0, stagStepR = 0
    const sign = rawY > 0 ? -1 : 1

    const center = col(idx - 1)
    if (center.length) moveSingleCol(center, rawY)

    for (let i = idx - 2; i >= 0; i--) {
      const step = idx - 1 - i
      const sVal = Math.max(0, STAGGER_VAL - stagStepL)
      stagStepL += step <= 15 ? STAGGER_STEP : 1
      stagLeft += sVal
      let nextY = rawY + stagLeft * sign
      if (Math.abs(rawY) < Math.abs(stagLeft)) nextY = 0
      const parts = col(i)
      if (parts.length) moveSingleCol(parts, nextY)
    }

    for (let j = idx; j < BG_PARTS; j++) {
      const step = j - idx + 1
      const sVal = Math.max(0, STAGGER_VAL - stagStepR)
      stagStepR += step <= 15 ? STAGGER_STEP : 1
      stagRight += sVal
      let nextY = rawY + stagRight * sign
      if (Math.abs(rawY) < Math.abs(stagRight)) nextY = 0
      const parts = col(j)
      if (parts.length) moveSingleCol(parts, nextY)
    }
  }, [moveSingleCol])

  useEffect(() => {
    winWRef.current = window.innerWidth
    winHRef.current = window.innerHeight
    curPageRef.current = 1

    // All strips are JSX-rendered — refs are set before this effect runs
    const allStrips = partsByCol.current.flat().filter((el): el is HTMLDivElement => el !== null)
    gsap.set(allStrips, { y: 0 })
    gsap.set(validHeadings(), { y: 0 })

    // --- Drag ---
    const startDrag = (startX: number, startY: number) => {
      colIdxRef.current = Math.min(BG_PARTS, Math.max(1, Math.ceil(startX / winWRef.current * BG_PARTS)))
      let rafBusy = false

      const onMove = (e: Event) => {
        if (rafBusy) return
        rafBusy = true
        const pageY = e instanceof TouchEvent ? e.touches[0].pageY : (e as MouseEvent).pageY
        const pageX = e instanceof TouchEvent ? e.touches[0].pageX : (e as MouseEvent).pageX
        colIdxRef.current = Math.min(BG_PARTS, Math.max(1, Math.ceil(pageX / winWRef.current * BG_PARTS)))
        deltaYRef.current = pageY - startY
        headingsYRef.current = TEXT_H * deltaYRef.current / winHRef.current
        moveParts(deltaYRef.current, colIdxRef.current)
        requestAnimationFrame(() => { rafBusy = false })
      }

      const onEnd = () => {
        document.removeEventListener('mousemove', onMove)
        document.removeEventListener('touchmove', onMove)
        document.removeEventListener('mouseup', onEnd)
        document.removeEventListener('touchend', onEnd)
        if (containerRef.current) containerRef.current.style.cursor = 'grab'

        if (!deltaYRef.current) return
        if (deltaYRef.current / winHRef.current >= 0.5 && curPageRef.current > 1) curPageRef.current--
        if (deltaYRef.current / winHRef.current <= -0.5 && curPageRef.current < numOfPages) curPageRef.current++
        changePages()
      }

      if (containerRef.current) containerRef.current.style.cursor = 'grabbing'
      document.addEventListener('mousemove', onMove)
      document.addEventListener('touchmove', onMove, { passive: false })
      document.addEventListener('mouseup', onEnd)
      document.addEventListener('touchend', onEnd)
    }

    const onMousedown = (e: MouseEvent) => { deltaYRef.current = 0; startDrag(e.pageX, e.pageY) }
    const onTouchstart = (e: TouchEvent) => {
      deltaYRef.current = 0
      startDrag(e.touches[0].pageX, e.touches[0].pageY)
    }

    // --- Wheel ---
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      e.stopPropagation()
      if (waveBusyRef.current) return
      if (e.deltaY < 0 && curPageRef.current > 1) { curPageRef.current--; waveChange() }
      else if (e.deltaY > 0 && curPageRef.current < numOfPages) { curPageRef.current++; waveChange() }
    }

    // --- Keyboard ---
    const onKeydown = (e: KeyboardEvent) => {
      if (waveBusyRef.current) return
      if (e.key === 'ArrowUp' && curPageRef.current > 1) { curPageRef.current--; waveChange() }
      else if (e.key === 'ArrowDown' && curPageRef.current < numOfPages) { curPageRef.current++; waveChange() }
    }

    // --- Resize ---
    const onResize = () => {
      winWRef.current = window.innerWidth
      winHRef.current = window.innerHeight
      changePages()
    }

    const container = containerRef.current
    container?.addEventListener('mousedown', onMousedown as EventListener)
    container?.addEventListener('touchstart', onTouchstart as EventListener, { passive: true })
    container?.addEventListener('wheel', onWheel, { passive: false })
    document.addEventListener('keydown', onKeydown)
    window.addEventListener('resize', onResize)

    return () => {
      container?.removeEventListener('mousedown', onMousedown as EventListener)
      container?.removeEventListener('touchstart', onTouchstart as EventListener)
      container?.removeEventListener('wheel', onWheel)
      document.removeEventListener('keydown', onKeydown)
      window.removeEventListener('resize', onResize)
    }
  }, [services, changePages, waveChange, moveParts, numOfPages])

  return (
    <div
      ref={containerRef}
      data-lenis-prevent
      className="relative h-screen overflow-hidden bg-black select-none cursor-grab"
      tabIndex={0}
      aria-label="Services carousel — scroll or drag to navigate"
    >
      {/* 24 vertical column strips × N pages — rendered in JSX so refs are set before effects */}
      <div className="absolute inset-0">
        {Array.from({ length: BG_PARTS }, (_, colIdx) => (
          <div
            key={colIdx}
            style={{
              position: 'absolute',
              top: 0,
              left: `${colIdx * PART_W}%`,
              width: `calc(${PART_W}% + 1px)`,
              height: '100%',
              overflow: 'hidden',
              transform: 'translateZ(0)', // forces column onto its own GPU layer so overflow:hidden clips composited children correctly
            }}
          >
            {services.map((service, pageIdx) => (
              <div
                key={pageIdx}
                ref={el => { partsByCol.current[colIdx][pageIdx] = el }}
                style={{
                  position: 'absolute',
                  top: `${pageIdx * 100}%`,
                  left: 0,
                  width: '100%',
                  height: '100%',
                }}
              >
                {/* Full-width inner div shifted left so this column shows the correct image slice */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: `${-colIdx * PART_W}vw`,
                    width: '100vw',
                    height: '100%',
                    backgroundColor: '#111',
                    backgroundImage: `url(${service.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                  }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Centered text strip — overflow-hidden reveals one heading at a time */}
      <div
        className="absolute left-[5%] w-[90%] sm:left-[15%] sm:w-[70%] top-1/2 overflow-hidden pointer-events-none"
        style={{ height: TEXT_H, marginTop: -TEXT_H / 2 }}
      >
        {services.map((service, i) => (
          <div
            key={i}
            ref={el => { headingRefs.current[i] = el }}
            className="flex items-center justify-between text-white"
            style={{ height: TEXT_H }}
          >
            <span className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-wider truncate">
              {service.num} — {service.title}
            </span>
            <span className="hidden sm:block text-lg text-white/80 tracking-[0.2em] uppercase shrink-0 ml-4">
              {service.subtitle}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

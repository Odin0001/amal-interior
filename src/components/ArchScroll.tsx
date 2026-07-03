'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLocale } from '@/lib/use-locale'

gsap.registerPlugin(ScrollTrigger)

const ITEMS = [
  {
    en: {
      title: 'Green Cityscape',
      desc: 'Vibrant streets with vertical gardens and solar buildings. This oasis thrives on renewable energy, smart transport, and green spaces for biodiversity.',
      link: 'Learn More',
    },
    ar: {
      title: 'المدينة الخضراء',
      desc: 'شوارع نابضة بالحياة تزينها الحدائق العمودية والمباني الشمسية. تزدهر هذه الواحة بالطاقة المتجددة والنقل الذكي والمساحات الخضراء لدعم التنوع البيولوجي.',
      link: 'اعرف أكثر',
    },
    img: 'https://ik.imagekit.io/kg2nszxjp/GSAP%20pinned%20image%20mask%20reveal%20on%20scroll/cu8978xjlsjjpjk52ta0.webp',
    alt: 'Green Architecture',
  },
  {
    en: {
      title: 'Blue Urban Oasis',
      desc: 'Avenues with azure facades and eco-structures. This hub uses clean energy, smart transit, and parks for urban wildlife.',
      link: 'Learn More',
    },
    ar: {
      title: 'واحة المدينة الزرقاء',
      desc: 'جادات بواجهات زرقاء وهياكل صديقة للبيئة. تعتمد هذه الحضارة على الطاقة النظيفة والمواصلات الذكية والحدائق لدعم الحياة البرية في المدينة.',
      link: 'اعرف أكثر',
    },
    img: 'https://ik.imagekit.io/kg2nszxjp/GSAP%20pinned%20image%20mask%20reveal%20on%20scroll/trh7c8ufv1dqfrofdytd.webp',
    alt: 'Blue Architecture',
  },
  {
    en: {
      title: 'Fluid Architecture',
      desc: 'Desert refuge with fluid architecture and glowing interiors. This sanctuary harnesses solar power, sustainable design, and natural harmony for resilient living.',
      link: 'Learn More',
    },
    ar: {
      title: 'العمارة المتدفقة',
      desc: 'ملجأ صحراوي بعمارة سيّالة ومداخل مضيئة. يعتمد هذا الملاذ على الطاقة الشمسية والتصميم المستدام والانسجام مع الطبيعة من أجل حياة صامدة.',
      link: 'اعرف أكثر',
    },
    img: 'https://ik.imagekit.io/kg2nszxjp/GSAP%20pinned%20image%20mask%20reveal%20on%20scroll/aw6qwur0pggp5r03whjq.webp',
    alt: 'Pink Architecture',
  },
  {
    en: {
      title: 'Martian Arches',
      desc: 'Ethereal structures arc over tranquil waters, bathed in the glow of a setting Martian sun. This desolate beauty showcases the stark, captivating landscape of the red planet.',
      link: 'Learn More',
    },
    ar: {
      title: 'أقواس المريخ',
      desc: 'هياكل أثيرية تنتصب فوق المياه الهادئة في وهج شمس المريخ الغاربة. يكشف هذا الجمال المقفر عن المشهد الصارخ الآسر للكوكب الأحمر.',
      link: 'اعرف أكثر',
    },
    img: 'https://ik.imagekit.io/kg2nszxjp/GSAP%20pinned%20image%20mask%20reveal%20on%20scroll/sqwn8u84zd1besgl0zpd.webp',
    alt: 'Orange Architecture',
  },
]

const BG_COLORS = ['#EDF9FF', '#FFECF2', '#FFE8DB']

export default function ArchScroll() {
  const { t, locale } = useLocale()
  const archRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const infoRefs = useRef<(HTMLDivElement | null)[]>([])
  const wrapperRefs = useRef<(HTMLDivElement | null)[]>([])
  const imgRefs = useRef<(HTMLImageElement | null)[]>([])

  useEffect(() => {
    // First image sits on top; each successive image sits one layer lower
    wrapperRefs.current.forEach((el, i) => {
      if (el) el.style.zIndex = String(ITEMS.length - i)
    })

    // On mobile, interleave text panels and images via CSS order
    const applyOrder = () => {
      const mobile = window.matchMedia('(max-width: 768px)').matches
      infoRefs.current.forEach((el, i) => { if (el) el.style.order = mobile ? String(i * 2) : '' })
      wrapperRefs.current.forEach((el, i) => { if (el) el.style.order = mobile ? String(i * 2 + 1) : '' })
    }
    applyOrder()

    let rto: ReturnType<typeof setTimeout>
    const onResize = () => { clearTimeout(rto); rto = setTimeout(applyOrder, 100) }
    window.addEventListener('resize', onResize)

    const mm = gsap.matchMedia()

    mm.add('(min-width: 769px)', () => {
      const imgs = imgRefs.current.filter((el): el is HTMLImageElement => el !== null)
      gsap.set(imgs, { clipPath: 'inset(0)', objectPosition: '0px 0%' })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: archRef.current,
          start: 'top top',
          end: 'bottom bottom',
          pin: rightRef.current,
          scrub: true,
        },
      })

      imgs.forEach((_, i) => {
        const curr = imgs[i]
        const next = imgs[i + 1]
        if (!next) return

        const seg = gsap.timeline()
        seg.to(document.body, { backgroundColor: BG_COLORS[i], duration: 1.5, ease: 'power2.inOut' }, 0)
        seg.to(curr, { clipPath: 'inset(0px 0px 100%)', objectPosition: '0px 60%', duration: 1.5, ease: 'none' }, 0)
        seg.to(next, { objectPosition: '0px 40%', duration: 1.5, ease: 'none' }, 0)
        tl.add(seg)
      })
    })

    mm.add('(max-width: 768px)', () => {
      const imgs = imgRefs.current.filter((el): el is HTMLImageElement => el !== null)
      gsap.set(imgs, { objectPosition: '0px 60%' })

      const tl = gsap.timeline()
      imgs.forEach((img, i) => {
        const seg = gsap.timeline({
          scrollTrigger: { trigger: img, start: 'top-=70% top+=50%', end: 'bottom+=200% bottom', scrub: true },
        })
        seg.to(img, { objectPosition: '0px 30%', duration: 5, ease: 'none' })
        seg.to(document.body, { backgroundColor: BG_COLORS[i], duration: 1.5, ease: 'power2.inOut' })
        tl.add(seg)
      })
    })

    return () => {
      mm.revert()
      window.removeEventListener('resize', onResize)
      clearTimeout(rto)
    }
  }, [])

  return (
    <div className="max-w-[1440px] px-4 sm:px-8 mx-auto text-[#121212]">
      <div className="h-[20vh]" />

      <h2 className="text-center text-5xl md:text-6xl font-extrabold tracking-tight text-[#121212] mb-0">
        {t.nav.services}
      </h2>

      <div
        ref={archRef}
        className="flex gap-[60px] justify-between max-w-[1100px] mx-auto max-[900px]:gap-[30px] max-[768px]:flex-col max-[768px]:gap-5"
      >
        {/* Left — text panels, each 100vh tall */}
        <div className="flex flex-col min-w-[300px] max-[768px]:[display:contents]">
          {ITEMS.map((item, i) => {
            const content = item[locale]
            return (
              <div
                key={i}
                ref={el => { infoRefs.current[i] = el }}
                className="max-w-[356px] h-screen grid place-items-center max-[768px]:h-auto max-[768px]:py-5"
              >
                <div>
                  <h2 className="text-2xl sm:text-4xl md:text-[42px] font-extrabold tracking-[-0.84px] leading-tight">
                    {content.title}
                  </h2>
                  <p className="text-[rgba(18,18,18,0.8)] text-lg tracking-[-0.54px] mt-1.5 mb-7 leading-normal">
                    {content.desc}
                  </p>
                  <a
                    href="#"
                    className="inline-flex bg-frost text-white hover:bg-frost font-bold items-center gap-1 px-5 py-2  text-[#121212] w-fit no-underline transition-colors duration-300"
                  >
                    
                    <span>{content.link}</span>
                  </a>
                </div>
              </div>
            )
          })}
        </div>

        {/* Right — stacked images, pinned on desktop */}
        <div
          ref={rightRef}
          className="h-screen w-full max-w-[540px] relative max-[768px]:[display:contents]"
        >
          {ITEMS.map((item, i) => (
            <div
              key={i}
              ref={el => { wrapperRefs.current[i] = el }}
              className="absolute top-1/2 left-0 -translate-y-1/2 h-[400px] w-full  overflow-hidden max-[768px]:static max-[768px]:translate-y-0 max-[768px]:mb-5 max-[768px]:h-[360px] max-[560px]:h-[280px] max-[560px]:rounded-[10px]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={el => { imgRefs.current[i] = el }}
                src={item.img}
                alt={item.alt}
                className="w-full h-full object-cover object-center"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

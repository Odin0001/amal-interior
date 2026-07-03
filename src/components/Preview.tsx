"use client"

import { useEffect, useRef } from "react"
import { useInView } from "motion/react"

import { TextRotate, TextRotateRef } from "@/components/ui/text-rotate"

const exampleImages = [
  {
    url: "https://images.unsplash.com/photo-1727341554370-80e0fe9ad082?q=80&w=2276&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://unsplash.com/photos/a-black-and-white-photo-of-a-woman-brushing-her-teeth-r1SjnJL5tf0",
    title: "Morning Light",
    description: "Captured in natural morning light",
  },
  {
    url: "https://images.unsplash.com/photo-1640680608781-2e4199dd1579?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://unsplash.com/photos/a-painting-of-a-palm-leaf-on-a-multicolored-background-AaNPwrSNOFE",
    title: "Neon Palm",
    description: "Bold color and organic form",
  },
  {
    url: "https://images.unsplash.com/photo-1726083085160-feeb4e1e5b00?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://unsplash.com/photos/a-blurry-photo-of-a-crowd-of-people-UgbxzloNGsc",
    title: "Urban Flow",
    description: "Movement and energy in urban space",
  },
  {
    url: "https://images.unsplash.com/photo-1562016600-ece13e8ba570?q=80&w=2838&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://unsplash.com/photos/rippling-crystal-blue-water-9-OCsKoyQlk",
    title: "Crystal Water",
    description: "Texture as a design element",
  },
  {
    url: "https://images.unsplash.com/photo-1624344965199-ed40391d20f2?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://unsplash.com/de/fotos/mann-im-schwarzen-hemd-unter-blauem-himmel-m8RDNiuEXro",
    title: "Open Sky",
    description: "Minimal composition, maximum presence",
  },
  {
    url: "https://images.unsplash.com/photo-1689553079282-45df1b35741b?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://unsplash.com/photos/a-woman-with-a-flower-crown-on-her-head-0S3muIttbsY",
    title: "Flower Crown",
    description: "Nature woven into the everyday",
  },
  {
    url: "https://images.unsplash.com/photo-1721968317938-cf8c60fccd1a?q=80&w=2728&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://unsplash.com/photos/a-blurry-photo-of-white-flowers-in-a-field-6qbx0lzGPyc",
    title: "White Field",
    description: "Softness and light in still life",
  },
  {
    url: "https://images.unsplash.com/photo-1677338354108-223e807fb1bd?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://unsplash.com/photos/a-table-topped-with-two-wine-glasses-and-plates-Ig0gRAHspV0",
    title: "The Table",
    description: "The art of a considered table setting",
  },
]

function Item({
  index,
  image,
  link,
  containerRef,
  onInView,
}: {
  index: number
  image: string
  link: string
  containerRef: React.RefObject<HTMLDivElement>
  onInView: (inView: boolean) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, {
    root: containerRef,
    margin: "-45% 0px -45% 0px",
  })

  useEffect(() => {
    onInView(isInView)
  }, [isInView, onInView])

  return (
    <section
      ref={ref}
      key={index}
      className="h-full w-1/2 flex justify-center items-center snap-center"
    >
      <div className="w-16 h-16 sm:w-36 sm:h-36 md:w-[550px] md:h-[550px]">
        <a href={link} target="_blank" rel="noreferrer">
          <img
            src={image}
            alt={`Example ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </a>
      </div>
    </section>
  )
}

function Preview() {
  const titleRef = useRef<TextRotateRef>(null)
  const descRef = useRef<TextRotateRef>(null)
  const containerRef = useRef<HTMLDivElement>(null!)
  const slicedImages = exampleImages.slice(1)

  const handleInView = (index: number, inView: boolean) => {
    if (inView) {
      titleRef.current?.jumpTo(index)
      descRef.current?.jumpTo(index)
    }
  }

  return (
    <div className="w-full h-screen flex">
      <div className="w-full h-full relative">
        <div className="sticky top-0 h-screen w-full flex items-center justify-end bg-white text-foreground">
          <div className="w-2/3 flex flex-col items-center gap-2">
            <TextRotate
              ref={titleRef}
              texts={slicedImages.map((image) => image.title)}
              mainClassName="text-sm sm:text-3xl md:text-4xl lg:text-7xl w-full justify-center flex font-display font-bold text-frost"
              splitLevelClassName="overflow-hidden pb-1"
              staggerFrom="first"
              animatePresenceMode="wait"
              loop={false}
              auto={false}
              staggerDuration={0.005}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ type: "spring", duration: 0.6, bounce: 0 }}
            />
            <TextRotate
              ref={descRef}
              texts={slicedImages.map((image) => image.description)}
              mainClassName="text-xs sm:text-sm md:text-lg lg:text-2xl w-full justify-center flex text-muted tracking-wide"
              splitLevelClassName="overflow-hidden pb-1"
              staggerFrom="first"
              animatePresenceMode="wait"
              loop={false}
              auto={false}
              staggerDuration={0.003}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0 }}
            />
          </div>
        </div>
        <div
          ref={containerRef}
          data-lenis-prevent
          className="absolute inset-0 overflow-auto snap-y snap-mandatory"
        >
          {slicedImages.map((image, index) => (
            <Item
              key={index}
              index={index}
              image={image.url}
              link={image.link}
              containerRef={containerRef}
              onInView={(inView) => handleInView(index, inView)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export { Preview }

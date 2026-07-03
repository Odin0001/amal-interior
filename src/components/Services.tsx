"use client";

import {
  HoverSlider,
  HoverSliderImage,
  HoverSliderImageWrap,
  TextStaggerHover,
} from "@/components/blocks/animated-slideshow";
import { useLocale } from "@/lib/use-locale";

const SLIDES = [
  {
    id: "slide-1",
    imageUrl:
      "https://images.unsplash.com/photo-1654618977232-a6c6dea9d1e8?q=80&w=2486&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "slide-2",
    imageUrl:
      "https://images.unsplash.com/photo-1624996752380-8ec242e0f85d?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "slide-3",
    imageUrl:
      "https://images.unsplash.com/photo-1688733720228-4f7a18681c4f?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "slide-4",
    imageUrl:
      "https://images.unsplash.com/photo-1574717025058-2f8737d2e2b7?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "slide-5",
    imageUrl:
      "https://images.unsplash.com/photo-1726066012698-bb7a3abce786?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export function RecentProjects() {
  const { t } = useLocale();
  const serviceSlides = SLIDES.map((slide, i) => ({
    ...slide,
    title: t.services.services[i]?.title ?? slide.id,
  }));

  return (
    <HoverSlider className="min-h-svh place-content-center p-6 md:px-12 bg-void text-frost">
      <h3 className="mb-6 text-frost text-center sm:text-3xl md:text-4xl lg:text-6xl font-medium capitalize tracking-wide">
        {t.home.recentProjects}
      </h3>
      <div className="flex flex-wrap items-center justify-evenly gap-6 md:gap-12">
        <div className="flex flex-col space-y-2 md:space-y-4">
          {serviceSlides.map((slide, index) => (
            <TextStaggerHover
              key={slide.id}
              index={index}
              className="cursor-pointer text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-tighter"
              text={slide.title}
            />
          ))}
        </div>
        <HoverSliderImageWrap className="w-full md:w-2xl h-64 md:h-96 shrink-0">
          {serviceSlides.map((slide, index) => (
            <div key={slide.id} className="h-full">
              <HoverSliderImage
                index={index}
                imageUrl={slide.imageUrl}
                src={slide.imageUrl}
                alt={slide.title}
                className="size-full object-cover"
                loading="eager"
                decoding="async"
              />
            </div>
          ))}
        </HoverSliderImageWrap>
      </div>
    </HoverSlider>
  );
}

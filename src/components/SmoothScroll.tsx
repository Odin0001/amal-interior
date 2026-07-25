"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  // Lenis + GSAP ticker — initialised once, persists across navigations
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const rafCb = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(rafCb);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      gsap.ticker.remove(rafCb);
    };
  }, []);

  // Animations — killed and re-created on every page navigation
  useEffect(() => {
    // Reset scroll position for the new page
    lenisRef.current?.scrollTo(0, { immediate: true });

    const ctx = gsap.context(() => {
      // Hero parallax — only exists on the home page
      const heroSection = document.getElementById("hero-section");
      const heroContainer = document.getElementById("hero-container");
      if (heroSection && heroContainer) {
        gsap.fromTo(
          heroContainer,
          { scale: 1.1 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: heroSection,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      // Footer reveal — present on every page
      const content = document.getElementById("content");
      const footerContainer = document.getElementById("footer-container");
      if (content && footerContainer) {
        gsap.set(footerContainer, { y: "-70%" });
        gsap.to(footerContainer, {
          y: "0%",
          ease: "none",
          scrollTrigger: {
            trigger: content,
            start: "bottom bottom",
            end: () => `+=${footerContainer.offsetHeight}`,
            scrub: true,
          },
        });
      }
    });

    // Recalculate all positions against the new page's DOM
    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [pathname]);

  return <>{children}</>;
}

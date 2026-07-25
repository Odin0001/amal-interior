'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';

interface SlideData {
  title: string;
  subtitle: string;
  description: string;
  accent: string;
  imageUrl: string;
}

const slides: SlideData[] = [
  {
    title: 'Venetian Dusk',
    subtitle: 'Autumn / Winter Collection',
    description:
      'Where ancient architecture meets the dying light — a palette drawn from terracotta, aged stone, and the shimmering canals of Venice at twilight.',
    accent: '#C4956A',
    imageUrl:
      'https://images.unsplash.com/photo-1534113414509-0eec2bfb493f?w=900&h=1200&fit=crop&q=80',
  },
  {
    title: 'Nordic Silence',
    subtitle: 'Spring / Summer Collection',
    description:
      'Inspired by the vast stillness of Scandinavian fjords — clean lines, muted tones, and the quiet power of unadorned beauty.',
    accent: '#8BA7B8',
    imageUrl:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&h=1200&fit=crop&q=80',
  },
  {
    title: 'Kyoto Garden',
    subtitle: 'Resort Collection',
    description:
      'Moss-covered pathways and paper lanterns — an ode to the meditative elegance of Japanese garden design and its timeless restraint.',
    accent: '#7A9E7E',
    imageUrl:
      'https://images.unsplash.com/photo-1528164344705-47542687000d?w=900&h=1200&fit=crop&q=80',
  },
  {
    title: 'Saharan Gold',
    subtitle: 'Capsule Collection',
    description:
      'The desert reveals its secrets at dawn — liquid gold spilling across endless dunes, textures carved by centuries of wind and time.',
    accent: '#D4A955',
    imageUrl:
      'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=900&h=1200&fit=crop&q=80',
  },
];

export default function ElegantCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [, setDirection] = useState<'next' | 'prev'>('next');
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const SLIDE_DURATION = 6000;
  const TRANSITION_DURATION = 800;

  const goToSlide = useCallback(
    (index: number, dir?: 'next' | 'prev') => {
      if (isTransitioning || index === currentIndex) return;
      setDirection(dir || (index > currentIndex ? 'next' : 'prev'));
      setIsTransitioning(true);
      setProgress(0);

      setTimeout(() => {
        setCurrentIndex(index);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 50);
      }, TRANSITION_DURATION / 2);
    },
    [isTransitioning, currentIndex]
  );

  const goNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % slides.length;
    goToSlide(nextIndex, 'next');
  }, [currentIndex, goToSlide]);

  const goPrev = useCallback(() => {
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    goToSlide(prevIndex, 'prev');
  }, [currentIndex, goToSlide]);

  useEffect(() => {
    if (isPaused) return;

    progressRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 100 / (SLIDE_DURATION / 50);
      });
    }, 50);

    intervalRef.current = setInterval(() => {
      goNext();
    }, SLIDE_DURATION);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [currentIndex, isPaused, goNext]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 60) {
      if (diff > 0) goNext();
      else goPrev();
    }
  };

  const currentSlide = slides[currentIndex];
  const fade = `transition-all duration-500 ${isTransitioning ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'}`;

  return (
    <div
      className="relative w-full overflow-hidden bg-white border border-border"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background accent wash */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{
          background: `radial-gradient(ellipse at 70% 50%, ${currentSlide.accent}18 0%, transparent 70%)`,
        }}
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2">
        {/* Left: Text Content */}
        <div className="flex flex-col justify-center px-8 py-16 lg:px-16">
          <div className="max-w-md">
            {/* Collection number */}
            <div className={`flex items-center gap-4 mb-6 ${fade}`}>
              <span className="w-8 h-px bg-frost/40" />
              <span className="text-xs tracking-[0.3em] uppercase text-muted font-medium">
                {String(currentIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
              </span>
            </div>

            {/* Title */}
            <h2 className={`font-display font-bold text-4xl lg:text-6xl text-frost leading-[1.05] mb-4 ${fade}`}>
              {currentSlide.title}
            </h2>

            {/* Subtitle */}
            <p
              className={`text-sm tracking-[0.25em] uppercase font-semibold mb-6 ${fade}`}
              style={{ color: currentSlide.accent }}
            >
              {currentSlide.subtitle}
            </p>

            {/* Description */}
            <p className={`text-muted text-base lg:text-lg leading-relaxed mb-10 ${fade}`}>
              {currentSlide.description}
            </p>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-4">
              <button
                onClick={goPrev}
                className="w-11 h-11 flex items-center justify-center border border-border text-frost hover:bg-frost hover:text-white hover:border-frost transition-colors duration-300"
                aria-label="Previous slide"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={goNext}
                className="w-11 h-11 flex items-center justify-center border border-border text-frost hover:bg-frost hover:text-white hover:border-frost transition-colors duration-300"
                aria-label="Next slide"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Image */}
        <div className="relative hidden lg:block min-h-[480px]">
          <div
            className={`absolute inset-6 overflow-hidden transition-all duration-700 ${
              isTransitioning ? 'opacity-0 scale-[1.02]' : 'opacity-100 scale-100'
            }`}
          >
            <img
              src={currentSlide.imageUrl}
              alt={currentSlide.title}
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(135deg, ${currentSlide.accent}22 0%, transparent 50%)`,
              }}
            />
          </div>

          {/* Decorative frame corners */}
          <div
            className="absolute top-0 left-0 w-14 h-14 border-t-2 border-l-2 pointer-events-none"
            style={{ borderColor: currentSlide.accent }}
          />
          <div
            className="absolute bottom-0 right-0 w-14 h-14 border-b-2 border-r-2 pointer-events-none"
            style={{ borderColor: currentSlide.accent }}
          />
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="relative z-10 flex flex-wrap gap-8 px-8 py-8 border-t border-border lg:px-16">
        {slides.map((slide, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="flex flex-col items-start gap-2 bg-transparent p-0 text-left group"
            aria-label={`Go to slide ${index + 1}`}
          >
            <div className="w-20 h-px bg-border relative overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 h-px bg-frost transition-[width] duration-100 ease-linear"
                style={{
                  width: index === currentIndex ? `${progress}%` : index < currentIndex ? '100%' : '0%',
                  backgroundColor: index === currentIndex ? currentSlide.accent : undefined,
                }}
              />
            </div>
            <span
              className={`text-[10px] tracking-[0.15em] uppercase transition-colors ${
                index === currentIndex ? 'text-frost' : 'text-muted group-hover:text-frost/70'
              }`}
            >
              {slide.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

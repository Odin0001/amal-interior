"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Draggable from "gsap/Draggable";
import InertiaPlugin from "gsap/InertiaPlugin";
import Flip from "gsap/Flip";
import CustomEase from "gsap/CustomEase";

const ITEM_SIZE = 320;
const ROWS = 6;
const COLS = 10;

const PROJECTS = [
  { number: "01", title: "The Alcott Residence",    description: "Upper West Side, New York · Residential · 2024", url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=640&q=80&auto=format&fit=crop" },
  { number: "02", title: "Meridian Hotel Lobby",    description: "Chicago, Illinois · Hospitality · 2024",          url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=640&q=80&auto=format&fit=crop" },
  { number: "03", title: "Grove Creative HQ",       description: "Silver Lake, Los Angeles · Commercial · 2023",    url: "/project1.jpg" },
  { number: "04", title: "Pemberton Penthouse",     description: "Tribeca, New York · Residential · 2023",          url: "/project2.jpg" },
  { number: "05", title: "Haven Wellness Spa",      description: "Aspen, Colorado · Hospitality · 2023",            url: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=640&q=80&auto=format&fit=crop" },
  { number: "06", title: "Cross Street Gallery",    description: "Chelsea, New York · Cultural · 2022",             url: "/project3.jpg" },
  { number: "07", title: "The Kessler Loft",        description: "Williamsburg, Brooklyn · Residential · 2022",     url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=640&q=80&auto=format&fit=crop" },
  { number: "08", title: "Forum Members Club",      description: "Mayfair, London · Hospitality · 2022",            url: "/project4.jpg" },
  { number: "09", title: "Northcutt Villa",         description: "Bel Air, Los Angeles · Residential · 2023",       url: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=640&q=80&auto=format&fit=crop" },
  { number: "10", title: "The Hartwell Suite",      description: "South Beach, Miami · Hospitality · 2023",         url: "/project5.jpg" },
  { number: "11", title: "Solaris Penthouse",       description: "Downtown Dubai · Residential · 2024",             url: "/project5.jpg" },
  { number: "12", title: "Birchwood Country House", description: "Cotswolds, England · Residential · 2022",         url: "https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?w=640&q=80&auto=format&fit=crop" },
  { number: "13", title: "Vesper Restaurant",       description: "West Village, New York · Commercial · 2024",      url: "/project6.jpg" },
  { number: "14", title: "Jade Private Club",       description: "Hong Kong · Hospitality · 2023",                  url: "/img2.jpg" },
  { number: "15", title: "The Marlowe Townhouse",   description: "Notting Hill, London · Residential · 2023",       url: "/hero.jpg" },
  { number: "16", title: "Cascade Retreat",         description: "Lake Como, Italy · Residential · 2024",           url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=640&q=80&auto=format&fit=crop" },
  { number: "17", title: "One Hyde Park Studio",    description: "Knightsbridge, London · Commercial · 2022",       url: "/project1.jpg" },
  { number: "18", title: "The Fielding Estate",     description: "Greenwich, Connecticut · Residential · 2024",     url: "/project2.jpg" },
  { number: "19", title: "Atrium Office Park",      description: "Century City, Los Angeles · Commercial · 2023",   url: "/project3.jpg" },
  { number: "20", title: "Indigo Beach Club",       description: "Mykonos, Greece · Hospitality · 2024",            url: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=640&q=80&auto=format&fit=crop" },
];

type Project  = (typeof PROJECTS)[0];
type ItemData = { el: HTMLDivElement; img: HTMLImageElement; x: number; y: number; data: Project };

export default function GalleryGrid() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const canvasRef   = useRef<HTMLDivElement>(null);
  const gridRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(Draggable, InertiaPlugin, Flip, CustomEase);
    const ease = CustomEase.create("smooth", ".87,0,.13,1");

    const viewport = viewportRef.current!;
    const canvas   = canvasRef.current!;
    const grid     = gridRef.current!;

    // ── All overlay elements are appended directly to <body> so they live
    //    in the root stacking context, not inside the layout's z-index:1
    //    container which would cap their effective stacking level. ─────────

    const splitEl = document.createElement("div");
    splitEl.style.cssText = "position:fixed;inset:0;display:flex;z-index:10001;opacity:0;pointer-events:none;";
    const leftPanel = document.createElement("div");
    leftPanel.style.cssText = "width:50%;height:100%;background:rgba(14,12,11,0.92);";
    const zoomTarget = document.createElement("div");
    zoomTarget.style.cssText = "width:100%;height:100%;";
    leftPanel.appendChild(zoomTarget);
    const rightPanel = document.createElement("div");
    rightPanel.style.cssText = "width:50%;height:100%;background:rgba(14,12,11,0.92);";
    splitEl.appendChild(leftPanel);
    splitEl.appendChild(rightPanel);
    document.body.appendChild(splitEl);

    const titleEl = document.createElement("div");
    titleEl.style.cssText = "position:fixed;bottom:1.5rem;left:1.5rem;z-index:10003;opacity:0;pointer-events:none;color:#f5f0eb;max-width:45vw;";
    const numEl = document.createElement("p");
    numEl.style.cssText = "font-size:clamp(12px,1.4vw,18px);letter-spacing:0.14em;text-transform:uppercase;margin-bottom:0.4rem;";
    const titleTextEl = document.createElement("p");
    titleTextEl.style.cssText = "font-size:clamp(22px,3.5vw,56px);font-weight:700;line-height:1.05;margin-bottom:0.45rem;";
    const descEl = document.createElement("p");
    descEl.style.cssText = "font-size:clamp(12px,1.5vw,18px);line-height:1.7;letter-spacing:0.06em;";
    titleEl.appendChild(numEl);
    titleEl.appendChild(titleTextEl);
    titleEl.appendChild(descEl);
    document.body.appendChild(titleEl);

    const closeBtnEl = document.createElement("button");
    closeBtnEl.style.cssText = "position:fixed;right:1.5rem;top:50%;transform:translateY(-50%);z-index:10004;opacity:0;pointer-events:none;background:none;border:none;cursor:pointer;padding:0;";
    closeBtnEl.innerHTML = `<svg width="48" height="48" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style="transform:rotate(180deg)"><path d="M7.89873 16L6.35949 14.48L11.8278 9.08H0V6.92H11.8278L6.35949 1.52L7.89873 0L16 8L7.89873 16Z" fill="white"/></svg>`;
    document.body.appendChild(closeBtnEl);

    // ── Grid ──────────────────────────────────────────────────────────────

    const totalW = COLS * ITEM_SIZE;
    const totalH = ROWS * ITEM_SIZE;
    canvas.style.width  = `${totalW}px`;
    canvas.style.height = `${totalH}px`;

    const items: ItemData[] = [];
    let idx = 0;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const x    = c * ITEM_SIZE;
        const y    = r * ITEM_SIZE;
        const data = PROJECTS[idx % PROJECTS.length];

        const el = document.createElement("div");
        el.style.cssText = `position:absolute;width:${ITEM_SIZE}px;height:${ITEM_SIZE}px;left:${x}px;top:${y}px;overflow:hidden;cursor:pointer;opacity:0;`;

        const img = document.createElement("img");
        img.src = data.url;
        img.draggable = false;
        img.style.cssText = "width:100%;height:100%;object-fit:cover;display:block;pointer-events:none;user-select:none;";
        el.appendChild(img);
        grid.appendChild(el);

        items.push({ el, img, x, y, data });
        idx++;
      }
    }

    const vw = viewport.offsetWidth;
    const vh = viewport.offsetHeight;
    gsap.set(canvas, { x: (vw - totalW) / 2, y: (vh - totalH) / 2 });

    const margin = 20;
    const drag = Draggable.create(canvas, {
      type: "x,y",
      bounds: {
        minX: vw - totalW - margin,
        maxX: margin,
        minY: vh - totalH - margin,
        maxY: margin,
      },
      edgeResistance: 0.85,
      inertia: true,
      cursor: "grab",
      activeCursor: "grabbing",
    })[0];

    let active     = false;
    let selItem:    ItemData | null = null;
    let selOverlay: HTMLDivElement | null = null;

    function enter(item: ItemData) {
      if (active) return;
      active  = true;
      selItem = item;
      drag.disable();

      numEl.textContent       = item.data.number;
      titleTextEl.textContent = item.data.title;
      descEl.textContent      = item.data.description;

      const overlay = document.createElement("div");
      overlay.style.cssText = "position:fixed;top:0;left:0;pointer-events:none;will-change:transform;z-index:10002;";
      const oImg = document.createElement("img");
      oImg.src = item.img.src;
      oImg.draggable = false;
      oImg.style.cssText = "width:100%;height:100%;object-fit:cover;display:block;";
      overlay.appendChild(oImg);
      document.body.appendChild(overlay);
      selOverlay = overlay;

      const rect = item.img.getBoundingClientRect();
      gsap.set(overlay, { left: rect.left, top: rect.top, width: rect.width, height: rect.height });
      gsap.set(item.img, { opacity: 0 });

      splitEl.style.pointerEvents = "all";
      gsap.to(splitEl, { opacity: 1, duration: 1.2, ease });

      Flip.fit(overlay, zoomTarget, { duration: 1.2, ease, absolute: true });

      gsap.delayedCall(1.3, () => {
        gsap.set(titleEl, { y: 16, opacity: 0 });
        gsap.to(titleEl, { y: 0, opacity: 1, duration: 0.7, ease });
      });

      closeBtnEl.style.pointerEvents = "all";
      gsap.fromTo(closeBtnEl, { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.9 });

      document.addEventListener("keydown", onKey);
    }

    function exit() {
      if (!active || !selItem || !selOverlay) return;
      document.removeEventListener("keydown", onKey);

      const item    = selItem;
      const overlay = selOverlay;

      gsap.to(titleEl,    { opacity: 0, y: 16, duration: 0.25 });
      gsap.to(closeBtnEl, { x: 40, opacity: 0, duration: 0.3, onComplete: () => { closeBtnEl.style.pointerEvents = "none"; } });
      gsap.to(splitEl,    { opacity: 0, duration: 0.8, onComplete: () => { splitEl.style.pointerEvents = "none"; } });
      gsap.to(overlay,    { opacity: 0.5, duration: 0.8 });

      Flip.fit(overlay, item.el, {
        duration: 1.2, ease, absolute: true,
        onComplete: () => {
          gsap.set(item.img, { opacity: 1 });
          overlay.remove();
          active     = false;
          selItem    = null;
          selOverlay = null;
          drag.enable();
        },
      });
    }

    function onKey(e: KeyboardEvent) { if (e.key === "Escape") exit(); }

    items.forEach((item) => item.el.addEventListener("click", () => enter(item)));
    closeBtnEl.addEventListener("click", exit);
    splitEl.addEventListener("click", exit);

    // Intro: items radiate from canvas centre
    const cx = (totalW - ITEM_SIZE) / 2;
    const cy = (totalH - ITEM_SIZE) / 2;
    items.forEach((item, i) =>
      gsap.set(item.el, { left: cx, top: cy, scale: 0.8, opacity: 0, zIndex: items.length - i })
    );
    gsap.to(items.map((d) => d.el), {
      duration: 0.25,
      left:    (i) => items[i].x,
      top:     (i) => items[i].y,
      scale:   1,
      opacity: 1,
      ease:    "power2.out",
      stagger: { amount: 1.5, from: "start", grid: [ROWS, COLS] },
      onComplete: () => items.forEach((d) => gsap.set(d.el, { zIndex: 1 })),
    });

    return () => {
      drag.kill();
      document.removeEventListener("keydown", onKey);
      selOverlay?.remove();
      splitEl.remove();
      titleEl.remove();
      closeBtnEl.remove();
      grid.innerHTML = "";
    };
  }, []);

  return (
    <div
      ref={viewportRef}
      data-lenis-prevent
      className="relative w-full h-screen overflow-hidden"
    >
      <div
        ref={canvasRef}
        className="absolute top-0 left-0"
        style={{ transformOrigin: "0 0", willChange: "transform" }}
      >
        <div ref={gridRef} className="relative" />
      </div>

      {/* Vignette — darkens top so navbar blends in */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 10,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.25) 22%, transparent 42%)",
        }}
      />
    </div>
  );
}

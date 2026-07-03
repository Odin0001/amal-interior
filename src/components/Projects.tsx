"use client";

import { useState } from "react";
import { FlipReveal, FlipRevealItem } from "@/components/blocks/flip-reveal";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useLocale } from "@/lib/use-locale";

const projects = [
  { id: 'alcott',    name: 'The Alcott Residence',  type: 'Residential', location: 'Upper West Side, New York', year: '2024', gradient: 'from-stone-950 via-neutral-900 to-stone-950' },
  { id: 'meridian',  name: 'Meridian Hotel Lobby',   type: 'Hospitality', location: 'Chicago, Illinois',         year: '2024', gradient: 'from-neutral-950 via-zinc-900 to-neutral-950' },
  { id: 'grove',     name: 'Grove Creative HQ',      type: 'Commercial',  location: 'Silver Lake, Los Angeles',  year: '2023', gradient: 'from-zinc-950 via-stone-900 to-zinc-950' },
  { id: 'pemberton', name: 'Pemberton Penthouse',    type: 'Residential', location: 'Tribeca, New York',         year: '2023', gradient: 'from-stone-900 via-neutral-950 to-stone-900' },
  { id: 'haven',     name: 'Haven Wellness Spa',     type: 'Hospitality', location: 'Aspen, Colorado',           year: '2023', gradient: 'from-neutral-950 via-stone-900 to-zinc-950' },
  { id: 'cross',     name: 'Cross Street Gallery',   type: 'Cultural',    location: 'Chelsea, New York',         year: '2022', gradient: 'from-zinc-950 via-neutral-900 to-stone-950' },
  { id: 'kessler',   name: 'The Kessler Loft',       type: 'Residential', location: 'Williamsburg, Brooklyn',    year: '2022', gradient: 'from-stone-950 via-zinc-900 to-neutral-950' },
  { id: 'forum',     name: 'Forum Members Club',     type: 'Hospitality', location: 'Mayfair, London',           year: '2022', gradient: 'from-neutral-900 via-stone-950 to-zinc-950' },
]

export default function Projects() {
  const [active, setActive] = useState("all");
  const { t } = useLocale();
  const cats = t.projects.categories;

  const categories = [
    { key: 'all',         label: cats.all         },
    { key: 'residential', label: cats.residential },
    { key: 'hospitality', label: cats.hospitality },
    { key: 'commercial',  label: cats.commercial  },
    { key: 'cultural',    label: cats.cultural    },
  ];

  return (
    <>
      {/* Filter Bar */}
      <div className="bg-glass border-b border-border sticky top-18 z-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="flex items-center py-4 overflow-x-auto">
            <ToggleGroup
              type="single"
              value={active}
              onValueChange={(v) => { if (v) setActive(v); }}
              className="gap-8"
            >
              {categories.map(({ key, label }) => (
                <ToggleGroupItem
                  key={key}
                  value={key}
                  className="text-[11px] tracking-[0.2em] uppercase whitespace-nowrap h-auto px-0 py-0.5 rounded-none bg-transparent border-0 border-b border-transparent text-muted hover:text-frost hover:bg-transparent data-[state=on]:bg-transparent data-[state=on]:text-frost data-[state=on]:border-frost"
                >
                  {label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        </div>
      </div>

      {/* Project Grid */}
      <section className="bg-void py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <FlipReveal
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
            keys={[active]}
            showClass="block"
            hideClass="hidden"
          >
            {projects.map(({ id, name, type, location, year, gradient }) => (
              <FlipRevealItem key={id} flipKey={type.toLowerCase()} className="group relative overflow-hidden">
                <div className={`aspect-[4/3] bg-gradient-to-br ${gradient} transition-transform duration-700 group-hover:scale-[1.04]`} />
                <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-void/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-4 left-4">
                  <span className="bg-void/60 backdrop-blur-sm text-frost/60 text-[10px] tracking-[0.2em] uppercase px-3 py-1">
                    {type}
                  </span>
                </div>
                <div className="absolute bottom-0 inset-x-0 p-5 lg:p-6 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-frost/50 text-[10px] tracking-[0.25em] uppercase mb-1.5">
                    {location} · {year}
                  </p>
                  <p className="font-display font-bold text-frost text-xl lg:text-2xl">
                    {name}
                  </p>
                </div>
              </FlipRevealItem>
            ))}
          </FlipReveal>

          <div className="mt-16 flex items-center justify-center gap-4">
            <div className="w-8 h-px bg-border" />
            <p className="text-muted/50 text-xs tracking-widest uppercase">
              {projects.length} {t.projects.projectsCount}
            </p>
            <div className="w-8 h-px bg-border" />
          </div>
        </div>
      </section>
    </>
  );
}

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AtelierSpecSheet() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".spec-item", {
        opacity: 0,
        y: 20,
        duration: 1.2,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const features = [
    { 
      id: "C-01",
      category: "Bespoke",
      title: "The Couture Edit", 
      details: ["Hand-stitched Silks", "Architectural Draping", "Made-to-Measure"],
      svg: (
        <svg viewBox="0 0 100 100" className="w-10 h-10 stroke-stone-500 group-hover:stroke-amber-200 transition-all duration-700 fill-none stroke-[0.5]">
          {/* Architectural Fabric Fold */}
          <path d="M20 20 L80 20 L70 80 L30 80 Z" opacity="0.3" />
          <path d="M50 10 L50 90 M20 50 L80 50" strokeWidth="0.2" strokeDasharray="2 2" />
          <path d="M30 20 C40 40 60 60 70 80" className="group-hover:translate-x-1 transition-transform duration-1000" />
          <path d="M70 20 C60 40 40 60 30 80" className="group-hover:-translate-x-1 transition-transform duration-1000" />
          <circle cx="50" cy="50" r="1.5" className="fill-stone-500 group-hover:fill-amber-200" stroke="none" />
        </svg>
      )
    },
    { 
      id: "J-02",
      category: "Fine Jewelry",
      title: "Artisanal Finery", 
      details: ["Recycled 18k Gold", "Ethical Gemstones", "Micro-set Pave"],
      svg: (
        <svg viewBox="0 0 100 100" className="w-10 h-10 stroke-stone-500 group-hover:stroke-amber-300 transition-all duration-700 fill-none stroke-[0.5]">
          {/* Multi-faceted Diamond Heart/Gem */}
          <path d="M50 15 L85 40 L50 85 L15 40 Z" />
          <path d="M15 40 H85 M35 40 L50 15 L65 40 M35 40 L50 85 L65 40" strokeWidth="0.3" opacity="0.6" />
          <path d="M50 15 V85" strokeWidth="0.2" strokeDasharray="1 2" />
          {/* Shimmer Points */}
          <circle cx="25" cy="30" r="0.8" className="fill-amber-200 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <circle cx="75" cy="30" r="0.8" className="fill-amber-200 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </svg>
      )
    },
    { 
      id: "B-03",
      category: "Apothecary",
      title: "Botanical Essence", 
      details: ["Cold-pressed Oils", "Active Retinoids", "Neutral Scents"],
      svg: (
        <svg viewBox="0 0 100 100" className="w-10 h-10 stroke-stone-500 group-hover:stroke-amber-200 transition-all duration-700 fill-none stroke-[0.5]">
          {/* Compass Rose / Petal Symmetry */}
          <circle cx="50" cy="50" r="35" opacity="0.3" />
          <circle cx="50" cy="50" r="12" />
          <path d="M50 5 V95 M5 50 H95" strokeWidth="0.2" opacity="0.5" />
          <path d="M50 15 L60 40 L85 50 L60 60 L50 85 L40 60 L15 50 L40 40 Z" />
          <circle cx="50" cy="50" r="2" className="fill-stone-600 group-hover:fill-amber-400" stroke="none" />
        </svg>
      )
    },
  ];

  return (
    <section ref={sectionRef} className="relative bg-[#0c0c0b] text-stone-200 py-12 md:py-16 overflow-hidden border-y border-stone-900">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 pb-6 border-b border-stone-900 space-y-4 md:space-y-0">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-amber-200/50 mb-1">Maison d&apos;Art</span>
            <h2 className="text-3xl md:text-5xl font-serif italic font-light tracking-tight text-stone-100">
              Studio <span className="not-italic text-stone-500 font-sans uppercase text-xl md:text-3xl tracking-widest">Standards</span>
            </h2>
          </div>
          <div className="hidden md:block w-[1px] h-12 bg-stone-800 mx-8" />
          <p className="max-w-xs text-[11px] text-stone-500 text-center md:text-left leading-relaxed uppercase tracking-wider font-light">
            Defining the benchmark for artisanal precision and material purity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((item) => (
            <div key={item.id} className="spec-item group flex flex-col items-center text-center">
              
              <div className="relative w-20 h-20 flex items-center justify-center mb-6 border border-stone-800 group-hover:border-amber-200/20 transition-all duration-700">
                <div className="absolute inset-1 border border-stone-900 group-hover:border-amber-200/5 transition-all duration-700" />
                <div className="z-10 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-700 ease-out">
                  {item.svg}
                </div>
              </div>

              <div className="space-y-3 max-w-[240px]">
                <span className="text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-stone-600 group-hover:text-amber-200/70 transition-colors">
                  {item.category}
                </span>
                <h3 className="text-lg md:text-xl font-serif text-stone-200 group-hover:text-white transition-colors">
                  {item.title}
                </h3>
                <div className="h-[1px] w-4 bg-stone-800 mx-auto group-hover:w-10 group-hover:bg-amber-200/30 transition-all duration-500" />
                <ul className="space-y-1.5 pt-1">
                  {item.details.map((detail, idx) => (
                    <li key={idx} className="text-[10px] font-sans uppercase tracking-[0.1em] text-stone-500 group-hover:text-stone-300">
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
              <span className="mt-6 text-[8px] font-mono text-stone-800 tracking-[0.3em] uppercase group-hover:text-stone-600 transition-colors">
                REF_{item.id}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

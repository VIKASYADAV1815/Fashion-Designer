"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedButton from "@/components/buttons/AnimatedButton";

gsap.registerPlugin(ScrollTrigger);

export default function Continuum() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const luxeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Entrance Sequence
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(".reveal-item", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out",
      })
      .from(lineRef.current, {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1.5,
        ease: "expo.inOut",
      }, "-=0.8");

      // 2. Luxe Parallax (Bottom-right float)
      gsap.to(luxeRef.current, {
        x: -80,
        opacity: 0.08,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    { title: "Fabric", copy: "Organic silks and ethical wools in monochrome textures crafted for longevity." },
    { title: "Form", copy: "Architectural cuts with softened movement that adapts to your silhouette." },
    { title: "Motion", copy: "Cinematic pacing and effortless flow designed for the modern narrative." },
  ];

  return (
    <section 
      ref={sectionRef} 
      className="relative bg-[#FAF9F6] text-[#1A1A1A] py-20 md:py-32 overflow-hidden selection:bg-[#1A1A1A] selection:text-white"
    >
      {/* BACKGROUND LUXE TEXT - Scaled Down and Positioned Bottom-Right */}
      <div 
        ref={luxeRef}
        className="absolute bottom-10 right-[-5%] select-none pointer-events-none opacity-[0.04] text-[15vw] font-serif italic font-black leading-none whitespace-nowrap z-0"
      >
        LUXE
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20 md:mb-32">
            
            <div className="max-w-4xl">
              <span className="reveal-item inline-block text-[12px] font-bold uppercase tracking-[0.5em] text-stone-400 mb-6">
                Collection No. 04
              </span>
              <h2 className="reveal-item text-[10vw] sm:text-7xl md:text-8xl lg:text-9xl font-extralight tracking-tighter leading-[0.85] uppercase">
                The <span className="italic font-serif block sm:inline">Series</span>
              </h2>
            </div>
            
            <div className="max-w-md w-full">
              {/* Increased Text Size */}
              <p className="reveal-item text-lg md:text-xl text-stone-600 font-light leading-relaxed mb-10">
                A quiet progression from story to substance. Pieces designed 
                to hold their own in silence, bridging cinematic art and wear.
              </p>
              
              {/* SIDE BY SIDE BUTTONS - Enhanced Scale */}
              <div className="reveal-item flex flex-row items-center gap-4">
                <div className="flex-1">
                  <AnimatedButton 
                    variant="solid" 
                    className="w-full bg-[#1A1A1A] text-white py-5 text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-stone-800 transition-all active:scale-[0.97] whitespace-nowrap"
                  >
                    Shop Edit
                  </AnimatedButton>
                </div>
                <div className="flex-1">
                  <button className="w-full h-full py-5 text-[11px] font-bold uppercase tracking-[0.25em] border border-stone-300 text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-all duration-500 active:scale-[0.97] whitespace-nowrap">
                    Details
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Stronger Divider */}
          <div ref={lineRef} className="h-px w-full bg-stone-300 mb-20 md:mb-24" />

          {/* Grid Layout - Larger Text */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-20">
            {features.map((item, i) => (
              <div key={item.title} className="reveal-item group cursor-default">
                <div className="flex flex-col space-y-6">
                  <div className="flex items-center gap-4">
                    <span className="text-[11px] font-mono text-stone-400">0{i + 1}</span>
                    <div className="h-px flex-1 bg-stone-200 group-hover:bg-[#1A1A1A] transition-all duration-700 origin-left" />
                  </div>
                  {/* Larger Grid Title */}
                  <h3 className="text-lg md:text-xl uppercase tracking-[0.2em] font-semibold text-stone-800">
                    {item.title}
                  </h3>
                  {/* Larger Grid Copy */}
                  <p className="text-base md:text-lg text-stone-500 leading-relaxed font-light">
                    {item.copy}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Subtle Grain Layer */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </section>
  );
}
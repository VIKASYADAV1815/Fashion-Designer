"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedButton from "@/components/buttons/AnimatedButton";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const logoBgRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(".reveal-item", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power2.out",
      })
      .from(lineRef.current, {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1.2,
        ease: "expo.inOut",
      }, "-=0.6");

      gsap.to(logoBgRef.current, {
        y: -50,
        opacity: 0.12,
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

  const aboutContent = [
    { title: "The Label", copy: "Defining a new era of ethnic luxury where traditional hand-craft meets modern silhouettes." },
    { title: "Collections", copy: "From bespoke bridal Lehengas to effortless casual-fit Sarees designed for every occasion." },
    { title: "Philosophy", copy: "Empowering the modern woman through intentional design and timeless craftsmanship." },
  ];

  return (
    <section 
      ref={sectionRef} 
      className="relative bg-[#FAF9F6] text-[#1A1A1A] py-14 md:py-20 overflow-hidden selection:bg-[#1A1A1A] selection:text-white"
    >
      {/* BACKGROUND LOGO */}
      <div 
        ref={logoBgRef}
        className="absolute bottom-0 right-0 select-none pointer-events-none opacity-[0.05] w-[35vw] max-w-112.5 z-0 translate-x-10"
      >
        <img 
          src="/images/logo.png" 
          alt="Watermark" 
          className="w-full h-auto grayscale brightness-50"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-12 md:mb-14">
            
            <div className="max-w-3xl">
              <span className="reveal-item inline-block text-[11px] font-bold uppercase tracking-[0.4em] text-stone-400 mb-4">
                The Designer
              </span>
              <h2 className="reveal-item text-[7vw] sm:text-5xl md:text-6xl font-light tracking-tight leading-[1.1] uppercase">
                Khushi Chauhan <br />
                <span className="italic font-serif text-stone-500">Fashion Studio</span>
              </h2>
            </div>
            
            <div className="max-w-sm w-full">
              <p className="reveal-item text-base md:text-lg text-stone-600 font-light leading-relaxed mb-8">
                Crafting luxury ethnic wear that celebrates heritage. From grand Lehengas 
                to casual drapes, we design for elegance.
              </p>
              
              <div className="reveal-item flex flex-row items-center gap-4">
                <AnimatedButton 
                  variant="solid" 
                  className="px-8 bg-[#1A1A1A] text-white py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-stone-800 transition-all active:scale-[0.97]"
                  onClick={() => router.push("/shop")}
                >
                  Explore Lookbook
                </AnimatedButton>
              </div>
            </div>
          </div>

          {/* Reduced gap around divider */}
          <div ref={lineRef} className="h-px w-full bg-stone-200 mb-12 md:mb-14" />

          {/* Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12">
            {aboutContent.map((item, i) => (
              <div key={item.title} className="reveal-item group">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono text-stone-300">0{i + 1}</span>
                    <div className="h-px flex-1 bg-stone-200 group-hover:bg-[#1A1A1A] transition-all duration-500 origin-left" />
                  </div>
                  <h3 className="text-base uppercase tracking-[0.15em] font-bold text-stone-800">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base text-stone-500 leading-relaxed font-light">
                    {item.copy}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </section>
  );
}

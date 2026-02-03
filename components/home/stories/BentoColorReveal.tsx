"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const media = [
  { type: "video", src: "https://res.cloudinary.com/dzq7axes2/video/upload/v1770113143/video1_em8fnl.mp4", span: "md:col-span-4 md:row-span-2", mobileRatio: "aspect-[9/15]" },
  { type: "image", src: "/images/img1.jpg", span: "md:col-span-4 md:row-span-2", mobileRatio: "aspect-[9/15]" },
  { type: "image", src: "/images/1.jpg", span: "md:col-span-4 md:row-span-1", mobileRatio: "aspect-square" },
  { type: "video", src: "https://res.cloudinary.com/dzq7axes2/video/upload/v1770112837/video2_gnoyzr.mov", span: "md:col-span-4 md:row-span-2", mobileRatio: "aspect-[9/15]" },
  { type: "image", src: "/images/img4.jpg", span: "md:col-span-4 md:row-span-2", mobileRatio: "aspect-[9/15]" },
  { type: "image", src: "/images/3.jpg", span: "md:col-span-4 md:row-span-2", mobileRatio: "aspect-[9/15]" },
  { type: "image", src: "/images/1.jpg", span: "md:col-span-4 md:row-span-1", mobileRatio: "aspect-square" },
];

export default function BentoPortraitDense() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      media.forEach((_, i) => {
        gsap.set(`.bento-item-${i} .media-content`, { 
          filter: "grayscale(100%)", 
          opacity: 0.6,
          scale: 1.1 
        });

        ScrollTrigger.create({
          trigger: `.bento-item-${i}`,
          start: "top 90%",
          end: "bottom 10%",
          onEnter: () => {
            gsap.to(`.bento-item-${i} .media-content`, { 
              filter: "grayscale(0%)", 
              opacity: 1, 
              scale: 1, 
              duration: 1.5, 
              ease: "expo.out" 
            });
          },
          onLeaveBack: () => {
            gsap.to(`.bento-item-${i} .media-content`, { 
              filter: "grayscale(100%)", 
              opacity: 0.6, 
              scale: 1.1,
              duration: 1, 
              ease: "power2.inOut" 
            });
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#fcfaf8] text-stone-900 py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        
        <div className="mb-12 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight text-stone-800 text-center lg:text-left">
            Atelier <span className="italic font-light">Archive</span>
          </h2>
          <div className="h-px w-full bg-stone-200 mt-6" />
        </div>

        {/* CHANGE: 
            1. Removed fixed auto-rows-[300px] on mobile.
            2. Added md:auto-rows-[350px] specifically for desktop.
        */}
        <div className="grid grid-cols-1 md:grid-cols-12 grid-flow-dense md:auto-rows-[350px] gap-6 md:gap-4">
          {media.map((m, i) => (
            <div
              key={i}
              className={`bento-item-${i} relative overflow-hidden bg-stone-200 ${m.span} ${m.mobileRatio} md:aspect-auto`}
            >
              <div className="w-full h-full relative overflow-hidden border border-stone-100/50">
                
                {m.type === "video" ? (
                  <video
                    className="media-content w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                  >
                    <source src={m.src} type="video/mp4" />
                  </video>
                ) : (
                  <img 
                    src={m.src} 
                    alt="Couture Detail" 
                    className="media-content w-full h-full object-cover"
                  />
                )}

                <div className="absolute bottom-4 left-4 z-20">
                  <p className="text-[9px] uppercase tracking-[0.3em] text-white/80 font-medium bg-black/10 backdrop-blur-sm px-2 py-1">
                    Vol. 26 / No. 0{i + 1}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
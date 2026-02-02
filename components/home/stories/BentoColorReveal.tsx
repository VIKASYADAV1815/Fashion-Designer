"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const media = [
  { type: "video", src: "https://www.pexels.com/download/video/9324833/", poster: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1200&auto=format&fit=crop" },
  { type: "video", src: "https://www.pexels.com/download/video/35764314/", poster: "https://images.unsplash.com/photo-1516826957135-0b0f1aae2adb?q=80&w=1200&auto=format&fit=crop" },
  { type: "video", src: "https://www.pexels.com/download/video/3115231/", poster: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop" },
  { type: "video", src: "https://www.pexels.com/download/video/7192580/", poster: "https://images.unsplash.com/photo-1503342394128-c104d54dba01?q=80&w=1200&auto=format&fit=crop" },
  { type: "video", src: "https://www.pexels.com/download/video/35764316/", poster: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop" },
  { type: "video", src: "https://www.pexels.com/download/video/35764322/", poster: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1200&auto=format&fit=crop" },
];

export default function BentoColorReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      media.forEach((_, i) => {
        ScrollTrigger.create({
          trigger: `.bento-item-${i}`,
          start: "top 80%",
          end: "bottom 60%",
          onEnter: () => {
            gsap.to(`.bento-item-${i} .media`, { filter: "grayscale(0%)", opacity: 1, scale: 1.03, duration: 1.2, ease: "power3.out" });
          },
          onLeaveBack: () => {
            gsap.to(`.bento-item-${i} .media`, { filter: "grayscale(100%)", opacity: 0.9, scale: 1, duration: 1, ease: "power3.out" });
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-black text-white min-h-[200vh] pt-10 pb-8">
      <div className="container mx-auto px-6">
        <div className="mb-6 md:mb-8 text-center">
          <h2 className="text-[clamp(1.25rem,3vw,2rem)] font-light uppercase tracking-[0.25em]">Editorial Grid</h2>
        </div>
      </div>
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5 md:gap-6">
        {media.map((m, i) => (
          <div
            key={i}
            className={`bento-item-${i} ${i % 6 === 0 ? "md:col-span-7" : i % 6 === 1 ? "md:col-span-5" : i % 6 === 2 ? "md:col-span-6" : i % 6 === 3 ? "md:col-span-6" : i % 6 === 4 ? "md:col-span-4" : "md:col-span-8"} relative`}
          >
            <div className="relative overflow-hidden border border-white/10">
              <video
                className="media w-full h-[55vh] md:h-[60vh] object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                poster={m.poster}
                style={{ filter: "grayscale(100%)", opacity: 0.9 }}
              >
                <source src={m.src} type="video/mp4" />
              </video>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

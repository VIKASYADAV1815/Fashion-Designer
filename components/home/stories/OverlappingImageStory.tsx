"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import AnimatedButton from "@/components/buttons/AnimatedButton";

gsap.registerPlugin(ScrollTrigger);

const frames = [
  {
    id: 1,
    title: "NEW & NOW",
    description: "Fresh arrivals in women's couture — fluid drapes, precise cuts, and confident silhouettes crafted for the season.",
    image: "/images/0.jpg",
  },
  {
    id: 2,
    title: "MID COLLECTION",
    description: "Editorial mid-season selections: timeless dresses, lehengas, and sarees curated for refined occasions.",
    image: "/images/1.jpg",
  },
  {
    id: 3,
    title: "SUMMER SESSION DEALS",
    description: "Warm-weather essentials with subtle luxury. Lightweight silks and airy wraps — effortless and poised.",
    image: "/images/2.jpg",
  },
];

export default function OverlappingImageStory() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const targetsImg = gsap.utils.toArray<HTMLElement>('[class*="ois-frame-"]');
      const targetsText = gsap.utils.toArray<HTMLElement>('[class*="ois-text-"]');

      // Initial State
      gsap.set(targetsImg, { opacity: 0, scale: 1.1 });
      gsap.set(targetsText, { opacity: 0, y: 30 });
      
      // Show first frame immediately
      gsap.set(".ois-frame-0", { opacity: 1, scale: 1 });
      gsap.set(".ois-text-0", { opacity: 1, y: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${frames.length * 100}%`,
          scrub: 1, // Added slight smoothing delay
          pin: true,
        },
      });

      frames.forEach((_, i) => {
        if (i === frames.length - 1) return; // Stop before the last frame exits

        const nextImg = `.ois-frame-${i + 1}`;
        const nextText = `.ois-text-${i + 1}`;
        const currentImg = `.ois-frame-${i}`;
        const currentText = `.ois-text-${i}`;

        tl.to([currentImg, currentText], { opacity: 0, y: -20, scale: 0.95, duration: 1 })
          .to([nextImg, nextText], { opacity: 1, y: 0, scale: 1, duration: 1 }, "-=0.5");
      });
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-black text-white overflow-hidden pt-16 lg:pt-0">
      <div className="container mx-auto px-6 lg:px-12 h-screen grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Content Reveal */}
        <div className="lg:col-span-5 relative h-full flex items-center justify-center lg:justify-start">
          {frames.map((f, i) => (
            <div 
              key={f.id} 
              className={`ois-text-${i} absolute w-full max-w-lg py-12 lg:py-0 flex flex-col justify-center`}
            >
              <span className="text-xs uppercase tracking-[0.4em] text-gray-500 block mb-4">
                Chapter {i + 1}
              </span>
              <h3 className="text-[clamp(2rem,5vw,4rem)] font-extralight uppercase leading-none tracking-tighter">
                {f.title}
              </h3>
              <p className="mt-6 text-sm lg:text-base text-gray-400 leading-relaxed">
                {f.description}
              </p>
              <div className="mt-8">
                <AnimatedButton variant="outline">Explore More</AnimatedButton>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Image Reveal */}
        <div className="lg:col-span-7 relative h-full flex items-center justify-center">
          <div className="relative w-full h-[48vh] lg:h-[82vh] max-w-[90%] lg:max-w-[85%] mx-auto">
            {frames.map((f, i) => (
              <div 
                key={f.id} 
                className={`ois-frame-${i} absolute inset-0 overflow-hidden rounded-sm`}
              >
                <Image
                  src={f.image}
                  alt={f.title}
                  fill
                  className="object-cover transform-gpu"
                  priority={i === 0}
                  sizes="(max-width: 1024px) 80vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent lg:hidden" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

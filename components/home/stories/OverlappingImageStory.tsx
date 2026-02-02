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
    title: "COUTURE FORM",
    description: "Sharp silhouettes with gentle fluidity. Tailoring meets motion. Architectural seams trace the body while fabric breathes, revealing confidence without noise.",
    image: "https://images.unsplash.com/photo-1767083640899-59051b0ef0f1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    title: "TEXTURE STUDY",
    description: "Silk, stone, velvet — a tactile dialogue in monochrome. Grain and gloss sit in balance, each surface revealing a quiet rhythm.",
    image: "https://images.unsplash.com/photo-1544166094-d2b74a1f7667?q=80&w=1170&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "PROPORTION PLAY",
    description: "Bold volumes anchored by precise structure. Scale is measured, not maximal — power expressed through silhouette control.",
    image: "https://plus.unsplash.com/premium_photo-1723563578468-2a635a7cb810?q=80&w=1147&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
          <div className="relative w-full h-[45vh] lg:h-[75vh] w-full max-w-[90%] lg:max-w-full mx-auto">
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

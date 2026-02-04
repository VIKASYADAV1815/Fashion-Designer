"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedButton from "../buttons/AnimatedButton";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(
        videoRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: "power2.out" }
      ).fromTo(
        textRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.4"
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative h-screen w-full overflow-hidden bg-black">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        // poster="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1974&auto=format&fit=crop"
        className="absolute inset-0 w-full h-full object-cover"
        src="https://www.pexels.com/download/video/35764328/"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/20 via-black/30 to-black/20" />

      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6 pt-24 md:pt-32">
        <div ref={textRef} className="max-w-4xl mx-auto">
          <h2 className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase mb-6 text-white/80">
            Spring / Summer 2026
          </h2>
          <h1 className="text-[clamp(2rem,6vw,6rem)] font-light uppercase tracking-tighter mb-8 text-white">
            Ethereal Silence
          </h1>
          <p className="text-[clamp(0.75rem,1.2vw,1rem)] text-gray-300 max-w-xl mx-auto mb-10 leading-relaxed font-light tracking-widest">
            Where minimalism meets grandeur. Discover the new collection defined by precision, fluidity, and timeless elegance.
          </p>
          <div className="flex gap-6 justify-center">
            <AnimatedButton variant="primary">Shop Collection</AnimatedButton>
            <AnimatedButton variant="outline">View Lookbook</AnimatedButton>
          </div>
        </div>
      </div>
    </section>
  );
}

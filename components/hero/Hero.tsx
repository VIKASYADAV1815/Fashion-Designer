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
    <section
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
        src="https://res.cloudinary.com/dzq7axes2/video/upload/v1770274822/hero-vid_xqzyui.mp4"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/30 via-black/40 to-black/30" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 pt-24 md:pt-32 text-center">
        <div ref={textRef} className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-white/80 md:text-sm">
            Spring / Summer 2026
          </h2>

          <h1 className="mb-8 text-[clamp(2.2rem,6vw,6rem)] font-light uppercase tracking-tight text-white">
            Ethereal Silence
          </h1>

          <p className="mx-auto mb-10 max-w-xl text-[clamp(0.8rem,1.2vw,1rem)] font-light leading-relaxed tracking-widest text-gray-300">
            Where minimalism meets grandeur. Discover the new collection defined
            by precision, fluidity, and timeless elegance.
          </p>

          {/* Buttons */}
          <div className="flex w-full flex-col items-center justify-center gap-4 lg:flex-row lg:gap-6">
            <AnimatedButton
              variant="primary"
              className="
                w-full
                max-w-[240px]
                lg:w-auto
                px-6 sm:px-7 lg:px-8
                py-3 lg:py-2.5
                text-sm lg:text-[0.85rem]
                tracking-widest
              "
            >
              Shop Collection
            </AnimatedButton>

            <AnimatedButton
              variant="outline"
              className="
                w-full
                max-w-[240px]
                lg:w-auto
                px-6 sm:px-7 lg:px-8
                py-3 lg:py-2.5
                text-sm lg:text-[0.85rem]
                tracking-widest
              "
            >
              View Lookbook
            </AnimatedButton>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedButton from "../buttons/AnimatedButton";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();

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
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
        src="https://www.pexels.com/download/video/35352427/"
      />

      {/* Optimized Overlay with Darkening and Vignette Effect */}
      <div className="absolute inset-0 z-[1]">
        {/* Darkening Overlay */}
        <div className="absolute inset-0 bg-black/50" />
        
        {/* Radial Vignette Effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_70%,rgba(0,0,0,0.8)_100%)]" />
        
        {/* Subtle Linear Gradient for Text Readability */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 pt-24 md:pt-32 text-center">
        <div ref={textRef} className="mx-auto max-w-4xl">
          <h1 className="mb-8 text-[clamp(1.5rem,3vw,3rem)] font-light uppercase tracking-tight text-white">
            Ethereal Silence : Designer Lehenga and Ready-to-Wear Saree
          </h1>

          <p className="mx-auto mb-10 max-w-xl text-[clamp(0.8rem,1.2vw,1rem)] font-light leading-relaxed tracking-widest text-gray-300">
            At the cross of heritage and modernity. Our designer lehenga for women and designer ready to wear saree that is designed to be always elegant and style free.
          </p>

          {/* Buttons */}
          <div className="flex w-full flex-col items-center justify-center gap-4 lg:flex-row lg:gap-6">
            <AnimatedButton
              variant="primary"
              className="
                w-full
                max-w-60
                lg:w-auto
                px-6 sm:px-7 lg:px-8
                py-3 lg:py-2.5
                text-sm lg:text-[0.85rem]
                tracking-widest
              "
              onClick={() => {
                try { router.push("/shop"); } catch (e) { console.error("navigate /shop failed", e); }
              }}
            >
              Shop Collection
            </AnimatedButton>

            <AnimatedButton
              variant="outline"
              className="
                w-full
                max-w-60
                lg:w-auto
                px-6 sm:px-7 lg:px-8
                py-3 lg:py-2.5
                text-sm lg:text-[0.85rem]
                tracking-widest
              "
              onClick={() => {
                try { router.push("/collections"); } catch (e) { console.error("navigate /collections failed", e); }
              }}
            >
              View Lookbook
            </AnimatedButton>
          </div>
        </div>
      </div>
    </section>
  );
}

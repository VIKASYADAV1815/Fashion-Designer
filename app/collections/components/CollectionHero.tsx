"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function CollectionHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative h-[85vh] w-full overflow-hidden flex items-center justify-center">
       <Image 
         src="/images/4.jpg"
         alt="Collections Hero"
         fill
         sizes="100vw"
         className="object-cover"
       />
       <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-transparent" />
       <div ref={textRef} className="relative z-10 text-center text-white px-6">
         <h1 className="text-6xl md:text-9xl font-light uppercase tracking-tighter mb-6">
           Lookbook
         </h1>
         <p className="mx-auto max-w-2xl text-base md:text-lg font-light leading-relaxed tracking-wider">
           Crafting luxury ethnic wear where traditional hand‑craft meets modern silhouettes. From bespoke bridal lehengas to effortless casual‑fit sarees, we design for elegance.
         </p>
         <div className="mt-8 flex items-center justify-center gap-6">
           <Link href="/shop" className="text-[11px] uppercase tracking-[0.3em] bg-black text-white border border-black px-5 py-3 hover:bg-black/90 transition-colors">Shop Collection</Link>
           <Link href="/" className="text-[11px] uppercase tracking-[0.3em] bg-black text-white border border-black px-5 py-3 hover:bg-black/90 transition-colors">Home</Link>
         </div>
       </div>
       <div className="absolute bottom-4 left-0 right-0 text-center text-[11px] uppercase tracking-[0.3em] text-white/70">
         © 2026 Khushi Desinger. All rights reserved. • Instagram • Twitter • Pinterest
       </div>
    </div>
  );
}

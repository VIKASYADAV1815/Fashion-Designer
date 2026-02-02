"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

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
    <div ref={containerRef} className="relative h-[80vh] w-full bg-gray-100 overflow-hidden flex items-center justify-center">
       <Image 
         src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop"
         alt="Collections Hero"
         fill
         className="object-cover opacity-80"
       />
       <div ref={textRef} className="relative z-10 text-center">
         <h1 className="text-6xl md:text-9xl font-light uppercase tracking-tighter text-white mix-blend-difference mb-4">
           Archive
         </h1>
         <p className="text-sm uppercase tracking-[0.3em] text-white">
           Past & Present Seasons
         </p>
       </div>
    </div>
  );
}

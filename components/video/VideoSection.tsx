"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedButton from "../buttons/AnimatedButton";

gsap.registerPlugin(ScrollTrigger);

export default function VideoSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
       gsap.to(videoRef.current, {
          scale: 1.1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
       });

       gsap.from(textRef.current, {
         y: 50,
         opacity: 0,
         duration: 1,
         scrollTrigger: {
           trigger: containerRef.current,
           start: "top center",
         }
       });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center">
       <div className="absolute inset-0 w-full h-full opacity-60">
         {/* Placeholder for video - using image for now but structure is for video */}
         <video 
            ref={videoRef}
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1974&auto=format&fit=crop"
         >
           <source src="https://assets.mixkit.co/videos/preview/mixkit-fashion-model-posing-in-neon-lights-39893-large.mp4" type="video/mp4" />
         </video>
       </div>

       <div ref={textRef} className="relative z-10 text-center px-6 max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-white mb-6">The Campaign</p>
          <h2 className="text-4xl md:text-7xl font-light uppercase tracking-tighter text-white mb-10 leading-tight">
            Shadows of <br /> <span className="italic font-serif">Desire</span>
          </h2>
          <AnimatedButton variant="outline">Watch Film</AnimatedButton>
       </div>
    </section>
  );
}

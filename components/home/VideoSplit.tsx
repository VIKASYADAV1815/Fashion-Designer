"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedButton from "@/components/buttons/AnimatedButton";

gsap.registerPlugin(ScrollTrigger);

export default function VideoSplit() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const luxeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Reveal Content
      gsap.from(".vs-content", {
        x: -50,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      // 2. Video Scale & Parallax
      gsap.fromTo(videoRef.current, 
        { scale: 1.2 },
        { 
          scale: 1,
          scrollTrigger: {
            trigger: videoContainerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );

      // 3. Background LUXE Scroll (Horizontal)
      gsap.to(luxeRef.current, {
        x: -150,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative bg-[#F9F9F8] text-[#121212] py-10 md:py-16 overflow-hidden selection:bg-black selection:text-white"
    >
      {/* BACKGROUND SCROLLING LOGO */}
      <div 
        ref={luxeRef}
        className="absolute top-1/2 left-0 -translate-y-1/2 pointer-events-none select-none z-0 opacity-[0.03] text-[25vw] font-serif italic font-black leading-none whitespace-nowrap"
      >
        LUXE STUDIO LUXE
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-12">
          
          {/* LEFT CONTENT (5 Columns) */}
          <div className="lg:col-span-5 vs-content">
            <div className="flex items-center gap-4 mb-6">
              <span className="h-px w-8 bg-black"></span>
              <p className="text-[10px] uppercase tracking-[0.5em] font-bold text-stone-400">Cinematic Process</p>
            </div>
            
            <h2 className="text-6xl md:text-8xl font-extralight tracking-tighter leading-none mb-6 uppercase">
              Studio <br />
              <span className="italic font-serif pl-8 md:pl-16">Notes</span>
            </h2>

            <p className="text-lg text-stone-600 font-light leading-relaxed mb-8 max-w-md">
              Materials, movement, and mood define the season. Each decision is measured, each detail meant to endure beyond the frame.
            </p>

            {/* TAGS */}
            <div className="flex flex-wrap gap-2 mb-8">
              {["Silk", "Ethical Wool", "Structure"].map((t) => (
                <span key={t} className="text-[10px] uppercase tracking-widest px-4 py-2 bg-white border border-stone-100 shadow-sm text-stone-500 hover:text-black transition-colors">
                  {t}
                </span>
              ))}
            </div>

            <AnimatedButton 
              variant="solid" 
              className="bg-black text-white px-12 py-5 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-stone-800 transition-all"
            >
              Explore Process
            </AnimatedButton>
          </div>

          {/* RIGHT VIDEO (7 Columns) */}
          <div className="lg:col-span-7 relative">
            <div 
              ref={videoContainerRef}
              className="relative aspect-[4/5] md:aspect-video overflow-hidden shadow-2xl"
            >
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
                poster="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1974"
              >
                <source src="https://assets.mixkit.co/videos/preview/mixkit-fashion-model-posing-in-neon-lights-39893-large.mp4" type="video/mp4" />
              </video>

              {/* VIDEO OVERLAY CAPTION */}
              <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end text-white mix-blend-difference">
                <div className="text-[10px] uppercase tracking-[0.4em] font-bold">
                  Scene 04 / Frame 12
                </div>
                <div className="text-[10px] uppercase tracking-[0.4em] font-bold">
                  2026 Edition
                </div>
              </div>
            </div>

            {/* Decorative Floating Element */}
            <div className="hidden lg:block absolute -bottom-8 -left-8 bg-white p-8 shadow-xl max-w-xs z-20">
              <h4 className="text-[10px] font-bold uppercase tracking-widest mb-3 text-stone-400">Detail focus</h4>
              <p className="text-sm font-light text-stone-600 leading-relaxed italic font-serif">
                &quot;The way the fabric catches the light determines the final silhouette.&quot;
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM FEATURE GRID */}
        <div className="mt-12 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-stone-200">
          {[
            { title: "The Cut", copy: "Architectural seams and softened edges for a timeless form." },
            { title: "The Surface", copy: "Grain, gloss, and a perfectly balanced texture profile." },
            { title: "The Pacing", copy: "Steady transitions defined by cinematic restraint." },
          ].map((i, index) => (
            <div 
              key={i.title} 
              className={`p-6 md:p-10 group transition-all duration-500 hover:bg-white ${
                index !== 2 ? "md:border-r border-stone-200" : ""
              } border-b border-stone-200 md:border-b-0`}
            >
              <span className="text-[10px] font-mono text-stone-300 mb-4 block uppercase tracking-tighter">Attribute_0{index + 1}</span>
              <h3 className="text-xl font-serif italic mb-3 group-hover:translate-x-2 transition-transform duration-500">{i.title}</h3>
              <p className="text-base text-stone-500 font-light leading-relaxed">{i.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

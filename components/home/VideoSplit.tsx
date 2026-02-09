"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedButton from "@/components/buttons/AnimatedButton";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

export default function ImageSplit() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const luxeRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content fade-in
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

      // Parallax scale effect on the image
      gsap.fromTo(imageRef.current, 
        { scale: 1.2 },
        { 
          scale: 1,
          scrollTrigger: {
            trigger: imageContainerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );

      // Background text scroll
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
      className="relative bg-[#F9F9F8] text-[#121212] py-10 md:py-24 overflow-hidden selection:bg-black selection:text-white"
    >
      {/* BACKGROUND SCROLLING LOGO */}
      <div 
        ref={luxeRef}
        className="absolute top-1/2 left-0 -translate-y-1/2 pointer-events-none select-none z-0 opacity-[0.03] text-[25vw] font-serif italic font-black leading-none whitespace-nowrap"
      >
        KHUSI CHAUHAN
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center mb-12">
          
          {/* LEFT CONTENT */}
          <div className="lg:col-span-7 vs-content">
            <div className="flex items-center gap-4 mb-6">
              <span className="h-px w-8 bg-black"></span>
              <p className="text-[10px] uppercase tracking-[0.5em] font-bold text-stone-400">The Couture Series</p>
            </div>
            
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-extralight tracking-tighter leading-[0.85] mb-8 uppercase">
              Golden <br />
              <span className="italic font-serif pl-8 md:pl-20 text-stone-400">Bloom</span>
            </h2>

            <p className="text-xl text-stone-600 font-light leading-relaxed mb-10 max-w-lg">
              Intricate hand-stitched floral motifs meet shimmering golden sequins. A silhouette designed to capture light and movement with effortless grace.
            </p>

            <div className="flex flex-wrap gap-2 mb-10">
              {["Hand Embroidery", "Sequin Mesh", "Floral Appliqué"].map((t) => (
                <span key={t} className="text-[10px] uppercase tracking-widest px-4 py-2 bg-white border border-stone-100 shadow-sm text-stone-500 hover:text-black transition-colors">
                  {t}
                </span>
              ))}
            </div>

            <AnimatedButton 
              variant="solid" 
              className="bg-black text-white px-12 py-5 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-stone-800 transition-all"
              onClick={() => router.push("/shop")}
            >
              View Collection
            </AnimatedButton>
          </div>

          {/* RIGHT IMAGE - Replaced Video */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div 
              ref={imageContainerRef}
              className="relative w-full max-w-md aspect-3/4 lg:aspect-2/3 overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]"
            >
              <div ref={imageRef} className="w-full h-full relative">
                 <Image 
                    src="/images/2.jpg" // Ensure your image is saved as 2.jpg in public/images
                    alt="Golden Floral Sequin Gown"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 90vw, (max-width: 1200px) 40vw, 33vw"
                 />
              </div>

              <div className="absolute bottom-8 left-6 right-6 flex justify-between items-end text-white mix-blend-difference">
                <div className="text-[9px] uppercase tracking-[0.4em] font-bold opacity-70">
                  Ref. Gold / Bloom
                </div>
                <div className="text-[9px] uppercase tracking-[0.4em] font-bold opacity-70 text-right">
                  Couture<br/>2026
                </div>
              </div>
            </div>

            <div className="hidden xl:block absolute -bottom-6 -left-12 bg-white p-6 shadow-2xl max-w-50 z-20 border border-stone-50">
              <h4 className="text-[9px] font-bold uppercase tracking-widest mb-2 text-stone-400">Embroidery Detail</h4>
              <p className="text-xs font-light text-stone-600 leading-relaxed italic font-serif">
                &quot;The interplay of pastel floral beads against a radiant gold base.&quot;
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM FEATURE GRID */}
        <div className="mt-12 md:mt-32 grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-stone-200">
          {[
            { title: "The Beadwork", copy: "Hand-applied pastel beads creating a garden of 3D textures." },
            { title: "The Sequin Base", copy: "Micro-sequins provide a liquid-gold shimmer to the corset and skirt." },
            { title: "The Craft", copy: "Hundreds of hours spent in traditional Zardosi-inspired artistry." },
          ].map((i, index) => (
            <div 
              key={i.title} 
              className={`p-6 md:p-12 group transition-all duration-500 hover:bg-white ${
                index !== 2 ? "md:border-r border-stone-200" : ""
              } border-b border-stone-200 md:border-b-0`}
            >
              <span className="text-[10px] font-mono text-stone-300 mb-4 block uppercase tracking-tighter">Detail_0{index + 1}</span>
              <h3 className="text-xl font-serif italic mb-3 group-hover:translate-x-2 transition-transform duration-500">{i.title}</h3>
              <p className="text-sm text-stone-500 font-light leading-relaxed">{i.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

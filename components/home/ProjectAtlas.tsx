 "use client";
 
 import { useEffect, useRef } from "react";
 import gsap from "gsap";
 import { ScrollTrigger } from "gsap/ScrollTrigger";
 import AnimatedButton from "@/components/buttons/AnimatedButton";
 
 gsap.registerPlugin(ScrollTrigger);
 
 export default function ProjectAtlas() {
   const ref = useRef<HTMLDivElement>(null);
 
   useEffect(() => {
     const ctx = gsap.context(() => {
       gsap.from(".pa-card", {
         opacity: 0,
         y: 20,
         duration: 0.8,
         ease: "power2.out",
         stagger: 0.12,
         scrollTrigger: {
           trigger: ref.current,
           start: "top 85%",
         },
       });
     }, ref);
     return () => ctx.revert();
   }, []);
 
   return (
     <section ref={ref} className="relative bg-black text-white py-20 md:py-28">
       <div className="container mx-auto px-6">
         <div className="text-center mb-12">
           <p className="text-xs uppercase tracking-[0.35em] text-gray-400">Project</p>
           <h2 className="text-[clamp(2rem,5vw,4rem)] font-extralight uppercase tracking-tighter">
             Atlas
           </h2>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { title: "Concept", copy: "Seasonal narrative shaped by restraint. Minimal forms, maximal intention." },
             { title: "Material", copy: "Organic silks, ethical wools, and tactile surfaces in monochrome." },
             { title: "Movement", copy: "Measured pacing with cinematic transitions and confident silhouettes." },
           ].map((b) => (
             <div key={b.title} className="pa-card border border-white/10 p-10 hover:border-white/30 transition-colors">
               <h3 className="text-xs uppercase tracking-[0.3em] text-white/80">{b.title}</h3>
               <p className="mt-4 text-sm text-gray-400 leading-relaxed">{b.copy}</p>
             </div>
           ))}
         </div>
         <div className="mt-12 flex justify-center gap-6">
           <AnimatedButton variant="outline">Explore Project</AnimatedButton>
           <AnimatedButton variant="text">View Process</AnimatedButton>
         </div>
       </div>
     </section>
   );
 }

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const collections = [
  {
    id: "best",
    title: "Best Seller",
    image: "/images/0.jpg",
    subtitle: "Our most-loved pieces",
  },
  {
    id: "new",
    title: "New Product",
    image: "/images/4.jpg",
    subtitle: "Fresh arrivals",
  },
  {
    id: "sale",
    title: "Sale Product",
    image: "/images/img5.jpg",
    subtitle: "Seasonal offers",
  },
];

export default function SignatureCollections() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;

    if (!section || !container) return;

    const ctx = gsap.context(() => {
      gsap.to(container, {
        x: () => -(container.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${container.scrollWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden bg-white text-black">
      <div className="absolute top-12 left-12 z-10">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-2">Signature Collections</h2>
        <p className="text-xs text-gray-500 uppercase tracking-wider">Scroll to explore</p>
      </div>

      <div ref={containerRef} className="flex h-full w-fit">
        {collections.map((collection, index) => (
          <div 
            key={collection.id} 
            className="relative h-full w-[92vw] md:w-[60vw] shrink-0 border-r border-gray-100 flex items-center justify-center p-6 md:p-20"
          >
            <div className="relative w-full h-[80%] overflow-hidden group">
               <Image 
                 src={collection.image} 
                 alt={collection.title}
                 fill
                 sizes="(max-width:768px) 90vw, (max-width:1024px) 70vw, 60vw"
                 className="object-cover transition-transform duration-1000 group-hover:scale-110"
               />
               <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
               
               <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                 <span className="text-xs font-bold uppercase tracking-widest mb-2 block">{collection.subtitle}</span>
                 <h3 className="text-4xl md:text-6xl font-light uppercase tracking-tighter mb-4">{collection.title}</h3>
                 <Link href={`/shop?query=${encodeURIComponent(String(collection.title).toLowerCase())}`} className="text-xs uppercase tracking-widest border-b border-white pb-1 hover:text-gray-200 transition-colors">
                   Shop
                 </Link>
               </div>
            </div>
          </div>
        ))}
        {/* End Spacer */}
        <div className="w-[20vw] h-full flex items-center justify-center bg-black text-white">
            <Link href="/shop" className="text-xl uppercase tracking-widest hover:text-gray-400 transition-colors">
                View All
            </Link>
        </div>
      </div>
    </section>
  );
}

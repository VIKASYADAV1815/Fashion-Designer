"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";

gsap.registerPlugin(ScrollTrigger);

const collections = [
  {
    id: "32-kali-bridal-lehenga",
    title: "32-Kali Bridal Lehenga",
    image: "/lehanga/l1.webp",
    subtitle: "Red Magestic Twirl",
    price: 68000
  },
  {
    id: "blush-rose-sequin-saree",
    title: "Blush Rose Sequin Saree",
    image: "/saree/s1.webp",
    subtitle: "Subtle Glamour",
    price: 35000
  },
  {
    id: "ivory-luxe-pearl-drape",
    title: "Ivory Luxe Pearl Drape",
    image: "/drape/d1.webp",
    subtitle: "Modern Sophistication",
    price: 38000
  },
];

export default function SignatureCollections() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { openCart, addItem } = useCart();

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
          scrub: 0.5,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden bg-white text-black">
      <div className="absolute top-12 left-12 z-10">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-2 text-stone-900">Signature Collections</h2>
        <p className="text-xs text-stone-400 uppercase tracking-wider">Scroll to explore</p>
      </div>

      <div ref={containerRef} className="flex h-full w-fit will-change-transform">
        {collections.map((collection, index) => (
          <div 
            key={collection.id} 
            className="relative h-full w-[92vw] md:w-[60vw] shrink-0 border-r border-gray-100 flex items-center justify-center p-6 md:p-20"
          >
            <div className="relative w-full h-[80%] overflow-hidden group">
               <Link href={`/shop/${collection.id}`}>
                 <Image 
                   src={collection.image} 
                   alt={collection.title}
                   fill
                   priority={index === 0}
                   sizes="(max-width:768px) 90vw, (max-width:1024px) 70vw, 60vw"
                   className="object-cover transition-transform duration-1000 group-hover:scale-110 will-change-transform"
                 />
               </Link>
               <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
               
               <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                 <span className="text-xs font-bold uppercase tracking-widest mb-2 block">{collection.subtitle}</span>
                 <h3 className="text-4xl md:text-6xl font-light uppercase tracking-tighter mb-4">{collection.title}</h3>
                 <div className="flex items-center gap-4">
                   <Link href={`/shop/${collection.id}`} className="text-xs uppercase tracking-widest border-b border-white pb-1 hover:text-gray-200 transition-colors">
                     View Details
                   </Link>
                   <button
                     type="button"
                     aria-label="Add to cart"
                     onClick={() => {
                        addItem({ id: collection.id, name: collection.title, price: collection.price, image: collection.image });
                        openCart();
                     }}
                     className="p-2 rounded-full bg-white/20 hover:bg-white text-white hover:text-black transition-colors"
                   >
                     <ShoppingBag size={18} />
                   </button>
                 </div>
               </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

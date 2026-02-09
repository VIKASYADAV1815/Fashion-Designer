"use client";

import Image from "next/image";

export default function Craftsmanship() {
  return (
    <section className="py-24 bg-white text-black">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
             <div className="relative aspect-square overflow-hidden">
               <Image 
                 src="/images/2.jpg"
                 alt="Craftsmanship"
                 fill
                 className="object-cover"
                 sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 33vw"
               />
             </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-4xl md:text-5xl font-light uppercase tracking-tighter mb-8">The Atelier</h2>
            <p className="text-sm leading-loose text-gray-600 mb-6">
              Our atelier is the heart of creation — traditional hand‑craft meets modern innovation.
              We source fine materials and construct each garment with meticulous care for longevity and style.
            </p>
            <p className="text-sm leading-loose text-gray-600">
              A study in silhouettes, texture, and proportion — designed to be lived in and remembered.
            </p>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative aspect-4/5verflow-hidden">
            <Image src="/images/img16.png" alt="Best Seller" fill className="object-cover" sizes="(max-width: 768px) 90vw, (max-width: 1200px) 30vw, 25vw" />
          </div>
          <div className="relative aspect-4/5 overflow-hidden">
            <Image src="/images/img21.png" alt="Floral Organza" fill className="object-cover" sizes="(max-width: 768px) 90vw, (max-width: 1200px) 30vw, 25vw" />
          </div>
          <div className="relative aspect-4/5 overflow-hidden">
            <Image src="/images/img7.png" alt="Chic Casuals" fill className="object-cover" sizes="(max-width: 768px) 90vw, (max-width: 1200px) 30vw, 25vw" />
          </div>
        </div>
      </div>
    </section>
  );
}

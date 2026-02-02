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
                 src="https://images.unsplash.com/photo-1605518216938-7f31b709d04a?q=80&w=2070&auto=format&fit=crop"
                 alt="Craftsmanship"
                 fill
                 className="object-cover"
               />
             </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-4xl md:text-5xl font-light uppercase tracking-tighter mb-8">The Atelier</h2>
            <p className="text-sm leading-loose text-gray-600 mb-6">
              Our atelier is the heart of our creation. Here, traditional techniques meet modern innovation. 
              We source only the finest sustainable materials—organic silks, ethical wools, and plant-based leathers.
            </p>
            <p className="text-sm leading-loose text-gray-600">
              Each garment is constructed with meticulous attention to detail, ensuring longevity not just in durability, 
              but in style. We create heirlooms for the future.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

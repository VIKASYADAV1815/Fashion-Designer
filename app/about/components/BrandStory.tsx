"use client";

import Image from "next/image";
import RevealText from "@/components/animations/RevealText";

export default function BrandStory() {
  return (
    <section className="relative min-h-[70vh] md:min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/img7.png"
          alt="Studio Editorial"
          fill
          priority
          className="object-cover opacity-60"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30" />

      <div className="relative z-10 max-w-4xl px-6 text-center py-24 md:py-32">
        <h2 className="text-xs font-bold uppercase tracking-[0.3em] mb-6 text-gray-300">Our Philosophy</h2>
        <div className="text-3xl md:text-5xl font-light leading-relaxed tracking-wide mb-10">
          <RevealText
            text="Crafting luxury ethnic wear where heritage meets modern silhouettes."
            className="inline"
            delay={0.2}
          />
        </div>
        <div className="space-y-6 max-w-3xl mx-auto">
          <p className="text-gray-300 text-sm md:text-base leading-loose font-light tracking-wider">
            From bespoke bridal lehengas to effortless casual‑fit sarees, we design for elegance.
            Intentional forms, elevated fabrics, and quiet confidence define the studio ethos.
          </p>
          <p className="text-gray-300 text-sm md:text-base leading-loose font-light tracking-wider">
            Our practice blends heritage craftsmanship with contemporary proportion,
            focusing on wearability, longevity, and refinement in everyday movement.
          </p>
        </div>
      </div>
    </section>
  );
}

"use client";

import RevealText from "@/components/animations/RevealText";

export default function BrandStory() {
  return (
    <section className="py-32 px-6 bg-black text-white flex items-center justify-center min-h-screen">
      <div className="max-w-4xl text-center">
        <h2 className="text-xs font-bold uppercase tracking-[0.3em] mb-12 text-gray-400">Our Philosophy</h2>
        <div className="text-3xl md:text-5xl font-light leading-relaxed tracking-wide mb-12">
          <RevealText 
            text="We believe in the quiet power of elegance. Not to be seen, but to be remembered." 
            className="inline"
            delay={0.2}
          />
        </div>
        <div className="max-w-2xl mx-auto text-gray-400 text-sm leading-loose font-light tracking-wider">
           <p>
             Founded in 2026, Luxe Fashion House was born from a desire to strip away the noise of modern fashion. 
             We return to the essentials: form, fabric, and feeling. Every piece is a dialogue between the artisan and the wearer.
           </p>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const faqs = [
  {
    q: "What are your shipping timelines?",
    a: "Standard shipping arrives in 5–7 business days; express in 2–3 business days. International deliveries take 7–14 business days depending on destination.",
  },
  {
    q: "Do you offer returns or exchanges?",
    a: "Yes. We accept returns/exchanges within 7 days of purchase if items are unused, in original condition, and with packaging intact. Sale items may be ineligible.",
  },
  {
    q: "How do bespoke or made-to-order pieces work?",
    a: "Bespoke timelines vary based on design complexity and fittings. We share an estimated completion date at confirmation and keep you updated during production.",
  },
  {
    q: "What sizing guidance do you provide?",
    a: "Each product includes fit notes. For precise measurements or bespoke sizing, contact support and we’ll assist with tailored guidance.",
  },
  {
    q: "How do I contact support?",
    a: "Email support@khushichauhan.com for order, shipping, sizing, or returns assistance. For privacy matters, email privacy@khushichauhan.studio.",
  },
];

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <main className="bg-white text-black min-h-screen font-sans selection:bg-black selection:text-white">
      {/* Hero */}
      <section className="relative min-h-[45vh] md:min-h-[55vh] flex items-end">
        <Image
          src="/images/4.jpg"
          alt="FAQ Hero"
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
        <div className="relative z-10 w-full max-w-6xl mx-auto px-8 py-16 md:py-24 text-white">
          <h1 className="text-4xl md:text-6xl font-light uppercase tracking-tighter">Information</h1>
          <p className="mt-4 text-sm md:text-base text-white/80 max-w-2xl">
            Everything you need to know about shipping, returns, sizing, and bespoke services.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 md:px-12 pt-16 md:pt-24 pb-24">
        {/* Section label */}
        <div className="mb-12">
          <span className="text-[10px] uppercase tracking-[0.5em] font-semibold text-neutral-400">
            Frequently Asked Questions
          </span>
        </div>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Label */}
          <div className="lg:col-span-4">
            <div className="sticky top-10">
              <h2 className="text-2xl md:text-4xl font-light uppercase tracking-tighter">Answers & Guidance</h2>
              <p className="mt-3 text-sm md:text-base text-neutral-500 max-w-sm">Tap a question to expand.</p>
            </div>
          </div>

          {/* FAQ List */}
          <div className="lg:col-span-8">
            <div className="border-t border-neutral-200">
              {faqs.map((item, i) => (
                <div key={i} className="border-b border-neutral-200">
                  <button
                    onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                    className="w-full py-8 md:py-10 flex items-center justify-between text-left group transition-colors hover:bg-neutral-50/50 px-2"
                  >
                    <span className="text-xl md:text-2xl font-light tracking-tight pr-8">
                      {item.q}
                    </span>
                    <div className="relative flex items-center justify-center w-6 h-6">
                      <motion.span
                        animate={{ rotate: activeIndex === i ? 90 : 0 }}
                        className="absolute h-px w-full bg-black"
                      />
                      <motion.span
                        animate={{ rotate: activeIndex === i ? 0 : 90 }}
                        className="absolute h-px w-full bg-black"
                      />
                    </div>
                  </button>

                  <AnimatePresence>
                    {activeIndex === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-10 px-2 max-w-2xl">
                          <p className="text-base md:text-lg text-neutral-600 font-light leading-relaxed">
                            {item.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Visual mosaic */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6">
          {["/images/img7.png","/images/4.jpg","/images/img16.png"].map((src, i) => (
            <div key={i} className="relative aspect-4/5 overflow-hidden rounded-sm">
              <Image src={src} alt={`FAQ Visual ${i+1}`} fill sizes="(max-width: 1024px) 90vw, 30vw" className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

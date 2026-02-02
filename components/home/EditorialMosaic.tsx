"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const items = [
  {
    title: "The Cut",
    copy: "Architectural lines meet fluid movement.",
    image: "https://images.unsplash.com/photo-1516826957135-0b0f1aae2adb?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Texture",
    copy: "A study in contrasts: silk, stone, velvet.",
    image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Monochrome",
    copy: "Shades of black define the silhouette.",
    image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Proportion",
    copy: "Bold volumes, precise tailoring.",
    image: "https://images.unsplash.com/photo-1503342394128-c104d54dba01?q=80&w=1600&auto=format&fit=crop",
  },
];

export default function EditorialMosaic() {
  return (
    <section className="bg-white text-black py-24 px-6">
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-5xl font-light uppercase tracking-tighter">Editorial</h2>
          <p className="text-xs uppercase tracking-[0.25em] text-gray-500 mt-3">Design Notes</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {items.map((item, i) => (
            <motion.article
              key={item.title}
              className={i % 2 === 0 ? "md:col-span-7" : "md:col-span-5"}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut", delay: i * 0.05 }}
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width:768px) 100vw, (max-width:1024px) 66vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="mt-6">
                <h3 className="text-2xl md:text-3xl font-light uppercase tracking-tight">{item.title}</h3>
                <p className="text-sm text-gray-600 mt-3">{item.copy}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

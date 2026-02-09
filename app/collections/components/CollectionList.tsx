"use client";

import Link from "next/link";
import Image from "next/image";

const collections = [
  {
    id: "ethereal-silence",
    title: "Ethereal Silence",
    description: "A study in minimal silhouettes and luminous textures.",
    image: "/images/4.jpg",
  },
  {
    id: "floral-organza",
    title: "Floral Organza",
    description: "Pastel florals and airy organza crafted for daylight elegance.",
    image: "/images/img21.png",
  },
  {
    id: "chic-casuals",
    title: "Chic Casuals",
    description: "Effortless drape casual fits for everyday movement.",
    image: "/images/img7.png",
  },
];

export default function CollectionList() {
  return (
    <div className="py-24 bg-white text-black">
      <div className="container mx-auto px-6">
         <div className="space-y-32">
           {collections.map((collection, index) => (
             <div key={collection.id} className={`flex flex-col md:flex-row gap-12 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
               <div className="w-full md:w-1/2 aspect-4/5 relative overflow-hidden group">
                 <Image 
                   src={collection.image}
                   alt={collection.title}
                   fill
                   sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 50vw"
                   className="object-cover transition-transform duration-1000 group-hover:scale-105"
                 />
               </div>
              <div className="w-full md:w-1/2 text-center md:text-left px-12">
                 <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-gray-500 mb-4 block">Collection {index + 1}</span>
                 <h2 className="text-5xl md:text-7xl font-light uppercase tracking-tighter mb-6">{collection.title}</h2>
                 <p className="text-base md:text-lg italic font-serif text-gray-600 mb-8">{collection.description}</p>
                 <div className="flex flex-wrap items-center gap-6">
                   <Link href={`/shop?query=${encodeURIComponent(collection.title.toLowerCase())}`} className="text-[11px] uppercase tracking-[0.3em] border border-black px-5 py-3 hover:bg-black hover:text-white transition-colors">
                     Shop This Collection
                   </Link>
                   <Link href="/collections" className="text-[11px] uppercase tracking-[0.3em] border border-black/30 px-5 py-3 hover:bg-black hover:text-white transition-colors">
                     View Lookbook
                   </Link>
                 </div>
              </div>
             </div>
           ))}
         </div>
      </div>
    </div>
  );
}

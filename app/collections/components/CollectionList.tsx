"use client";

import Link from "next/link";
import Image from "next/image";

const collections = [
  {
    id: "ss26",
    title: "Spring/Summer 2026",
    description: "Ethereal Silence",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "fw25",
    title: "Fall/Winter 2025",
    description: "Urban Noir",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1887&auto=format&fit=crop"
  },
  {
    id: "resort25",
    title: "Resort 2025",
    description: "Desert Rose",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1020&auto=format&fit=crop"
  }
];

export default function CollectionList() {
  return (
    <div className="py-24 bg-white text-black">
      <div className="container mx-auto px-6">
         <div className="space-y-32">
           {collections.map((collection, index) => (
             <div key={collection.id} className={`flex flex-col md:flex-row gap-12 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
               <div className="w-full md:w-1/2 aspect-[4/5] relative overflow-hidden group">
                 <Image 
                   src={collection.image}
                   alt={collection.title}
                   fill
                   className="object-cover transition-transform duration-1000 group-hover:scale-105"
                 />
               </div>
               <div className="w-full md:w-1/2 text-center md:text-left px-12">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4 block">Collection {index + 1}</span>
                  <h2 className="text-4xl md:text-6xl font-light uppercase tracking-tighter mb-6">{collection.title}</h2>
                  <p className="text-lg italic font-serif text-gray-600 mb-8">{collection.description}</p>
                  <Link href={`/collections/${collection.id}`} className="inline-block border-b border-black pb-1 text-xs uppercase tracking-widest hover:opacity-50 transition-opacity">
                    Explore Campaign
                  </Link>
               </div>
             </div>
           ))}
         </div>
      </div>
    </div>
  );
}

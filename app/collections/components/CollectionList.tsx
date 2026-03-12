"use client";

import Link from "next/link";
import Image from "next/image";

const collections = [
  {
    id: "lehenga",
    title: "The Royal Lehenga",
    description: "Step into a world of regal grandeur with our meticulously handcrafted lehengas. Featuring intricate Zardozi, Gota Patti, and sequin embellishments on rich silks and flowy georgettes, each piece is a modern heirloom designed for the bride who commands attention. Experience the perfect blend of traditional artistry and contemporary silhouettes.",
    image: "/lehanga/l1.webp",
    href: "/shop?category=Lehenga",
  },
  {
    id: "saree",
    title: "Timeless Sarees",
    description: "Six yards of pure elegance, reimagined for the modern muse. Our saree collection ranges from delicate sequin-embellished nets to luxurious silk drapes. Whether it's a cocktail evening or a festive celebration, these sarees promise a graceful fall and an effortless statement of sophistication.",
    image: "/saree/s1.webp",
    href: "/shop?category=Saree",
  },
  {
    id: "drape-saree",
    title: "Couture Drapes",
    description: "Redefining the classic saree with pre-draped perfection and structured corsetry. These fusion ensembles blend the fluidity of a saree with the edginess of a gown. Featuring cut-dana work, pearl detailing, and dramatic silhouettes, they are crafted for the woman who loves to stand out.",
    image: "/drape/d1.webp",
    href: "/shop?category=Drape",
  },
  {
    id: "dress",
    title: "Evening Gowns",
    description: "Sculpted to perfection, our evening gowns are a celebration of femininity and power. With sleek cuts, corset bodices, and luxurious fabrics, these statement pieces are designed for red-carpet moments and high-fashion soirées. Elevate your evening wardrobe with designs that speak of understated luxury.",
    image: "/lehanga/corset.jpeg",
    href: "/shop?query=dress",
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
                  <Link href={collection.href} className="text-[11px] uppercase tracking-[0.3em] border border-black px-5 py-3 hover:bg-black hover:text-white transition-colors">
                     Shop This Collection
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

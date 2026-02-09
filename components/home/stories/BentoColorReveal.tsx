"use client";

import { ArrowRight, ShoppingBag, Check } from "lucide-react";
import InMotionSlider from "./InMotionSlider";
import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { motion } from "framer-motion";
import { useState } from "react";

const bentoProducts = [
  { type: "video", name: "Heritage Lehenga", price: "₹84,500", src: "https://res.cloudinary.com/dzq7axes2/video/upload/v1770113143/video1_em8fnl.mp4", span: "md:col-span-4 md:row-span-2", mobileRatio: "aspect-[9/15]" },
  { type: "image", name: "Evening Drape", price: "₹22,000", src: "/images/img1.jpg", span: "md:col-span-4 md:row-span-2", mobileRatio: "aspect-[9/15]" },
  { type: "image", name: "Silk Saree", price: "₹18,500", src: "/images/img8.png", span: "md:col-span-4 md:row-span-1", mobileRatio: "aspect-square" },
  { type: "video", name: "Bridal Couture", price: "Custom", src: "https://res.cloudinary.com/dzq7axes2/video/upload/v1770112837/video2_gnoyzr.mov", span: "md:col-span-4 md:row-span-2", mobileRatio: "aspect-[9/15]" },
  { type: "image", name: "Floral Organza", price: "₹34,000", src: "/images/img21.png", span: "md:col-span-4 md:row-span-2", mobileRatio: "aspect-[9/15]" },
  { type: "image", name: "Banarasi Work", price: "₹1,10,000", src: "/images/img13.png", span: "md:col-span-4 md:row-span-2", mobileRatio: "aspect-[9/15]" },
  { type: "image", name: "Chic Casuals", price: "₹12,500", src: "/images/img7.png", span: "md:col-span-4 md:row-span-1", mobileRatio: "aspect-square" },
];

export default function BentoWithCompactSlider() {
  const { openCart } = useCart();
  const { addItem } = useCart();
  const [addedIndex, setAddedIndex] = useState<number | null>(null);
  const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return (
    <section className="bg-[#fcfaf8] text-stone-900 py-10 md:py-20 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* BENTO GRID AS PRODUCT CARDS */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-2xl md:text-4xl font-serif tracking-tight text-stone-800">
              Atelier <span className="italic font-light">Archive</span>
            </h2>
            <p className="text-xs uppercase tracking-widest text-stone-400 mt-2">Curated Masterpieces</p>
          </div>
          <Link href="/shop" className="hidden md:flex items-center gap-2 text-xs uppercase tracking-widest font-semibold hover:gap-4 transition-all duration-300">
            View All <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 grid-flow-dense md:auto-rows-[300px] gap-6 mb-24">
          {bentoProducts.map((p, i) => (
            <div key={i} className={`relative overflow-hidden bg-white rounded-lg shadow-sm border border-stone-100 group transition-all duration-500 hover:shadow-xl ${p.span} ${p.mobileRatio} md:aspect-auto`}>
              {/* Media Container */}
              <div className="w-full h-full relative overflow-hidden">
                {p.type === "video" ? (
                  <video className="w-full h-full object-cover" autoPlay muted loop playsInline preload="auto">
                    <source src={p.src} type="video/mp4" />
                  </video>
                ) : (
                  <img src={p.src} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                )}
                
                {/* --- HIGHLIGHTED FIX: Gradient and Text visibility --- */}
                {/* Made gradient visible by default on mobile (opacity-100) and hover on desktop */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Ensured content doesn't "touch the bottom" by adding consistent padding and removing the translate-y on mobile */}
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex justify-between items-end">
                    <div className="text-white">
                      <p className="text-[10px] uppercase tracking-widest opacity-80 mb-1">New Collection</p>
                      <h3 className="text-lg font-serif leading-tight">{p.name}</h3>
                      <p className="text-sm font-light italic mt-1">{p.price}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        addItem({ id: slug(p.name), name: p.name, price: Number(String(p.price).replace(/[^0-9]/g,"")) || 0, image: p.src });
                        setAddedIndex(i);
                        openCart();
                        setTimeout(() => setAddedIndex(null), 1200);
                      }}
                      className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white hover:bg-white hover:text-stone-900 transition-colors relative"
                      aria-label="Add to Cart"
                    >
                      {addedIndex === i ? <Check size={18} /> : <ShoppingBag size={18} />}
                      {addedIndex === i && (
                        <motion.span
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: -6 }}
                          exit={{ opacity: 0, y: -12 }}
                          className="absolute -top-2 -right-2 text-[9px] bg-white text-stone-900 px-2 py-0.5 rounded-full"
                        >
                          Added
                        </motion.span>
                      )}
                    </button>
                  </div>
                </div>
                {/* --- END FIX --- */}
              </div>
            </div>
          ))}
        </div>

        {/* INMOTION COMPACT SLIDER */}
        <InMotionSlider />
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { 
          -ms-overflow-style: none; 
          scrollbar-width: none; 
        }
      `}</style>
    </section>
  );
}

"use client";

import { useState } from "react";
import { ShoppingBag, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/components/cart/CartProvider";
import Link from "next/link";

import Image from "next/image";

const sliderProducts = [
  { id: "gilded-nightfall-drape", name: "Gilded Nightfall Drape", price: "₹35,000", img: "/drape/d31.webp" },
  { id: "black-opulence-corset-cowl-drape", name: "Black Opulence Corset", price: "₹26,000", img: "/drape/d41.webp" },
  { id: "lavender-aura-beaded-halter-drape", name: "Lavender Aura Beaded", price: "₹26,000", img: "/drape/d51.webp" },
  { id: "maroon-majesty-drape", name: "Maroon Majesty Drape", price: "₹25,000", img: "/drape/d61.webp" },
  { id: "peach-muse-corset-drape", name: "Peach Muse Corset Drape", price: "₹32,000", img: "/drape/d71.webp" },
  { id: "shisha-noor-lehenga", name: "Shisha Noor Lehenga", price: "₹28,000", img: "/lehanga/l91.webp" },
  { id: "gulrang-festive-lehenga-set", name: "Gulrang Festive Lehenga", price: "₹28,000", img: "/lehanga/l31.webp" },
  { id: "rangrez-ombre-festive-lehenga-set", name: "Rangrez Ombre Lehenga", price: "₹35,000", img: "/lehanga/l51.webp" },
];

export default function InMotionSlider() {
  const { addItem, openCart } = useCart();
  const [addedIndex, setAddedIndex] = useState<number | null>(null);

  const handleAddToCart = (item: typeof sliderProducts[0], idx: number) => {
    const numericPrice = Number(String(item.price).replace(/[^0-9]/g, "")) || 0;
    addItem({ id: item.id, name: item.name, price: numericPrice, image: item.img });
    setAddedIndex(idx);
    openCart();
    setTimeout(() => setAddedIndex(null), 1500);
  };

  return (
    <section className="py-10 bg-white overflow-hidden">
      {/* Header Section */}
      <div className="flex items-end justify-between mb-10 px-6 md:px-12">
        <div className="space-y-1">
          <h3 className="text-[10px] uppercase tracking-[0.3em] font-medium text-stone-400">
            Curated Collection
          </h3>
          <h2 className="text-2xl font-serif text-stone-800 italic">Featured Pieces</h2>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <span className="text-[10px] uppercase tracking-widest text-stone-400">Scroll to explore</span>
          <div className="w-12 h-[1px] bg-stone-200" />
        </div>
      </div>

      {/* Main Slider Container */}
      <div className="relative w-full overflow-hidden">
        <div 
          className="flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-hide px-6 md:px-12 gap-6 pb-8 overscroll-x-contain"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {sliderProducts.map((item, idx) => (
            <div 
              key={item.id}
              className="min-w-[75vw] md:min-w-[320px] lg:min-w-[380px] snap-start group will-change-transform"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden bg-stone-50 mb-4 transition-all duration-500 ease-out will-change-transform">
                <Link href={`/shop/${item.id}`} className="cursor-pointer block relative w-full h-full">
                  <Image
                    src={item.img}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105 will-change-transform"
                    sizes="(max-width: 768px) 75vw, (max-width: 1024px) 320px, 380px"
                    priority={idx < 2}
                  />
                </Link>

                {/* Aesthetic Overlay Badge */}
                <div className="absolute top-0 left-0 p-4 pointer-events-none">
                   <span className="text-[9px] tracking-[0.2em] uppercase bg-white/80 backdrop-blur-md px-2 py-1 text-stone-600">
                     New Arrival
                   </span>
                </div>

                {/* Add to Cart Button - Refined UI */}
                <div className="absolute bottom-4 right-4 z-10">
                  <button
                    onClick={() => handleAddToCart(item, idx)}
                    className="h-12 w-12 flex items-center justify-center bg-white/90 backdrop-blur-sm text-stone-900 rounded-full shadow-sm hover:bg-stone-900 hover:text-white transition-all duration-300 active:scale-90"
                    aria-label="Add to cart"
                  >
                    <AnimatePresence mode="wait">
                      {addedIndex === idx ? (
                        <motion.div
                          key="check"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Check size={18} strokeWidth={1.5} />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="bag"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ShoppingBag size={18} strokeWidth={1.5} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-1">
                <Link href={`/shop/${item.id}`}>
                  <h4 className="text-sm tracking-wide text-stone-800 group-hover:text-stone-500 transition-colors duration-300">
                    {item.name}
                  </h4>
                </Link>
                <p className="text-xs text-stone-500 font-light">{item.price}</p>
              </div>
            </div>
          ))}
          
          {/* Spacer for the end of the scroll */}
          <div className="min-w-[24px] md:min-w-[48px]" />
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
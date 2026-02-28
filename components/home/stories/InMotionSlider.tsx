"use client";

import { useRef, useEffect, useState } from "react";
import { ShoppingBag, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/components/cart/CartProvider";
import Link from "next/link";

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
  const [width, setWidth] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);
  const { addItem, openCart } = useCart();
  const [addedIndex, setAddedIndex] = useState<number | null>(null);

  useEffect(() => {
    const calculateWidth = () => {
      if (carousel.current) {
        setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
      }
    };

    calculateWidth();
    // Recalculate after a short delay to account for image loading
    const timer = setTimeout(calculateWidth, 1000);
    window.addEventListener("resize", calculateWidth);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", calculateWidth);
    };
  }, []);

  return (
    <div className="mt-16 border-t border-stone-200 pt-10 overflow-hidden select-none">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8 px-6">
        <h3 className="text-xs uppercase tracking-[0.4em] font-bold text-stone-500">
          Featured / <span className="text-stone-300">Products</span>
        </h3>
        <div className="flex gap-2">
          <span className="w-8 h-px bg-stone-300 self-center" />
          <p className="text-[10px] uppercase tracking-widest text-stone-400">
            Swipe to Explore
          </p>
        </div>
      </div>

      {/* Slider Container */}
      <div 
        ref={carousel} 
        className="px-6 overflow-hidden"
      >
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          dragElastic={0.2}
          whileTap={{ cursor: "grabbing" }}
          className="flex gap-8 cursor-grab will-change-transform w-fit"
        >
          {sliderProducts.map((item, idx) => (
            <div 
              key={idx} 
              className="min-w-[280px] md:min-w-[340px] group"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden mb-4 rounded-md bg-stone-100">
                <Link href={`/shop/${item.id}`} className="block w-full h-full">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 will-change-transform"
                    draggable="false"
                  />
                </Link>
                
                {/* Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-[9px] uppercase tracking-widest font-bold shadow-sm">
                  Quick Ship
                </div>

                {/* Fixed Cart Icon Logic */}
                <div className="absolute bottom-6 right-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
                  <button
                    className="bg-stone-900 text-white p-4 rounded-full shadow-xl border border-white/20 hover:bg-stone-800 active:scale-95 transition-all relative"
                    onClick={() => {
                      addItem({ id: item.id, name: item.name, price: Number(String(item.price).replace(/[^0-9]/g,"")) || 0, image: item.img });
                      setAddedIndex(idx);
                      openCart();
                      setTimeout(() => setAddedIndex(null), 1200);
                    }}
                    aria-label="Add to cart"
                  >
                    {addedIndex === idx ? <Check size={20} /> : <ShoppingBag size={20} />}
                  </button>
                </div>
              </div>

              {/* Text Info */}
              <Link href={`/shop/${item.id}`} className="space-y-1 block">
                <h4 className="text-md font-serif text-stone-800 group-hover:text-stone-500 transition-colors">
                  {item.name}
                </h4>
                <p className="text-xs text-stone-400 tracking-wider">{item.price}</p>
              </Link>
            </div>
          ))}
          {/* Extra padding at the end */}
          <div className="min-w-5" />
        </motion.div>
      </div>
    </div>
  );
}

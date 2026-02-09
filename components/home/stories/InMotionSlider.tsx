"use client";

import { useRef, useEffect, useState } from "react";
import { ShoppingBag, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/components/cart/CartProvider";

const sliderProducts = [
  { name: "Mehendi Fit", price: "₹15,000", img: "/images/img21.png" },
  { name: "Reception Gown", price: "₹45,000", img: "/images/img17.png" },
  { name: "Cocktail Saree", price: "₹28,000", img: "/images/img6.jpg" },
  { name: "Haldi Special", price: "₹12,000", img: "/images/img14.png" },
  { name: "Modern Drape", price: "₹22,500", img: "/images/img1.jpg" },
  { name: "Modern Drape", price: "₹22,500", img: "/images/img20.png" },
  { name: "Modern Drape", price: "₹22,500", img: "/images/img10.png" },
  { name: "Modern Drape", price: "₹22,500", img: "/images/img16.png" },
];

export default function InMotionSlider() {
  const [width, setWidth] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);
  const { addItem, openCart } = useCart();
  const [addedIndex, setAddedIndex] = useState<number | null>(null);
  const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, []);

  return (
    <div className="mt-16 border-t border-stone-200 pt-10 overflow-hidden">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8 px-6">
        <h3 className="text-xs uppercase tracking-[0.4em] font-bold text-stone-500">
          InMotion / <span className="text-stone-300">Spring 26</span>
        </h3>
        <div className="flex gap-2">
          <span className="w-8 h-[1px] bg-stone-300 self-center" />
          <p className="text-[10px] uppercase tracking-widest text-stone-400">
            Swipe to Explore
          </p>
        </div>
      </div>

      {/* Slider Container */}
      <motion.div 
        ref={carousel} 
        className="cursor-grab active:cursor-grabbing px-6"
      >
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          dragElastic={0.1}
          className="flex gap-8"
        >
          {sliderProducts.map((item, idx) => (
            <div 
              key={idx} 
              className="min-w-[280px] md:min-w-[340px] group select-none"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden mb-4 rounded-md bg-stone-100">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  draggable="false"
                />
                
                {/* Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-[9px] uppercase tracking-widest font-bold shadow-sm">
                  Quick Ship
                </div>

                {/* Fixed Cart Icon Logic */}
                <div className="absolute bottom-6 right-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
                  <button
                    className="bg-stone-900 text-white p-4 rounded-full shadow-xl border border-white/20 hover:bg-stone-800 active:scale-95 transition-all relative"
                    onClick={() => {
                      addItem({ id: slug(item.name + idx), name: item.name, price: Number(String(item.price).replace(/[^0-9]/g,"")) || 0, image: item.img });
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
              <div className="space-y-1">
                <h4 className="text-md font-serif text-stone-800 group-hover:text-stone-500 transition-colors">
                  {item.name}
                </h4>
                <p className="text-xs text-stone-400 tracking-wider">{item.price}</p>
              </div>
            </div>
          ))}
          {/* Extra padding at the end */}
          <div className="min-w-[20px]" />
        </motion.div>
      </motion.div>
    </div>
  );
}

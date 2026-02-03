"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface MegaMenuProps {
  isOpen: boolean;
  activeCategory: string | null;
  onClose: () => void;
}

const categories = {
  women: {
    links: [
      "All Categories",
      "Lehenga",
      "Dress",
      "Saree",
      "Drape Casual Fit"
    ],
    featured: "Editorial: Women's Couture",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1170&auto=format&fit=crop"
  },
  policies: {
    links: [
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Refund Policy", href: "/refund-policy" },
      { name: "Return Policy", href: "/return-policy" },
      { name: "Shipping Policy", href: "/shipping-policy" },
      { name: "Terms & Conditions", href: "/terms-and-conditions" },
    ],
    featured: "Store Policies",
    image: "/images/3.jpg"
  },
};

export default function MegaMenu({ isOpen, activeCategory, onClose }: MegaMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && activeCategory && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "circOut" }}
          className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-md border-t border-white/10 z-40 overflow-hidden"
          onMouseLeave={onClose}
          role="region"
          aria-label="Primary navigation submenu"
        >
          <div className="container mx-auto px-6 py-12 grid grid-cols-12 gap-8 text-white">
            <div className="col-span-12 lg:col-span-6">
              <h3 className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-6">{activeCategory}</h3>
              <ul className="grid grid-cols-2 gap-4">
                {categories[activeCategory as keyof typeof categories]?.links.map((link: any, i: number) => (
                  <motion.li 
                    key={typeof link === "string" ? link : link.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link 
                      href={typeof link === "string" ? "#" : link.href} 
                      className="text-lg hover:text-gray-300 transition-colors uppercase tracking-wider font-light"
                    >
                      {typeof link === "string" ? link : link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="hidden lg:block lg:col-span-6">
              <div className="relative h-[40vh] w-full overflow-hidden rounded-sm">
                <Image
                  src={categories[activeCategory as keyof typeof categories]?.image}
                  alt={`${activeCategory} preview`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/0" />
                <div className="absolute bottom-6 left-6">
                  <span className="text-xs uppercase tracking-[0.25em] text-white/70">Featured</span>
                  <p className="text-2xl mt-3 tracking-wider uppercase">{categories[activeCategory as keyof typeof categories]?.featured}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

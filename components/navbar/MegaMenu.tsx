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
    links: ["New Arrivals", "Clothing", "Shoes", "Bags", "Accessories", "Jewelry"],
    featured: "Editorial: The New Silhouette",
    image: "https://images.unsplash.com/photo-1483181957632-8bda974cbc91?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  men: {
    links: ["New Arrivals", "Clothing", "Shoes", "Bags", "Accessories", "Watches"],
    featured: "Collection: Urban Noir",
    image: "https://images.unsplash.com/photo-1647965756061-827c9bf70fe6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  accessories: {
    links: ["All Accessories", "Belts", "Scarves", "Hats", "Sunglasses", "Wallets"],
    featured: "Essentials",
    image: "https://images.unsplash.com/photo-1630233903714-083b5a85da90?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  jewellery: {
    links: ["New Arrivals", "Necklaces", "Rings", "Bracelets", "Earrings", "Fine"],
    featured: "Fine Details",
    image: "https://images.unsplash.com/photo-1695050049047-54e27a908898?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  collections: {
    links: ["Spring/Summer 2026", "Fall/Winter 2025", "Runway", "Campaigns"],
    featured: "Archive",
    image: "https://images.unsplash.com/photo-1681308835217-72f0b99da82d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
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
                {categories[activeCategory as keyof typeof categories]?.links.map((link, i) => (
                  <motion.li 
                    key={link}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link 
                      href="#" 
                      className="text-lg hover:text-gray-300 transition-colors uppercase tracking-wider font-light"
                    >
                      {link}
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

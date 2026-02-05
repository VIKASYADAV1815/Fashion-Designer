"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface MegaMenuProps {
  isOpen: boolean;
  activeCategory: string | null;
  onClose: () => void;
}

const categories = {
  policies: {
    links: [
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Refund Policy", href: "/refund-policy" },
      { name: "Return Policy", href: "/return-policy" },
      { name: "Shipping Policy", href: "/shipping-policy" },
      { name: "Terms & Conditions", href: "/terms-and-conditions" },
    ],
    featured: "Store Policies",
    image: "/images/img7.png",
  },
};

export default function MegaMenu({ isOpen, activeCategory, onClose }: MegaMenuProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <AnimatePresence>
      {isOpen && activeCategory && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className={cn(
            "absolute top-full left-0 right-0 z-40 border-t border-white/10 bg-black",
            isHome ? "" : ""
          )}
          onMouseLeave={onClose}
        >
          <div className="container mx-auto px-6 py-8 grid grid-cols-12 gap-6 text-white">
            <div className="col-span-12 lg:col-span-6">
              <h3 className="mb-4 text-xs uppercase tracking-[0.25em] text-gray-500">
                {activeCategory}
              </h3>

              <ul className="grid grid-cols-2 gap-4">
                {categories[activeCategory as keyof typeof categories]?.links.map(
                  (link, i) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <Link
                        href={link.href}
                        className="text-lg uppercase tracking-wider font-light hover:text-gray-300"
                      >
                        {link.name}
                      </Link>
                    </motion.li>
                  )
                )}
              </ul>
            </div>

            <div className="hidden lg:block lg:col-span-6">
              <div className="relative h-[32vh] overflow-hidden rounded-sm">
                <Image
                  src={categories[activeCategory as keyof typeof categories]?.image}
                  alt="Featured"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-xs uppercase tracking-[0.25em] text-white/70">
                    Featured
                  </span>
                  <p className="mt-2 text-xl uppercase tracking-wider">
                    {categories[activeCategory as keyof typeof categories]?.featured}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

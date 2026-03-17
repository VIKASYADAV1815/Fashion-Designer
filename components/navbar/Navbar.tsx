"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";
import MegaMenu from "./MegaMenu";
import { cn } from "@/lib/utils";
import CartDrawer from "@/components/cart/CartDrawer";
import { useCart } from "@/components/cart/CartProvider";
import { usePathname, useRouter } from "next/navigation";
import productsData from "@/lib/products.json";

import UserDropdown from "./UserDropdown";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const { scrollY } = useScroll();
  const { items, openCart, closeCart, open } = useCart();
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const filtered = (productsData as any[]).filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.subCategory && p.subCategory.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    const t = setTimeout(() => {
      setActiveCategory(null);
      setIsMobileMenuOpen(false);
      setSearchOpen(false);
      setSearchQuery("");
    }, 0);
    return () => clearTimeout(t);
  }, [pathname]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const dy = latest - lastY.current;
    lastY.current = latest;
    setIsScrolled(latest > 50);
    if (latest < 10) {
      setHidden(false);
      return;
    }
    if (dy > 2) {
      setHidden(true);
    } else if (dy < -2) {
      setHidden(false);
    }
  });

  type NavLink = { name: string; id: string; href?: string; dropdown?: boolean };
  const navLinks: NavLink[] = [
    { name: "Lehenga", id: "lehenga", href: "/lehenga" },
    { name: "Dress", id: "dress", href: "/dress" },
    { name: "Drape", id: "drape", href: "/drape" },
    { name: "Casual Fit", id: "casual-fit", href: "/casual-fit" },
    { name: "Saree", id: "saree", href: "/saree" },
    { name: "Policies", id: "policies", dropdown: true },
    { name: "Contact", id: "contact", href: "/contact" },
  ];
  const mobileCategories = [
    { id: "women-all", name: "All Categories", image: "/images/3.jpg" },
    { id: "women-lehenga", name: "Lehenga", image: "/images/4.jpg" },
    { id: "women-dress", name: "Dress", image: "/images/img3.jpg" },
    { id: "women-saree", name: "Saree", image: "/images/1.jpg" },
    { id: "women-drape-casual-fit", name: "Drape Casual Fit", image: "/images/img5.jpg" },
  ];

  return (
    <>
      <motion.nav
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-colors duration-500",
          isScrolled || activeCategory || pathname !== "/" ? "bg-black/90 backdrop-blur-md border-b border-white/5" : "bg-transparent"
        )}
        initial={{ y: "-100%" }}
        animate={{ y: hidden ? "-100%" : 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        onMouseLeave={() => setActiveCategory(null)}
        role="navigation"
        aria-label="Primary"
      >
        <div className="container mx-auto px-6">
          {/* Mobile: hamburger left, larger logo center, search right */}
          <div className="flex h-24 items-center justify-between lg:hidden py-3">
            <button
              className="text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <Link href="/" aria-label="Khushi Designer" className="flex flex-1 justify-center">
              <div className="relative w-64 h-20">
                <Image
                  src="/images/logo.png"
                  alt="Khushi Designer Studio logo"
                  fill
                  priority
                  className="object-contain"
                  sizes="256px"
                />
              </div>
              <span className="sr-only">Khushi Designer Studio</span>
            </Link>

            <div className="flex items-center gap-2">
              <Link
                href="/account"
                className="text-white hover:text-gray-300 transition-colors"
                aria-label="Account"
              >
                <User size={22} strokeWidth={1.5} />
              </Link>

              <button
                className="text-white hover:text-gray-300 transition-colors relative"
                aria-label="Cart"
                onClick={() => openCart()}
              >
                <ShoppingBag size={22} strokeWidth={1.5} />
                {items.reduce((sum, i) => sum + i.qty, 0) > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-4 px-1 h-4 bg-white text-black rounded-full text-[10px] leading-4 text-center">
                    {items.reduce((sum, i) => sum + i.qty, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Desktop: logo left, links perfectly centered, icons right */}
          <div className="hidden lg:flex h-28 items-center py-3">
            {/* Left: logo */}
            <div className="flex items-center justify-center w-72 pl-4">
              <Link href="/" aria-label="Khushi Designer" className="flex items-center">
                <div className="relative w-80 h-24 px-3 py-2">
                  <Image
                    src="/images/logo.png"
                    alt="Khushi Designer Studio logo"
                    fill
                    priority
                    className="object-contain"
                    sizes="320px"
                  />
                </div>
                <span className="sr-only">Khushi Designer Studio</span>
              </Link>
            </div>

            {/* Center: nav links */}
            <div className="flex flex-1 items-center justify-center gap-6">
              {navLinks.map((link: NavLink) => (
                <div
                  key={link.id}
                  className="h-full flex items-center"
                  onMouseEnter={() => {
                    if (link.dropdown) setActiveCategory(link.id);
                  }}
                >
                  {!link.dropdown ? (
                    <Link
                      href={link.href || "#"}
                      className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white hover:text-gray-300 transition-colors relative group whitespace-nowrap"
                    >
                      {link.name}
                      <span
                        className={cn(
                          "absolute -bottom-1 left-0 w-full h-px bg-white transform scale-x-0 transition-transform duration-300 origin-left",
                          "group-hover:scale-x-100"
                        )}
                      />
                    </Link>
                  ) : (
                    <button
                      onClick={() => setActiveCategory(link.id)}
                      onFocus={() => setActiveCategory(link.id)}
                      className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white hover:text-gray-300 transition-colors relative group whitespace-nowrap"
                      aria-haspopup="menu"
                      aria-expanded={activeCategory === link.id}
                    >
                      {link.name}
                      <span
                        className={cn(
                          "absolute -bottom-1 left-0 w-full h-px bg-white transform scale-x-0 transition-transform duration-300 origin-left",
                          activeCategory === link.id ? "scale-x-100" : "group-hover:scale-x-100"
                        )}
                      />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Right: icons */}
            <div className="flex items-center justify-center w-64 pr-4 space-x-6 text-white">
              <button
                className="hover:text-gray-300 transition-colors"
                aria-label="Search"
                onClick={() => setSearchOpen(!searchOpen)}
              >
                <Search size={20} strokeWidth={1.5} />
              </button>

              <UserDropdown />
              <button
                className="hover:text-gray-300 transition-colors relative"
                aria-label="Cart"
                onClick={() => openCart()}
              >
                <ShoppingBag size={20} strokeWidth={1.5} />
                {items.reduce((sum, i) => sum + i.qty, 0) > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-4 px-1 h-4 bg-white text-black rounded-full text-[10px] leading-4 text-center">
                    {items.reduce((sum, i) => sum + i.qty, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        <MegaMenu 
          isOpen={!!activeCategory} 
          activeCategory={activeCategory} 
          onClose={() => setActiveCategory(null)} 
        />
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ type: "tween", duration: 0.4 }}
            className="fixed inset-0 bg-black z-40 lg:hidden pt-24 px-6 pb-24 overflow-y-auto overscroll-y-contain"
            id="mobile-menu"
          >
            <div className="flex flex-col space-y-8 pt-8">
              {/* Mobile Search Button */}
              <motion.button
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.05 }}
                 className="flex items-center gap-4 text-2xl font-light uppercase tracking-widest text-white w-full text-left"
                 onClick={() => {
                   setIsMobileMenuOpen(false);
                   setSearchOpen(true);
                 }}
              >
                <Search size={24} strokeWidth={1.5} />
                <span>Search</span>
              </motion.button>

              {navLinks.filter((l: NavLink) => !l.dropdown).map((link, i) => (
                <motion.div
                  key={link.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  <Link 
                    href={link.href || `/${link.id}`} 
                    className="text-2xl font-light uppercase tracking-widest text-white block"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="mt-10 grid grid-cols-2 gap-4">
              {mobileCategories.map((c) => (
                <Link
                  key={c.id}
                  href={`/shop?query=${encodeURIComponent(c.name.toLowerCase())}`}
                  className="relative aspect-3/2 overflow-hidden rounded-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label={c.name}
                >
                  <Image src={c.image} alt={`${c.name} preview`} fill sizes="(max-width:768px) 50vw, 25vw" className="object-cover" />
                  <div className="absolute inset-0 bg-black/30" />
                  <span className="absolute bottom-2 left-2 text-xs uppercase tracking-[0.25em] text-white">{c.name}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <CartDrawer open={open} onClose={closeCart} />
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
            role="dialog"
            aria-label="Search"
            aria-modal="true"
          >
            <div className="container mx-auto px-6 pt-24 md:pt-28">
              <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                  <input 
                    type="text" 
                    placeholder="Search products, collections..."
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Search products and collections"
                    className="w-full bg-black text-white border border-white/20 px-6 py-4 uppercase tracking-[0.25em] text-xs focus:border-white/50 outline-none"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && searchQuery.trim().length > 0) {
                        router.push(`/shop?query=${encodeURIComponent(searchQuery)}`);
                        setSearchOpen(false);
                      }
                    }}
                  />
                  
                  {/* Suggestions List */}
                  <AnimatePresence>
                    {suggestions.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute left-0 right-0 mt-2 bg-black border border-white/10 z-50 max-h-96 overflow-y-auto"
                      >
                        {suggestions.map((product) => (
                          <Link
                            key={product.id}
                            href={`/shop/${product.id}`}
                            className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors border-b border-white/5 last:border-none"
                            onClick={() => setSearchOpen(false)}
                          >
                            <div className="relative w-12 h-16 flex-shrink-0">
                              <Image 
                                src={product.image} 
                                alt={product.name} 
                                fill 
                                className="object-cover"
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <span className="text-[10px] uppercase tracking-widest text-white font-medium">{product.name}</span>
                              <span className="text-[8px] uppercase tracking-[0.2em] text-gray-500">{product.category}</span>
                            </div>
                          </Link>
                        ))}
                        <button
                          onClick={() => {
                            router.push(`/shop?query=${encodeURIComponent(searchQuery)}`);
                            setSearchOpen(false);
                          }}
                          className="w-full p-4 text-center text-[9px] uppercase tracking-[0.3em] text-white/60 hover:text-white hover:bg-white/5 transition-all"
                        >
                          View all results for "{searchQuery}"
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <button
                  className="text-white hover:text-gray-300 transition-colors"
                  aria-label="Close search"
                  onClick={() => setSearchOpen(false)}
                >
                  <X size={20} />
                </button>
              </div>
              <div className="mt-8">
                <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 block mb-4">Quick Links</span>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {["Lehenga","Dress","Saree","Drape","Casual Fit","New Arrivals"].map((s) => (
                    <Link 
                      key={s} 
                      href={s === "New Arrivals" ? "/shop" : `/shop?category=${encodeURIComponent(s.toLowerCase())}`} 
                      className="block border border-white/10 p-4 hover:border-white/40 transition-all text-center group"
                      onClick={() => setSearchOpen(false)}
                    >
                      <span className="text-[9px] uppercase tracking-[0.25em] text-white/80 group-hover:text-white transition-colors">{s}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

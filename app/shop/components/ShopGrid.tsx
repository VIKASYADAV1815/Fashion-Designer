"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { Search, Maximize2, Minimize2 } from "lucide-react";
import ShopCard from "./ShopCard";
import EmptyCategory from "./EmptyCategory";
import productsData from "@/lib/products.json";

// --- Types ---
type Product = {
  id: string;
  slug?: string;
  name: string;
  price: number;
  category: string;
  image: string;
};

type ShopGridProps = {
  category?: string;
  initialQuery?: string;
  initialProducts?: Product[];
};

// --- Data ---
const staticProducts = productsData as Product[];

 export default function ShopGrid({ category, initialQuery, initialProducts }: ShopGridProps) {
  const products = initialProducts || staticProducts;
  const [query, setQuery] = useState((initialQuery || "").toString());
  const [minPrice, setMinPrice] = useState<number | "">(0);
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [columns, setColumns] = useState<2 | 3 | 4>(3);
  const [size, setSize] = useState<"comfort" | "compact">("compact");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    const alias: Record<string, string> = {
      "casual-fit": "casual fit",
      drape: "drape",
    };
    const target = category ? (alias[category.toLowerCase()] || category.toLowerCase()) : undefined;
    return products.filter((p) => {
      const byCategory = target
        ? p.category.toLowerCase() === target
        : true;
      const byQuery = query
        ? p.name.toLowerCase().includes(query.toLowerCase())
        : true;
      const byMin = minPrice !== "" ? p.price >= minPrice : true;
      const byMax = maxPrice !== "" ? p.price <= maxPrice : true;
      return byCategory && byQuery && byMin && byMax;
    });
  }, [category, query, minPrice, maxPrice]);

  return (
    <section className="py-24 px-6 md:px-14 bg-[#FCFCFC] text-black min-h-screen">
      <div className="max-w-[1600px] mx-auto">

        {/* Header */}
        <header className="mb-16 text-center">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-[0.35em] text-gray-400">
              READY TO WEAR 
            </span>

            <h2 className="text-5xl md:text-7xl font-extralight uppercase tracking-tight">
              {category || "The Collection"}
            </h2>

            <div className="flex justify-center items-center gap-6 mt-8">
              <div className="h-px w-16 bg-black/10" />
              <span className="text-sm italic text-gray-500">
                Showing {filtered.length} pieces
              </span>
              <div className="h-px w-16 bg-black/10" />
            </div>
          </div>
        </header>

        {/* MOBILE FILTER QUICK BAR */}
        <div className="md:hidden mb-8">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 flex-1 bg-white/90 backdrop-blur-xl border border-black/15 rounded-full px-4 py-2">
              <Search className="w-5 h-5 text-gray-500" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Find a piece..."
                className="bg-transparent text-xs tracking-widest uppercase w-full py-1 outline-none placeholder:text-gray-400"
              />
            </div>
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="px-4 py-2 rounded-full border border-black/15 bg-white/90 text-[10px] uppercase tracking-widest"
              aria-label="Open Filters"
            >
              Filters
            </button>
          </div>
        </div>

        {/* PREMIUM FILTER BAR (DESKTOP) */}
        <div className="hidden md:block mb-24">
          <div
            className="
              max-w-5xl
              mx-auto
              bg-white/90
              backdrop-blur-xl
              border border-black/15
              rounded-full
              px-6 sm:px-8 lg:px-12 py-4
              shadow-[0_20px_28px_-20px_rgba(0,0,0,0.35)]
              flex flex-wrap items-center justify-between gap-6 sm:gap-8
              overflow-x-auto sm:overflow-visible
            "
          >
            {/* Search */}
            <div className="flex items-center gap-4 flex-1 min-w-40 sm:min-w-60">
              <Search className="w-5 h-5 text-gray-500" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Find a piece..."
                className="
                  bg-transparent
                  text-sm
                  tracking-widest
                  uppercase
                  w-full
                  py-3
                  outline-none
                  focus:outline-none
                  focus:ring-0
                  placeholder:text-gray-400
                "
              />
            </div>

            {/* Price */}
            <div className="hidden lg:flex items-center gap-6 border-x border-black/10 px-10">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 uppercase">Min</span>
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) =>
                    setMinPrice(e.target.value === "" ? "" : Number(e.target.value))
                  }
                  className="w-20 bg-transparent text-sm font-medium py-2 outline-none focus:ring-0"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 uppercase">Max</span>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) =>
                    setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))
                  }
                  className="w-20 bg-transparent text-sm font-medium py-2 outline-none focus:ring-0"
                />
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                {[2, 3, 4].map((num) => (
                  <button
                    key={num}
                    suppressHydrationWarning
                    onClick={() => setColumns(num as 2 | 3 | 4)}
                    className={`w-9 h-9 rounded-full text-sm transition-all flex items-center justify-center
                      ${
                        columns === num
                          ? "bg-black text-white"
                          : "text-gray-500 hover:bg-gray-100"
                      }`}
                  >
                    {num}
                  </button>
                ))}
              </div>

              <div className="h-7 w-px bg-black/10" />

              <div className="flex items-center gap-2">
                <button
                  suppressHydrationWarning
                  onClick={() => setSize("compact")}
                  className={`p-2 ${size === "compact" ? "text-black" : "text-gray-400"}`}
                >
                  <Minimize2 className="w-5 h-5" />
                </button>
                <button
                  suppressHydrationWarning
                  onClick={() => setSize("comfort")}
                  className={`p-2 ${size === "comfort" ? "text-black" : "text-gray-400"}`}
                >
                  <Maximize2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE FILTERS DRAWER */}
        {mobileFiltersOpen && (
            <>
              <div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
                onClick={() => setMobileFiltersOpen(false)}
                aria-hidden="true"
              />
              <aside
                className="fixed left-0 top-0 h-full w-[85vw] bg-white z-50 shadow-xl border-r border-black/10"
                role="dialog"
                aria-label="Filters"
              >
                <div className="p-5 border-b border-black/10 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.3em]">Filters</span>
                  <button
                    className="text-[10px] uppercase tracking-[0.3em] hover:opacity-70"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    Close
                  </button>
                </div>
                <div className="p-5 space-y-6">
                  <div>
                    <span className="block text-[10px] uppercase tracking-[0.3em] mb-2">Search</span>
                    <div className="flex items-center gap-3 border border-black/15 rounded-md px-3 py-2">
                      <Search className="w-5 h-5 text-gray-500" />
                      <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Find a piece..."
                        className="bg-transparent text-sm tracking-widest uppercase w-full outline-none placeholder:text-gray-400"
                      />
                    </div>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-[0.3em] mb-2">Price</span>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 uppercase">Min</span>
                        <input
                          type="number"
                          value={minPrice}
                          onChange={(e) =>
                            setMinPrice(e.target.value === "" ? "" : Number(e.target.value))
                          }
                          className="w-full border border-black/15 rounded-md px-2 py-2 text-sm outline-none"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 uppercase">Max</span>
                        <input
                          type="number"
                          value={maxPrice}
                          onChange={(e) =>
                            setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))
                          }
                          className="w-full border border-black/15 rounded-md px-2 py-2 text-sm outline-none"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-[0.3em] mb-2">Layout</span>
                    <div className="flex items-center gap-3">
                      {[2, 3, 4].map((num) => (
                        <button
                          key={num}
                          suppressHydrationWarning
                          onClick={() => setColumns(num as 2 | 3 | 4)}
                          className={`px-3 py-2 rounded-md text-sm border
                            ${columns === num ? "bg-black text-white" : "bg-white text-gray-600"}`}
                        >
                          {num} cols
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-[0.3em] mb-2">Card Size</span>
                    <div className="flex items-center gap-3">
                      <button
                        suppressHydrationWarning
                        onClick={() => setSize("compact")}
                        className={`px-3 py-2 rounded-md text-sm border
                          ${size === "compact" ? "bg-black text-white" : "bg-white text-gray-600"}`}
                      >
                        Compact
                      </button>
                      <button
                        suppressHydrationWarning
                        onClick={() => setSize("comfort")}
                        className={`px-3 py-2 rounded-md text-sm border
                          ${size === "comfort" ? "bg-black text-white" : "bg-white text-gray-600"}`}
                      >
                        Comfort
                      </button>
                    </div>
                  </div>
                  <div className="pt-2">
                    <button
                      suppressHydrationWarning
                      className="w-full py-3 bg-black text-white text-[11px] uppercase tracking-[0.3em] rounded-md"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </aside>
            </>
          )}

        {/* Grid or Empty State */}
        {filtered.length > 0 ? (
          <div
            className={`grid gap-x-6 md:gap-x-12 gap-y-12 md:gap-y-24 transition-all duration-700
              ${
                columns === 2
                  ? "grid-cols-2 md:grid-cols-2"
                  : columns === 3
                  ? "grid-cols-2 md:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-2 md:grid-cols-2 lg:grid-cols-4"
              }`}
          >
              {filtered.map((product, index) => {
                const displayProduct = category ? { ...product, category: "" } : product;
                return (
                  <div key={product.id} className={size === "compact" ? "px-4" : "px-0"}>
                  <ShopCard product={displayProduct} index={index} />
                  </div>
                );
              })}
          </div>
        ) : (
          <div className="w-full flex items-center justify-center py-20 bg-white rounded-2xl border border-neutral-100 shadow-sm">
             <EmptyCategory category={category || query || "This Category"} />
          </div>
        )}

      </div>
    </section>
  );
}
"use client";

import Link from "next/link";
import Image from "next/image";

interface Product {
  id: string;
  slug?: string;
  name: string;
  price: number;
  image: string;
  category: string;
  isOutOfStock?: boolean;
}

interface ShopCardProps {
  product: Product;
  index: number;
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function ShopCard({ product, index }: ShopCardProps) {
  return (
    <div className={cn("group cursor-pointer", product.isOutOfStock && "opacity-80")}>
      <Link href={`/shop/${product.slug || slugify(product.name)}`} className="block">
        <div className="relative aspect-3/4 overflow-hidden mb-6 bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 33vw"
            priority={index < 4}
            className={cn(
              "object-cover transition-transform duration-700 ease-out will-change-transform",
              !product.isOutOfStock && "group-hover:scale-110"
            )}
          />
          
          {product.isOutOfStock ? (
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
              <span className="text-white text-xs font-bold uppercase tracking-[0.3em] border border-white/30 px-6 py-3 bg-black/20">
                Out of Stock
              </span>
            </div>
          ) : (
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
          )}
          
          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
             <button 
              suppressHydrationWarning
              disabled={product.isOutOfStock}
              className={cn(
                "w-full py-3 text-xs uppercase tracking-widest font-bold transition-all duration-300",
                product.isOutOfStock 
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed" 
                  : "bg-white text-black hover:bg-black hover:text-white"
              )}
             >
               {product.isOutOfStock ? "Unavailable" : "Quick View"}
             </button>
          </div>
        </div>

        <div className="text-center">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">{product.category}</p>
          <h3 className="text-sm font-bold uppercase tracking-widest mb-2 group-hover:text-gray-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-xs font-light tracking-wider">₹{product.price.toLocaleString("en-IN")}</p>
        </div>
      </Link>
    </div>
  );
}

import { cn } from "@/lib/utils";

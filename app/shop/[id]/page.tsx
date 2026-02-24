"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { 
  ChevronRight, 
  Minus, 
  Plus, 
  ShieldCheck, 
  Truck, 
  RefreshCw,
  Info,
  Play
} from "lucide-react";
import AnimatedButton from "@/components/buttons/AnimatedButton";
import { useCart } from "@/components/cart/CartProvider";
import ShopTransition from "../components/ShopTransition";
import productsData from "@/lib/products.json" assert { type: "json" };

// Mock data
const products = productsData;

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);
  const { addItem, openCart } = useCart();

  const id = params?.id as string;
  const slugify = (s: string) =>
    s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  
  const product = products.find((p) => p.id === id || slugify(p.name) === id);
  const imagesToShow = product?.images || [];

  if (!id) return null;

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black font-light px-6 text-center">
        <h2 className="text-3xl mb-4 tracking-tighter uppercase">Selection Not Found</h2>
        <p className="text-gray-500 mb-8 max-w-xs">The piece you are looking for might have been moved or is no longer available.</p>
        <AnimatedButton onClick={() => router.push("/shop")}>
          Return to Atelier
        </AnimatedButton>
      </div>
    );
  }

  return (
    <ShopTransition>
      <div className="pt-24 md:pt-32 pb-16 bg-white text-black min-h-screen">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-12">
            <span className="cursor-pointer hover:text-black transition-colors" onClick={() => router.push("/")}>Home</span>
            <ChevronRight size={10} />
            <span className="cursor-pointer hover:text-black transition-colors" onClick={() => router.push("/shop")}>Shop</span>
            <ChevronRight size={10} />
            <span className="text-black">{product.category}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            <div className="lg:col-span-7 space-y-8">
              <div className="relative aspect-[4/5] max-h-[700px] bg-neutral-50 overflow-hidden group">
                <Image
                  src={imagesToShow[activeImage]}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                  sizes="(max-width: 768px) 90vw, (max-width: 1200px) 60vw, 50vw"
                />
              </div>
              <div className="grid grid-cols-6 gap-2">
                {imagesToShow.map((img, idx) => (
                  <button
                    key={idx}
                    className={`relative aspect-[4/5] w-full border transition-all duration-500 ${activeImage === idx ? 'border-black' : 'border-transparent opacity-60 hover:opacity-100'}`}
                    onClick={() => setActiveImage(idx)}
                    aria-label={`Preview ${idx + 1}`}
                  >
                    <Image src={img} alt="" fill className="object-cover" sizes="(max-width: 768px) 15vw, 5vw" />
                  </button>
                ))}
              </div>

              {/* Video Section */}
              {(product as any).video && (
                <div className="pt-8 border-t border-neutral-100">
                  <h3 className="text-xs uppercase tracking-[0.3em] font-bold mb-6 flex items-center gap-2">
                    <Play size={14} /> Motion Preview
                  </h3>
                  <div className="relative aspect-video max-h-[360px] bg-neutral-900 overflow-hidden group">
                    <video 
                      src={(product as any).video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-500"
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                       <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm">
                          <Play className="text-white fill-white w-6 h-6 ml-1" />
                       </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT: Product Details */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32 space-y-10">
                
                {/* Header */}
                <header className="space-y-4">
                  <span className="inline-block px-3 py-1 border border-neutral-200 text-xs uppercase tracking-[0.3em] text-gray-500">
                    {product.category}
                  </span>
                  <h1 className="text-5xl md:text-7xl font-extralight tracking-tighter uppercase leading-[0.9]">
                    {product.name}
                  </h1>
                  <p className="text-3xl font-light text-neutral-900 tracking-tight">
                    ₹{product.price.toLocaleString("en-IN")}
                  </p>
                </header>

                <div className="h-px bg-neutral-100 w-full" />

                {/* Description */}
                <div className="max-w-md">
                  <p className="text-lg text-gray-700 font-light leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Quantity & Cart Action */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
                    <span className="text-xs uppercase tracking-widest font-bold">Quantity</span>
                    <div className="flex items-center gap-6">
                      <button 
                        onClick={() => setQty(q => Math.max(1, q - 1))}
                        className="p-1 hover:text-gray-400 transition-colors"
                      >
                        <Minus size={20} strokeWidth={1} />
                      </button>
                      <span className="w-6 text-center text-base font-light leading-none">{qty}</span>
                      <button 
                        onClick={() => setQty(q => q + 1)}
                        className="p-1 hover:text-gray-400 transition-colors"
                      >
                        <Plus size={20} strokeWidth={1} />
                      </button>
                    </div>
                  </div>

                  <AnimatedButton
                    className="w-full py-7 bg-black text-white hover:bg-neutral-800 transition-all rounded-none uppercase tracking-[0.3em] text-xs"
                    onClick={() => {
                      for (let i = 0; i < qty; i++) {
                        addItem({ id: product.id, name: product.name, price: product.price, image: product.images[0] });
                      }
                      openCart();
                    }}
                  >
                    Add to Cart
                  </AnimatedButton>
                </div>

                {/* Specs Grid */}
                <div className="pt-8">
                  <h3 className="text-xs uppercase tracking-widest font-bold mb-6 flex items-center gap-2">
                    <Info size={16} /> Product Specifications
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10">
                    {product.details.map((detail, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-center gap-4 font-light">
                        <span className="w-1.5 h-1.5 bg-neutral-300 rotate-45" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-3 gap-6 pt-12 border-t border-neutral-100">
                  <div className="flex flex-col items-center text-center gap-4">
                    <Truck size={24} strokeWidth={1} className="text-neutral-400" />
                    <span className="text-[10px] uppercase tracking-widest text-gray-500 leading-tight">Complimentary Shipping</span>
                  </div>
                  <div className="flex flex-col items-center text-center gap-4">
                    <ShieldCheck size={24} strokeWidth={1} className="text-neutral-400" />
                    <span className="text-[10px] uppercase tracking-widest text-gray-500 leading-tight">Secure Checkout</span>
                  </div>
                  <div className="flex flex-col items-center text-center gap-4">
                    <RefreshCw size={24} strokeWidth={1} className="text-neutral-400" />
                    <span className="text-[10px] uppercase tracking-widest text-gray-500 leading-tight">14 Day Returns</span>
                  </div>
                </div>

                {/* General info moved to full-width section below to balance layout */}

              </div>
            </div>
          
          {/* Full-width informational sections to fill space under media */}
          <div className="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">
            {(product as any).studio && (
              <div className="lg:col-span-1 p-8 bg-neutral-50 border border-neutral-100">
                <h3 className="text-xs uppercase tracking-widest font-bold mb-4">{ (product as any).studio.name }</h3>
                <p className="text-sm text-gray-600 font-light leading-relaxed mb-3">
                  { (product as any).studio.address }
                </p>
                <p className="text-sm text-[#D7B63F] font-medium tracking-wide">
                  { (product as any).studio.landmark }
                </p>
              </div>
            )}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xs uppercase tracking-widest font-bold mb-4">Composition & Care</h3>
                <p className="text-base text-gray-700 font-light leading-relaxed">Materials selected for longevity and comfort. Follow fabric-specific care; dry clean recommended for delicate pieces.</p>
              </div>
              <div>
                <h3 className="text-xs uppercase tracking-widest font-bold mb-4">Delivery & Returns</h3>
                <p className="text-base text-gray-700 font-light leading-relaxed">Dispatch in 2–4 business days. Free shipping across India. 14‑day returns for unworn items with original tags.</p>
              </div>
              <div>
                <h3 className="text-xs uppercase tracking-widest font-bold mb-4">Payment & Security</h3>
                <p className="text-base text-gray-700 font-light leading-relaxed">Secure checkout with UPI, major cards, and NetBanking supported.</p>
              </div>
              <div>
                <h3 className="text-xs uppercase tracking-widest font-bold mb-4">Fit & Sizing</h3>
                <p className="text-base text-gray-700 font-light leading-relaxed">Refer to the size guide for measurements. Contact support for bespoke sizing.</p>
              </div>
              <div>
                <h3 className="text-xs uppercase tracking-widest font-bold mb-4">Customer Support</h3>
                <p className="text-base text-gray-700 font-light leading-relaxed">Concierge assistance via chat and phone during business hours.</p>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </ShopTransition>
  );
}

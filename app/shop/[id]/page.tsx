"use client";

import { useState, useMemo } from "react";
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
  Scissors,
  Sparkles,
  Play
} from "lucide-react";

import { useCart } from "@/components/cart/CartProvider";
import Lightbox from "@/components/lightbox/Lightbox";
import ShopTransition from "../components/ShopTransition";
import productsData from "@/lib/products.json";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  subCategory?: string;
  tagline?: string;
  description: string;
  images: string[];
  details: string[];
  video?: string;
  studio?: {
    name: string;
    address: string;
    landmark: string;
  };
}

const products = productsData as Product[];

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const [activeImage, setActiveImage] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [qty, setQty] = useState(1);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const { addItem, openCart } = useCart();

  const id = params?.id as string;
  const product = useMemo(() => 
    products.find((p) => p.id === id || p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === id), 
  [id]);

  if (!product) return null;

  return (
    <ShopTransition>
      <div className="pt-24 md:pt-32 bg-white text-black min-h-screen">
        <div className="flex flex-col lg:flex-row min-h-screen">
          
          {/* LEFT: MEDIA SECTION WITH SEPARATED VIDEO OVERLAY */}
          <div className="lg:w-[45%] lg:h-screen lg:sticky lg:top-0 bg-[#F6F6F6] flex items-center justify-center p-6 md:p-12">
            <div className="relative w-full max-w-[480px] aspect-[4/5] bg-white shadow-sm overflow-hidden group">
              
              <div key={activeImage} className={`absolute inset-0 transition-opacity duration-500 ${showVideo ? 'opacity-0' : 'opacity-100'}`}>
                <Image
                  src={product.images[activeImage]}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
              <button
                aria-label="Open image"
                onClick={() => { setLightboxOpen(true); setLightboxIndex(activeImage); }}
                className="absolute inset-0 z-20"
              />

              {/* Unique Video Layer - Picture-in-Picture Style */}
              {product.video && (
                <div className={`absolute inset-0 z-10 bg-black transition-transform duration-700 ease-in-out ${showVideo ? 'translate-y-0' : 'translate-y-full'}`}>
                   <video src={product.video} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                   <button 
                    onClick={() => setShowVideo(false)}
                    className="absolute top-6 right-6 text-white text-[10px] uppercase tracking-widest bg-white/10 backdrop-blur-md px-3 py-1 border border-white/20"
                   >
                    Close [x]
                   </button>
                </div>
              )}
              
              {/* GLASS THUMBNAILS + UNIQUE VIDEO TRIGGER */}
              <div className="absolute bottom-4 left-4 right-4 z-20">
                <div className="bg-black/10 backdrop-blur-xl border border-white/10 p-2 flex items-center justify-between rounded-sm">
                  <div className="flex gap-1.5 overflow-x-auto">
                    {product.images.map((img, idx) => (
                      <button
                        key={idx}
                        className={`relative w-10 h-14 border transition-all ${activeImage === idx && !showVideo ? 'border-white' : 'border-transparent opacity-50'}`}
                        onClick={() => { setActiveImage(idx); setShowVideo(false); }}
                      >
                        <Image src={img} alt="" fill className="object-cover" />
                      </button>
                    ))}
                  </div>

                  {product.video && (
                    <button 
                      onClick={() => setShowVideo(true)}
                      className={`relative w-16 h-14 overflow-hidden border transition-all flex flex-col items-center justify-center gap-1 ${showVideo ? 'border-white bg-white/20' : 'border-white/20 bg-black/40'}`}
                    >
                      <Play size={14} className="text-white fill-white" />
                      <span className="text-[7px] text-white uppercase tracking-tighter font-bold">In Motion</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: COMPACT CONTENT */}
          <div className="lg:w-[55%] p-6 md:p-12 lg:p-20 space-y-10 bg-white">
            
            <nav className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-neutral-400">
              <span className="cursor-pointer hover:text-black transition-colors" onClick={() => router.push("/")}>Home</span>
              <ChevronRight size={10} className="opacity-30" />
              <span className="text-black font-medium">{product.category}</span>
            </nav>

            <header className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-extralight tracking-tighter uppercase leading-tight">
                {product.name}
              </h1>
              {product.tagline && (
                <p className="text-sm md:text-base italic text-neutral-600">
                  {product.tagline}
                </p>
              )}
              <div className="inline-flex border-l-2 border-black pl-5">
                <p className="text-3xl font-light text-neutral-900 tracking-tighter">
                  ₹{product.price.toLocaleString("en-IN")}
                </p>
              </div>
            </header>

            {/* CUSTOMIZABLE BANNER - REDUCED WIDTH */}
            <div className="group relative overflow-hidden bg-neutral-900 p-5 text-white transition-all hover:bg-black cursor-default max-w-md">
              <div className="relative z-10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Scissors size={14} className="text-[#D7B63F]" />
                  <div>
                    <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#D7B63F]">Bespoke</h4>
                    <p className="text-[11px] font-light text-neutral-400">Customized to fit</p>
                  </div>
                </div>
                <button className="border border-neutral-700 px-4 py-2 text-[9px] uppercase tracking-widest hover:bg-white hover:text-black transition-colors whitespace-nowrap">
                  Inquire
                </button>
              </div>
            </div>

            <p className="text-[18px] md:text-[20px] lg:text-[22px] text-neutral-700 font-light leading-8 max-w-2xl">
              {product.description}
            </p>

            {/* SPECIFICATIONS */}
            <div className="space-y-4 max-w-lg">
              <h3 className="text-[12px] md:text-[13px] lg:text-sm uppercase tracking-[0.2em] font-semibold flex items-center gap-2">
                <Info size={14} /> Product Specs
              </h3>
              <div className="border-t border-neutral-100 divide-y divide-neutral-50">
                {/* Derived Category row */}
                <div className="grid grid-cols-3 py-3 px-1">
                  <span className="text-[12px] md:text-[13px] uppercase tracking-widest text-neutral-500 font-medium">Category</span>
                  <span className="col-span-2 text-[14px] md:text-[15px] text-neutral-800 font-light pl-4">
                    {product.subCategory || product.category}
                  </span>
                </div>
                {product.details.map((detail, i) => {
                  const [label, ...rest] = detail.split(':');
                  return (
                    <div key={i} className="grid grid-cols-3 py-3 px-1">
                      <span className="text-[12px] md:text-[13px] uppercase tracking-widest text-neutral-500 font-medium">{label}</span>
                      <span className="col-span-2 text-[14px] md:text-[15px] text-neutral-800 font-light pl-4">{rest.join(':') || 'Atelier'}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ACTIONS - REDUCED WIDTH BUTTON */}
            <div className="space-y-6 pt-4">
              <div className="flex items-center justify-between border-y border-neutral-100 py-4 max-w-md">
                <span className="text-[12px] md:text-sm uppercase tracking-widest font-semibold">Quantity</span>
                <div className="flex items-center gap-4">
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-neutral-300 hover:border-black flex items-center justify-center transition-colors" aria-label="Decrease quantity"><Minus size={20} /></button>
                  <span className="text-lg md:text-xl font-medium w-8 text-center">{qty}</span>
                  <button onClick={() => setQty(q => q + 1)} className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-neutral-300 hover:border-black flex items-center justify-center transition-colors" aria-label="Increase quantity"><Plus size={20} /></button>
                </div>
              </div>
              
              <button 
                className="w-full max-w-xs py-5 bg-black text-white uppercase tracking-[0.3em] text-[11px] font-bold hover:bg-neutral-800 transition-all active:scale-[0.98]"
                onClick={() => {
                  for (let i = 0; i < qty; i++) addItem({ id: product.id, name: product.name, price: product.price, image: product.images[0] });
                  openCart();
                }}
              >
                Add to Cart
              </button>
            </div>

            {/* COMPACT FOOTER */}
            <div className="flex flex-wrap gap-8 border-t border-neutral-100 pt-8">
              <Badge icon={<Truck size={16} />} label="Worldwide" />
              <Badge icon={<ShieldCheck size={16} />} label="Authentic" />
              <Badge icon={<RefreshCw size={16} />} label="14-Day Return" />
            </div>

            {product.studio && (
              <div className="pt-4">
                <p className="text-[10px] uppercase tracking-widest font-bold mb-2 text-neutral-400">{product.studio.name}</p>
                <p className="text-[12px] text-neutral-600 font-light max-w-xs leading-snug">
                  {product.studio.address} • <span className="text-[#D7B63F] font-medium">{product.studio.landmark}</span>
                </p>
              </div>
            )}

          </div>
        </div>
      </div>
      {lightboxOpen && (
        <Lightbox
          images={product.images}
          index={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          onPrev={() => setLightboxIndex(i => (i - 1 + product.images.length) % product.images.length)}
          onNext={() => setLightboxIndex(i => (i + 1) % product.images.length)}
        />
      )}
    </ShopTransition>
  );
}

function Badge({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="text-neutral-400">{icon}</div>
      <span className="text-[10px] uppercase tracking-widest font-bold">{label}</span>
    </div>
  );
}

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

  const descriptionPoints = product.description.split('\n').filter(p => p.trim() !== '');

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
           <div className="group relative overflow-hidden bg-[#121212] p-6 text-white transition-all duration-500 hover:shadow-2xl hover:shadow-black/50 cursor-default max-w-md border border-neutral-800/50 hover:border-[#D7B63F]/30">
  
  {/* Subtle Gradient Glow Backdrop */}
  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D7B63F]/5 via-transparent to-transparent" />

  {/* Animated "Sweep" Effect */}
  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1.5s] ease-in-out bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />

  <div className="relative z-10 flex items-center justify-between gap-6">
    <div className="flex items-center gap-4">
      <div className="relative">
        {/* Pulsing ring around the icon on hover */}
        <div className="absolute inset-0 scale-100 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-full border border-[#D7B63F]/20" />
        <Scissors size={16} className="text-[#D7B63F] transform group-hover:rotate-12 transition-transform duration-500" />
      </div>
      
      <div>
        <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#D7B63F] mb-0.5">
          Customizable
        </h4>
        <p className="text-[12px] font-light text-neutral-500 group-hover:text-neutral-300 transition-colors duration-500">
          Tailored to your precision, ensuring a unique fit and look.
        </p>
      </div>
    </div>

    <button 
      onClick={() => router.push("/contact")}
      className="relative overflow-hidden border border-neutral-700 px-5 py-2.5 text-[9px] uppercase tracking-[0.2em] transition-all duration-300 hover:border-[#D7B63F] hover:text-white group/btn"
    >
      <span className="relative z-10">Inquire</span>
      {/* Button Fill Animation */}
      <div className="absolute inset-0 -z-0 translate-y-full group-hover/btn:translate-y-0 bg-[#D7B63F] transition-transform duration-300 ease-out" />
      {/* Secondary text color change for contrast when filled */}
      <span className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover/btn:opacity-100 text-black transition-opacity duration-300">
        Inquire
      </span>
    </button>
  </div>
</div>
            <div className="max-w-2xl space-y-4">
              {descriptionPoints.length > 1 ? (
                <ul className="space-y-3">
                  {descriptionPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 group/item">
                      <div className="mt-2.5 w-1.5 h-[1px] bg-neutral-300 transition-all duration-300 group-hover/item:w-3 group-hover/item:bg-black" />
                      <span className="text-[16px] md:text-[18px] text-neutral-600 font-light leading-relaxed tracking-tight">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[18px] md:text-[20px] lg:text-[22px] text-neutral-700 font-light leading-8">
                  {product.description}
                </p>
              )}
            </div>

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

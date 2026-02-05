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
  Info
} from "lucide-react";
import AnimatedButton from "@/components/buttons/AnimatedButton";
import { useCart } from "@/components/cart/CartProvider";
import ShopTransition from "../components/ShopTransition";

// Mock data
const products = [
  {
    id: "d1",
    name: "Silk Evening Dress",
    price: 890,
    category: "Dress",
    description: "Fluid silk evening dress with bias cut and elegant drape.",
    images: ["/images/4.jpg", "/images/3.jpg"],
    details: ["100% Mulberry Silk", "Bias Cut", "Invisible Zipper", "Dry Clean"]
  },
  {
    id: "d2",
    name: "Velvet A-Line Dress",
    price: 760,
    category: "Dress",
    description: "Rich velvet A-line silhouette for timeless evening comfort.",
    images: ["/images/img2.jpg", "/images/3.jpg"],
    details: ["Cotton Velvet", "Satin Lining", "A-Line", "Dry Clean"]
  },
  {
    id: "d3",
    name: "Embroidered Cocktail Dress",
    price: 980,
    category: "Dress",
    description: "Hand-embroidered detailing with structured yet fluid shape.",
    images: ["/images/img15.png", "/images/img21.png"],
    details: ["Hand Embroidery", "Structured Waist", "Concealed Zip", "Dry Clean"]
  },
  {
    id: "d4",
    name: "Minimal Column Dress",
    price: 650,
    category: "Dress",
    description: "Minimal column silhouette crafted for modern sophistication.",
    images: ["/images/3.jpg", "/images/4.jpg"],
    details: ["Lightweight Crepe", "Column Fit", "Back Vent", "Dry Clean"]
  },
  {
    id: "d5",
    name: "Draped Satin Dress",
    price: 720,
    category: "Dress",
    description: "Soft satin drape with relaxed movement and subtle shine.",
    images: ["/images/img21.png", "/images/2.jpg"],
    details: ["Satin", "Relaxed Drape", "Bias Panels", "Dry Clean"]
  },
  {
    id: "l1",
    name: "Heritage Lehenga",
    price: 1450,
    category: "Lehenga",
    description: "Classic heritage lehenga with artisanal craftsmanship.",
    images: ["/images/img17.png", "/images/img10.png"],
    details: ["Handloom", "Zari Work", "Silk Blend", "Dry Clean"]
  },
  {
    id: "l2",
    name: "Floral Embroidered Lehenga",
    price: 1560,
    category: "Lehenga",
    description: "Florals in fine threadwork over a structured base.",
    images: ["/images/img11.png", "/images/img12.png"],
    details: ["Floral Embroidery", "Structured Waist", "Dupatta Included", "Dry Clean"]
  },
  {
    id: "l3",
    name: "Golden Zari Lehenga",
    price: 1720,
    category: "Lehenga",
    description: "Golden zari accents for celebratory elegance.",
    images: ["/images/img7.png", "/images/img10.png"],
    details: ["Zari Accents", "Full Skirt", "Silk Blend", "Dry Clean"]
  },
  {
    id: "l4",
    name: "Classic Bridal Lehenga",
    price: 1850,
    category: "Lehenga",
    description: "Timeless bridal lehenga with intricate detailing.",
    images: ["/images/img10.png", "/images/img12.png"],
    details: ["Intricate Work", "Premium Silk", "Dupatta Included", "Dry Clean"]
  },
  {
    id: "l5",
    name: "Contemporary Lehenga Set",
    price: 1320,
    category: "Lehenga",
    description: "Contemporary silhouette with modern embellishments.",
    images: ["/images/img12.png", "/images/img11.png"],
    details: ["Modern Cut", "Light Embellishments", "Comfort Fit", "Dry Clean"]
  },
  {
    id: "s1",
    name: "Handloom Silk Saree",
    price: 620,
    category: "Saree",
    description: "Handloom silk with soft sheen and graceful fall.",
    images: ["/images/img5.jpg", "/images/img16.png"],
    details: ["Handloom Silk", "Contrast Border", "Blouse Piece Included", "Dry Clean"]
  },
  {
    id: "s2",
    name: "Chiffon Printed Saree",
    price: 480,
    category: "Saree",
    description: "Lightweight chiffon saree with elegant print.",
    images: ["/images/img16.png", "/images/img13.png"],
    details: ["Chiffon", "All-over Print", "Easy Drape", "Cold Wash"]
  },
  {
    id: "s3",
    name: "Banarasi Brocade Saree",
    price: 980,
    category: "Saree",
    description: "Banarasi brocade with traditional motifs and rich texture.",
    images: ["/images/img14.png", "/images/img12.png"],
    details: ["Brocade", "Traditional Motifs", "Rich Texture", "Dry Clean"]
  },
  {
    id: "s4",
    name: "Pastel Organza Saree",
    price: 540,
    category: "Saree",
    description: "Pastel organza sheer elegance for daytime occasions.",
    images: ["/images/img13.png", "/images/img16.png"],
    details: ["Organza", "Pastel Tone", "Sheer Drape", "Cold Wash"]
  },
  {
    id: "s5",
    name: "Classic Red Silk Saree",
    price: 890,
    category: "Saree",
    description: "Classic red silk saree with minimal border.",
    images: ["/images/2.jpg", "/images/3.jpg"],
    details: ["Silk", "Minimal Border", "Blouse Piece Included", "Dry Clean"]
  },
  {
    id: "dc1",
    name: "Drape Casual Set",
    price: 480,
    category: "Drape Casual Fit",
    description: "Relaxed drape set for everyday comfort.",
    images: ["/images/img3.jpg", "/images/img6.jpg"],
    details: ["Comfort Fit", "Soft Fabric", "Easy Movement", "Machine Wash"]
  },
  {
    id: "dc2",
    name: "Relaxed Drape Co-ord",
    price: 520,
    category: "Drape Casual Fit",
    description: "Co-ord with drape lines and relaxed silhouette.",
    images: ["/images/img9.png", "/images/img8.png"],
    details: ["Co-ord Set", "Relaxed Silhouette", "Breathable", "Machine Wash"]
  },
  {
    id: "dc3",
    name: "Everyday Drape Dress",
    price: 430,
    category: "Drape Casual Fit",
    description: "Effortless dress with gentle drape and light fabric.",
    images: ["/images/img8.png", "/images/img3.jpg"],
    details: ["Lightweight", "Gentle Drape", "Daywear", "Machine Wash"]
  },
  {
    id: "dc4",
    name: "Layered Drape Tunic",
    price: 410,
    category: "Drape Casual Fit",
    description: "Layered tunic with soft drape panels.",
    images: ["/images/img6.jpg", "/images/img3.jpg"],
    details: ["Layered Panels", "Soft Handfeel", "Easy Styling", "Machine Wash"]
  },
  {
    id: "dc5",
    name: "Effortless Drape Kurta",
    price: 450,
    category: "Drape Casual Fit",
    description: "Everyday kurta with relaxed drape and comfort.",
    images: ["/images/img1.jpg", "/images/img3.jpg"],
    details: ["Relaxed Fit", "Soft Fabric", "Comfort Wear", "Machine Wash"]
  }
];

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);
  const { addItem } = useCart();

  // Handle finding product with slugify fallback
  const id = params?.id as string;
  const slugify = (s: string) =>
    s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  
  const product = products.find((p) => p.id === id || slugify(p.name) === id);
  const images3 = product
    ? (product.images.length >= 3
        ? product.images
        : [...product.images, ...Array(3 - product.images.length).fill(product.images[0])])
    : [];

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
      <div className="pt-24 md:pt-32 pb-24 bg-white text-black min-h-screen">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-12">
            <span className="cursor-pointer hover:text-black transition-colors" onClick={() => router.push("/")}>Home</span>
            <ChevronRight size={10} />
            <span className="cursor-pointer hover:text-black transition-colors" onClick={() => router.push("/shop")}>Shop</span>
            <ChevronRight size={10} />
            <span className="text-black">{product.category}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="relative aspect-[3/4] bg-neutral-50 overflow-hidden group">
                <Image
                  src={images3[activeImage]}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {images3.slice(0, 3).map((img, idx) => (
                  <button
                    key={idx}
                    className={`relative aspect-[3/4] w-full border transition-all duration-500 ${activeImage === idx ? 'border-black' : 'border-transparent opacity-60 hover:opacity-100'}`}
                    onClick={() => setActiveImage(idx)}
                    aria-label={`Preview ${idx + 1}`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT: Product Details */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32 space-y-10">
                
                {/* Header */}
                <header className="space-y-4">
                  <span className="inline-block px-3 py-1 border border-neutral-200 text-[10px] uppercase tracking-[0.3em] text-gray-500">
                    {product.category}
                  </span>
                  <h1 className="text-4xl md:text-6xl font-extralight tracking-tighter uppercase leading-[0.9]">
                    {product.name}
                  </h1>
                  <p className="text-2xl font-light text-neutral-900 tracking-tight">
                    ₹{product.price.toLocaleString("en-IN")}
                  </p>
                </header>

                <div className="h-px bg-neutral-100 w-full" />

                {/* Description */}
                <div className="max-w-md">
                  <p className="text-base text-gray-600 font-light leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Quantity & Cart Action */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
                    <span className="text-[10px] uppercase tracking-widest font-bold">Quantity</span>
                    <div className="flex items-center gap-6">
                      <button 
                        onClick={() => setQty(q => Math.max(1, q - 1))}
                        className="p-1 hover:text-gray-400 transition-colors"
                      >
                        <Minus size={18} strokeWidth={1} />
                      </button>
                      <span className="w-4 text-center text-sm font-light leading-none">{qty}</span>
                      <button 
                        onClick={() => setQty(q => q + 1)}
                        className="p-1 hover:text-gray-400 transition-colors"
                      >
                        <Plus size={18} strokeWidth={1} />
                      </button>
                    </div>
                  </div>

                  <AnimatedButton
                    className="w-full py-6 bg-black text-white hover:bg-neutral-800 transition-all rounded-none uppercase tracking-[0.3em] text-[11px]"
                    onClick={() => {
                      for (let i = 0; i < qty; i++) {
                        addItem({ id: product.id, name: product.name, price: product.price, image: product.images[0] });
                      }
                    }}
                  >
                    Add to Cart
                  </AnimatedButton>
                </div>

                {/* Specs Grid */}
                <div className="pt-8">
                  <h3 className="text-[10px] uppercase tracking-widest font-bold mb-6 flex items-center gap-2">
                    <Info size={14} /> Product Specifications
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                    {product.details.map((detail, i) => (
                      <li key={i} className="text-xs text-gray-500 flex items-center gap-3 font-light">
                        <span className="w-1 h-1 bg-neutral-300 rotate-45" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-10 border-t border-neutral-100">
                  <div className="flex flex-col items-center text-center gap-3">
                    <Truck size={20} strokeWidth={1} className="text-neutral-400" />
                    <span className="text-[9px] uppercase tracking-widest text-gray-500 leading-tight">Complimentary Shipping</span>
                  </div>
                  <div className="flex flex-col items-center text-center gap-3">
                    <ShieldCheck size={20} strokeWidth={1} className="text-neutral-400" />
                    <span className="text-[9px] uppercase tracking-widest text-gray-500 leading-tight">Secure Checkout</span>
                  </div>
                  <div className="flex flex-col items-center text-center gap-3">
                    <RefreshCw size={20} strokeWidth={1} className="text-neutral-400" />
                    <span className="text-[9px] uppercase tracking-widest text-gray-500 leading-tight">14 Day Returns</span>
                  </div>
                </div>

                <div className="pt-10 space-y-8">
                  <div>
                    <h3 className="text-[10px] uppercase tracking-widest font-bold mb-3">Composition & Care</h3>
                    <p className="text-sm text-gray-600 font-light">Materials selected for longevity and comfort. Follow fabric-specific care; dry clean recommended for delicate pieces.</p>
                  </div>
                  <div>
                    <h3 className="text-[10px] uppercase tracking-widest font-bold mb-3">Delivery & Returns</h3>
                    <p className="text-sm text-gray-600 font-light">Dispatch in 2–4 business days. Free shipping across India. 14‑day returns for unworn items with original tags.</p>
                  </div>
                  <div>
                    <h3 className="text-[10px] uppercase tracking-widest font-bold mb-3">Payment & Security</h3>
                    <p className="text-sm text-gray-600 font-light">Secure checkout with UPI, major cards, and NetBanking supported.</p>
                  </div>
                  <div>
                    <h3 className="text-[10px] uppercase tracking-widest font-bold mb-3">Fit & Sizing</h3>
                    <p className="text-sm text-gray-600 font-light">Refer to the size guide for measurements. Contact support for bespoke sizing.</p>
                  </div>
                  <div>
                    <h3 className="text-[10px] uppercase tracking-widest font-bold mb-3">Customer Support</h3>
                    <p className="text-sm text-gray-600 font-light">Concierge assistance via chat and phone during business hours.</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </ShopTransition>
  );
}

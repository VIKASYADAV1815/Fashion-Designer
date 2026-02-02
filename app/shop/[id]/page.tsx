"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import AnimatedButton from "@/components/buttons/AnimatedButton";
import { useCart } from "@/components/cart/CartProvider";
import ShopTransition from "../components/ShopTransition";

// Mock data - in a real app this would come from an API or database
const products = [
  {
    id: "1",
    name: "Structured Wool Coat",
    price: 1250,
    category: "Coats",
    description: "A masterclass in tailoring, this structured wool coat features a sharp silhouette with exaggerated shoulders and a cinched waist. Crafted from ethically sourced virgin wool.",
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1887&auto=format&fit=crop"
    ],
    details: ["100% Virgin Wool", "Silk Lining", "Made in Italy", "Dry Clean Only"]
  },
  {
    id: "2",
    name: "Silk Evening Dress",
    price: 890,
    category: "Dresses",
    description: "Fluidity in motion. This silk evening dress drapes elegantly across the body, featuring a bias cut and a deep cowl back. Perfect for the modern gala.",
    images: [
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1908&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1966&auto=format&fit=crop"
    ],
    details: ["100% Mulberry Silk", "Bias Cut", "Invisible Zipper", "Hand Finished Hems"]
  },
  {
    id: "3",
    name: "Leather Tote",
    price: 1800,
    category: "Bags",
    description: "Minimalist utility. Crafted from full-grain vegetable-tanned leather, this tote is designed to age beautifully with time. Spacious enough for essentials, sleek enough for evening.",
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2069&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1935&auto=format&fit=crop"
    ],
    details: ["Full-Grain Leather", "Brass Hardware", "Internal Pocket", "Dust Bag Included"]
  },
  // Add more mock products as needed to match ShopGrid...
  {
    id: "4",
    name: "Cashmere Sweater",
    price: 550,
    category: "Knitwear",
    description: "Softness redefined. Our signature cashmere sweater features a relaxed fit and ribbed trims. A timeless essential for the transitional wardrobe.",
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1964&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=1972&auto=format&fit=crop"
    ],
    details: ["100% Cashmere", "Gauge 12 Knit", "Ribbed Cuffs", "Sustainably Sourced"]
  },
  {
    id: "5",
    name: "Tailored Trousers",
    price: 450,
    category: "Pants",
    description: "Precision cut tailored trousers with a high waist and wide leg. Made from a breathable wool blend for year-round comfort.",
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1887&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506629082955-511b1aa00272?q=80&w=1887&auto=format&fit=crop"
    ],
    details: ["Wool Blend", "High Waisted", "Side Pockets", "Belt Loops"]
  },
  {
    id: "6",
    name: "Velvet Blazer",
    price: 980,
    category: "Jackets",
    description: "Opulence meets structure. This velvet blazer features a single-button closure and peak lapels. A statement piece for the bold.",
    images: [
      "https://images.unsplash.com/photo-1550614000-4b9519e08d83?q=80&w=1888&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1591369822096-35f96fc90d84?q=80&w=1888&auto=format&fit=crop"
    ],
    details: ["Cotton Velvet", "Satin Lining", "Structured Shoulders", "Functional Cuffs"]
  }
];

export default function ProductPage() {
  const params = useParams();
  const id = params?.id as string;
  const product = products.find((p) => p.id === id);
  const [activeImage, setActiveImage] = useState(0);
  const { addItem } = useCart();

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center bg-white text-black">Product not found</div>;
  }

  return (
    <ShopTransition>
      <div className="pt-32 pb-24 bg-white text-black min-h-screen">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            {/* Images */}
            <div className="md:col-span-7 flex flex-col gap-4">
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100">
                <Image
                  src={product.images[activeImage] || product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {product.images.map((img, idx) => (
                  <div 
                    key={idx} 
                    className={`relative aspect-[3/4] cursor-pointer transition-opacity ${activeImage === idx ? 'opacity-100' : 'opacity-50 hover:opacity-80'}`}
                    onClick={() => setActiveImage(idx)}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="md:col-span-5 md:pl-12 sticky top-32 h-fit">
              <span className="text-xs uppercase tracking-widest text-gray-500 mb-4 block">{product.category}</span>
              <h1 className="text-4xl md:text-5xl font-light uppercase tracking-tighter mb-6">{product.name}</h1>
              <p className="text-xl font-light mb-8">${product.price.toLocaleString()}</p>
              
              <div className="prose prose-sm mb-10 text-gray-600 font-light leading-relaxed">
                <p>{product.description}</p>
              </div>

              <div className="mb-10">
                <h3 className="text-xs font-bold uppercase tracking-widest mb-4">Details</h3>
                <ul className="space-y-2">
                  {product.details.map((detail, i) => (
                    <li key={i} className="text-sm text-gray-600 font-light flex items-center">
                      <span className="w-1.5 h-1.5 bg-black rounded-full mr-3" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <AnimatedButton className="w-full bg-black text-white hover:bg-gray-800" onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.images[0] })}>
                  Add to Cart
                </AnimatedButton>
                <p className="text-center text-xs uppercase tracking-widest text-gray-500 mt-4">
                  Free shipping & returns
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ShopTransition>
  );
}

"use client";

import { useParams } from "next/navigation";
import ShopGrid from "@/app/shop/components/ShopGrid";
import ShopTransition from "@/app/shop/components/ShopTransition";

const categoryTitles: Record<string, string> = {
  women: "Womenswear",
  men: "Menswear",
  accessories: "Accessories",
};

export default function CategoryPage() {
  const params = useParams();
  const category = params?.category as string;
  
  // In a real app, we would filter products by category here or fetch from API
  // For now, we reuse ShopGrid but change the title

  const title = categoryTitles[category] || category;

  return (
    <ShopTransition>
      <div className="pt-24 min-h-screen bg-white text-black">
        <div className="container mx-auto px-6 py-12 text-center">
           <h1 className="text-4xl md:text-6xl font-light uppercase tracking-tighter mb-4 capitalize">
             {title}
           </h1>
           <p className="text-xs uppercase tracking-widest text-gray-500 max-w-md mx-auto">
             Discover the latest arrivals in {title.toLowerCase()}.
           </p>
        </div>
        <ShopGrid />
      </div>
    </ShopTransition>
  );
}

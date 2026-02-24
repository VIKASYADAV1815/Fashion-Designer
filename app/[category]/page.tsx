import ShopGrid from "@/app/shop/components/ShopGrid";
import ShopTransition from "@/app/shop/components/ShopTransition";
import React from "react";
export const dynamic = "force-dynamic";

const categoryTitles: Record<string, string> = {
  women: "Womenswear",
  men: "Menswear",
  accessories: "Accessories",
  lehenga: "Lehenga",
  dress: "Dress",
  drape: "Drape",
  "casual-fit": "Casual Fit",
  saree: "Saree",
};

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  
  // In a real app, we would filter products by category here or fetch from API
  // For now, we reuse ShopGrid but change the title

  const title = categoryTitles[category] || category;

  return (
    <ShopTransition>
      <div className="min-h-screen mt-12 bg-white text-black">
        <ShopGrid category={category} />
      </div>
    </ShopTransition>
  );
}

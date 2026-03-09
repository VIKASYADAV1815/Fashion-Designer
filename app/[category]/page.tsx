import ShopGrid from "@/app/shop/components/ShopGrid";
import ShopTransition from "@/app/shop/components/ShopTransition";
import React from "react";
import productsData from "@/lib/products.json";

const categoryTitles: Record<string, string> = {
  women: "Womenswear",
  men: "Menswear",
  accessories: "Accessories",
  lehenga: "Lehenga",
  dress: "Dress",
  drape: "Drape",
  "casual-fit": "Casual Fit",
  saree: "Saree",
  "party-wear": "Party Wear",
  "western-wear": "Western Wear",
  "indo-western-wear": "Indo Western Wear",
};

export async function generateStaticParams() {
  return Object.keys(categoryTitles).map((category) => ({
    category,
  }));
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  
  // In a real app, we would filter products by category here or fetch from API
  // For now, we reuse ShopGrid but change the title

  const title = categoryTitles[category] || category;

  return (
    <ShopTransition>
      <div className="min-h-screen mt-12 bg-white text-black">
        <ShopGrid category={category} initialProducts={productsData as any} />
      </div>
    </ShopTransition>
  );
}

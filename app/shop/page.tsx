import ShopGrid from "./components/ShopGrid";
import ShopTransition from "./components/ShopTransition";
import { loadProductCatalog } from "@/lib/products";

export default async function ShopPage({
  searchParams,
}: {
  searchParams?: { category?: string; query?: string };
}) {
  const category = searchParams?.category;
  const query = searchParams?.query;
  const initialProducts = await loadProductCatalog();
  
  return (
    <ShopTransition>
      <div className="pt-24 min-h-screen bg-white text-black">
        <div className="container mx-auto px-6 py-12 text-center">
           <h2 className="text-4xl md:text-6xl font-light uppercase tracking-tighter mb-4">The Shop</h2>
           <p className="text-xs uppercase tracking-widest text-gray-500 max-w-md mx-auto">
             Curated pieces for the modern wardrobe.
           </p>
        </div>
        <ShopGrid category={category} initialQuery={query} initialProducts={initialProducts} />
      </div>
    </ShopTransition>
  );
}

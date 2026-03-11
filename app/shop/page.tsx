import ShopGrid from "./components/ShopGrid";
import ShopTransition from "./components/ShopTransition";
import productsData from "@/lib/products.json";

type Product = {
  id: string;
  slug?: string;
  name: string;
  price: number;
  category: string;
  image: string;
};

export default function ShopPage({
  searchParams,
}: {
  searchParams?: { category?: string; query?: string };
}) {
  const category = searchParams?.category;
  const query = searchParams?.query;
  return (
    <ShopTransition>
      <div className="pt-24 min-h-screen bg-white text-black">
        <div className="container mx-auto px-6 py-12 text-center">
           <h1 className="text-4xl md:text-6xl font-light uppercase tracking-tighter mb-4">The Shop</h1>
           <p className="text-xs uppercase tracking-widest text-gray-500 max-w-md mx-auto">
             Curated pieces for the modern wardrobe.
           </p>
        </div>
        <ShopGrid category={category} initialQuery={query} initialProducts={productsData as Product[]} />
      </div>
    </ShopTransition>
  );
}

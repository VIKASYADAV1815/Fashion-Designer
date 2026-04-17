import ShopGrid from "./components/ShopGrid";
import ShopTransition from "./components/ShopTransition";

type Product = {
  id: string;
  slug?: string;
  name: string;
  price: number;
  category: string;
  image: string;
};

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, { 
      cache: 'no-store' 
    });
    if (!res.ok) return [];
    const data = await res.json();
    
    // Handle image mapping for backend relative paths
    const backendUrl = process.env.NEXT_PUBLIC_API_URL?.replace("/api", "");
    return data.map((p: any) => ({
      ...p,
      image: p.image?.startsWith("http") ? p.image : `${backendUrl}${p.image}`
    }));
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams?: { category?: string; query?: string };
}) {
  const category = searchParams?.category;
  const query = searchParams?.query;
  const initialProducts = await getProducts();
  
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

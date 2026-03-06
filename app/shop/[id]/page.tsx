import productsData from "@/lib/products.json";
import ProductClient from "./ProductClient";

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

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find((p) => p.id === id || p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === id);

  if (!product) {
    return null;
  }

  return <ProductClient product={product} />;
}

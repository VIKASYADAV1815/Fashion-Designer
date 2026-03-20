import ProductClient from "./ProductClient";
import products from "@/lib/products.json";

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.slug || product.id,
  }));
}

export default function ProductPage() {
  return <ProductClient />;
}

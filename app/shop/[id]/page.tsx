import ProductClient from "./ProductClient";
import { loadProductCatalog } from "@/lib/products";

export async function generateStaticParams() {
  const products = await loadProductCatalog();

  return products.map((product) => ({
    id: product.slug || product.id,
  }));
}

export default function ProductPage() {
  return <ProductClient />;
}

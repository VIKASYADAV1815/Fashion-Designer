import ProductClient from "./ProductClient";
import productsData from "@/lib/products.json";

export async function generateStaticParams() {
  return productsData.map((product) => ({
    id: product.id,
  }));
}

export default function ProductPage() {
  return <ProductClient />;
}

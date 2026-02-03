"use client";

import ShopCard from "./ShopCard";

const products = [
  {
    id: "1",
    name: "Structured Wool Coat",
    price: 1250,
    category: "Coats",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936&auto=format&fit=crop"
  },
  {
    id: "2",
    name: "Silk Evening Dress",
    price: 890,
    category: "Dresses",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1908&auto=format&fit=crop"
  },
  {
    id: "3",
    name: "Leather Tote",
    price: 1800,
    category: "Bags",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2069&auto=format&fit=crop"
  },
  {
    id: "4",
    name: "Cashmere Sweater",
    price: 550,
    category: "Knitwear",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1964&auto=format&fit=crop"
  },
  {
    id: "5",
    name: "Tailored Trousers",
    price: 450,
    category: "Pants",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1887&auto=format&fit=crop"
  },
  {
    id: "6",
    name: "Velvet Blazer",
    price: 980,
    category: "Jackets",
    image: "https://images.unsplash.com/photo-1550614000-4b9519e08d83?q=80&w=1888&auto=format&fit=crop"
  }
];

export default function ShopGrid() {
  return (
    <section className="py-24 px-6 md:px-12 bg-white text-black">
      <div className="container mx-auto">
        <div className="mb-16 text-center">
           <h2 className="text-3xl md:text-4xl font-light uppercase tracking-tighter mb-4">The Edit</h2>
           <div className="w-12 h-px bg-black mx-auto" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {products.map((product, index) => (
            <ShopCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

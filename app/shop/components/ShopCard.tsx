"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface ShopCardProps {
  product: Product;
  index: number;
}

export default function ShopCard({ product, index }: ShopCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
      className="group cursor-pointer"
    >
      <Link href={`/shop/${product.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
          
          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
             <button className="w-full bg-white text-black py-3 text-xs uppercase tracking-widest font-bold hover:bg-black hover:text-white transition-colors">
               Quick View
             </button>
          </div>
        </div>

        <div className="text-center">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">{product.category}</p>
          <h3 className="text-sm font-bold uppercase tracking-widest mb-2 group-hover:text-gray-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-xs font-light tracking-wider">${product.price.toLocaleString()}</p>
        </div>
      </Link>
    </motion.div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ShoppingBag, X, MoveUpRight } from "lucide-react";
import Link from "next/link";

type OrderItem = {
  _id?: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
};

type Order = {
  _id: string;
  totalAmount: number;
  createdAt: string;
  paymentStatus: string;
  items: OrderItem[];
};

// --- KINETIC TEXT COMPONENT ---
const SplitText = ({ children }: { children: string }) => {
  return (
    <span className="inline-block overflow-hidden">
      {children.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ delay: i * 0.02, duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/user/${user.id}`);
        const data: unknown = await response.json();
        const nextOrders = (data as { orders?: Order[] } | null)?.orders;
        setOrders(Array.isArray(nextOrders) ? nextOrders : []);
      } catch (err: unknown) {
        console.error("Studio Link Offline", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans">

      <main className="pt-32 md:pt-40 pb-32 md:pb-40 px-6 max-w-7xl mx-auto">
        {/* Header (non-fixed so it won't overlap navbar) */}
        <div className="mb-10 flex justify-between items-start">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="text-[10px] font-bold tracking-[0.6em] text-stone-400">KC STUDIO</p>
            <h2 className="text-xs font-serif italic mt-1">Archive System v1.0</h2>
          </motion.div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex -space-x-1">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-2 h-2 rounded-full border border-stone-300 bg-[#FAF9F6]" />
              ))}
            </div>
            <p className="text-[9px] font-mono text-stone-400">ONLINE / SECURE</p>
          </div>
        </div>
        
        {/* 02. KINETIC HEADER */}
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <h1 className="text-7xl md:text-[10rem] font-serif italic leading-[0.8] tracking-tighter">
            <SplitText>Selections</SplitText>
          </h1>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-xs text-right hidden md:block"
          >
            <p className="text-[10px] uppercase tracking-widest leading-loose text-stone-400">
              The digital registry of your bespoke journey. Every garment here is a fragment of the Khushi Chauhan legacy.
            </p>
          </motion.div>
        </div>

        {isLoading ? (
          <div className="h-64 flex items-center justify-center">
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="w-12 h-12 border-t border-stone-900 rounded-full" 
            />
          </div>
        ) : orders.length === 0 ? (
          /* THE "VOID" STATE - KINETIC SVG */
          <div className="relative min-h-[50vh] flex flex-col items-center justify-center px-4">
            <motion.div 
              animate={{ y: [0, -20, 0] }} 
              transition={{ duration: 6, repeat: Infinity }}
              className="absolute opacity-[0.03] select-none"
            >
              <ShoppingBag size={400} strokeWidth={0.5} />
            </motion.div>
            <h2 className="text-4xl font-serif italic mb-3 text-center">No pieces found.</h2>
            <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-bold mb-10 text-center max-w-md">
              Begin with the staples: lehenga, drape saree, and saree silhouettes.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <Link
                href="/shop?category=Lehenga"
                className="group flex items-center gap-4 bg-stone-900 text-white px-10 py-5 rounded-full text-[10px] font-bold uppercase tracking-widest overflow-hidden relative"
              >
                <span className="relative z-10">Shop Lehengas</span>
                <div className="absolute inset-0 bg-[#C5A059] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <MoveUpRight size={14} className="relative z-10" />
              </Link>

              <Link
                href="/shop?category=Drape"
                className="group flex items-center gap-4 border border-stone-200 bg-white text-stone-900 px-10 py-5 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-stone-50"
              >
                <span className="relative z-10">Shop Drape Sarees</span>
                <MoveUpRight size={14} className="relative z-10" />
              </Link>

              <Link
                href="/shop?category=Saree"
                className="group flex items-center gap-4 border border-stone-200 bg-white text-stone-900 px-10 py-5 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-stone-50"
              >
                <span className="relative z-10">Shop Sarees</span>
                <MoveUpRight size={14} className="relative z-10" />
              </Link>
            </div>

            <div className="mt-6 relative z-10">
              <Link href="/collections" className="text-[9px] uppercase tracking-[0.35em] font-bold text-stone-400 hover:text-stone-900">
                View Lookbook
              </Link>
            </div>
          </div>
        ) : (
          /* THE MASONRY-STYLE DYNAMIC GRID */
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            <AnimatePresence>
              {orders.map((order, i) => (
                <motion.div
                  key={order._id}
                  layoutId={order._id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, ease: [0.215, 0.61, 0.355, 1] }}
                  onClick={() => setSelectedId(order._id)}
                  className="break-inside-avoid relative group cursor-none"
                >
                  <div className="bg-white border border-stone-100 p-8 md:p-10 rounded-sm shadow-[0_4px_30px_rgba(0,0,0,0.02)] group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)] transition-all duration-700">
                    
                    {/* Floating Item Image Preview */}
                    <div className="relative aspect-4/5 bg-stone-100 mb-8 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-1000">
                       <motion.img 
                         whileHover={{ scale: 1.1 }}
                         transition={{ duration: 1.5 }}
                         src={order.items[0]?.image} 
                         className="w-full h-full object-cover"
                       />
                       <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Plus size={16} className="text-white" />
                       </div>
                    </div>

                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-[9px] font-bold tracking-[0.4em] text-stone-400 mb-2 uppercase">Selection {order._id.slice(-4)}</p>
                        <h3 className="text-3xl font-serif italic">₹{order.totalAmount.toLocaleString()}</h3>
                      </div>
                      <div className="text-right">
                        <p className="text-[9px] font-bold tracking-[0.2em] text-stone-400 uppercase">
                          {new Date(order.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CUSTOM CURSOR REPLACEMENT (Only on card hover) */}
                  <div className="absolute pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                      {/* You can add a custom dot here if needed */}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      {/* 03. MAGIC EXPANDED VIEW - THE GALLERY OVERLAY */}
      <AnimatePresence>
        {selectedId && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-200 flex items-center justify-center p-4 md:p-10"
          >
            <div className="absolute inset-0 bg-stone-950/40 backdrop-blur-2xl" onClick={() => setSelectedId(null)} />
            
            <motion.div 
              layoutId={selectedId}
              className="relative w-full max-w-6xl h-full max-h-[85vh] bg-white flex flex-col md:flex-row overflow-hidden shadow-2xl"
            >
              <div className="w-full md:w-[60%] h-1/2 md:h-auto overflow-hidden bg-stone-100">
                <img
                  alt=""
                  src={orders.find((o) => o._id === selectedId)?.items[0]?.image} 
                  className="w-full h-full object-cover" 
                />
              </div>

              <div className="w-full md:w-[40%] p-10 md:p-16 flex flex-col justify-between bg-[#FAF9F6]">
                <div>
                  <div className="flex justify-between items-start mb-12">
                     <span className="text-[10px] font-bold tracking-[0.5em] text-[#C5A059]">AUTHENTIC PIECE</span>
                     <button onClick={() => setSelectedId(null)} className="p-2 hover:bg-stone-200 rounded-full transition-colors">
                        <X size={20} />
                     </button>
                  </div>
                  
                  <h2 className="text-4xl md:text-5xl font-serif italic mb-10 leading-tight">Selection <br/> Details</h2>
                  
                  <div className="space-y-6">
                    {orders.find((o) => o._id === selectedId)?.items.map((item: OrderItem, idx: number) => (
                      <div key={idx} className="flex justify-between items-center group/item">
                        <span className="text-sm font-medium">{item.name}</span>
                        <div className="h-px flex-1 mx-4 bg-stone-200 group-hover/item:bg-[#C5A059] transition-colors" />
                        <span className="text-sm italic tracking-tighter">₹{item.price.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-12">
                   <div className="flex justify-between items-end mb-8">
                      <span className="text-[10px] font-bold tracking-[0.4em] text-stone-400">TOTAL</span>
                      <span className="text-3xl font-serif italic">₹{orders.find((o) => o._id === selectedId)?.totalAmount.toLocaleString()}</span>
                   </div>
                   <button className="w-full py-6 bg-stone-900 text-white text-[10px] font-bold uppercase tracking-[0.5em] hover:bg-[#C5A059] transition-all">
                      Secure Archive Access
                   </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Package, ChevronRight, Loader } from "lucide-react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (!user.id) {
        setError("You must be logged in to view your orders.");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/user/${user.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch orders.");
        }
        const data = await response.json();
        setOrders(data.orders);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <div className="max-w-4xl mx-auto py-24 px-4">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-serif tracking-tighter mb-12 text-center"
        >
          My Orders
        </motion.h1>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader className="animate-spin text-white/50" size={32} />
          </div>
        ) : error ? (
          <div className="text-center text-rose-500 bg-rose-500/10 p-6 rounded-xl">
            {error}
          </div>
        ) : orders.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 bg-white/5 rounded-2xl flex flex-col items-center gap-6"
          >
            <Package size={48} className="text-white/20" />
            <h2 className="text-xl font-semibold tracking-tight">No Orders Found</h2>
            <p className="text-white/50 max-w-sm">
              You haven't placed any orders yet. When you do, they will appear here.
            </p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            <AnimatePresence>
              {orders.map((order: any, i) => (
                <motion.div
                  key={order._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: i * 0.05 } }}
                  className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
                >
                  <div className="p-6 flex justify-between items-center">
                    <div>
                      <p className="text-xs text-white/50 font-mono">#{order._id.slice(-8)}</p>
                      <p className="text-lg font-semibold">₹{order.totalAmount.toLocaleString()}</p>
                      <p className="text-xs text-white/50">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${order.paymentStatus === 'paid' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                        {order.paymentStatus}
                      </p>
                    </div>
                  </div>
                  <div className="bg-black/50 p-6 border-t border-white/10">
                    {order.items.map((item: any) => (
                      <div key={item._id} className="flex items-center gap-4 not-last:mb-4">
                        <div className="w-16 h-16 rounded-lg bg-white/10 overflow-hidden shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-xs text-white/50">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-semibold">₹{item.price.toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

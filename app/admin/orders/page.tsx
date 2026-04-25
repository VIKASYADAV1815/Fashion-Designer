"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Eye,
  X,
  Package,
  Clock,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  User,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

interface OrderUserInfo {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

interface OrderRecord {
  _id: string;
  userInfo?: OrderUserInfo;
  items: OrderItem[];
  totalAmount: number;
  paymentStatus: "pending" | "paid" | "failed";
  createdAt: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<OrderRecord | null>(null);
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadOrders = async () => {
      setIsLoading(true);
      setError("");

      try {
        if (!API_BASE_URL) throw new Error("NEXT_PUBLIC_API_URL is missing");

        const response = await fetch(`${API_BASE_URL}/orders`, {
          credentials: "include",
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data?.message || "Failed to load orders");

        setOrders(Array.isArray(data) ? data : []);
      } catch (loadError: any) {
        setError(loadError.message || "Failed to load orders");
      } finally {
        setIsLoading(false);
      }
    };

    loadOrders();
  }, []);

  const formatMoney = (value: number) => `₹${Number(value || 0).toLocaleString("en-IN")}`;

  const formatDate = (value?: string) => {
    if (!value) return "-";
    return new Date(value).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatOrderId = (value?: string) => {
    if (!value) return "-";
    const suffix = value.slice(-6).toUpperCase();
    return `#ORD-${suffix}`;
  };

  const getPaymentColor = (status: OrderRecord["paymentStatus"]) => {
    switch (status) {
      case "paid":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-100";
      case "failed":
        return "bg-red-50 text-red-700 border-red-100";
      default:
        return "bg-slate-50 text-slate-700 border-slate-100";
    }
  };

  const getPaymentIcon = (status: OrderRecord["paymentStatus"]) => {
    switch (status) {
      case "paid":
        return <CheckCircle2 size={14} />;
      case "pending":
        return <Clock size={14} />;
      case "failed":
        return <AlertCircle size={14} />;
      default:
        return null;
    }
  };

  const filteredOrders = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return orders;

    return orders.filter((order) => {
      const id = order._id?.toLowerCase() || "";
      const name = order.userInfo?.name?.toLowerCase() || "";
      const email = order.userInfo?.email?.toLowerCase() || "";
      return id.includes(query) || name.includes(query) || email.includes(query);
    });
  }, [orders, searchQuery]);

  return (
    <div className="space-y-8 font-josefin">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-playfair font-bold text-slate-900">Orders</h1>
          <p className="text-slate-500 mt-1">Track and fulfill your customer orders</p>
        </div>
        <button className="px-6 py-3 bg-white border border-[#F0E6D2] text-slate-600 font-medium rounded-xl shadow-sm flex items-center gap-2">
          <Package size={18} />
          Total: {orders.length} Orders
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 bg-white p-5 rounded-2xl border border-[#F0E6D2] shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by order ID, customer, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-12 pr-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#C5A059]/20 focus:border-[#C5A059] transition-all"
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="bg-white border border-[#F0E6D2] rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-[#F0E6D2]">
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Order ID</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Customer</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Payment</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0E6D2]">
              {isLoading && (
                <tr>
                  <td colSpan={6} className="px-8 py-10 text-center text-slate-500">
                    Loading orders...
                  </td>
                </tr>
              )}

              {!isLoading && filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-8 py-10 text-center text-slate-500">
                    No orders found.
                  </td>
                </tr>
              )}

              {filteredOrders.map((order) => (
                <tr key={order._id} className="hover:bg-[#FDFBF7] transition-colors group">
                  <td className="px-8 py-5 font-bold text-slate-900">{formatOrderId(order._id)}</td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-900">{order.userInfo?.name || "Guest"}</span>
                      <span className="text-xs text-slate-400">{order.userInfo?.email || "-"}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-slate-600">{formatDate(order.createdAt)}</td>
                  <td className="px-8 py-5 font-bold text-slate-900">{formatMoney(order.totalAmount)}</td>
                  <td className="px-8 py-5">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs border font-semibold ${getPaymentColor(
                        order.paymentStatus
                      )}`}
                    >
                      {getPaymentIcon(order.paymentStatus)}
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="p-2.5 hover:bg-white border border-transparent hover:border-[#F0E6D2] rounded-xl text-slate-400 hover:text-[#C5A059] transition-all shadow-sm group"
                    >
                      <Eye size={20} className="group-hover:scale-110 transition-transform" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOrder(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-[#F0E6D2] overflow-hidden flex flex-col md:flex-row"
            >
              <div className="flex-1 p-8 border-r border-[#F0E6D2]">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h2 className="text-2xl font-playfair font-bold text-slate-900">Order Details</h2>
                    <p className="text-[#C5A059] font-bold mt-1">{formatOrderId(selectedOrder._id)}</p>
                  </div>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors md:hidden"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-slate-400">
                        <User size={18} className="text-[#C5A059]" />
                        <span className="text-xs font-bold uppercase tracking-wider">Customer</span>
                      </div>
                      <div className="pl-7">
                        <p className="font-bold text-slate-900">{selectedOrder.userInfo?.name || "Guest"}</p>
                        <div className="flex items-center gap-2 mt-2 text-sm text-slate-500">
                          <Mail size={14} />
                          {selectedOrder.userInfo?.email || "-"}
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-sm text-slate-500">
                          <Phone size={14} />
                          {selectedOrder.userInfo?.phone || "-"}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-slate-400">
                        <MapPin size={18} className="text-[#C5A059]" />
                        <span className="text-xs font-bold uppercase tracking-wider">Shipping Address</span>
                      </div>
                      <p className="pl-7 text-sm text-slate-600 leading-relaxed">
                        {[
                          selectedOrder.userInfo?.address,
                          selectedOrder.userInfo?.city,
                          selectedOrder.userInfo?.state,
                          selectedOrder.userInfo?.postalCode,
                          selectedOrder.userInfo?.country,
                        ]
                          .filter(Boolean)
                          .join(", ") || "-"}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-3 text-slate-400">
                      <Package size={18} className="text-[#C5A059]" />
                      <span className="text-xs font-bold uppercase tracking-wider">Ordered Items</span>
                    </div>
                    <div className="space-y-3">
                      {selectedOrder.items.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100"
                        >
                          <div className="w-16 h-16 bg-white rounded-xl overflow-hidden border border-slate-200">
                            {item.image ? (
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                                No image
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-slate-900">{item.name}</p>
                            <p className="text-sm text-slate-500">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-bold text-slate-900">{formatMoney(item.price)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-80 bg-[#FDFBF7] p-8 flex flex-col">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="hidden md:flex self-end p-2 hover:bg-white rounded-full text-slate-400 transition-colors mb-4"
                >
                  <X size={24} />
                </button>

                <h3 className="text-lg font-playfair font-bold text-slate-900 mb-6">Order Summary</h3>

                <div className="space-y-4 flex-1">
                  <div className="flex justify-between text-sm text-slate-500 font-medium">
                    <span>Subtotal</span>
                    <span>{formatMoney(selectedOrder.totalAmount)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-500 font-medium">
                    <span>Shipping</span>
                    <span className="text-emerald-600 font-bold uppercase text-[10px]">Free</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-500 font-medium">
                    <span>Tax (GST)</span>
                    <span>₹0</span>
                  </div>
                  <div className="pt-4 border-t border-[#F0E6D2] flex justify-between items-center">
                    <span className="font-bold text-slate-900">Total</span>
                    <span className="text-xl font-bold text-[#C5A059]">
                      {formatMoney(selectedOrder.totalAmount)}
                    </span>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-[#F0E6D2]">
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold text-center">
                    Khushi Chauhan Designer Studio
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

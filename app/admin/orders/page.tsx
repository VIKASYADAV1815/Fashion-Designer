"use client";

import { useState } from "react";
import { Search, Filter, Eye, X, Package, Truck, Clock, CheckCircle2, MapPin, Phone, Mail, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [orders] = useState([
    {
      id: "#ORD-7829",
      customer: "Priya Sharma",
      email: "priya.s@example.com",
      phone: "+91 98765 43210",
      address: "123, Luxury Heights, South Extension, New Delhi - 110049",
      date: "Oct 24, 2023",
      amount: "₹65,000",
      payment: "Paid",
      status: "Processing",
      items: [
        { name: "Red Bridal Lehenga", quantity: 1, price: "₹65,000", image: "/lehanga/l1.webp" }
      ]
    },
    {
      id: "#ORD-7830",
      customer: "Rahul Verma",
      email: "rahul.v@example.com",
      phone: "+91 87654 32109",
      address: "45, Garden View Apartments, Bandra West, Mumbai - 400050",
      date: "Oct 24, 2023",
      amount: "₹12,500",
      payment: "Paid",
      status: "Delivered",
      items: [
        { name: "Royal Blue Silk Saree", quantity: 1, price: "₹12,500", image: "/saree/s1.webp" }
      ]
    },
    {
      id: "#ORD-7831",
      customer: "Sneha Gupta",
      email: "sneha.g@example.com",
      phone: "+91 76543 21098",
      address: "12, Rose Villa, Jubilee Hills, Hyderabad - 500033",
      date: "Oct 23, 2023",
      amount: "₹4,500",
      payment: "Pending",
      status: "Pending",
      items: [
        { name: "Silk Scarf", quantity: 2, price: "₹2,250", image: "/lehanga/l41.webp" }
      ]
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'Processing': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'Pending': return 'bg-amber-50 text-amber-700 border-amber-100';
      default: return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered': return <CheckCircle2 size={14} />;
      case 'Processing': return <Clock size={14} />;
      case 'Pending': return <Clock size={14} />;
      default: return null;
    }
  };

  return (
    <div className="space-y-8 font-josefin">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-playfair font-bold text-slate-900">Orders</h1>
          <p className="text-slate-500 mt-1">Track and fulfill your customer orders</p>
        </div>
        <button className="px-6 py-3 bg-white border border-[#F0E6D2] text-slate-600 font-medium rounded-xl hover:bg-[#FDFBF7] transition-all duration-300 shadow-sm flex items-center gap-2">
          <Package size={18} />
          Export Report
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-5 rounded-2xl border border-[#F0E6D2] shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by order ID or customer name..." 
            className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-12 pr-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#C5A059]/20 focus:border-[#C5A059] transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-slate-50 border border-slate-100 text-slate-600 rounded-xl hover:bg-slate-100 transition-all font-medium">
          <Filter size={18} />
          More Filters
        </button>
      </div>

      {/* Orders Table */}
      <div className="bg-white border border-[#F0E6D2] rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-[#F0E6D2]">
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Order ID</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Customer</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0E6D2]">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-[#FDFBF7] transition-colors group">
                  <td className="px-8 py-5 font-bold text-slate-900">{order.id}</td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-900">{order.customer}</span>
                      <span className="text-xs text-slate-400">{order.email}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-slate-600">{order.date}</td>
                  <td className="px-8 py-5 font-bold text-slate-900">{order.amount}</td>
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

      {/* Order Details Modal */}
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
              {/* Left Side: Order Info */}
              <div className="flex-1 p-8 border-r border-[#F0E6D2]">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h2 className="text-2xl font-playfair font-bold text-slate-900">Order Details</h2>
                    <p className="text-[#C5A059] font-bold mt-1">{selectedOrder.id}</p>
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
                        <p className="font-bold text-slate-900">{selectedOrder.customer}</p>
                        <div className="flex items-center gap-2 mt-2 text-sm text-slate-500">
                          <Mail size={14} />
                          {selectedOrder.email}
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-sm text-slate-500">
                          <Phone size={14} />
                          {selectedOrder.phone}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-slate-400">
                        <MapPin size={18} className="text-[#C5A059]" />
                        <span className="text-xs font-bold uppercase tracking-wider">Shipping Address</span>
                      </div>
                      <p className="pl-7 text-sm text-slate-600 leading-relaxed">
                        {selectedOrder.address}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-3 text-slate-400">
                      <Package size={18} className="text-[#C5A059]" />
                      <span className="text-xs font-bold uppercase tracking-wider">Ordered Items</span>
                    </div>
                    <div className="space-y-3">
                      {selectedOrder.items.map((item: any, i: number) => (
                        <div key={i} className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                          <div className="w-16 h-16 bg-white rounded-xl overflow-hidden relative border border-slate-200">
                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-slate-900">{item.name}</p>
                            <p className="text-sm text-slate-500">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-bold text-slate-900">{item.price}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Order Summary */}
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
                    <span>{selectedOrder.amount}</span>
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
                    <span className="text-xl font-bold text-[#C5A059]">{selectedOrder.amount}</span>
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

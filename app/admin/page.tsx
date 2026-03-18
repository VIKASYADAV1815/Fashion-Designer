"use client";

import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  DollarSign, 
  Package,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AdminDashboard() {
  const stats = [
    {
      label: "Total Revenue",
      value: "₹2,45,000",
      change: "+12.5%",
      isPositive: true,
      icon: DollarSign,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Total Orders",
      value: "148",
      change: "+8.2%",
      isPositive: true,
      icon: ShoppingBag,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Active Customers",
      value: "1,203",
      change: "+4.1%",
      isPositive: true,
      icon: Users,
      color: "text-[#C5A059]",
      bg: "bg-[#FDFBF7]",
    },
    {
      label: "Products",
      value: "86",
      change: "-2.4%",
      isPositive: false,
      icon: Package,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
  ];

  const recentOrders = [
    { id: "#ORD-001", customer: "Priya Sharma", items: "Red Bridal Lehenga", amount: "₹65,000", status: "Pending", date: "2 mins ago" },
    { id: "#ORD-002", customer: "Anjali Singh", items: "Silk Saree", amount: "₹12,500", status: "Delivered", date: "1 hour ago" },
    { id: "#ORD-003", customer: "Meera Patel", items: "Designer Gown", amount: "₹28,000", status: "Processing", date: "3 hours ago" },
    { id: "#ORD-004", customer: "Sneha Gupta", items: "Embroidered Kurti", amount: "₹4,500", status: "Shipped", date: "5 hours ago" },
  ];

  return (
    <div className="space-y-10 font-josefin">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-playfair font-bold text-slate-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-slate-500 mt-1 flex items-center gap-2">
            <Calendar size={16} className="text-[#C5A059]" />
            Welcome back, Admin. Here's what's happening today.
          </p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none px-6 py-3 bg-white border border-[#F0E6D2] text-slate-600 font-bold rounded-xl hover:bg-[#FDFBF7] transition-all shadow-sm">
            Download Report
          </button>
          <Link href="/admin/products" className="flex-1 md:flex-none px-6 py-3 bg-[#C5A059] text-white font-bold rounded-xl hover:bg-[#B38F4D] transition-all shadow-lg shadow-[#C5A059]/20 text-center">
            Manage Products
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border border-[#F0E6D2] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex items-start justify-between mb-6">
                <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={24} />
                </div>
                <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                  stat.isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                }`}>
                  {stat.isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {stat.change}
                </div>
              </div>
              <div>
                <h3 className="text-slate-400 text-sm font-bold uppercase tracking-wider">{stat.label}</h3>
                <p className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders Table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-playfair font-bold text-slate-900">Recent Orders</h2>
            <Link href="/admin/orders" className="text-[#C5A059] text-sm font-bold hover:underline flex items-center gap-1">
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <div className="bg-white border border-[#F0E6D2] rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 border-b border-[#F0E6D2]">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Order</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0E6D2]">
                  {recentOrders.map((order, i) => (
                    <tr key={i} className="hover:bg-[#FDFBF7] transition-colors group cursor-pointer">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-900">{order.id}</span>
                          <span className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">{order.date}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-900">{order.customer}</span>
                          <span className="text-xs text-slate-400 line-clamp-1">{order.items}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-900 text-right">{order.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Actions / Activity */}
        <div className="space-y-4">
          <h2 className="text-xl font-playfair font-bold text-slate-900">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-4">
            {[
              { label: "Add New Product", desc: "List a new luxury item", icon: Package, href: "/admin/products" },
              { label: "Manage Customers", desc: "View client history", icon: Users, href: "/admin/customers" },
              { label: "View All Orders", desc: "Check transaction history", icon: ShoppingBag, href: "/admin/orders" },
            ].map((action, i) => (
              <Link 
                key={i} 
                href={action.href}
                className="bg-white border border-[#F0E6D2] p-5 rounded-2xl shadow-sm hover:border-[#C5A059] transition-all flex items-center gap-4 group"
              >
                <div className="p-3 bg-[#FDFBF7] rounded-xl text-[#C5A059] group-hover:bg-[#C5A059] group-hover:text-white transition-all">
                  <action.icon size={20} />
                </div>
                <div>
                  <p className="font-bold text-slate-900">{action.label}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{action.desc}</p>
                </div>
                <ChevronRight size={16} className="ml-auto text-slate-300 group-hover:text-[#C5A059] transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

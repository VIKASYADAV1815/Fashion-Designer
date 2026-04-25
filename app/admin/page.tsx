"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Users,
  ShoppingBag,
  DollarSign,
  Package,
  Calendar,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

interface ProductRecord {
  id?: string;
  _id?: string;
}

interface OrderUserInfo {
  name?: string;
  email?: string;
}

interface OrderItem {
  name?: string;
}

interface OrderRecord {
  _id: string;
  userInfo?: OrderUserInfo;
  items?: OrderItem[];
  totalAmount: number;
  paymentStatus: "pending" | "paid" | "failed";
  createdAt: string;
}

interface UserRecord {
  _id: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const formatMoney = (value: number) => `₹${Number(value || 0).toLocaleString("en-IN")}`;

const formatOrderId = (value?: string) => {
  if (!value) return "-";
  const suffix = value.slice(-6).toUpperCase();
  return `#ORD-${suffix}`;
};

const formatRelativeTime = (value?: string) => {
  if (!value) return "-";
  const now = Date.now();
  const then = new Date(value).getTime();
  const diffMs = Math.max(0, now - then);

  const mins = Math.floor(diffMs / (1000 * 60));
  if (mins < 1) return "JUST NOW";
  if (mins < 60) return `${mins} MINS AGO`;

  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} HOURS AGO`;

  const days = Math.floor(hours / 24);
  return `${days} DAYS AGO`;
};

export default function AdminDashboard() {
  const [products, setProducts] = useState<ProductRecord[]>([]);
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true);
      setError("");

      try {
        if (!API_BASE_URL) throw new Error("NEXT_PUBLIC_API_URL is missing");

        const [productsRes, ordersRes, usersRes] = await Promise.all([
          fetch(`${API_BASE_URL}/products`, { credentials: "include" }),
          fetch(`${API_BASE_URL}/orders`, { credentials: "include" }),
          fetch(`${API_BASE_URL}/auth/users`, { credentials: "include" }),
        ]);

        const [productsData, ordersData, usersData] = await Promise.all([
          productsRes.json(),
          ordersRes.json(),
          usersRes.json(),
        ]);

        if (!productsRes.ok) throw new Error(productsData?.message || "Failed to load products");
        if (!ordersRes.ok) throw new Error(ordersData?.message || "Failed to load orders");
        if (!usersRes.ok) throw new Error(usersData?.message || "Failed to load users");

        setProducts(Array.isArray(productsData?.products) ? productsData.products : []);
        setOrders(Array.isArray(ordersData) ? ordersData : []);
        setUsers(Array.isArray(usersData?.users) ? usersData.users : []);
      } catch (loadError: any) {
        setError(loadError.message || "Failed to load dashboard data");
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const totalRevenue = useMemo(
    () => orders.filter((o) => o.paymentStatus === "paid").reduce((sum, o) => sum + Number(o.totalAmount || 0), 0),
    [orders]
  );

  const recentOrders = useMemo(
    () => [...orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 6),
    [orders]
  );

  const stats = [
    {
      label: "Total Revenue",
      value: formatMoney(totalRevenue),
      badge: "LIVE",
      icon: DollarSign,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      badgeClass: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Total Orders",
      value: String(orders.length),
      badge: "LIVE",
      icon: ShoppingBag,
      color: "text-blue-600",
      bg: "bg-blue-50",
      badgeClass: "bg-blue-50 text-blue-600",
    },
    {
      label: "Total Customers",
      value: String(users.length),
      badge: "LIVE",
      icon: Users,
      color: "text-[#C5A059]",
      bg: "bg-[#FDFBF7]",
      badgeClass: "bg-[#FDFBF7] text-[#C5A059]",
    },
    {
      label: "Products",
      value: String(products.length),
      badge: "LIVE",
      icon: Package,
      color: "text-amber-600",
      bg: "bg-amber-50",
      badgeClass: "bg-amber-50 text-amber-600",
    },
  ];

  return (
    <div className="space-y-10 font-josefin">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-playfair font-bold text-slate-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-slate-500 mt-1 flex items-center gap-2">
            <Calendar size={16} className="text-[#C5A059]" />
            Welcome back, Admin. Here&apos;s what&apos;s happening today.
          </p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          {/* <button className="flex-1 md:flex-none px-6 py-3 bg-white border border-[#F0E6D2] text-slate-600 font-bold rounded-xl shadow-sm">
            Download Report
          </button> */}
          <Link
            href="/admin/products"
            className="flex-1 md:flex-none px-6 py-3 bg-[#C5A059] text-white font-bold rounded-xl hover:bg-[#B38F4D] transition-all shadow-lg shadow-[#C5A059]/20 text-center"
          >
            Manage Products
          </Link>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700 flex items-center gap-2">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="bg-white border border-[#F0E6D2] rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-start justify-between mb-6">
                <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
                  <Icon size={24} />
                </div>
                <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${stat.badgeClass}`}>
                  {stat.badge}
                </div>
              </div>
              <div>
                <h3 className="text-slate-400 text-sm font-bold uppercase tracking-wider">{stat.label}</h3>
                <p className="text-3xl font-bold text-slate-900 mt-1">{isLoading ? "..." : stat.value}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                  {isLoading && (
                    <tr>
                      <td colSpan={3} className="px-6 py-8 text-center text-slate-500">
                        Loading orders...
                      </td>
                    </tr>
                  )}

                  {!isLoading && recentOrders.length === 0 && (
                    <tr>
                      <td colSpan={3} className="px-6 py-8 text-center text-slate-500">
                        No orders yet.
                      </td>
                    </tr>
                  )}

                  {recentOrders.map((order) => (
                    <tr key={order._id} className="hover:bg-[#FDFBF7] transition-colors group cursor-pointer">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-900">{formatOrderId(order._id)}</span>
                          <span className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">
                            {formatRelativeTime(order.createdAt)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-900">{order.userInfo?.name || "Guest"}</span>
                          <span className="text-xs text-slate-400 line-clamp-1">{order.items?.[0]?.name || "-"}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-900 text-right">{formatMoney(order.totalAmount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-playfair font-bold text-slate-900">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-4">
            {[
              { label: "Add New Product", desc: "List a new luxury item", icon: Package, href: "/admin/products" },
              { label: "Manage Customers", desc: "View client history", icon: Users, href: "/admin/customers" },
              { label: "View All Orders", desc: "Check transaction history", icon: ShoppingBag, href: "/admin/orders" },
            ].map((action) => (
              <Link
                key={action.label}
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

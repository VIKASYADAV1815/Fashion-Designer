"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, Mail, Phone, ExternalLink } from "lucide-react";

interface OrderUserInfo {
  name?: string;
  email?: string;
  phone?: string;
}

interface OrderRecord {
  _id: string;
  userInfo?: OrderUserInfo;
  totalAmount: number;
  createdAt: string;
}

interface UserRecord {
  _id: string;
  name?: string;
  email?: string;
  phone?: string;
  createdAt?: string;
}

interface CustomerRow {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  totalSpent: number;
  lastOrder: string;
  avatar: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const formatMoney = (value: number) => `₹${Number(value || 0).toLocaleString("en-IN")}`;

const formatDate = (value?: string) => {
  if (!value) return "-";
  return new Date(value).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getAvatar = (name: string) => {
  const parts = name.trim().split(" ").filter(Boolean);
  if (!parts.length) return "CU";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
};

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [customers, setCustomers] = useState<CustomerRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCustomers = async () => {
      setIsLoading(true);
      setError("");

      try {
        if (!API_BASE_URL) throw new Error("NEXT_PUBLIC_API_URL is missing");

        const [usersResponse, ordersResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/auth/users`, {
            credentials: "include",
          }),
          fetch(`${API_BASE_URL}/orders`, {
            credentials: "include",
          }),
        ]);

        const usersData = await usersResponse.json();
        const ordersData = await ordersResponse.json();

        if (!usersResponse.ok) {
          throw new Error(usersData?.message || "Failed to load users");
        }

        if (!ordersResponse.ok) {
          throw new Error(ordersData?.message || "Failed to load orders");
        }

        const users: UserRecord[] = Array.isArray(usersData?.users) ? usersData.users : [];
        const orders: OrderRecord[] = Array.isArray(ordersData) ? ordersData : [];

        const grouped = new Map<string, CustomerRow>();

        // Seed with all registered users so even 0-order users appear.
        for (const user of users) {
          const name = user.name?.trim() || "Guest Customer";
          const email = user.email?.trim().toLowerCase() || "-";
          const phone = user.phone?.trim() || "-";
          const key = email !== "-" ? email : phone !== "-" ? phone : user._id;

          if (!grouped.has(key)) {
            grouped.set(key, {
              id: key,
              name,
              email,
              phone,
              orders: 0,
              totalSpent: 0,
              lastOrder: "",
              avatar: getAvatar(name),
            });
          }
        }

        for (const order of orders) {
          const name = order.userInfo?.name?.trim() || "Guest Customer";
          const email = order.userInfo?.email?.trim().toLowerCase() || "-";
          const phone = order.userInfo?.phone?.trim() || "-";

          const key = email !== "-" ? email : phone !== "-" ? phone : `${name}-${order._id}`;

          if (!grouped.has(key)) {
            grouped.set(key, {
              id: key,
              name,
              email,
              phone,
              orders: 0,
              totalSpent: 0,
              lastOrder: "",
              avatar: getAvatar(name),
            });
          }

          const current = grouped.get(key)!;
          current.orders += 1;
          current.totalSpent += Number(order.totalAmount || 0);

          if (!current.lastOrder || new Date(order.createdAt) > new Date(current.lastOrder)) {
            current.lastOrder = order.createdAt;
          }
        }

        const rows = Array.from(grouped.values()).sort(
          (a, b) => new Date(b.lastOrder).getTime() - new Date(a.lastOrder).getTime()
        );

        setCustomers(rows);
      } catch (loadError: any) {
        setError(loadError.message || "Failed to load customers");
      } finally {
        setIsLoading(false);
      }
    };

    loadCustomers();
  }, []);

  const filteredCustomers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return customers;

    return customers.filter((customer) =>
      customer.name.toLowerCase().includes(query) ||
      customer.email.toLowerCase().includes(query) ||
      customer.phone.includes(searchQuery)
    );
  }, [customers, searchQuery]);

  return (
    <div className="space-y-8 font-josefin">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-playfair font-bold text-slate-900">Customers</h1>
          <p className="text-slate-500 mt-1">Manage your luxury client relationships</p>
        </div>
        <button className="px-6 py-3 bg-white border border-[#F0E6D2] text-slate-600 font-medium rounded-xl shadow-sm flex items-center gap-2">
          <ExternalLink size={18} />
          Total: {customers.length} Customers
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 bg-white p-5 rounded-2xl border border-[#F0E6D2] shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by client name, email or phone..."
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
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Customer</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Contact Info</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Orders</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Total Spent</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Last Order</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0E6D2]">
              {isLoading && (
                <tr>
                  <td colSpan={5} className="px-8 py-10 text-center text-slate-500">
                    Loading customers...
                  </td>
                </tr>
              )}

              {!isLoading && filteredCustomers.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-8 py-10 text-center text-slate-500">
                    No customers found.
                  </td>
                </tr>
              )}

              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-[#FDFBF7] transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#C5A059]/10 text-[#C5A059] flex items-center justify-center font-bold text-sm border border-[#C5A059]/20 shadow-sm">
                        {customer.avatar}
                      </div>
                      <span className="font-bold text-slate-900">{customer.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Mail size={14} className="text-slate-400" /> {customer.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Phone size={14} className="text-slate-400" /> {customer.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold">
                      {customer.orders} Orders
                    </span>
                  </td>
                  <td className="px-8 py-5 font-bold text-slate-900">{formatMoney(customer.totalSpent)}</td>
                  <td className="px-8 py-5 text-slate-500 text-right">{formatDate(customer.lastOrder)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

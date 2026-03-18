"use client";

import { useState } from "react";
import { Search, Mail, Phone, User, ExternalLink, Filter } from "lucide-react";

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [customers] = useState([
    {
      id: 1,
      name: "Priya Sharma",
      email: "priya@example.com",
      phone: "+91 98765 43210",
      orders: 5,
      totalSpent: "₹1,25,000",
      lastOrder: "Oct 24, 2023",
      avatar: "PS"
    },
    {
      id: 2,
      name: "Rahul Verma",
      email: "rahul@example.com",
      phone: "+91 98765 43211",
      orders: 2,
      totalSpent: "₹25,000",
      lastOrder: "Oct 20, 2023",
      avatar: "RV"
    },
    {
      id: 3,
      name: "Anjali Singh",
      email: "anjali@example.com",
      phone: "+91 98765 43212",
      orders: 1,
      totalSpent: "₹8,500",
      lastOrder: "Oct 15, 2023",
      avatar: "AS"
    },
  ]);

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery)
  );

  return (
    <div className="space-y-8 font-josefin">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-playfair font-bold text-slate-900">Customers</h1>
          <p className="text-slate-500 mt-1">Manage your luxury client relationships</p>
        </div>
        <button className="px-6 py-3 bg-white border border-[#F0E6D2] text-slate-600 font-medium rounded-xl hover:bg-[#FDFBF7] transition-all duration-300 shadow-sm flex items-center gap-2">
          <ExternalLink size={18} />
          Export Client List
        </button>
      </div>

      {/* Filters & Search */}
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

      {/* Customers Table */}
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
                  <td className="px-8 py-5 font-bold text-slate-900">{customer.totalSpent}</td>
                  <td className="px-8 py-5 text-slate-500 text-right">{customer.lastOrder}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  LogOut, 
  Package,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface AdminSidebarProps {
  onLogout: () => void;
}

export default function AdminSidebar({ onLogout }: AdminSidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
    { name: "Customers", href: "/admin/customers", icon: Users },
  ];

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-6 right-6 z-60 p-3 bg-white text-[#C5A059] rounded-2xl border border-[#F0E6D2] shadow-xl hover:scale-105 transition-transform"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 z-50 h-screen w-64 bg-white border-r border-[#F0E6D2] shadow-[4px_0_24px_rgb(0,0,0,0.02)] transition-transform duration-300 ease-in-out lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="h-32 flex flex-col items-center justify-center px-8 border-b border-[#F0E6D2] bg-[#FDFBF7]">
            <Link href="/" className="relative w-full h-16 mb-2">
              <Image
                src="/images/logo.png"
                alt="Khushi Designer Studio"
                fill
                className="object-contain"
                priority
              />
            </Link>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-bold font-josefin">
              Studio Management
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-10 space-y-2 overflow-y-auto">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-4 rounded-xl text-sm font-medium transition-all duration-300 font-josefin group",
                    isActive 
                      ? "bg-[#FDFBF7] text-[#C5A059] shadow-sm border border-[#F0E6D2]" 
                      : "text-slate-500 hover:text-[#C5A059] hover:bg-[#FDFBF7] hover:translate-x-1"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon size={18} className={cn(
                    "transition-colors duration-300",
                    isActive ? "text-[#C5A059]" : "text-slate-400 group-hover:text-[#C5A059]"
                  )} />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-[#F0E6D2] bg-[#FDFBF7]">
            <button
              onClick={onLogout}
              className="flex items-center gap-3 px-4 py-4 w-full rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 hover:text-red-600 transition-all duration-300 font-josefin group"
            >
              <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-30 bg-gray-900/20 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

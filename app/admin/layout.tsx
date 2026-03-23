"use client";

import { useState, useEffect } from "react";
import AdminLogin from "./components/AdminLogin";
import AdminSidebar from "./components/AdminSidebar";
import { setWithExpiry, getWithExpiry, removeFromStorage } from "@/lib/storageWithExpiry";

// 10 minutes in milliseconds
const ADMIN_SESSION_TTL = 10 * 60 * 1000;
const ADMIN_AUTH_KEY = "isAdmin";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication status on mount
    // Validates token expiry automatically
    const auth = getWithExpiry(ADMIN_AUTH_KEY);
    if (auth === "true") {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = () => {
    // Store with 10-minute expiry
    setWithExpiry(ADMIN_AUTH_KEY, "true", ADMIN_SESSION_TTL);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    removeFromStorage(ADMIN_AUTH_KEY);
    setIsAuthenticated(false);
  };


  if (isLoading) {
    return <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-yellow-600 border-t-transparent rounded-full animate-spin" />
    </div>;
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-900 font-josefin">
      <AdminSidebar onLogout={handleLogout} />
      <main className="lg:ml-64 min-h-screen transition-all duration-300">
        <div className="p-4 lg:p-10 max-w-400 mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function RouteTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;

    // Don't overwrite the last page with the auth page itself.
    if (pathname.startsWith("/account")) return;

    // Avoid next/navigation's useSearchParams here to keep static export happy.
    const qs =
      typeof window !== "undefined" ? window.location.search : "";
    const fullPath = qs ? `${pathname}${qs}` : pathname;
    sessionStorage.setItem("kc_last_path", fullPath);
  }, [pathname]);

  return null;
}


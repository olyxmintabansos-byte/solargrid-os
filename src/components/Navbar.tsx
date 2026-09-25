"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sun,
  LayoutGrid,
  Zap,
  Gauge,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "SCADA HUB", icon: Sun },
    { href: "/bess", label: "BESS DESK", icon: Zap },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800 bg-[#030712]/95 backdrop-blur supports-[backdrop-filter]:bg-[#030712]/60">
      <div className="max-w-full px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 group-hover:shadow-lg group-hover:shadow-amber-500/50 transition-shadow">
              <Sun className="w-5 h-5 text-white" />
            </div>
            <span className="font-black text-white text-sm tracking-tight">
              SolarGrid<span className="text-amber-400">OS</span>
            </span>
          </Link>

          <div className="hidden sm:flex items-center gap-1">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "px-3 py-2 text-xs font-semibold rounded-md transition-all",
                  pathname === href
                    ? "bg-slate-800 text-amber-400 border border-slate-700"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                )}
              >
                <div className="flex items-center gap-1.5">
                  <Icon className="w-4 h-4" />
                  {label}
                </div>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="hidden sm:inline">System Online</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sun,
  BatteryCharging,
  FileSpreadsheet,
  TrendingDown,
} from "lucide-react";
import { useSolar } from "@/context/SolarContext";

export function Navbar() {
  const pathname = usePathname();
  const { telemetry } = useSolar();

  const navLinks = [
    { name: "SCADA Inverter Grid", href: "/", icon: Sun },
    { name: "BESS Storage Desk", href: "/bess/", icon: BatteryCharging },
    { name: "PLN PPA & REC A4", href: "/billing/", icon: FileSpreadsheet },
    { name: "PV Degradasi & LCOE", href: "/degradation/", icon: TrendingDown },
  ];

  return (
    <header className="border-b border-slate-800 bg-[#040815]/90 backdrop-blur-md sticky top-0 z-40 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 via-orange-500 to-yellow-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20">
              <Sun className="w-6 h-6 text-slate-950 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-white text-base tracking-wider">SOLARGRID</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold">
                  TITAN 17
                </span>
              </div>
              <p className="text-[10px] text-slate-400">50 MWp Floating Solar PV &amp; BESS SCADA ERP</p>
            </div>
          </Link>
        </div>

        {/* Telemetry Chip & Nav */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#060c20] border border-slate-800 text-xs font-mono">
            <span className="text-[10px] text-slate-400 uppercase">PR:</span>
            <span className="font-black text-emerald-400">{telemetry.performanceRatioPercent}%</span>
            <span className="text-slate-600">•</span>
            <span className="text-[10px] text-slate-400 uppercase">Gen:</span>
            <span className="font-black text-amber-400">{telemetry.currentGenerationMw.toFixed(2)} MW</span>
          </div>

          <nav className="flex items-center gap-1 sm:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                    isActive
                      ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/80 border border-transparent hover:border-slate-700"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{link.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}

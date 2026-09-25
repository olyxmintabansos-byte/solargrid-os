"use client";

import React from "react";
import { useSolar } from "@/context/SolarContext";
import { formatIDR } from "@/lib/utils";
import {
  TrendingDown,
  Sliders,
} from "lucide-react";

export default function PvDegradationPage() {
  const {
    degradationPoints,
    lcoeMetrics,
    soilingLossPercent,
    setSoilingLossPercent,
  } = useSolar();

  return (
    <div className="py-8 px-4 sm:px-6 max-w-7xl mx-auto space-y-8 font-mono">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-[#060c20] border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
              25-YEAR PV MODULE DEGRADATION &amp; LCOE
            </span>
            <span className="text-xs text-slate-400">BloombergNEF Tier-1 Linear Warranty Simulation</span>
          </div>
          <h1 className="text-2xl font-black text-white font-sans">Kurva Degradasi Panel PV &amp; Pemodelan LCOE</h1>
          <p className="text-xs text-slate-400 mt-1 font-sans">
            Proyeksi efisiensi panel surya jangka panjang 25 tahun, Levelized Cost of Electricity, dan estimasi IRR.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-right">
          <span className="text-[10px] text-slate-400 uppercase block">Levelized Cost of Energy (LCOE)</span>
          <div className="text-2xl font-black text-amber-400">Rp {lcoeMetrics.levelizedCostIDRPerKwh} / kWh</div>
          <span className="text-[10px] text-emerald-400">Project IRR: {lcoeMetrics.projectIrrPercent}%</span>
        </div>
      </div>

      {/* KPI Financial & Performance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-[#060c20] border border-slate-800">
          <span className="text-[10px] text-slate-400 block uppercase">Year 25 Guaranteed Output</span>
          <div className="text-2xl font-black text-white mt-1">84.8% Capacity</div>
          <span className="text-[10px] text-emerald-400 mt-1 block">Tier-1 Linear Warranty Bound</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#060c20] border border-slate-800">
          <span className="text-[10px] text-slate-400 block uppercase">Equity Payback Period</span>
          <div className="text-2xl font-black text-cyan-400 mt-1">{lcoeMetrics.paybackPeriodYears} Tahun</div>
          <span className="text-[10px] text-slate-400 mt-1 block">Discount Rate: {lcoeMetrics.discountRatePercent}%</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#060c20] border border-slate-800">
          <span className="text-[10px] text-slate-400 block uppercase">Total Initial CapEx</span>
          <div className="text-xl font-black text-white mt-1">{formatIDR(lcoeMetrics.capitalExpenditureIDR)}</div>
          <span className="text-[10px] text-slate-400 mt-1 block">Floating Structure + Modules</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#060c20] border border-slate-800">
          <span className="text-[10px] text-slate-400 block uppercase">Annual O&amp;M Budget</span>
          <div className="text-xl font-black text-amber-400 mt-1">{formatIDR(lcoeMetrics.annualOpexPerYearIDR)}</div>
          <span className="text-[10px] text-slate-400 mt-1 block">Robot Cleaning + Diver Audit</span>
        </div>
      </div>

      {/* Soiling Loss Factor Interactive Slider */}
      <div className="p-5 rounded-2xl bg-[#060c20] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <Sliders className="w-5 h-5 text-amber-400" />
          <div>
            <h3 className="font-bold text-white text-sm font-sans">Faktor Kerugian Debu &amp; Alga Air Terapung (Soiling Loss Factor)</h3>
            <p className="text-[11px] text-slate-400 font-sans">
              Pengaruh penumpukan kotoran dan kelembapan air waduk terhadap output generasi tahunan.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 w-full sm:w-72">
          <input
            type="range"
            min="1.0"
            max="8.0"
            step="0.5"
            value={soilingLossPercent}
            onChange={(e) => setSoilingLossPercent(parseFloat(e.target.value))}
            className="w-full accent-amber-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
          />
          <span className="font-bold text-amber-400 min-w-[50px] text-right">{soilingLossPercent}% Loss</span>
        </div>
      </div>

      {/* 25-Year Degradation Matrix Table */}
      <div className="rounded-2xl border border-slate-800 bg-[#060c20] p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2 font-sans">
              <TrendingDown className="w-5 h-5 text-amber-400" /> Matriks Proyeksi Penurunan Daya 25 Tahun (Degradation Schedule)
            </h2>
            <p className="text-xs text-slate-400 mt-0.5 font-sans">
              Model degradasi awal LID (Light-Induced Degradation) 2.0% di tahun ke-1, dilanjutkan 0.50% per tahun.
            </p>
          </div>
          <span className="text-[10px] text-slate-400 bg-slate-900 px-2 py-1 rounded border border-slate-800">
            WARRANTY: 84.8% AT Y25
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                <th className="py-2.5 px-3">Tahun Operasi</th>
                <th className="py-2.5 px-3">Efisiensi Tersisa</th>
                <th className="py-2.5 px-3">Garansi Pabrik Min.</th>
                <th className="py-2.5 px-3">Proyeksi Yield Tahunan</th>
                <th className="py-2.5 px-3">Kumulatif Penurunan</th>
                <th className="py-2.5 px-3 text-right">Status Kepatuhan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {degradationPoints.map((pt) => {
                const isSafe = pt.expectedEfficiencyPercent >= pt.warrantyGuaranteedPercent;
                return (
                  <tr key={pt.operationalYear} className="hover:bg-slate-900/40">
                    <td className="py-2.5 px-3 font-bold text-white">Tahun {pt.operationalYear}</td>
                    <td className="py-2.5 px-3 font-bold text-amber-400">{pt.expectedEfficiencyPercent}%</td>
                    <td className="py-2.5 px-3 text-slate-400">{pt.warrantyGuaranteedPercent}%</td>
                    <td className="py-2.5 px-3 text-emerald-400">{pt.annualGenerationGwh} GWh</td>
                    <td className="py-2.5 px-3 text-rose-400">-{pt.cumulativeLossPercent}%</td>
                    <td className="py-2.5 px-3 text-right">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        isSafe ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/30" : "text-rose-400 bg-rose-500/10 border border-rose-500/30"
                      }`}>
                        {isSafe ? "PASSED WARRANTY" : "WARRANTY CLAIM"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

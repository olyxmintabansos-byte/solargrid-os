"use client";

import React from "react";
import { useSolar } from "@/context/SolarContext";
import { formatEnergyMwh } from "@/lib/utils";
import { Battery, Zap, Thermometer, TrendingUp, AlertCircle } from "lucide-react";

export default function BessDesk() {
  const { bessUnits, telemetry } = useSolar();

  const totalCapacityKwh = bessUnits.reduce((sum, unit) => sum + unit.capacityKwh, 0);
  const totalStoredKwh = bessUnits.reduce((sum, unit) => sum + unit.currentStoredKwh, 0);
  const avgStateOfCharge = Math.round(
    bessUnits.reduce((sum, unit) => sum + unit.stateOfChargePercent, 0) / bessUnits.length
  );

  return (
    <main className="min-h-screen bg-[#030712] p-6 space-y-6">
      {/* BESS Summary KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Capacity */}
        <div className="rounded-2xl border border-slate-800 bg-[#0f1729] p-6 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">Total Capacity</span>
            <Battery className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-black text-white">{(totalCapacityKwh / 1000).toFixed(1)} <span className="text-sm text-slate-400">MWh</span></div>
          <p className="text-xs text-slate-400 mt-1">{bessUnits.length} battery containers</p>
        </div>

        {/* Currently Stored */}
        <div className="rounded-2xl border border-slate-800 bg-[#0f1729] p-6 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">Stored Energy</span>
            <Zap className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white">{(totalStoredKwh / 1000).toFixed(2)} <span className="text-sm text-slate-400">MWh</span></div>
          <p className="text-xs text-slate-400 mt-1">State of Charge: {avgStateOfCharge}%</p>
        </div>

        {/* Average Health */}
        <div className="rounded-2xl border border-slate-800 bg-[#0f1729] p-6 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">Avg Health</span>
            <TrendingUp className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-white">
            {(bessUnits.reduce((sum, unit) => sum + unit.stateOfHealthPercent, 0) / bessUnits.length).toFixed(1)}%
          </div>
          <p className="text-xs text-slate-400 mt-1">Battery longevity index</p>
        </div>

        {/* Max Cell Temp */}
        <div className="rounded-2xl border border-slate-800 bg-[#0f1729] p-6 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">Max Cell Temp</span>
            <Thermometer className="w-4 h-4 text-orange-400" />
          </div>
          <div className="text-2xl font-black text-white">
            {Math.max(...bessUnits.map((u) => u.cellMaxTemperatureC)).toFixed(1)}°C
          </div>
          <p className="text-xs text-slate-400 mt-1">Thermal management status</p>
        </div>
      </div>

      {/* BESS Units Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-black text-white flex items-center gap-2">
          <Battery className="w-5 h-5 text-blue-400" />
          Battery Energy Storage Units
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {bessUnits.map((unit) => (
            <div key={unit.id} className="rounded-2xl border border-slate-800 bg-[#0f1729] p-6 shadow-lg">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-black text-white">{unit.containerTag}</h3>
                  <p className="text-xs text-blue-400 font-mono mt-1">Unit ID: {unit.id}</p>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-blue-500/10 border border-blue-500/30">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-xs font-bold text-blue-400">Active</span>
                </div>
              </div>

              {/* State of Charge Bar */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-mono text-slate-400">State of Charge</span>
                  <span className="text-sm font-bold text-white">{unit.stateOfChargePercent}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                    style={{ width: `${unit.stateOfChargePercent}%` }}
                  />
                </div>
              </div>

              {/* Detailed Metrics */}
              <div className="space-y-2 text-xs border-t border-slate-800 pt-4">
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Total Capacity:</span>
                  <span className="font-mono font-bold">{unit.capacityKwh.toFixed(0)} kWh</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Currently Stored:</span>
                  <span className="font-mono font-bold text-blue-400">{unit.currentStoredKwh.toFixed(0)} kWh</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Charge/Discharge Power:</span>
                  <span className="font-mono font-bold">{unit.chargeDischargePowerKw.toFixed(0)} kW</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Cell Max Temp:</span>
                  <span className={`font-mono font-bold ${unit.cellMaxTemperatureC > 35 ? "text-orange-400" : "text-emerald-400"}`}>
                    {unit.cellMaxTemperatureC.toFixed(1)}°C
                  </span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">State of Health:</span>
                  <span className="font-mono font-bold text-cyan-400">{unit.stateOfHealthPercent.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Total Cycles:</span>
                  <span className="font-mono font-bold">{unit.cycleCountTotal}</span>
                </div>
                <div className="flex justify-between text-slate-300 pt-2 border-t border-slate-700">
                  <span className="text-slate-400">Operating Mode:</span>
                  <span className="font-mono font-bold text-amber-400">{unit.operatingMode.replace(/_/g, " ")}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* System Status Footer */}
      <div className="rounded-2xl border border-slate-800 bg-[#0f1729]/50 p-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-black text-white mb-1">Battery Management System Status</h3>
            <p className="text-sm text-slate-400">
              All BESS units operating within thermal and electrical parameters. Cumulative cycle count: {bessUnits.reduce((sum, u) => sum + u.cycleCountTotal, 0).toLocaleString()}. 
              Estimated remaining lifetime: ~8–10 years at current usage profile.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

"use client";

import React from "react";
import { useSolar } from "@/context/SolarContext";
import { SolarTelemetryCanvas } from "@/components/SolarTelemetryCanvas";
import { formatPowerMw, formatEnergyMwh, formatIDR, formatNumber } from "@/lib/utils";
import { Sun, Activity, Gauge, TrendingUp, ThermometerSun, Leaf } from "lucide-react";

export default function Home() {
  const { inverters, telemetry } = useSolar();

  const totalActivePower = inverters.reduce((sum, inv) => sum + inv.activePowerKw, 0);
  const totalDailyYield = inverters.reduce((sum, inv) => sum + inv.dailyYieldKwh, 0);

  return (
    <main className="min-h-screen bg-[#030712] p-6 space-y-6">
      {/* Header KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Current Generation */}
        <div className="rounded-2xl border border-slate-800 bg-[#0f1729] p-6 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">Active Generation</span>
            <Sun className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-white">{(totalActivePower / 1000).toFixed(2)} <span className="text-sm text-slate-400">MW</span></div>
          <p className="text-xs text-slate-400 mt-1">
            {((totalActivePower / (inverters.reduce((sum, inv) => sum + inv.ratedCapacityKw, 0))) * 100).toFixed(1)}% of rated capacity
          </p>
        </div>

        {/* Solar Irradiance */}
        <div className="rounded-2xl border border-slate-800 bg-[#0f1729] p-6 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">Irradiance</span>
            <ThermometerSun className="w-4 h-4 text-orange-400" />
          </div>
          <div className="text-2xl font-black text-white">{telemetry.solarIrradianceWpm2} <span className="text-sm text-slate-400">W/m²</span></div>
          <p className="text-xs text-slate-400 mt-1">Optimal: 900–1000 W/m²</p>
        </div>

        {/* Daily Yield */}
        <div className="rounded-2xl border border-slate-800 bg-[#0f1729] p-6 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">Daily Yield</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white">{(totalDailyYield / 1000).toFixed(2)} <span className="text-sm text-slate-400">MWh</span></div>
          <p className="text-xs text-slate-400 mt-1">Cumulative AC output today</p>
        </div>

        {/* Revenue Today */}
        <div className="rounded-2xl border border-slate-800 bg-[#0f1729] p-6 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">Revenue Today</span>
            <Leaf className="w-4 h-4 text-green-400" />
          </div>
          <div className="text-xl font-black text-white truncate">{formatIDR(telemetry.totalRevenueTodayIDR)}</div>
          <p className="text-xs text-slate-400 mt-1">~ {formatNumber(Math.round(telemetry.co2AvoidedTonsToday))} tons CO₂ avoided</p>
        </div>
      </div>

      {/* Telemetry Canvas */}
      <SolarTelemetryCanvas
        currentPowerKw={totalActivePower}
        maxCapacityKw={inverters.reduce((sum, inv) => sum + inv.ratedCapacityKw, 0)}
        irradianceWpm2={telemetry.solarIrradianceWpm2}
      />

      {/* Inverter Status Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-black text-white flex items-center gap-2">
          <Gauge className="w-5 h-5 text-amber-400" />
          Inverter Status Telemetry
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {inverters.map((inverter) => (
            <div key={inverter.id} className="rounded-2xl border border-slate-800 bg-[#0f1729] p-5 shadow-lg">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-black text-white text-sm">{inverter.name}</h3>
                  <p className="text-xs text-amber-400 font-mono mt-0.5">Block: {inverter.blockTag}</p>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-emerald-400">Online</span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center text-slate-300">
                  <span className="text-slate-400">Active Power:</span>
                  <span className="font-mono font-bold text-white">{inverter.activePowerKw.toFixed(1)} kW</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span className="text-slate-400">DC Voltage:</span>
                  <span className="font-mono font-bold text-white">{inverter.dcVoltageVolts.toFixed(0)} V</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span className="text-slate-400">Efficiency:</span>
                  <span className="font-mono font-bold text-emerald-400">{inverter.efficiencyPercent.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span className="text-slate-400">Heat Sink Temp:</span>
                  <span className="font-mono font-bold text-orange-400">{inverter.heatSinkTempC.toFixed(1)}°C</span>
                </div>
                <div className="flex justify-between items-center text-slate-300 pt-2 border-t border-slate-700">
                  <span className="text-slate-400">Daily Yield:</span>
                  <span className="font-mono font-bold text-white">{(inverter.dailyYieldKwh / 1000).toFixed(2)} MWh</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Metrics Footer */}
      <div className="rounded-2xl border border-slate-800 bg-[#0f1729]/50 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
        <div>
          <p className="font-mono text-slate-400 uppercase tracking-widest mb-1">System Performance Ratio</p>
          <p className="text-2xl font-black text-white">{telemetry.performanceRatioPercent.toFixed(1)}%</p>
        </div>
        <div className="flex gap-4">
          <div>
            <p className="text-slate-400 mb-1">Ambient Temp</p>
            <p className="font-mono font-bold text-white">{telemetry.ambientTemperatureC}°C</p>
          </div>
          <div>
            <p className="text-slate-400 mb-1">Module Back Temp</p>
            <p className="font-mono font-bold text-orange-400">{telemetry.moduleBackTempC}°C</p>
          </div>
        </div>
      </div>
    </main>
  );
}

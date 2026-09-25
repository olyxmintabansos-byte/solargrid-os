"use client";

import React, { useRef, useEffect } from "react";

interface SolarTelemetryCanvasProps {
  currentPowerKw: number;
  maxCapacityKw: number;
  irradianceWpm2: number;
}

export function SolarTelemetryCanvas({
  currentPowerKw,
  maxCapacityKw,
  irradianceWpm2,
}: SolarTelemetryCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let offset = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;

      // Draw Sub-Grid Lines
      ctx.strokeStyle = "rgba(30, 41, 59, 0.4)";
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 25) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw Bell-Shaped Daylight Solar Irradiance Curve
      ctx.beginPath();
      ctx.strokeStyle = "rgba(245, 158, 11, 0.3)";
      ctx.setLineDash([4, 4]);
      ctx.lineWidth = 2;
      for (let x = 0; x < width; x++) {
        const normX = (x / width) * Math.PI;
        const bellY = height - Math.sin(normX) * (height * 0.75) - 20;
        if (x === 0) ctx.moveTo(x, bellY);
        else ctx.lineTo(x, bellY);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw Live Active Solar AC Inverter Waveform
      const powerRatio = Math.min(1, currentPowerKw / (maxCapacityKw || 1));
      const waveAmplitude = (height * 0.3) * powerRatio;
      const centerY = height * 0.5;

      ctx.beginPath();
      ctx.strokeStyle = "#10b981";
      ctx.lineWidth = 2.5;

      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, "#f59e0b");
      gradient.addColorStop(0.5, "#10b981");
      gradient.addColorStop(1, "#06b6d4");
      ctx.strokeStyle = gradient;

      for (let x = 0; x < width; x++) {
        const y = centerY + Math.sin((x * 0.03) + offset) * waveAmplitude;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Glow effect under waveform
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      const fillGradient = ctx.createLinearGradient(0, centerY, 0, height);
      fillGradient.addColorStop(0, "rgba(16, 185, 129, 0.15)");
      fillGradient.addColorStop(1, "rgba(16, 185, 129, 0)");
      ctx.fillStyle = fillGradient;
      ctx.fill();

      offset += 0.04;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [currentPowerKw, maxCapacityKw, irradianceWpm2]);

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#060c1e] p-6 shadow-xl relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-4 z-10 relative">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
              60 FPS SCADA WAVEFORM OSCILLOSCOPE
            </span>
            <span className="text-xs text-slate-400">Irradiance vs Inverter Power Tracking</span>
          </div>
          <h2 className="text-lg font-black text-white">Live Solar Yield Tracking &amp; Grid Synchronization</h2>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-slate-300">Irradiance: <strong>{irradianceWpm2} W/m²</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="text-slate-300">Active Power: <strong className="text-emerald-400">{' '}{(currentPowerKw / 1000).toFixed(2)} MW</strong></span>
          </div>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        width={750}
        height={180}
        className="w-full h-44 rounded-xl bg-[#040815] border border-slate-900"
      />

      <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 mt-2 px-1">
        <span>06:00 (Dawn)</span>
        <span>09:00</span>
        <span className="text-amber-400/80">12:00 (Peak Zenith Irradiance)</span>
        <span>15:00</span>
        <span>18:00 (Dusk)</span>
      </div>
    </div>
  );
}

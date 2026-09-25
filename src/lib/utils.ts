import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPowerMw(kw: number): string {
  return `${(kw / 1000).toFixed(2)} MW`;
}

export function formatEnergyMwh(kwh: number): string {
  return `${(kwh / 1000).toFixed(1)} MWh`;
}

export function formatIDR(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(val: number): string {
  return new Intl.NumberFormat("id-ID").format(val);
}

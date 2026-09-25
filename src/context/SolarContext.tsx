"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { SolarInverter, BessBatteryUnit, SolarPlantTelemetry } from "@/types/solar";

const INITIAL_INVERTERS: SolarInverter[] = [
  {
    id: "INV-001",
    name: "North Block Inverter",
    blockTag: "NORTH",
    ratedCapacityKw: 250,
    activePowerKw: 185.3,
    dcVoltageVolts: 680,
    dcCurrentAmps: 127.5,
    acFrequencyHz: 50.02,
    efficiencyPercent: 98.4,
    heatSinkTempC: 38.2,
    dailyYieldKwh: 1840,
    status: "OPTIMAL_GENERATING",
    pvStringCount: 12,
  },
  {
    id: "INV-002",
    name: "South Block Inverter",
    blockTag: "SOUTH",
    ratedCapacityKw: 250,
    activePowerKw: 172.8,
    dcVoltageVolts: 695,
    dcCurrentAmps: 119.2,
    acFrequencyHz: 50.01,
    efficiencyPercent: 98.3,
    heatSinkTempC: 42.1,
    dailyYieldKwh: 1620,
    status: "OPTIMAL_GENERATING",
    pvStringCount: 12,
  },
  {
    id: "INV-003",
    name: "East Block Inverter",
    blockTag: "EAST",
    ratedCapacityKw: 200,
    activePowerKw: 134.5,
    dcVoltageVolts: 670,
    dcCurrentAmps: 102.3,
    acFrequencyHz: 50.03,
    efficiencyPercent: 98.2,
    heatSinkTempC: 36.8,
    dailyYieldKwh: 1445,
    status: "OPTIMAL_GENERATING",
    pvStringCount: 10,
  },
];

const INITIAL_BESS_UNITS: BessBatteryUnit[] = [
  {
    id: "BESS-01",
    containerTag: "CONTAINER_A",
    capacityKwh: 500,
    currentStoredKwh: 340,
    stateOfChargePercent: 68,
    stateOfHealthPercent: 96.5,
    chargeDischargePowerKw: 125,
    cellMaxTemperatureC: 28.3,
    cycleCountTotal: 482,
    operatingMode: "CHARGING_SOLAR_EXCESS",
    hvacStatus: "ECO_STANDBY",
  },
  {
    id: "BESS-02",
    containerTag: "CONTAINER_B",
    capacityKwh: 500,
    currentStoredKwh: 295,
    stateOfChargePercent: 59,
    stateOfHealthPercent: 95.8,
    chargeDischargePowerKw: 125,
    cellMaxTemperatureC: 29.1,
    cycleCountTotal: 501,
    operatingMode: "CHARGING_SOLAR_EXCESS",
    hvacStatus: "COOLING_ACTIVE",
  },
];

const INITIAL_TELEMETRY: SolarPlantTelemetry = {
  totalCapacityMw: 0.7,
  currentGenerationMw: 0.493,
  solarIrradianceWpm2: 820,
  ambientTemperatureC: 28.5,
  moduleBackTempC: 45.2,
  performanceRatioPercent: 92.3,
  co2AvoidedTonsToday: 3.24,
  totalRevenueTodayIDR: 4856000,
};

interface SolarContextType {
  inverters: SolarInverter[];
  bessUnits: BessBatteryUnit[];
  telemetry: SolarPlantTelemetry;
  updateInverterStatus: (id: string, power: number) => void;
  updateBessStatus: (id: string, charge: number) => void;
}

const SolarContext = createContext<SolarContextType | undefined>(undefined);

export function SolarProvider({ children }: { children: React.ReactNode }) {
  const [inverters, setInverters] = useState<SolarInverter[]>(INITIAL_INVERTERS);
  const [bessUnits, setBessUnits] = useState<BessBatteryUnit[]>(INITIAL_BESS_UNITS);
  const [telemetry, setTelemetry] = useState<SolarPlantTelemetry>(INITIAL_TELEMETRY);

  const updateInverterStatus = (id: string, power: number) => {
    setInverters((prev) =>
      prev.map((inv) =>
        inv.id === id
          ? {
              ...inv,
              activePowerKw: Math.max(0, Math.min(power, inv.ratedCapacityKw)),
              dailyYieldKwh: inv.dailyYieldKwh + (power * 0.25) / 1000,
            }
          : inv
      )
    );
  };

  const updateBessStatus = (id: string, charge: number) => {
    setBessUnits((prev) =>
      prev.map((unit) =>
        unit.id === id
          ? {
              ...unit,
              currentStoredKwh: Math.max(0, Math.min(charge, unit.capacityKwh)),
              stateOfChargePercent: Math.round((Math.max(0, Math.min(charge, unit.capacityKwh)) / unit.capacityKwh) * 100),
            }
          : unit
      )
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const variation = Math.sin(Date.now() / 10000) * 50 + Math.random() * 30;
      const basePower = 165 + variation;
      updateInverterStatus("INV-001", basePower);
      updateInverterStatus("INV-002", basePower * 0.93);
      updateInverterStatus("INV-003", basePower * 0.73);

      setTelemetry((prev) => ({
        ...prev,
        solarIrradianceWpm2: Math.max(0, 850 + Math.sin(Date.now() / 15000) * 150 + (Math.random() * 50 - 25)),
        totalRevenueTodayIDR: prev.totalRevenueTodayIDR + Math.random() * 50000,
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SolarContext.Provider value={{ inverters, bessUnits, telemetry, updateInverterStatus, updateBessStatus }}>
      {children}
    </SolarContext.Provider>
  );
}

export function useSolar() {
  const context = useContext(SolarContext);
  if (!context) throw new Error("useSolar must be used within SolarProvider");
  return context;
}

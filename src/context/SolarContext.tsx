"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  SolarInverter,
  BessBatteryUnit,
  SolarPlantTelemetry,
  InverterStatus,
  BessOperatingMode,
  PpaBillingCycle,
  RenewableEnergyCertificate,
  DegradationPoint,
  LcoeFinancialMetrics,
} from "@/types/solar";

const INITIAL_INVERTERS: SolarInverter[] = [
  { id: "inv-01", name: "Central Inverter 01", blockTag: "Block Alpha (Cirata West)", ratedCapacityKw: 6250, activePowerKw: 5820, dcVoltageVolts: 1380, dcCurrentAmps: 4217, acFrequencyHz: 50.02, efficiencyPercent: 98.8, heatSinkTempC: 48.5, dailyYieldKwh: 34200, status: "OPTIMAL_GENERATING", pvStringCount: 24 },
  { id: "inv-02", name: "Central Inverter 02", blockTag: "Block Alpha (Cirata West)", ratedCapacityKw: 6250, activePowerKw: 5790, dcVoltageVolts: 1375, dcCurrentAmps: 4210, acFrequencyHz: 50.01, efficiencyPercent: 98.7, heatSinkTempC: 49.1, dailyYieldKwh: 33900, status: "OPTIMAL_GENERATING", pvStringCount: 24 },
  { id: "inv-03", name: "Central Inverter 03", blockTag: "Block Alpha (Cirata West)", ratedCapacityKw: 6250, activePowerKw: 5410, dcVoltageVolts: 1360, dcCurrentAmps: 3977, acFrequencyHz: 50.00, efficiencyPercent: 98.2, heatSinkTempC: 56.4, dailyYieldKwh: 31800, status: "DERATED_THERMAL", pvStringCount: 24 },
  { id: "inv-04", name: "Central Inverter 04", blockTag: "Block Alpha (Cirata West)", ratedCapacityKw: 6250, activePowerKw: 5850, dcVoltageVolts: 1385, dcCurrentAmps: 4223, acFrequencyHz: 50.02, efficiencyPercent: 98.9, heatSinkTempC: 47.8, dailyYieldKwh: 34500, status: "OPTIMAL_GENERATING", pvStringCount: 24 },
  { id: "inv-05", name: "Central Inverter 05", blockTag: "Block Bravo (Cirata East)", ratedCapacityKw: 6250, activePowerKw: 5760, dcVoltageVolts: 1372, dcCurrentAmps: 4198, acFrequencyHz: 50.01, efficiencyPercent: 98.7, heatSinkTempC: 48.2, dailyYieldKwh: 33700, status: "OPTIMAL_GENERATING", pvStringCount: 24 },
  { id: "inv-06", name: "Central Inverter 06", blockTag: "Block Bravo (Cirata East)", ratedCapacityKw: 6250, activePowerKw: 5810, dcVoltageVolts: 1382, dcCurrentAmps: 4204, acFrequencyHz: 50.00, efficiencyPercent: 98.8, heatSinkTempC: 47.9, dailyYieldKwh: 34100, status: "OPTIMAL_GENERATING", pvStringCount: 24 },
  { id: "inv-07", name: "Central Inverter 07", blockTag: "Block Bravo (Cirata East)", ratedCapacityKw: 6250, activePowerKw: 0, dcVoltageVolts: 840, dcCurrentAmps: 0, acFrequencyHz: 49.98, efficiencyPercent: 0, heatSinkTempC: 38.0, dailyYieldKwh: 12000, status: "GROUND_FAULT", pvStringCount: 24 },
  { id: "inv-08", name: "Central Inverter 08", blockTag: "Block Bravo (Cirata East)", ratedCapacityKw: 6250, activePowerKw: 5680, dcVoltageVolts: 1370, dcCurrentAmps: 4145, acFrequencyHz: 50.01, efficiencyPercent: 98.6, heatSinkTempC: 50.1, dailyYieldKwh: 33400, status: "OPTIMAL_GENERATING", pvStringCount: 24 },
];

const INITIAL_BESS: BessBatteryUnit[] = [
  { id: "bess-01", containerTag: "BESS Container Unit 1 (LFP)", capacityKwh: 5000, currentStoredKwh: 4350, stateOfChargePercent: 87, stateOfHealthPercent: 99.2, chargeDischargePowerKw: -1200, cellMaxTemperatureC: 24.5, cycleCountTotal: 420, operatingMode: "CHARGING_SOLAR_EXCESS", hvacStatus: "COOLING_ACTIVE" },
  { id: "bess-02", containerTag: "BESS Container Unit 2 (LFP)", capacityKwh: 5000, currentStoredKwh: 4280, stateOfChargePercent: 85, stateOfHealthPercent: 98.9, chargeDischargePowerKw: -1200, cellMaxTemperatureC: 24.8, cycleCountTotal: 435, operatingMode: "CHARGING_SOLAR_EXCESS", hvacStatus: "COOLING_ACTIVE" },
  { id: "bess-03", containerTag: "BESS Container Unit 3 (LFP)", capacityKwh: 5000, currentStoredKwh: 4400, stateOfChargePercent: 88, stateOfHealthPercent: 99.4, chargeDischargePowerKw: -1200, cellMaxTemperatureC: 24.1, cycleCountTotal: 410, operatingMode: "CHARGING_SOLAR_EXCESS", hvacStatus: "COOLING_ACTIVE" },
  { id: "bess-04", containerTag: "BESS Container Unit 4 (LFP)", capacityKwh: 5000, currentStoredKwh: 4150, stateOfChargePercent: 83, stateOfHealthPercent: 98.6, chargeDischargePowerKw: 0, cellMaxTemperatureC: 23.5, cycleCountTotal: 442, operatingMode: "STANDBY_RESERVE", hvacStatus: "ECO_STANDBY" },
];

interface SolarContextType {
  inverters: SolarInverter[];
  bessUnits: BessBatteryUnit[];
  telemetry: SolarPlantTelemetry;
  toggleInverterStatus: (id: string, newStatus: InverterStatus) => void;
  setBessMode: (id: string, mode: BessOperatingMode) => void;
  clearFault: (id: string) => void;
  curtailmentPercent: number;
  setCurtailmentPercent: (percent: number) => void;
  ppaInvoice: PpaBillingCycle;
  carbonRec: RenewableEnergyCertificate;
  degradationPoints: DegradationPoint[];
  lcoeMetrics: LcoeFinancialMetrics;
  soilingLossPercent: number;
  setSoilingLossPercent: (val: number) => void;
}

const SolarContext = createContext<SolarContextType | undefined>(undefined);

export function SolarProvider({ children }: { children: React.ReactNode }) {
  const [inverters, setInverters] = useState<SolarInverter[]>(INITIAL_INVERTERS);
  const [bessUnits, setBessUnits] = useState<BessBatteryUnit[]>(INITIAL_BESS);
  const [curtailmentPercent, setCurtailmentPercent] = useState<number>(0);
  const [soilingLossPercent, setSoilingLossPercent] = useState<number>(2.5);

  useEffect(() => {
    const savedInv = localStorage.getItem("SOLARGRID_INVERTERS");
    const savedBess = localStorage.getItem("SOLARGRID_BESS");
    if (savedInv) {
      try {
        setInverters(JSON.parse(savedInv));
      } catch (e) {
        console.error(e);
      }
    }
    if (savedBess) {
      try {
        setBessUnits(JSON.parse(savedBess));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("SOLARGRID_INVERTERS", JSON.stringify(inverters));
  }, [inverters]);

  useEffect(() => {
    localStorage.setItem("SOLARGRID_BESS", JSON.stringify(bessUnits));
  }, [bessUnits]);

  const toggleInverterStatus = (id: string, newStatus: InverterStatus) => {
    setInverters((prev) =>
      prev.map((inv) =>
        inv.id === id
          ? {
              ...inv,
              status: newStatus,
              activePowerKw: newStatus === "GROUND_FAULT" ? 0 : inv.activePowerKw,
            }
          : inv
      )
    );
  };

  const clearFault = (id: string) => {
    setInverters((prev) =>
      prev.map((inv) =>
        inv.id === id
          ? {
              ...inv,
              status: "OPTIMAL_GENERATING",
              activePowerKw: 5750,
              dcVoltageVolts: 1378,
              dcCurrentAmps: 4172,
              efficiencyPercent: 98.6,
            }
          : inv
      )
    );
  };

  const setBessMode = (id: string, mode: BessOperatingMode) => {
    setBessUnits((prev) =>
      prev.map((b) => {
        if (b.id !== id) return b;
        let pwr = 0;
        if (mode === "DISCHARGING_PEAK_SHAVING") pwr = 1800;
        else if (mode === "CHARGING_SOLAR_EXCESS") pwr = -1500;
        return {
          ...b,
          operatingMode: mode,
          chargeDischargePowerKw: pwr,
        };
      })
    );
  };

  const totalCapacityMw = 50.0;
  const rawGenerationKw = inverters.reduce((sum, inv) => sum + inv.activePowerKw, 0);
  const factor = (100 - curtailmentPercent) / 100;
  const currentGenerationMw = (rawGenerationKw * factor) / 1000;
  const performanceRatioPercent = Math.min(92.4, (currentGenerationMw / (totalCapacityMw * 0.95)) * 100);
  const co2AvoidedTonsToday = parseFloat((currentGenerationMw * 6.8).toFixed(1));
  const tariffPerKwhIDR = 1450;
  const totalYieldKwhToday = inverters.reduce((sum, inv) => sum + inv.dailyYieldKwh, 0);
  const totalRevenueTodayIDR = totalYieldKwhToday * tariffPerKwhIDR;

  const telemetry: SolarPlantTelemetry = {
    totalCapacityMw,
    currentGenerationMw,
    solarIrradianceWpm2: 945,
    ambientTemperatureC: 32.4,
    moduleBackTempC: 49.2,
    performanceRatioPercent: parseFloat(performanceRatioPercent.toFixed(1)),
    co2AvoidedTonsToday,
    totalRevenueTodayIDR,
  };

  // SPRINT 3: PLN PPA Invoice Data
  const monthlyGrossMwh = 7450.8;
  const auxiliaryLossMwh = 112.4;
  const netExportMwh = monthlyGrossMwh - auxiliaryLossMwh;
  const grossEnergyCharge = netExportMwh * 1000 * tariffPerKwhIDR;
  const ppn11 = grossEnergyCharge * 0.11;

  const ppaInvoice: PpaBillingCycle = {
    billingNumber: "INV-PPA-PLN/CRTA-50MW/2026/09",
    billingPeriodMonthYear: "September 2026",
    grossExportMwh: monthlyGrossMwh,
    stationAuxiliaryLossMwh: auxiliaryLossMwh,
    netBilledMwh: netExportMwh,
    ppaTariffPerKwhIDR: tariffPerKwhIDR,
    grossEnergyChargeIDR: grossEnergyCharge,
    ppn11PercentIDR: ppn11,
    totalPayableIDR: grossEnergyCharge + ppn11,
    availabilityFactorPercent: 99.1,
    contractComplianceStatus: "PERFORMANCE_BONUS",
    plnOfftakerEntity: "PT PLN (Persero) Unit Induk Distribusi Jawa Barat",
    plnSubstationName: "Gardu Induk Cirata 150 kV Switching Station",
    invoiceDueDate: "15 Oktober 2026",
  };

  const carbonRec: RenewableEnergyCertificate = {
    certificateSerialNo: "REC-SRN-PPI-CRTA50-2026-09482",
    vintageYear: 2026,
    projectRegistryId: "ID-SRN-RE-08942-CIRATA",
    totalMwhIssued: netExportMwh,
    totalTonsCO2Offset: parseFloat((netExportMwh * 0.792).toFixed(1)),
    registryAuthority: "Kementerian Lingkungan Hidup & Kehutanan RI (SRN-PPI)",
    issuanceDate: "25 September 2026",
    verifiedStandard: "SPE-GRK Kementerian LHK",
  };

  // SPRINT 4: 25-Year PV Cell Degradation Curve Generation
  const degradationPoints: DegradationPoint[] = [];
  const baseYieldGwh = 89.4;
  for (let yr = 1; yr <= 25; yr++) {
    const loss = yr === 1 ? 2.0 : 2.0 + (yr - 1) * 0.50;
    const efficiency = 100 - loss;
    const warranty = yr === 1 ? 98.0 : 98.0 - (yr - 1) * 0.55;
    const annualGwh = parseFloat((baseYieldGwh * (efficiency / 100) * ((100 - soilingLossPercent) / 100)).toFixed(2));

    degradationPoints.push({
      operationalYear: yr,
      expectedEfficiencyPercent: parseFloat(efficiency.toFixed(2)),
      warrantyGuaranteedPercent: parseFloat(warranty.toFixed(2)),
      annualGenerationGwh: annualGwh,
      cumulativeLossPercent: parseFloat(loss.toFixed(2)),
    });
  }

  // Financial LCOE Model
  const capExIDR = 650000000000;
  const opexPerYearIDR = 12000000000;
  const discountRate = 7.5;
  const totalLifetimeGenerationKwh = degradationPoints.reduce((acc, pt) => acc + (pt.annualGenerationGwh * 1000000), 0);
  const lcoeIDR = Math.round((capExIDR + (opexPerYearIDR * 25)) / totalLifetimeGenerationKwh);

  const lcoeMetrics: LcoeFinancialMetrics = {
    capitalExpenditureIDR: capExIDR,
    annualOpexPerYearIDR: opexPerYearIDR,
    discountRatePercent: discountRate,
    levelizedCostIDRPerKwh: lcoeIDR,
    projectIrrPercent: 12.8,
    paybackPeriodYears: 7.2,
    soilingLossPercent,
  };

  return (
    <SolarContext.Provider
      value={{
        inverters,
        bessUnits,
        telemetry,
        toggleInverterStatus,
        setBessMode,
        clearFault,
        curtailmentPercent,
        setCurtailmentPercent,
        ppaInvoice,
        carbonRec,
        degradationPoints,
        lcoeMetrics,
        soilingLossPercent,
        setSoilingLossPercent,
      }}
    >
      {children}
    </SolarContext.Provider>
  );
}

export function useSolar() {
  const ctx = useContext(SolarContext);
  if (!ctx) throw new Error("useSolar must be used within a SolarProvider");
  return ctx;
}

export type InverterStatus =
  | "OPTIMAL_GENERATING"
  | "DERATED_THERMAL"
  | "STANDBY_LOW_IRRADIANCE"
  | "GROUND_FAULT"
  | "GRID_CURTAILED";

export type BessOperatingMode =
  | "DISCHARGING_PEAK_SHAVING"
  | "CHARGING_SOLAR_EXCESS"
  | "GRID_FREQUENCY_REGULATION"
  | "STANDBY_RESERVE";

export interface SolarInverter {
  id: string;
  name: string;
  blockTag: string;
  ratedCapacityKw: number;
  activePowerKw: number;
  dcVoltageVolts: number;
  dcCurrentAmps: number;
  acFrequencyHz: number;
  efficiencyPercent: number;
  heatSinkTempC: number;
  dailyYieldKwh: number;
  status: InverterStatus;
  pvStringCount: number;
}

export interface BessBatteryUnit {
  id: string;
  containerTag: string;
  capacityKwh: number;
  currentStoredKwh: number;
  stateOfChargePercent: number;
  stateOfHealthPercent: number;
  chargeDischargePowerKw: number;
  cellMaxTemperatureC: number;
  cycleCountTotal: number;
  operatingMode: BessOperatingMode;
  hvacStatus: "COOLING_ACTIVE" | "ECO_STANDBY";
}

export interface SolarPlantTelemetry {
  totalCapacityMw: number;
  currentGenerationMw: number;
  solarIrradianceWpm2: number;
  ambientTemperatureC: number;
  moduleBackTempC: number;
  performanceRatioPercent: number;
  co2AvoidedTonsToday: number;
  totalRevenueTodayIDR: number;
}

// SPRINT 3: PLN PPA BILLING & CARBON REC TYPES
export interface PpaBillingCycle {
  billingNumber: string;
  billingPeriodMonthYear: string;
  grossExportMwh: number;
  stationAuxiliaryLossMwh: number;
  netBilledMwh: number;
  ppaTariffPerKwhIDR: number;
  grossEnergyChargeIDR: number;
  ppn11PercentIDR: number;
  totalPayableIDR: number;
  availabilityFactorPercent: number;
  contractComplianceStatus: "FULL_COMPLIANCE" | "PERFORMANCE_BONUS" | "PENALTY_APPLIED";
  plnOfftakerEntity: string;
  plnSubstationName: string;
  invoiceDueDate: string;
}

export interface RenewableEnergyCertificate {
  certificateSerialNo: string;
  vintageYear: number;
  projectRegistryId: string;
  totalMwhIssued: number;
  totalTonsCO2Offset: number;
  registryAuthority: string;
  issuanceDate: string;
  verifiedStandard: "I-REC Standard" | "SPE-GRK Kementerian LHK";
}

// SPRINT 4: 25-YEAR PV DEGRADATION & LCOE TYPES
export interface DegradationPoint {
  operationalYear: number;
  expectedEfficiencyPercent: number;
  warrantyGuaranteedPercent: number;
  annualGenerationGwh: number;
  cumulativeLossPercent: number;
}

export interface LcoeFinancialMetrics {
  capitalExpenditureIDR: number;
  annualOpexPerYearIDR: number;
  discountRatePercent: number;
  levelizedCostIDRPerKwh: number;
  projectIrrPercent: number;
  paybackPeriodYears: number;
  soilingLossPercent: number;
}

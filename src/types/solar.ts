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

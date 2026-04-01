import type { BonusStatus, BonusTier, HoursToBonus, Worker } from "../types";

export function calcEfficiency(billedHours: number, workedHours: number): number {
  if (workedHours <= 0) return 0;
  return (billedHours / workedHours) * 100;
}

export const EXPECTED_HOURS = 176;

export function getBonusTier(efficiency: number): BonusTier {
  if (efficiency >= 100) return "excellence";
  if (efficiency >= 90) return "target";
  return null;
}

export function getBonusStatus(efficiency: number): BonusStatus {
  if (efficiency >= 100) {
    return { label: "Achieved Excellence Bonus", tier: "excellence" };
  }
  if (efficiency >= 95) {
    return { label: "Near Excellence Bonus", tier: "target" };
  }
  if (efficiency >= 90) {
    return { label: "Achieved Target Bonus", tier: "target" };
  }
  if (efficiency >= 85) {
    return { label: "On track for Target Bonus", tier: "approaching" };
  }
  const gap = (90 - efficiency).toFixed(0);
  return { label: `${gap}% to Target Bonus`, tier: "pending" };
}

export function getHoursToBonus(billedHours: number, workedHours: number): HoursToBonus {
  const efficiency = calcEfficiency(billedHours, workedHours);
  const targetThreshold = workedHours * 0.9;
  const excellenceThreshold = workedHours * 1.0;

  if (efficiency >= 100) {
    return { achieved: "Excellence Bonus", hoursToNext: 0, nextTierLabel: null };
  }
  if (efficiency >= 90) {
    const hoursNeeded = Math.ceil(excellenceThreshold - billedHours);
    return { achieved: "Target Bonus", hoursToNext: hoursNeeded, nextTierLabel: "Excellence" };
  }
  const hoursNeeded = Math.ceil(targetThreshold - billedHours);
  return { achieved: null, hoursToNext: hoursNeeded, nextTierLabel: "Target" };
}

export function calcBonus(efficiency: number): number {
  if (efficiency > 100) return 200;
  if (efficiency > 90) return 100;
  return 0;
}

export function getBarColor(efficiency: number): string {
  if (efficiency > 100) return "bg-gradient-to-r from-emerald-400 to-emerald-500";
  if (efficiency > 90) return "bg-gradient-to-r from-amber-400 to-orange-400";
  return "bg-gradient-to-r from-gray-200 to-gray-300";
}

export function rankWorkers(workers: Worker[]) {
  return [...workers]
    .map((w) => ({
      ...w,
      efficiency: calcEfficiency(w.billedHours, w.workedHours),
    }))
    .sort((a, b) => b.efficiency - a.efficiency)
    .map((w, i) => ({ ...w, rank: i + 1 }));
}

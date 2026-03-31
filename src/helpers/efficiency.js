/**
 * Calculate efficiency percentage from billed and worked hours.
 */
export function calcEfficiency(billedHours, workedHours) {
  if (workedHours <= 0) return 0;
  return (billedHours / workedHours) * 100;
}

/**
 * Standard expected hours per period (22 working days × 8 hours).
 */
export const EXPECTED_HOURS = 176;

/**
 * Determine bonus tier based on efficiency.
 *  >= 100% → "excellence"
 *  >= 90%  → "target"
 *  else    → null
 */
export function getBonusTier(efficiency) {
  if (efficiency >= 100) return "excellence";
  if (efficiency >= 90) return "target";
  return null;
}

/**
 * Return a clean bonus status message — no dollar amounts.
 */
export function getBonusStatus(efficiency) {
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

/**
 * Calculate how many billed hours are needed to reach the next bonus tier.
 * Returns { achieved, hoursToNext, nextTierLabel } or null if at max tier.
 */
export function getHoursToBonus(billedHours, workedHours) {
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

/**
 * Determine bonus dollar amount based on efficiency (used by desktop dashboard).
 *  > 100% → $200
 *  > 90%  → $100
 *  else   → $0
 */
export function calcBonus(efficiency) {
  if (efficiency > 100) return 200;
  if (efficiency > 90) return 100;
  return 0;
}

/**
 * Return the progress bar color based on efficiency tier (used by desktop dashboard).
 */
export function getBarColor(efficiency) {
  if (efficiency > 100) return "bg-gradient-to-r from-emerald-400 to-emerald-500";
  if (efficiency > 90) return "bg-gradient-to-r from-amber-400 to-orange-400";
  return "bg-gradient-to-r from-gray-200 to-gray-300";
}

/**
 * Sort workers by efficiency descending and attach rank + efficiency.
 */
export function rankWorkers(workers) {
  return [...workers]
    .map((w) => ({
      ...w,
      efficiency: calcEfficiency(w.billedHours, w.workedHours),
    }))
    .sort((a, b) => b.efficiency - a.efficiency)
    .map((w, i) => ({ ...w, rank: i + 1 }));
}

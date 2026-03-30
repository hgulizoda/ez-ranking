/**
 * Calculate efficiency percentage from billed and worked hours.
 */
export function calcEfficiency(billedHours, workedHours) {
  if (workedHours <= 0) return 0;
  return (billedHours / workedHours) * 100;
}

/**
 * Determine bonus amount based on efficiency.
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
 * Return a bonus status message for TV display.
 */
export function getBonusStatus(efficiency) {
  if (efficiency > 100) {
    return { label: "$200 Bonus", status: "achieved", color: "green" };
  }
  if (efficiency > 90) {
    const gap = (100 - efficiency).toFixed(0);
    return { label: `${gap}% to $200 bonus`, status: "near", color: "green" };
  }
  const gap = (90 - efficiency).toFixed(0);
  return { label: `${gap}% to $100 bonus`, status: "pending", color: "orange" };
}

/**
 * Return the progress bar color based on efficiency tier.
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

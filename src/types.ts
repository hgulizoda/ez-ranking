export interface Worker {
  id: number;
  name: string;
  avatar: string;
  photo: string;
  department: string;
  clockIn: string;
  clockOut: string;
  workedHours: number;
  billedHours: number;
}

export interface RankedWorker extends Worker {
  efficiency: number;
  rank: number;
}

export type BonusTier = "excellence" | "target" | null;

export interface BonusStatus {
  label: string;
  tier: "excellence" | "target" | "approaching" | "pending";
}

export interface HoursToBonus {
  achieved: string | null;
  hoursToNext: number;
  nextTierLabel: string | null;
}

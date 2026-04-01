import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { calcBonus } from "../helpers/efficiency";
import type { RankedWorker } from "../types";

function LiveClock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  const date = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="text-right">
      <p className="text-lg font-bold text-gray-800 tabular-nums leading-tight">{time}</p>
      <p className="text-[11px] text-gray-400 leading-tight">{date}</p>
    </div>
  );
}

const deptBadgeColors: Record<string, string> = {
  All: "bg-gray-100 text-gray-700 border-gray-200",
  Engineering: "bg-blue-100 text-blue-700 border-blue-200",
  Design: "bg-purple-100 text-purple-700 border-purple-200",
  Marketing: "bg-amber-100 text-amber-700 border-amber-200",
};

interface HeaderProps {
  department: string;
  workers: RankedWorker[];
  onBack: () => void;
}

export default function Header({ department, workers, onBack }: HeaderProps) {
  const total = workers.length;
  const avgEff = total > 0
    ? (workers.reduce((s, w) => s + w.efficiency, 0) / total).toFixed(1)
    : "0.0";
  const totalBonus = workers.reduce((s, w) => s + calcBonus(w.efficiency), 0);
  const topCount = workers.filter((w) => w.efficiency > 100).length;

  const badgeColor = deptBadgeColors[department] || deptBadgeColors.All;

  return (
    <motion.header
      className="bg-white/80 backdrop-blur-md border-b border-gray-200/60 shadow-[0_1px_4px_rgba(0,0,0,0.03)] relative z-10"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between px-10 py-3.5">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 live-dot" />
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-[0.15em]">Live</span>
          </div>

          <div className="w-px h-6 bg-gray-200" />

          <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">
            Tech Efficiency
          </h1>

          <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${badgeColor}`}>
            {department === "All" ? "All Departments" : department}
          </span>

          <button
            onClick={onBack}
            className="px-3 py-1.5 text-[11px] font-semibold text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200"
          >
            Change
          </button>
        </div>

        <div className="flex items-center gap-7">
          {[
            { label: "Workers", value: total, color: "text-blue-600" },
            { label: "Avg Efficiency", value: `${avgEff}%`, color: "text-violet-600" },
            { label: "Total Bonuses", value: `$${totalBonus.toLocaleString()}`, color: "text-emerald-600" },
            { label: "Over 100%", value: topCount, color: "text-amber-600" },
          ].map((s) => (
            <div key={s.label} className="flex items-baseline gap-1.5">
              <span className={`text-base font-bold ${s.color} tabular-nums`}>{s.value}</span>
              <span className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">{s.label}</span>
            </div>
          ))}
        </div>

        <LiveClock />
      </div>
    </motion.header>
  );
}

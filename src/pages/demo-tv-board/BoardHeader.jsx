import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { calcBonus } from "../../helpers/efficiency";

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
    year: "numeric",
  });

  return (
    <div className="text-right">
      <p className="text-4xl font-bold text-gray-900 tabular-nums leading-tight tracking-tight">
        {time}
      </p>
      <p className="text-lg text-gray-500 leading-tight mt-1">{date}</p>
    </div>
  );
}

const deptBadgeColors = {
  All: "bg-gray-100 text-gray-700 border-gray-200",
  Engineering: "bg-blue-100 text-blue-700 border-blue-200",
  Design: "bg-purple-100 text-purple-700 border-purple-200",
  Marketing: "bg-amber-100 text-amber-700 border-amber-200",
};

export default function BoardHeader({ workers, department, onBack }) {
  const total = workers.length;
  const avgEff =
    total > 0
      ? (workers.reduce((s, w) => s + w.efficiency, 0) / total).toFixed(1)
      : "0.0";
  const totalBonus = workers.reduce((s, w) => s + calcBonus(w.efficiency), 0);
  const topCount = workers.filter((w) => w.efficiency > 100).length;

  const badgeColor = deptBadgeColors[department] || deptBadgeColors.All;

  return (
    <motion.header
      className="bg-white border-b border-gray-200/80 shadow-sm"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center justify-between px-10 py-4">
        {/* Left — branding + department */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2.5">
            <div className="w-4 h-4 rounded-full bg-emerald-500 live-dot" />
            <span className="text-base font-bold text-emerald-600 uppercase tracking-[0.2em]">
              Live
            </span>
          </div>
          <div className="w-px h-9 bg-gray-200" />
          <h1 className="text-3xl font-black text-gray-900 tracking-tight leading-none">
            Tech Efficiency
          </h1>
          <span className={`px-4 py-1.5 rounded-lg text-base font-bold border ${badgeColor}`}>
            {department === "All" ? "All Departments" : department}
          </span>
          <button
            onClick={onBack}
            className="px-4 py-2 text-sm font-semibold text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200"
          >
            Change
          </button>
        </div>

        {/* Center — summary stats */}
        <div className="flex items-center gap-12">
          {[
            { label: "Workers", value: total, color: "text-blue-600" },
            { label: "Avg Efficiency", value: `${avgEff}%`, color: "text-violet-600" },
            { label: "Total Bonuses", value: `$${totalBonus.toLocaleString()}`, color: "text-emerald-600" },
            { label: "Over 100%", value: topCount, color: "text-amber-600" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className={`text-3xl font-extrabold ${s.color} tabular-nums leading-none`}>
                {s.value}
              </p>
              <p className="text-sm text-gray-500 uppercase tracking-widest mt-1.5 font-semibold">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Right — clock */}
        <LiveClock />
      </div>
    </motion.header>
  );
}

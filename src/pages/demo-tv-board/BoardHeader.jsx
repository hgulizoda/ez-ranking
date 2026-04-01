import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import logo from "../../assets/logo.png";

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
      <p className="text-4xl font-bold text-[#1E293B] tabular-nums leading-tight tracking-tight">
        {time}
      </p>
      <p className="text-base text-[#64748B] leading-tight mt-1.5 font-medium">
        {date}
      </p>
    </div>
  );
}

export default function BoardHeader({ workers, department, onBack }) {
  const total = workers.length;
  const avgEff =
    total > 0
      ? (workers.reduce((s, w) => s + w.efficiency, 0) / total).toFixed(1)
      : "0.0";

  return (
    <motion.header
      className="bg-white border-b border-[#E2E8F0]"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center justify-between px-12 py-4">
        {/* Left — Company logo + title */}
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-xl  flex items-center justify-center shadow-sm overflow-hidden">
            <img src={logo} alt="logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-[#1E293B] tracking-tight leading-none">
              Performance Board
            </h1>
            <p className="text-base text-[#64748B] mt-1 font-medium">
              {department === "All" ? "All Departments" : department}
            </p>
          </div>
          <button
            onClick={onBack}
            className="ml-4 px-4 py-2 text-sm font-semibold text-[#64748B] hover:text-[#1E293B] hover:bg-[#F1F5F9] rounded-lg transition-all duration-200 border border-transparent hover:border-[#E2E8F0]"
          >
            Switch
          </button>
        </div>

        {/* Center — key stats */}
        <div className="flex items-center gap-16">
          <div className="text-center">
            <p className="text-4xl font-extrabold text-[#1E293B] tabular-nums leading-none">
              {total}
            </p>
            <p className="text-sm text-[#64748B] uppercase tracking-[0.15em] mt-2.5 font-semibold">
              Workers
            </p>
          </div>
          <div className="w-px h-12 bg-[#E2E8F0]" />
          <div className="text-center">
            <p className="text-4xl font-extrabold text-[#3B82F6] tabular-nums leading-none">
              {avgEff}%
            </p>
            <p className="text-sm text-[#64748B] uppercase tracking-[0.15em] mt-2.5 font-semibold">
              Avg Efficiency
            </p>
          </div>
        </div>

        {/* Right — clock */}
        <LiveClock />
      </div>
    </motion.header>
  );
}

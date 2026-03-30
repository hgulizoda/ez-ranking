import { useState } from "react";
import { motion } from "framer-motion";
import { calcBonus, getBonusStatus, getBarColor } from "../../helpers/efficiency";

function Avatar({ photo, avatar, name }) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div className="w-[72px] h-[72px] rounded-full overflow-hidden ring-4 ring-white shadow-lg shrink-0">
      {!imgFailed ? (
        <img
          src={photo}
          alt={name}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
          onError={() => setImgFailed(true)}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold text-3xl">
          {avatar}
        </div>
      )}
    </div>
  );
}

function BonusLabel({ efficiency }) {
  const bonus = calcBonus(efficiency);
  const status = getBonusStatus(efficiency);

  if (bonus >= 200) {
    return (
      <div className="flex flex-col items-center">
        <span className="text-xl font-bold text-emerald-700 bg-emerald-50 px-6 py-3 rounded-xl border border-emerald-200 whitespace-nowrap">
          $200 Bonus
        </span>
      </div>
    );
  }
  if (bonus >= 100) {
    return (
      <div className="flex flex-col items-center gap-1.5">
        <span className="text-xl font-bold text-amber-700 bg-amber-50 px-6 py-3 rounded-xl border border-amber-200 whitespace-nowrap">
          $100 Bonus
        </span>
        <span className="text-base font-semibold text-emerald-500">{status.label}</span>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center">
      <span className="text-xl font-semibold text-orange-600 bg-orange-50 px-6 py-3 rounded-xl border border-orange-200 whitespace-nowrap">
        {status.label}
      </span>
    </div>
  );
}

function EfficiencyBar({ efficiency, index }) {
  const capped = Math.min(efficiency, 120);
  const widthPercent = (capped / 120) * 100;
  const barColor = getBarColor(efficiency);

  return (
    <div className="flex items-center gap-5 w-full">
      <div className="flex-1 h-8 bg-gray-100 rounded-full overflow-hidden relative">
        <motion.div
          className={`h-full rounded-full ${barColor}`}
          initial={{ width: 0 }}
          animate={{ width: `${widthPercent}%` }}
          transition={{ duration: 1, delay: index * 0.08 + 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute top-0 h-full w-[2px] bg-gray-300/60" style={{ left: `${(90 / 120) * 100}%` }} />
        <div className="absolute top-0 h-full w-[2px] bg-gray-300/60" style={{ left: `${(100 / 120) * 100}%` }} />
      </div>
      <span
        className={`text-4xl font-extrabold tabular-nums shrink-0 ${
          efficiency > 100
            ? "text-emerald-600"
            : efficiency > 90
            ? "text-orange-500"
            : "text-gray-500"
        }`}
      >
        {efficiency.toFixed(1)}%
      </span>
    </div>
  );
}

const rowVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.07 + 0.1,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

function getOrdinal(n) {
  if (n === 1) return "st";
  if (n === 2) return "nd";
  if (n === 3) return "rd";
  return "th";
}

export default function BoardWorkerRow({ worker, index }) {
  const { rank, name, avatar, photo, department, clockIn, clockOut, billedHours, efficiency } = worker;

  return (
    <motion.div
      className="flex items-center bg-white rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.06)] border border-gray-100/60 px-8 py-6"
      variants={rowVariants}
      custom={index}
      initial="hidden"
      animate="visible"
    >
      {/* Rank */}
      <div className="w-20 shrink-0 flex items-center justify-center">
        <span className="text-4xl font-extrabold text-gray-400 tabular-nums">
          {rank}
        </span>
        <sup className="text-lg font-bold text-gray-400 ml-0.5 -mt-4">{getOrdinal(rank)}</sup>
      </div>

      {/* Avatar */}
      <div className="shrink-0 mr-6">
        <Avatar photo={photo} avatar={avatar} name={name} />
      </div>

      {/* Name + Department */}
      <div className="w-[220px] shrink-0">
        <h3 className="text-2xl font-bold text-gray-900 leading-tight truncate">{name}</h3>
        <p className="text-base text-gray-500 mt-1">{department}</p>
      </div>

      {/* Clock In — green */}
      <div className="w-[120px] shrink-0 text-center">
        <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
          <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
          </svg>
          <span className="text-lg font-bold text-emerald-700 tabular-nums">{clockIn}</span>
        </div>
        <p className="text-xs text-emerald-600 uppercase tracking-wider font-bold mt-2">Clock In</p>
      </div>

      {/* Clock Out — red */}
      <div className="w-[120px] shrink-0 text-center">
        <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-red-50 border border-red-200">
          <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
          </svg>
          <span className="text-lg font-bold text-red-700 tabular-nums">{clockOut}</span>
        </div>
        <p className="text-xs text-red-600 uppercase tracking-wider font-bold mt-2">Clock Out</p>
      </div>

      {/* Billed Hours — blue accent */}
      <div className="w-[110px] shrink-0 text-center">
        <div className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-50 border border-blue-200">
          <span className="text-lg font-bold text-blue-700 tabular-nums">{billedHours}h</span>
        </div>
        <p className="text-xs text-blue-600 uppercase tracking-wider font-bold mt-2">Billed</p>
      </div>

      {/* Efficiency progress bar + percentage */}
      <div className="flex-1 min-w-[220px] px-8">
        <EfficiencyBar efficiency={efficiency} index={index} />
      </div>

      {/* Bonus distance */}
      <div className="shrink-0 w-[180px] flex justify-center">
        <BonusLabel efficiency={efficiency} />
      </div>
    </motion.div>
  );
}

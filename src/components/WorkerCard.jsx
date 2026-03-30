import { motion } from "framer-motion";
import ProgressBar from "./ProgressBar";
import BonusBadge from "./BonusBadge";

const avatarGradients = [
  "from-violet-500 to-purple-600",
  "from-blue-500 to-indigo-600",
  "from-emerald-500 to-teal-600",
  "from-rose-500 to-pink-600",
  "from-amber-500 to-orange-600",
  "from-indigo-500 to-blue-700",
  "from-fuchsia-500 to-purple-700",
  "from-cyan-500 to-blue-500",
  "from-teal-500 to-emerald-600",
  "from-pink-500 to-rose-600",
];

const rankConfig = {
  1: {
    bg: "bg-gradient-to-br from-yellow-300 via-amber-400 to-yellow-500",
    text: "text-yellow-900",
    shadow: "shadow-amber-200",
  },
  2: {
    bg: "bg-gradient-to-br from-gray-200 via-slate-300 to-gray-400",
    text: "text-gray-700",
    shadow: "shadow-gray-200",
  },
  3: {
    bg: "bg-gradient-to-br from-orange-300 via-amber-500 to-orange-600",
    text: "text-orange-900",
    shadow: "shadow-orange-200",
  },
};

const deptColors = {
  Engineering: "bg-blue-100 text-blue-600",
  Design: "bg-purple-100 text-purple-600",
  Marketing: "bg-amber-100 text-amber-600",
};

function RankBadge({ rank }) {
  const config = rankConfig[rank];

  if (config) {
    return (
      <div className={`w-12 h-12 rounded-xl ${config.bg} flex items-center justify-center font-extrabold text-xl ${config.text} shadow-md ${config.shadow}`}>
        {rank}
      </div>
    );
  }

  return (
    <div className="w-12 h-12 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center font-bold text-lg text-gray-400">
      {rank}
    </div>
  );
}

const cardVariants = {
  hidden: { opacity: 0, x: -30, scale: 0.97 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      delay: i * 0.06,
      type: "spring",
      stiffness: 260,
      damping: 22,
    },
  }),
};

export default function WorkerCard({ worker, index }) {
  const { rank, name, avatar, department, workedHours, billedHours, efficiency } = worker;
  const gradient = avatarGradients[worker.id % avatarGradients.length];
  const isTopThree = rank <= 3;

  return (
    <motion.div
      className={`flex items-center gap-5 px-7 py-4 rounded-2xl border transition-shadow duration-300 ${
        isTopThree
          ? "bg-white border-gray-200 shadow-md"
          : "bg-white border-gray-100 shadow-sm"
      }`}
      variants={cardVariants}
      custom={index}
      initial="hidden"
      animate="visible"
      layout
    >
      {/* Rank */}
      <div className="shrink-0">
        <RankBadge rank={rank} />
      </div>

      {/* Avatar */}
      <div className={`w-13 h-13 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-base shrink-0 shadow-md ring-2 ring-white`}>
        {avatar}
      </div>

      {/* Name + Department */}
      <div className="w-52 shrink-0">
        <h3 className="text-lg font-bold text-gray-900 truncate leading-tight">{name}</h3>
        <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-semibold ${deptColors[department] || "bg-gray-100 text-gray-600"}`}>
          {department}
        </span>
      </div>

      {/* Hours */}
      <div className="flex gap-5 shrink-0">
        <div className="text-center min-w-[52px]">
          <p className="text-base font-bold text-gray-800 tabular-nums">{workedHours}h</p>
          <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Worked</p>
        </div>
        <div className="text-center min-w-[52px]">
          <p className="text-base font-bold text-gray-800 tabular-nums">{billedHours}h</p>
          <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Billed</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="flex-1 min-w-[100px] px-2">
        <ProgressBar efficiency={efficiency} />
      </div>

      {/* Efficiency % */}
      <div className="w-24 text-right shrink-0">
        <span
          className={`text-2xl font-extrabold tabular-nums tracking-tight ${
            efficiency > 100
              ? "text-emerald-600"
              : efficiency > 90
              ? "text-orange-500"
              : "text-gray-400"
          }`}
        >
          {efficiency.toFixed(1)}
        </span>
        <span
          className={`text-sm font-bold ${
            efficiency > 100
              ? "text-emerald-400"
              : efficiency > 90
              ? "text-orange-300"
              : "text-gray-300"
          }`}
        >
          %
        </span>
      </div>

      {/* Bonus */}
      <div className="w-44 shrink-0 flex justify-end">
        <BonusBadge efficiency={efficiency} />
      </div>
    </motion.div>
  );
}

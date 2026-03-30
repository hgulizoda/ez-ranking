import { motion } from "framer-motion";
import { getBarColor } from "../helpers/efficiency";

export default function ProgressBar({ efficiency }) {
  const capped = Math.min(efficiency, 120);
  const widthPercent = (capped / 120) * 100;
  const barColor = getBarColor(efficiency);

  return (
    <div className="relative w-full">
      <div className="w-full h-[18px] bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${barColor}`}
          initial={{ width: 0 }}
          animate={{ width: `${widthPercent}%` }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      {/* Threshold markers */}
      <div
        className="absolute top-0 h-full w-px bg-gray-300/50"
        style={{ left: `${(90 / 120) * 100}%` }}
      />
      <div
        className="absolute top-0 h-full w-px bg-gray-300/50"
        style={{ left: `${(100 / 120) * 100}%` }}
      />
    </div>
  );
}

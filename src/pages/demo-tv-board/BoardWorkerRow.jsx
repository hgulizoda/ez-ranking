import { useState } from "react";
import { motion } from "framer-motion";
import { EXPECTED_HOURS, getHoursToBonus } from "../../helpers/efficiency";

/* ─── Avatar ─── */
function Avatar({ photo, avatar, name }) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div
      className="w-[180px] h-[180px] rounded-full border border-[#D1D5DB] bg-white flex items-center justify-center shrink-0"
      style={{ boxShadow: "0 3px 10px rgba(0,0,0,0.08)" }}
    >
      <div className="w-full h-full rounded-full overflow-hidden border-amber-50 border-4">
        {!imgFailed ? (
          <img
            src={photo}
            alt={name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="w-full h-full bg-[#3B82F6] flex items-center justify-center text-white font-semibold text-lg">
            {avatar}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Bonus Info ─── */
function BonusInfo({ billedHours, workedHours }) {
  const bonus = getHoursToBonus(billedHours, workedHours);

  if (bonus.achieved === "Target Bonus") {
    return (
      <div className="flex flex-col items-center gap-1.5">
        <div className="w-[110px] shrink-0 text-center">
          <p className="text-3xl font-extrabold text-[#1E293B] tabular-nums">
            {bonus.hoursToNext}h
          </p>
          <p className="text-sm text-[#64748B] uppercase tracking-wide mt-1.5 font-semibold">
            Till Bonus
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="w-[110px] shrink-0 text-center">
        <p className="text-3xl font-extrabold text-[#1E293B] tabular-nums">
          {bonus.hoursToNext}h
        </p>
        <p className="text-sm text-[#64748B] uppercase tracking-wide mt-1.5 font-semibold">
          Till Bonus
        </p>
      </div>
    </div>
  );
}

/* ─── Left Hours Progress Bar ─── */
function LeftHoursBar({ workedHours, index }) {
  const progress = Math.min((workedHours / EXPECTED_HOURS) * 100, 100);

  return (
    <div className="w-full">
      <div className="h-3 bg-[#E2E8F0] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-[#3B82F6]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{
            duration: 0.8,
            delay: index * 0.06 + 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </div>
    </div>
  );
}

/* ─── Row animation variants ─── */
const rowVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.06 + 0.1,
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

/* ─── Main Card Component ─── */
export default function BoardWorkerRow({ worker, index }) {
  const {
    rank,
    name,
    avatar,
    photo,
    department,
    workedHours,
    billedHours,
    efficiency,
  } = worker;

  const isEven = index % 2 === 0;

  return (
    <motion.div
      className={`
        relative flex items-center rounded-2xl px-10 py-1
        border transition-colors duration-300 justify-between
        ${
          isEven
            ? "bg-white border-[#E2E8F0] shadow-[0_1px_8px_rgba(0,0,0,0.04)]"
            : "bg-[#F0F4FF] border-[#DDE4F0] shadow-none"
        }
      `}
      variants={rowVariants}
      custom={index}
      initial="hidden"
      animate="visible"
    >
      {/* ── Rank (floating badge) ── */}
      <div
        className={`absolute -top-3 -left-3 z-10 w-11 h-11 rounded-full flex items-center justify-center text-sm font-extrabold tabular-nums shadow-md ${
          rank <= 3
            ? "bg-[#3B82F6] text-white"
            : "bg-white text-[#94A3B8] border border-[#E2E8F0]"
        }`}
      >
        {String(rank).padStart(2, "0")}
      </div>

      {/* ── Avatar + Identity ── */}
      <div className="flex items-center gap-4 w-[35%] shrink-0 ">
        <Avatar photo={photo} avatar={avatar} name={name} />
        <div className="min-w-0">
          <h3 className="text-2xl font-bold text-[#1E293B] leading-tight truncate">
            {name}
          </h3>
          <p className="text-base text-[#64748B] mt-1 font-medium">
            {department}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* ── Worked Hours ── */}
        <div className=" shrink-0 text-center">
          <p className="text-3xl font-extrabold text-[#1E293B] tabular-nums">
            {workedHours}h
          </p>
          <p className="text-sm text-[#64748B] uppercase tracking-wide mt-1.5 font-semibold">
            Worked
          </p>
        </div>

        {/* ── Remaining Hours ── */}
        <div className=" shrink-0 flex justify-center">
          <BonusInfo billedHours={billedHours} workedHours={workedHours} />
        </div>
      </div>

      {/* ── Progress Bar ── */}
      <div className=" min-w-[40%] px-8">
        <LeftHoursBar workedHours={workedHours} index={index} />
      </div>

      {/* ── Efficiency % ── */}
      <div className="w-[130px] shrink-0 flex items-center justify-center">
        <div className="text-center">
          <p
            className={`text-4xl font-extrabold tabular-nums ${
              efficiency >= 100
                ? "text-[#3B82F6]"
                : efficiency >= 90
                  ? "text-[#1E293B]"
                  : "text-[#94A3B8]"
            }`}
          >
            {efficiency.toFixed(1)}%
          </p>
          <p className="text-sm text-[#64748B] uppercase tracking-wide mt-1.5 font-semibold">
            Efficiency
          </p>
        </div>
      </div>

      {/* ── Bonus Info (achieved + hours to next) ── */}
    </motion.div>
  );
}

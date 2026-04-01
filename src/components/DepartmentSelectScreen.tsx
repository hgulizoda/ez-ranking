import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface DeptMeta {
  icon: ReactNode;
  gradient: string;
  bg: string;
  border: string;
  text: string;
}

const deptMeta: Record<string, DeptMeta> = {
  Engineering: {
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
      </svg>
    ),
    gradient: "from-blue-500 to-indigo-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-700",
  },
  Design: {
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
      </svg>
    ),
    gradient: "from-purple-500 to-fuchsia-600",
    bg: "bg-purple-50",
    border: "border-purple-200",
    text: "text-purple-700",
  },
  Marketing: {
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
      </svg>
    ),
    gradient: "from-amber-500 to-orange-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-700",
  },
};

const fallbackMeta: DeptMeta = {
  icon: (
    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
    </svg>
  ),
  gradient: "from-gray-500 to-slate-600",
  bg: "bg-gray-50",
  border: "border-gray-200",
  text: "text-gray-700",
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.3 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
};

interface DepartmentSelectScreenProps {
  departments: string[];
  onSelect: (dept: string) => void;
}

export default function DepartmentSelectScreen({ departments, onSelect }: DepartmentSelectScreenProps) {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <p className="text-lg font-semibold text-blue-500 uppercase tracking-[0.2em] mb-4">
          Tech Efficiency Dashboard
        </p>
        <h1 className="text-6xl font-extrabold text-gray-900 tracking-tight">
          Select Department
        </h1>
        <p className="text-2xl text-gray-500 mt-4">
          Choose a department to view the leaderboard
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-3 gap-8 max-w-4xl w-full px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {departments.map((dept) => {
          const meta = deptMeta[dept] || fallbackMeta;
          return (
            <motion.button
              key={dept}
              variants={cardVariants}
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelect(dept)}
              className={`group relative flex flex-col items-center gap-5 px-8 py-12 rounded-3xl ${meta.bg} border-2 ${meta.border} cursor-pointer transition-shadow duration-300 hover:shadow-xl hover:shadow-blue-100/60 focus:outline-none`}
            >
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${meta.gradient} flex items-center justify-center text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                {meta.icon}
              </div>
              <span className={`text-3xl font-bold ${meta.text}`}>
                {dept}
              </span>
            </motion.button>
          );
        })}
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        onClick={() => onSelect("All")}
        className="mt-12 px-10 py-4 text-lg font-semibold text-gray-500 hover:text-gray-700 border border-gray-200 hover:border-gray-300 rounded-full transition-all duration-200 hover:shadow-sm"
      >
        View All Departments
      </motion.button>
    </motion.div>
  );
}

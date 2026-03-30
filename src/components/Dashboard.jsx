import { motion } from "framer-motion";
import Header from "./Header";
import WorkerCard from "./WorkerCard";

export default function Dashboard({ workers, department, onBack }) {
  return (
    <motion.div
      className="min-h-screen bg-[#f4f6f9] flex flex-col"
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <Header
        department={department}
        workers={workers}
        onBack={onBack}
      />

      <main className="flex-1 px-10 py-5">
        {workers.length === 0 ? (
          <div className="flex items-center justify-center h-96">
            <p className="text-2xl text-gray-400 font-medium">
              No workers in this department.
            </p>
          </div>
        ) : (
          <>
            {/* Column headers */}
            <div className="flex items-center gap-5 px-7 py-2 mb-1">
              <div className="shrink-0 w-12">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Rank</span>
              </div>
              <div className="w-13 shrink-0" />
              <div className="w-52 shrink-0">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Worker</span>
              </div>
              <div className="flex gap-5 shrink-0">
                <div className="text-center min-w-[52px]">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Worked</span>
                </div>
                <div className="text-center min-w-[52px]">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Billed</span>
                </div>
              </div>
              <div className="flex-1 min-w-[100px] px-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Progress</span>
              </div>
              <div className="w-24 text-right shrink-0">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Efficiency</span>
              </div>
              <div className="w-44 text-right shrink-0">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Bonus</span>
              </div>
            </div>

            {/* Worker rows */}
            <div className="flex flex-col gap-2">
              {workers.map((worker, i) => (
                <WorkerCard key={worker.id} worker={worker} index={i} />
              ))}
            </div>
          </>
        )}
      </main>

      <footer className="text-center py-2 text-[10px] text-gray-300 tracking-wide">
        EZ Metrics · Live Dashboard
      </footer>
    </motion.div>
  );
}

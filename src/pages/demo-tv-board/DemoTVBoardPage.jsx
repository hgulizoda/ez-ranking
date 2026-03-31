import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import DepartmentSelectScreen from "../../components/DepartmentSelectScreen";
import BoardHeader from "./BoardHeader";
import BoardWorkerRow from "./BoardWorkerRow";
import mockWorkers, { getDepartments } from "../../data/mockWorkers";
import { rankWorkers } from "../../helpers/efficiency";

const AUTO_REFRESH_INTERVAL = 10000;

function simulateDataVariation(workers) {
  return workers.map((w) => {
    const variation = (Math.random() - 0.5) * 4;
    const newBilled = Math.max(0, Math.round(w.billedHours + variation));
    return { ...w, billedHours: newBilled };
  });
}

export default function DemoTVBoardPage() {
  const [workers, setWorkers] = useState(mockWorkers);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const departments = getDepartments(mockWorkers);

  useEffect(() => {
    const interval = setInterval(() => {
      setWorkers((prev) => simulateDataVariation(prev));
    }, AUTO_REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  const filtered =
    !selectedDepartment || selectedDepartment === "All"
      ? workers
      : workers.filter((w) => w.department === selectedDepartment);

  const ranked = rankWorkers(filtered);

  return (
    <AnimatePresence mode="wait">
      {!selectedDepartment ? (
        <DepartmentSelectScreen
          key="select"
          departments={departments}
          onSelect={setSelectedDepartment}
        />
      ) : (
        <div key="board" className="min-h-screen bg-[#F1F5F9] flex flex-col">
          <BoardHeader
            workers={ranked}
            department={selectedDepartment}
            onBack={() => setSelectedDepartment(null)}
          />

          <main className="flex-1 px-12 py-6">
            {ranked.length === 0 ? (
              <div className="flex items-center justify-center h-96">
                <p className="text-2xl text-[#64748B] font-medium">
                  No workers in this department.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {ranked.map((worker, i) => (
                  <BoardWorkerRow key={worker.id} worker={worker} index={i} />
                ))}
              </div>
            )}
          </main>
        </div>
      )}
    </AnimatePresence>
  );
}

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import DepartmentSelectScreen from "./components/DepartmentSelectScreen";
import Dashboard from "./components/Dashboard";
import mockWorkers, { getDepartments } from "./data/mockWorkers";
import { rankWorkers } from "./helpers/efficiency";
import type { Worker } from "./types";

const AUTO_REFRESH_INTERVAL = 10000;

function simulateDataVariation(workers: Worker[]): Worker[] {
  return workers.map((w) => {
    const variation = (Math.random() - 0.5) * 4;
    const newBilled = Math.max(0, Math.round(w.billedHours + variation));
    return { ...w, billedHours: newBilled };
  });
}

export default function App() {
  const [workers, setWorkers] = useState<Worker[]>(mockWorkers);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

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
        <Dashboard
          key="dashboard"
          workers={ranked}
          department={selectedDepartment}
          onBack={() => setSelectedDepartment(null)}
        />
      )}
    </AnimatePresence>
  );
}

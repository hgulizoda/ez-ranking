import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import DemoTVBoardPage from "./pages/demo-tv-board/DemoTVBoardPage";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DemoTVBoardPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Home from "./pages/Home";
import PinPage from "./pages/PinPage";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="min-vh-100 d-flex flex-column">
      <header className="container py-3 d-flex justify-content-between align-items-center">
        <h4 className="mb-0 fw-semibold">Quick Share</h4>
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </header>
      <main className="container flex-grow-1 pb-5 fade-in">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:pin" element={<PinPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

import { useState, useEffect } from "react";
import RiegelForm from "./components/RiegelForm";
import PaceForm from "./components/PaceForm";
import TimeForm from "./components/TimeForm";

const PaceCalculator = () => {
  const [activeTab, setActiveTab] = useState("pace"); // 'pace', 'time', 'riegel'
  const [darkMode, setDarkMode] = useState(() => {
    // Check if user has a saved preference
    const savedMode = localStorage.getItem("darkMode");
    // Check if user prefers dark mode
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    return savedMode ? savedMode === "true" : prefersDark;
  });

  useEffect(() => {
    if (darkMode) {
      // To enable dark mode:
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      // To enable light mode:
      document.documentElement.setAttribute("data-theme", "light");
    }
    // Save preference to localStorage
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  return (
    <div className="max-w-md mx-auto mt-12 px-6 py-8 bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700">
      <div className="flex justify-end mb-2">
        <button
          onClick={() => setDarkMode((d) => !d)}
          className="px-3 py-1 rounded-lg border bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
        🏃‍♂️ Pace Calculator
      </h2>

      <div className="flex justify-center mb-6 space-x-4">
        <button
          className={`px-4 py-2 rounded-lg font-semibold border transition-colors ${
            activeTab === "pace"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
          onClick={() => {
            setActiveTab("pace");
          }}
        >
          Calculate Pace
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-semibold border transition-colors ${
            activeTab === "time"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
          onClick={() => {
            setActiveTab("time");
          }}
        >
          Calculate Time
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-semibold border transition-colors ${
            activeTab === "riegel"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
          onClick={() => setActiveTab("riegel")}
        >
          Riegel's Formula
        </button>
      </div>

      {activeTab === "pace" ? (
        <PaceForm />
      ) : activeTab === "riegel" ? (
        <RiegelForm />
      ) : activeTab === "time" ? (
        <TimeForm />
      ) : null}
    </div>
  );
};

export default PaceCalculator;

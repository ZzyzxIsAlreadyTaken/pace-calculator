import { useState } from "react";
import RiegelForm from "./components/RiegelForm";
import PaceForm from "./components/PaceForm";
import TimeForm from "./components/TimeForm";
import { Button } from "./components/Button";
import Header from "./components/Header";

const PaceCalculator = () => {
  const [activeTab, setActiveTab] = useState("pace"); // 'pace', 'time', 'riegel'
  const [unit, setUnit] = useState("metric"); // 'metric' or 'imperial'

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        unit={unit as "metric" | "imperial"}
        onUnitToggle={() => setUnit(unit === "metric" ? "imperial" : "metric")}
      />

      {/* Tabs */}
      <nav className="flex justify-center mt-8 mb-8">
        <div className="flex w-full max-w-2xl bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
          <Button
            className={`flex-1 px-4 py-2 font-semibold transition-colors rounded-none ${
              activeTab === "pace"
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("pace")}
          >
            Pace Calculator
          </Button>
          <Button
            className={`flex-1 px-4 py-2 font-semibold transition-colors rounded-none ${
              activeTab === "time"
                ? "bg-emerald-600 text-white hover:bg-emerald-700"
                : "text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("time")}
          >
            Time Calculator
          </Button>
          <Button
            className={`flex-1 px-4 py-2 font-semibold transition-colors rounded-none ${
              activeTab === "riegel"
                ? "bg-purple-600 text-white hover:bg-purple-700"
                : "text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("riegel")}
          >
            Riegel's Formula
          </Button>
        </div>
      </nav>

      {/* Main Card */}
      <main className="flex flex-col items-center">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-200 mb-10 overflow-hidden">
          {activeTab === "pace" ? (
            <PaceForm unit={unit as "metric" | "imperial"} />
          ) : activeTab === "time" ? (
            <TimeForm unit={unit as "metric" | "imperial"} />
          ) : (
            <RiegelForm unit={unit as "metric" | "imperial"} />
          )}
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mb-16">
          <div className="bg-white rounded-xl shadow border border-gray-200 p-6 text-center">
            <h3 className="font-semibold text-lg mb-2">Pace Calculator</h3>
            <p className="text-gray-500 text-sm">
              Calculate your running pace based on your finish time and
              distance. Perfect for analyzing past performances.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow border border-gray-200 p-6 text-center">
            <h3 className="font-semibold text-lg mb-2">Time Calculator</h3>
            <p className="text-gray-500 text-sm">
              Predict your finish time for a given distance based on your target
              pace. Great for race planning.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow border border-gray-200 p-6 text-center">
            <h3 className="font-semibold text-lg mb-2">Riegel's Formula</h3>
            <p className="text-gray-500 text-sm">
              Predict performance at different distances using a proven
              mathematical formula based on your known race times.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaceCalculator;

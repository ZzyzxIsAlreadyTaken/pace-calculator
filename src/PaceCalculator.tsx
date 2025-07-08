import { useState } from "react";
import RiegelForm from "./components/RiegelForm";
import PaceForm from "./components/PaceForm";
import TimeForm from "./components/TimeForm";
import PaceSpeedConverter from "./components/PaceSpeedConverter";
import Header from "./components/Header";
import Tabs from "./components/Tabs";
import type { TabType } from "./types";

// Form component mapping
const formComponents = {
  pace: PaceForm,
  time: TimeForm,
  paceSpeed: PaceSpeedConverter,
  riegel: RiegelForm,
} as const;

const PaceCalculator = () => {
  const [unit, setUnit] = useState("metric"); // 'metric' or 'imperial'
  const [activeTab, setActiveTab] = useState<TabType>("pace");

  const FormComponent = formComponents[activeTab];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        unit={unit as "metric" | "imperial"}
        onUnitToggle={() => setUnit(unit === "metric" ? "imperial" : "metric")}
      />

      {/* Tabs */}
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Card */}
      <main className="flex flex-col items-center px-0 sm:px-4">
        <div className="w-full sm:max-w-md bg-white sm:rounded-3xl shadow-xl border-x-0 border-t border-b sm:border sm:border-gray-200 mb-6 sm:mb-10 overflow-hidden">
          <FormComponent unit={unit as "metric" | "imperial"} />
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 w-full max-w-4xl mb-8 sm:mb-16 px-0 sm:px-4">
          <div className="bg-white sm:rounded-xl shadow border-x-0 border-t border-b sm:border sm:border-gray-200 p-4 sm:p-6 text-center">
            <h3 className="font-semibold text-lg mb-2">Pace Calculator</h3>
            <p className="text-gray-500 text-sm">
              Calculate your running pace based on your finish time and
              distance. Perfect for analyzing past performances.
            </p>
          </div>
          <div className="bg-white sm:rounded-xl shadow border-x-0 border-t border-b sm:border sm:border-gray-200 p-4 sm:p-6 text-center">
            <h3 className="font-semibold text-lg mb-2">Time Calculator</h3>
            <p className="text-gray-500 text-sm">
              Predict your finish time for a given distance based on your target
              pace. Great for race planning.
            </p>
          </div>
          <div className="bg-white sm:rounded-xl shadow border-x-0 border-t border-b sm:border sm:border-gray-200 p-4 sm:p-6 text-center">
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

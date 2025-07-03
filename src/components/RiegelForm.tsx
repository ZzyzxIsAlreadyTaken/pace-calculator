import { useState } from "react";
import TimePicker from "./TimePicker";

const KM_IN_MI = 1.60934;

interface RiegelFormProps {
  unit: "metric" | "imperial";
}

export default function RiegelForm({ unit }: RiegelFormProps) {
  const [riegelPrevDistance, setRiegelPrevDistance] = useState<
    number | undefined
  >();
  const [riegelPrevHours, setRiegelPrevHours] = useState<string>("");
  const [riegelPrevMinutes, setRiegelPrevMinutes] = useState<string>("");
  const [riegelPrevSeconds, setRiegelPrevSeconds] = useState<string>("");
  const [riegelTargetDistance, setRiegelTargetDistance] = useState<
    number | undefined
  >();
  const [riegelResult, setRiegelResult] = useState("");

  const handleRiegelCalculate = () => {
    if (
      !riegelPrevDistance ||
      !riegelTargetDistance ||
      !riegelPrevHours ||
      !riegelPrevMinutes ||
      !riegelPrevSeconds
    ) {
      setRiegelResult("");
      return;
    }

    const d1 = riegelPrevDistance * (unit === "metric" ? 1 : KM_IN_MI);
    const d2 = riegelTargetDistance * (unit === "metric" ? 1 : KM_IN_MI);
    const t1 =
      parseInt(riegelPrevHours) * 3600 +
      parseInt(riegelPrevMinutes) * 60 +
      parseInt(riegelPrevSeconds);
    if (!d1 || !d2 || !t1) {
      setRiegelResult("");
      return;
    }
    const t2 = t1 * Math.pow(d2 / d1, 1.06);
    const h = Math.floor(t2 / 3600);
    const m = Math.floor((t2 % 3600) / 60);
    const s = Math.round(t2 % 60);
    setRiegelResult(`${h}h ${m}m ${s}s`);
  };

  return (
    <div className="p-0">
      {/* Header */}
      <div className="bg-purple-600 p-4 flex items-start space-x-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white mt-1"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M4 4h16v16H4z" />
          <path d="M4 8h16" />
          <path d="M8 4v16" />
          <path d="M12 12l4 4" />
          <path d="M12 12l-2 2" />
        </svg>
        <div>
          <h2 className="text-xl font-bold text-white">Riegel's Formula</h2>
          <p className="text-base text-purple-100">
            Predict performance at different distances
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pb-6 space-y-2">
        {/* How to use */}
        <div className="bg-purple-50 rounded-2xl p-6 text-purple-900">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-base font-semibold">How it works</h3>
          </div>
          <p className="text-sm">
            Predict your race time for a new distance based on a previous race
            result.
          </p>
          <span className="block my-2 font-mono text-sm">
            T₂ = T₁ × (D₂ / D₁)<sup>1.06</sup>
          </span>
          <p className="text-sm">
            Where T₁ is your previous time for distance D₁, and T₂ is the
            predicted time for distance D₂. The exponent 1.06 is based on
            endurance event data.
          </p>
        </div>

        {/* Previous Race Distance */}
        <div className="space-y-2">
          <label className="block text-base font-semibold text-gray-900">
            Previous Race Distance
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              step="any"
              className="w-full px-4 py-2 text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={riegelPrevDistance}
              onChange={(e) => setRiegelPrevDistance(Number(e.target.value))}
            />
            <div className="w-20 px-4 py-2 text-center text-sm text-gray-600 bg-gray-100 rounded-lg">
              {unit === "metric" ? "km" : "mi"}
            </div>
          </div>
        </div>

        {/* Previous Race Time */}
        <div className="space-y-2">
          <label className="block text-base font-semibold text-gray-900">
            Previous Race Time
          </label>
          <TimePicker
            hours={riegelPrevHours}
            minutes={riegelPrevMinutes}
            seconds={riegelPrevSeconds}
            onHoursChange={setRiegelPrevHours}
            onMinutesChange={setRiegelPrevMinutes}
            onSecondsChange={setRiegelPrevSeconds}
          />
        </div>

        {/* Target Race Distance */}
        <div className="space-y-2">
          <label className="block text-base font-semibold text-gray-900">
            Target Race Distance
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              step="any"
              className="w-full px-4 py-2 text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={riegelTargetDistance}
              onChange={(e) => setRiegelTargetDistance(Number(e.target.value))}
            />
            <div className="w-20 px-4 py-2 text-center text-sm text-gray-600 bg-gray-100 rounded-lg">
              {unit === "metric" ? "km" : "mi"}
            </div>
          </div>
        </div>

        {/* Calculate Button */}
        <button
          onClick={handleRiegelCalculate}
          className="w-full mt-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-base font-semibold rounded-2xl transition duration-200 flex items-center justify-center space-x-3"
        >
          <span>Calculate Predicted Time</span>
        </button>

        {/* Results */}
        {riegelResult && (
          <div className="mt-4 text-center text-lg font-medium text-purple-700">
            Predicted time: <span className="font-bold">{riegelResult}</span>
          </div>
        )}
      </div>
    </div>
  );
}

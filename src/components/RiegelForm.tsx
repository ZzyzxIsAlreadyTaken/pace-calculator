import { useState } from "react";

const KM_IN_MI = 1.60934;

export default function RiegelForm() {
  const [riegelPrevDistance, setRiegelPrevDistance] = useState(5);
  const [riegelPrevUnit, setRiegelPrevUnit] = useState("metric");
  const [riegelPrevHours, setRiegelPrevHours] = useState("0");
  const [riegelPrevMinutes, setRiegelPrevMinutes] = useState("25");
  const [riegelPrevSeconds, setRiegelPrevSeconds] = useState("0");
  const [riegelTargetDistance, setRiegelTargetDistance] = useState(10);
  const [riegelTargetUnit, setRiegelTargetUnit] = useState("metric");
  const [riegelResult, setRiegelResult] = useState("");

  const handleRiegelCalculate = () => {
    const d1 =
      riegelPrevDistance * (riegelPrevUnit === "metric" ? 1 : KM_IN_MI);
    const d2 =
      riegelTargetDistance * (riegelTargetUnit === "metric" ? 1 : KM_IN_MI);
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
    <div className="space-y-6">
      <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-700 rounded-lg p-4 text-sm text-blue-900 dark:text-blue-100">
        <strong>Riegel's Formula</strong> predicts your race time for a new
        distance based on a previous race result.
        <br />
        <span className="block my-2 font-mono">
          T₂ = T₁ × (D₂ / D₁)<sup>1.06</sup>
        </span>
        Where T₁ is your previous time for distance D₁, and T₂ is the predicted
        time for distance D₂. The exponent 1.06 is based on endurance event
        data.
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-100 mb-1">
          Previous Race Distance
        </label>
        <div className="flex space-x-2">
          <input
            type="number"
            step="any"
            className="w-2/3 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={riegelPrevDistance}
            onChange={(e) => setRiegelPrevDistance(Number(e.target.value))}
          />
          <select
            className="w-1/3 px-2 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={riegelPrevUnit}
            onChange={(e) => setRiegelPrevUnit(e.target.value)}
          >
            <option value="metric">km</option>
            <option value="imperial">mi</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-100 mb-1">
          Previous Race Time
        </label>
        <div className="flex space-x-2">
          <select
            className="w-1/3 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={riegelPrevHours}
            onChange={(e) => setRiegelPrevHours(e.target.value)}
          >
            {Array.from({ length: 24 }, (_, i) => (
              <option key={i} value={i}>
                {i} hrs
              </option>
            ))}
          </select>
          <select
            className="w-1/3 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={riegelPrevMinutes}
            onChange={(e) => setRiegelPrevMinutes(e.target.value)}
          >
            {Array.from({ length: 60 }, (_, i) => (
              <option key={i} value={i}>
                {i} min
              </option>
            ))}
          </select>
          <select
            className="w-1/3 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={riegelPrevSeconds}
            onChange={(e) => setRiegelPrevSeconds(e.target.value)}
          >
            {Array.from({ length: 60 }, (_, i) => (
              <option key={i} value={i}>
                {i} sec
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-100 mb-1">
          Target Race Distance
        </label>
        <div className="flex space-x-2">
          <input
            type="number"
            step="any"
            className="w-2/3 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={riegelTargetDistance}
            onChange={(e) => setRiegelTargetDistance(Number(e.target.value))}
          />
          <select
            className="w-1/3 px-2 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={riegelTargetUnit}
            onChange={(e) => setRiegelTargetUnit(e.target.value)}
          >
            <option value="metric">km</option>
            <option value="imperial">mi</option>
          </select>
        </div>
      </div>
      <button
        onClick={handleRiegelCalculate}
        className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition duration-200"
      >
        Calculate Predicted Time
      </button>
      {riegelResult && (
        <div className="mt-4 text-center text-lg font-medium text-green-700 dark:text-green-300">
          Predicted time: <span className="font-bold">{riegelResult}</span>
        </div>
      )}
    </div>
  );
}

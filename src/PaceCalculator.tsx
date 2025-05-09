import { useState } from "react";

const PaceCalculator = () => {
  const [distance, setDistance] = useState("");
  const [pace, setPace] = useState("");
  const [unit, setUnit] = useState("metric");
  const [hours, setHours] = useState("0");
  const [minutes, setMinutes] = useState("0");
  const [seconds, setSeconds] = useState("0");

  const distances = [
    { label: "1 km (0.62 mi)", value: 1 },
    { label: "5 km (3.11 mi)", value: 5 },
    { label: "10 km (6.21 mi)", value: 10 },
    { label: "Half Marathon (21.1 km / 13.11 mi)", value: 21.1 },
    { label: "Marathon (42.2 km / 26.22 mi)", value: 42.2 },
    { label: "1 mi (1.61 km)", value: 1.60934 },
    { label: "5 mi (8.05 km)", value: 8.05 },
    { label: "10 mi (16.09 km)", value: 16.09 },
  ];

  const calculatePace = () => {
    const totalMinutes =
      parseInt(hours) * 60 + parseInt(minutes) + parseInt(seconds) / 60;
    const distanceInKm = parseFloat(distance);
    const pacePerKm =
      unit === "metric"
        ? totalMinutes / distanceInKm
        : (totalMinutes / distanceInKm) * 1.60934;
    const paceMinutes = Math.floor(pacePerKm);
    const paceSeconds = Math.round((pacePerKm - paceMinutes) * 60);
    setPace(
      `${paceMinutes}:${paceSeconds.toString().padStart(2, "0")} min/${unit === "metric" ? "km" : "mi"}`,
    );
  };

  const handleUnitToggle = () => {
    if (unit === "metric") {
      setUnit("imperial");
      setDistance((prev) =>
        prev ? (parseFloat(prev) * 1.60934).toFixed(2) : "",
      );
    } else {
      setUnit("metric");
      setDistance((prev) =>
        prev ? (parseFloat(prev) * 1.60934).toFixed(2) : "",
      );
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 px-6 py-8 bg-white rounded-3xl shadow-xl border border-gray-200">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        🏃‍♂️ Pace Calculator
      </h2>

      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold text-gray-700">
          Unit: {unit === "metric" ? "Kilometers" : "Miles"}
        </span>
        <button
          onClick={handleUnitToggle}
          className="py-1 px-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-lg transition duration-200"
        >
          Toggle to {unit === "metric" ? "Miles" : "Kilometers"}
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Distance
          </label>
          <select
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
          >
            <option value="">Select a distance</option>
            {distances.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Time
          </label>
          <div className="flex space-x-2">
            <select
              className="w-1/3 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
            >
              {Array.from({ length: 24 }, (_, i) => (
                <option key={i} value={i}>
                  {i} hrs
                </option>
              ))}
            </select>
            <select
              className="w-1/3 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
            >
              {Array.from({ length: 60 }, (_, i) => (
                <option key={i} value={i}>
                  {i} min
                </option>
              ))}
            </select>
            <select
              className="w-1/3 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={seconds}
              onChange={(e) => setSeconds(e.target.value)}
            >
              {Array.from({ length: 60 }, (_, i) => (
                <option key={i} value={i}>
                  {i} sec
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={calculatePace}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition duration-200"
        >
          Calculate Pace
        </button>

        {pace && (
          <div className="mt-4 text-center text-lg font-medium text-green-700">
            Your pace: <span className="font-bold">{pace}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaceCalculator;

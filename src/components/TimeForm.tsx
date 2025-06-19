import { useState } from "react";
import DistanceInput from "./DistanceInput";
import TimePicker from "./TimePicker";
import TimeResult from "./TimeResult";

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

interface TimeFormProps {
  unit: "metric" | "imperial";
}

export default function TimeForm({ unit }: TimeFormProps) {
  const [distance, setDistance] = useState("");
  const [timeHours, setTimeHours] = useState("0");
  const [timeMinutes, setTimeMinutes] = useState("0");
  const [timeSeconds, setTimeSeconds] = useState("0");
  const [time, setTime] = useState("");

  const calculateTime = () => {
    const dist = parseFloat(distance.replace(",", "."));
    const paceInSeconds =
      parseInt(timeHours) * 3600 +
      parseInt(timeMinutes) * 60 +
      parseInt(timeSeconds);

    if (!dist || !paceInSeconds) {
      setTime("");
      return;
    }

    // Calculate total time in seconds
    const totalSeconds = paceInSeconds * dist;

    // Convert to hours, minutes, seconds
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = Math.round(totalSeconds % 60);

    setTime(`${h}h ${m}m ${s}s`);
  };

  const handlePreset = (value: number) => {
    setDistance(value.toString());
    setTime("");
  };

  return (
    <div className="p-0">
      {/* Header */}
      <div className="bg-emerald-600 p-4 flex items-start space-x-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white mt-1"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="1" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        <div>
          <h2 className="text-xl font-bold text-white">Time Calculator</h2>
          <p className="text-base text-emerald-100">Predict your finish time</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pb-6 space-y-2">
        {/* How to use */}
        <div className="bg-emerald-50 rounded-2xl p-6 text-emerald-900">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-base font-semibold">How to use</h3>
          </div>
          <p className="text-sm">
            Predict your finish time based on distance and target pace.
          </p>
        </div>

        {/* Distance */}
        <div className="space-y-2">
          <label className="block text-base font-semibold text-gray-900">
            Distance ({unit === "metric" ? "km" : "mi"})
          </label>
          <DistanceInput
            unit={unit}
            distance={distance}
            distances={distances}
            onDistanceChange={setDistance}
            onPresetSelect={handlePreset}
          />
        </div>

        {/* Time */}
        <div className="space-y-2 mt-4">
          <label className="block text-base font-semibold text-gray-900">
            Pace (min/{unit === "metric" ? "km" : "mi"})
          </label>
          <TimePicker
            hours={timeHours}
            minutes={timeMinutes}
            seconds={timeSeconds}
            onHoursChange={setTimeHours}
            onMinutesChange={setTimeMinutes}
            onSecondsChange={setTimeSeconds}
          />
        </div>

        {/* Calculate Button */}
        <button
          onClick={calculateTime}
          className="w-full mt-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-base font-semibold rounded-2xl transition duration-200 flex items-center justify-center space-x-3"
        >
          <span>Calculate Time</span>
        </button>

        {/* Results */}
        {time && <TimeResult time={time} />}
      </div>
    </div>
  );
}

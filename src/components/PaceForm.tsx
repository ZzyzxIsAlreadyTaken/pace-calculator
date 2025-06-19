import { useState } from "react";
import DistanceInput from "./DistanceInput";
import TimePicker from "./TimePicker";
import PaceResult from "./PaceResult";

const KM_IN_MI = 1.60934;
const MI_IN_KM = 1 / KM_IN_MI;

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

function formatPace(pacePerUnit: number) {
  const paceMinutes = Math.floor(pacePerUnit);
  const paceSeconds = Math.round((pacePerUnit - paceMinutes) * 60);
  return `${paceMinutes}:${paceSeconds.toString().padStart(2, "0")}`;
}

interface PaceFormProps {
  unit: "metric" | "imperial";
}

export default function PaceForm({ unit }: PaceFormProps) {
  const [distance, setDistance] = useState("");
  const [hours, setHours] = useState("0");
  const [minutes, setMinutes] = useState("0");
  const [seconds, setSeconds] = useState("0");
  const [pace, setPace] = useState("");
  const [paceConverted, setPaceConverted] = useState("");

  const calculatePace = () => {
    const totalMinutes =
      parseInt(hours) * 60 + parseInt(minutes) + parseInt(seconds) / 60;
    const dist = parseFloat(distance.replace(",", "."));

    if (!dist || totalMinutes === 0) {
      setPace("");
      setPaceConverted("");
      return;
    }

    let pacePerKm, pacePerMi;
    if (unit === "metric") {
      pacePerKm = totalMinutes / dist;
      pacePerMi = pacePerKm * KM_IN_MI;
    } else {
      pacePerMi = totalMinutes / dist;
      pacePerKm = pacePerMi * MI_IN_KM;
    }

    setPace(
      `${formatPace(unit === "metric" ? pacePerKm : pacePerMi)} min/${unit === "metric" ? "km" : "mi"}`,
    );
    setPaceConverted(
      `${formatPace(unit === "metric" ? pacePerMi : pacePerKm)} min/${unit === "metric" ? "mi" : "km"}`,
    );
  };

  const handlePreset = (value: number) => {
    setDistance(value.toString());
    setPace("");
    setPaceConverted("");
  };

  return (
    <div className="p-0">
      {/* Header */}
      <div className="bg-blue-600 p-4 flex items-start space-x-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white mt-1"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        <div>
          <h2 className="text-xl font-bold text-white">Pace Calculator</h2>
          <p className="text-base text-blue-100">Calculate your running pace</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pb-6 space-y-2">
        {/* How to use */}
        <div className="bg-blue-50 rounded-2xl p-6 text-blue-900">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-base font-semibold">How to use</h3>
          </div>
          <p className="text-sm">
            Calculate your running pace based on distance and time.
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
            Finish Time
          </label>
          <TimePicker
            hours={hours}
            minutes={minutes}
            seconds={seconds}
            onHoursChange={setHours}
            onMinutesChange={setMinutes}
            onSecondsChange={setSeconds}
          />
        </div>

        {/* Calculate Button */}
        <button
          onClick={calculatePace}
          className="w-full mt-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold rounded-2xl transition duration-200 flex items-center justify-center space-x-3"
        >
          <span>Calculate Pace</span>
        </button>

        {/* Results */}
        {pace && <PaceResult pace={pace} paceConverted={paceConverted} />}
      </div>
    </div>
  );
}

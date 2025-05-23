import { useState } from "react";
import DistanceInput from "./DistanceInput";
import TimePicker from "./TimePicker";
import UnitToggle from "./UnitToggle";
import TimeResult from "./TimeResult";

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

export default function TimeForm() {
  const [unit, setUnit] = useState("metric");
  const [distance, setDistance] = useState("");
  const [paceMinutes, setPaceMinutes] = useState("5");
  const [paceSeconds, setPaceSeconds] = useState("0");
  const [time, setTime] = useState("");

  const calculateTime = () => {
    const dist = parseFloat(distance.replace(",", "."));
    const paceTotal = parseInt(paceMinutes) + parseInt(paceSeconds) / 60;
    if (!dist || !paceTotal) {
      setTime("");
      return;
    }

    let totalMinutes;
    if (unit === "metric") {
      totalMinutes = dist * paceTotal;
    } else {
      const pacePerKm = paceTotal * MI_IN_KM;
      totalMinutes = dist * pacePerKm;
    }

    const h = Math.floor(totalMinutes / 60);
    const m = Math.floor(totalMinutes % 60);
    const s = Math.round((totalMinutes - h * 60 - m) * 60);

    setTime(`${h}h ${m}m ${s}s`);
  };

  const handleUnitToggle = () => {
    const dist = parseFloat(distance);
    const newUnit = unit === "metric" ? "imperial" : "metric";
    const converted = newUnit === "metric" ? dist * KM_IN_MI : dist * MI_IN_KM;
    const convertedDistance = dist ? converted.toFixed(2) : "";
    setDistance(convertedDistance);
    setUnit(newUnit);
    setTime("");
  };

  const handlePreset = (value: number) => {
    setDistance(value.toString());
    setTime("");
  };

  return (
    <>
      <UnitToggle unit={unit} onToggle={handleUnitToggle} />
      <DistanceInput
        unit={unit}
        distance={distance}
        distances={distances}
        onDistanceChange={setDistance}
        onPresetSelect={handlePreset}
      />
      <div className="mt-4">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-100 mb-1">
          Pace (min/{unit === "metric" ? "km" : "mi"})
        </label>
        <div className="flex space-x-2">
          <TimePicker
            hours={paceMinutes}
            minutes={paceSeconds}
            seconds={"0"}
            onHoursChange={setPaceMinutes}
            onMinutesChange={setPaceSeconds}
            onSecondsChange={() => {}}
          />
        </div>
      </div>
      <button
        onClick={calculateTime}
        className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition duration-200 mt-2"
      >
        Calculate Time
      </button>
      {time && <TimeResult time={time} />}
    </>
  );
}

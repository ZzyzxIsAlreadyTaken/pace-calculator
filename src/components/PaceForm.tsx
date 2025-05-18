import React, { useState } from "react";
import DistanceInput from "./DistanceInput";
import TimePicker from "./TimePicker";
import UnitToggle from "./UnitToggle";
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

export default function PaceForm() {
  const [unit, setUnit] = useState("metric");
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

  const handleUnitToggle = () => {
    const dist = parseFloat(distance);
    const newUnit = unit === "metric" ? "imperial" : "metric";
    const converted = newUnit === "metric" ? dist * KM_IN_MI : dist * MI_IN_KM;
    const convertedDistance = dist ? converted.toFixed(2) : "";
    setDistance(convertedDistance);
    setUnit(newUnit);
    setPace("");
    setPaceConverted("");
  };

  const handlePreset = (value: number) => {
    setDistance(value.toString());
    setPace("");
    setPaceConverted("");
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
          Time
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
      <button
        onClick={calculatePace}
        className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition duration-200 mt-2"
      >
        Calculate Pace
      </button>
      {pace && <PaceResult pace={pace} paceConverted={paceConverted} />}
    </>
  );
}

import { useState } from "react";
import TimePicker from "./TimePicker";

const KM_IN_MI = 1.60934;
const MI_IN_KM = 1 / KM_IN_MI;

interface MstoKMTorMilesFormProps {
  unit: "metric" | "imperial";
}

export default function PaceSpeedConverter({ unit }: MstoKMTorMilesFormProps) {
  const [inputMode, setInputMode] = useState<"pace" | "speed">("pace");
  const [paceHours, setPaceHours] = useState("0");
  const [paceMinutes, setPaceMinutes] = useState("0");
  const [paceSeconds, setPaceSeconds] = useState("0");
  const [speed, setSpeed] = useState("");
  const [result, setResult] = useState("");

  const calculateConversion = () => {
    if (inputMode === "pace") {
      // Convert pace to speed
      const totalMinutes =
        parseInt(paceHours) * 60 +
        parseInt(paceMinutes) +
        parseInt(paceSeconds) / 60;

      if (totalMinutes === 0) {
        setResult("");
        return;
      }

      let speedKmh, speedMph;
      if (unit === "metric") {
        // Pace is min/km, convert to km/h
        speedKmh = 60 / totalMinutes;
        speedMph = speedKmh * MI_IN_KM;
      } else {
        // Pace is min/mi, convert to mph
        speedMph = 60 / totalMinutes;
        speedKmh = speedMph * KM_IN_MI;
      }

      setResult(`${speedKmh.toFixed(2)} km/h (${speedMph.toFixed(2)} mph)`);
    } else {
      // Convert speed to pace
      const speedValue = parseFloat(speed.replace(",", "."));

      if (!speedValue || speedValue === 0) {
        setResult("");
        return;
      }

      let paceMinutes, paceMinutesOther;
      if (unit === "metric") {
        // Speed is km/h, convert to min/km
        paceMinutes = 60 / speedValue;
        paceMinutesOther = paceMinutes * KM_IN_MI;
      } else {
        // Speed is mph, convert to min/mi
        paceMinutes = 60 / speedValue;
        paceMinutesOther = paceMinutes * MI_IN_KM;
      }

      const formatPace = (pace: number) => {
        const minutes = Math.floor(pace);
        const seconds = Math.round((pace - minutes) * 60);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
      };

      const unitLabel = unit === "metric" ? "km" : "mi";
      const otherUnitLabel = unit === "metric" ? "mi" : "km";

      setResult(
        `${formatPace(paceMinutes)} min/${unitLabel} (${formatPace(paceMinutesOther)} min/${otherUnitLabel})`,
      );
    }
  };

  const handleInputModeChange = (mode: "pace" | "speed") => {
    setInputMode(mode);
    setResult("");
  };

  const handleSpeedChange = (value: string) => {
    setSpeed(value);
    setResult("");
  };

  const handlePaceChange = () => {
    setResult("");
  };

  return (
    <div className="p-0">
      {/* Header */}
      <div className="bg-orange-600 p-4 flex items-start space-x-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white mt-1"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
        <div>
          <h2 className="text-xl font-bold text-white">
            Pace ↔ Speed Converter
          </h2>
          <p className="text-base text-orange-100">
            Convert between pace and speed
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pb-6 space-y-4">
        {/* How to use */}
        <div className="bg-orange-50 rounded-2xl p-6 text-orange-900">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-base font-semibold">How to use</h3>
          </div>
          <p className="text-sm">
            Convert between running pace (min/km or min/mi) and speed (km/h or
            mph).
          </p>
        </div>

        {/* Input Mode Toggle */}
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={() => handleInputModeChange("pace")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              inputMode === "pace"
                ? "bg-orange-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Pace → Speed
          </button>
          <button
            onClick={() => handleInputModeChange("speed")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              inputMode === "speed"
                ? "bg-orange-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Speed → Pace
          </button>
        </div>

        {/* Input Fields */}
        {inputMode === "pace" ? (
          <div className="space-y-2">
            <label className="block text-base font-semibold text-gray-900">
              Pace (min/{unit === "metric" ? "km" : "mi"})
            </label>
            <TimePicker
              hours={paceHours}
              minutes={paceMinutes}
              seconds={paceSeconds}
              onHoursChange={(value) => {
                setPaceHours(value);
                handlePaceChange();
              }}
              onMinutesChange={(value) => {
                setPaceMinutes(value);
                handlePaceChange();
              }}
              onSecondsChange={(value) => {
                setPaceSeconds(value);
                handlePaceChange();
              }}
            />
          </div>
        ) : (
          <div className="space-y-2">
            <label className="block text-base font-semibold text-gray-900">
              Speed ({unit === "metric" ? "km/h" : "mph"})
            </label>
            <input
              type="text"
              value={speed}
              onChange={(e) => handleSpeedChange(e.target.value)}
              placeholder={`Enter speed in ${unit === "metric" ? "km/h" : "mph"}`}
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        )}

        {/* Calculate Button */}
        <button
          onClick={calculateConversion}
          className="w-full mt-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-base font-semibold rounded-2xl transition duration-200 flex items-center justify-center space-x-3"
        >
          <span>Convert</span>
        </button>

        {/* Results */}
        {result && (
          <div className="bg-orange-50 rounded-2xl p-6 text-orange-900">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-base font-semibold">Result</h3>
            </div>
            <p className="text-lg font-medium">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}

import React from "react";

interface DistanceInputProps {
  unit: string;
  distance: string;
  distances: Array<{ label: string; value: number }>;
  onDistanceChange: (value: string) => void;
  onPresetSelect: (value: number) => void;
}

const DistanceInput: React.FC<DistanceInputProps> = ({
  unit,
  distance,
  distances,
  onDistanceChange,
  onPresetSelect,
}) => {
  return (
    <div className="space-y-4">
      <input
        type="number"
        value={distance}
        onChange={(e) => onDistanceChange(e.target.value)}
        placeholder={`Enter distance in ${unit === "metric" ? "kilometers" : "miles"}`}
        className="w-full px-6 py-2 text-base border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex flex-wrap gap-2">
        {distances.map((d) => (
          <button
            key={d.label}
            onClick={() => onPresetSelect(d.value)}
            className="px-4 py-2 text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors text-xs"
          >
            {d.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DistanceInput;

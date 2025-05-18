import React from "react";

interface DistanceInputProps {
  unit: string;
  distance: string;
  distances: { label: string; value: number }[];
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
    <div>
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-100 mb-1">
        Distance ({unit === "metric" ? "km" : "mi"})
      </label>
      <input
        type="number"
        step="any"
        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={distance}
        onChange={(e) => onDistanceChange(e.target.value)}
      />
      <div className="flex flex-wrap gap-2 mt-2">
        {distances.map((d) => (
          <button
            key={d.label}
            onClick={() => onPresetSelect(d.value)}
            className="text-xs bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-100 px-2 py-1 rounded-md border dark:border-gray-600"
          >
            {d.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DistanceInput;

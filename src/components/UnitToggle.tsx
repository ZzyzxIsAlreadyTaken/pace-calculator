import React from "react";

interface UnitToggleProps {
  unit: string;
  onToggle: () => void;
}

const UnitToggle: React.FC<UnitToggleProps> = ({ unit, onToggle }) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <span className="text-sm font-semibold text-gray-700 dark:text-gray-100">
        Unit: {unit === "metric" ? "Kilometers" : "Miles"}
      </span>
      <button
        onClick={onToggle}
        className="py-1 px-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-100 font-bold rounded-lg transition duration-200"
      >
        Toggle to {unit === "metric" ? "Miles" : "Kilometers"}
      </button>
    </div>
  );
};

export default UnitToggle;

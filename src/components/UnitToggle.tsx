import React from "react";
import { Switch } from "@/components/ui/switch";

interface UnitToggleProps {
  unit: string;
  onToggle: () => void;
}

const UnitToggle: React.FC<UnitToggleProps> = ({ unit, onToggle }) => {
  return (
    <div className="flex items-center bg-gray-50 rounded-full px-4 py-2">
      <span
        className={`text-sm font-medium mr-3 ${unit === "metric" ? "text-gray-900" : "text-gray-500"}`}
      >
        Kilometers
      </span>
      <Switch
        checked={unit === "imperial"}
        onCheckedChange={onToggle}
        className="data-[state=checked]:bg-blue-600"
      />
      <span
        className={`text-sm font-medium ml-3 ${unit === "imperial" ? "text-gray-900" : "text-gray-500"}`}
      >
        Miles
      </span>
    </div>
  );
};

export default UnitToggle;

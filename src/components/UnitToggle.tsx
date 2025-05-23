import React from "react";
import { Switch } from "@/components/ui/switch";

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
      <Switch onClick={onToggle}>
        Toggle to {unit === "metric" ? "Miles" : "Kilometers"}
      </Switch>
    </div>
  );
};

export default UnitToggle;

import UnitToggle from "./UnitToggle";
import runningIcon from "../assets/running.svg";

interface HeaderProps {
  unit: "metric" | "imperial";
  onUnitToggle: () => void;
}

export default function Header({ unit, onUnitToggle }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 py-2.5 sm:px-8 sm:py-4 bg-white border-b border-gray-200">
      <div className="flex items-center space-x-2 sm:space-x-3">
        <img
          src={runningIcon}
          alt="Pace Calculator Icon"
          className="w-7 h-7 sm:w-8 sm:h-8"
        />
        <h1 className="text-lg sm:text-xl font-bold text-gray-900">
          Pace Calculator
        </h1>
      </div>
      <UnitToggle unit={unit} onToggle={onUnitToggle} />
    </header>
  );
}

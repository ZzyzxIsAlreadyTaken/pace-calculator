import UnitToggle from "./UnitToggle";

interface HeaderProps {
  unit: "metric" | "imperial";
  onUnitToggle: () => void;
}

export default function Header({ unit, onUnitToggle }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-8 py-6 bg-white border-b border-gray-200">
      <div className="flex items-center space-x-3">
        <img
          src="/src/assets/running.svg"
          alt="Pace Calculator Icon"
          className="w-10 h-10"
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pace Calculator</h1>
          <p className="text-sm text-gray-500">
            Advanced running performance tools
          </p>
        </div>
      </div>
      <UnitToggle unit={unit} onToggle={onUnitToggle} />
    </header>
  );
}

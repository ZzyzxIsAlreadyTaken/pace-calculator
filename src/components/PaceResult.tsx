import React from "react";

interface PaceResultProps {
  pace: string;
  paceConverted: string;
}

const PaceResult: React.FC<PaceResultProps> = ({ pace, paceConverted }) => {
  return (
    <div className="mt-4 text-center text-lg font-medium text-green-700 dark:text-green-300">
      Your pace: <span className="font-bold">{pace}</span>
      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
        ({paceConverted})
      </div>
    </div>
  );
};

export default PaceResult;

import React from "react";

interface TimeResultProps {
  time: string;
}

const TimeResult: React.FC<TimeResultProps> = ({ time }) => {
  return (
    <div className="mt-4 text-center text-lg font-medium text-green-700 dark:text-green-300">
      Estimated time: <span className="font-bold">{time}</span>
    </div>
  );
};

export default TimeResult;

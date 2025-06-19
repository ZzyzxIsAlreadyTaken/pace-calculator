import React from "react";

interface TimePickerProps {
  hours: string;
  minutes: string;
  seconds: string;
  onHoursChange: (value: string) => void;
  onMinutesChange: (value: string) => void;
  onSecondsChange: (value: string) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({
  hours,
  minutes,
  seconds,
  onHoursChange,
  onMinutesChange,
  onSecondsChange,
}) => {
  const handleNumberChange = (
    value: string,
    max: number,
    onChange: (value: string) => void,
  ) => {
    const num = parseInt(value) || 0;
    if (num >= 0 && num <= max) {
      onChange(num.toString());
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col items-center">
        <input
          type="number"
          min="0"
          max="23"
          value={hours}
          onChange={(e) =>
            handleNumberChange(e.target.value, 23, onHoursChange)
          }
          className="w-24 px-4 py-2 text-center text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        />
        <span className="text-sm text-gray-500 mt-1">hrs</span>
      </div>

      <div className="text-2xl text-gray-300 mx-1">:</div>

      <div className="flex flex-col items-center">
        <input
          type="number"
          min="0"
          max="59"
          value={minutes}
          onChange={(e) =>
            handleNumberChange(e.target.value, 59, onMinutesChange)
          }
          className="w-24 px-4 py-2 text-center text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        />
        <span className="text-sm text-gray-500 mt-1">min</span>
      </div>

      <div className="text-2xl text-gray-300 mx-1">:</div>

      <div className="flex flex-col items-center">
        <input
          type="number"
          min="0"
          max="59"
          value={seconds}
          onChange={(e) =>
            handleNumberChange(e.target.value, 59, onSecondsChange)
          }
          className="w-24 px-4 py-2 text-center text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        />
        <span className="text-sm text-gray-500 mt-1">sec</span>
      </div>
    </div>
  );
};

export default TimePicker;

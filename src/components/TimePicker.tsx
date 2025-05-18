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
  return (
    <div className="flex space-x-2">
      <select
        className="w-1/3 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={hours}
        onChange={(e) => onHoursChange(e.target.value)}
      >
        {Array.from({ length: 24 }, (_, i) => (
          <option key={i} value={i}>
            {i} hrs
          </option>
        ))}
      </select>
      <select
        className="w-1/3 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={minutes}
        onChange={(e) => onMinutesChange(e.target.value)}
      >
        {Array.from({ length: 60 }, (_, i) => (
          <option key={i} value={i}>
            {i} min
          </option>
        ))}
      </select>
      <select
        className="w-1/3 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={seconds}
        onChange={(e) => onSecondsChange(e.target.value)}
      >
        {Array.from({ length: 60 }, (_, i) => (
          <option key={i} value={i}>
            {i} sec
          </option>
        ))}
      </select>
    </div>
  );
};

export default TimePicker;

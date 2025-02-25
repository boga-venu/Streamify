// Enhanced DateRangeSelector.jsx
import React from 'react';
import { Calendar } from 'lucide-react';

const DateRangeSelector = ({ selectedRange, onRangeChange }) => {
  const ranges = [
    { label: 'Last 7 days', value: '7d' },
    { label: 'Last 30 days', value: '30d' },
    { label: 'Last 90 days', value: '90d' },
    { label: 'This year', value: 'year' },
  ];

  return (
    <div className="flex items-center space-x-2 bg-white dark:bg-gray-900 rounded-lg 
                    shadow-sm border border-gray-100/70 dark:border-gray-800/50 
                    backdrop-blur-sm p-1.5 relative
                    hover:shadow-md transition-all duration-200">
      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500/5 to-purple-500/5 dark:from-indigo-500/10 dark:to-purple-500/10 blur-md -z-10"></div>
      
      <div className="p-2 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-md">
        <Calendar className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
      </div>
      <select
        value={selectedRange}
        onChange={(e) => onRangeChange(e.target.value)}
        className="border-0 bg-transparent text-sm text-gray-700 dark:text-gray-300 font-medium 
                focus:outline-none focus:ring-0 cursor-pointer pr-8"
      >
        {ranges.map((range) => (
          <option key={range.value} value={range.value} className="bg-white dark:bg-gray-900">
            {range.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DateRangeSelector;
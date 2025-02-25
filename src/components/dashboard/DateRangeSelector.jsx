// Improved DateRangeSelector.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const DateRangeSelector = ({ selectedRange, onRangeChange }) => {
  const { darkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const ranges = [
    { label: 'Last 7 days', value: '7d' },
    { label: 'Last 30 days', value: '30d' },
    { label: 'Last 90 days', value: '90d' },
    { label: 'This year', value: 'year' },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (value) => {
    onRangeChange(value);
    setIsOpen(false);
  };

  // Find the selected range label
  const selectedLabel = ranges.find(range => range.value === selectedRange)?.label || 'Select range';

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all duration-200 border ${
          darkMode 
            ? 'bg-surface-dark border-surface-dark-border hover:bg-surface-dark-hover' 
            : 'bg-white border-gray-200/80 hover:bg-gray-50'
        } ${isOpen ? 'ring-2 ring-primary-400/20' : ''}`}
      >
        <div className={`p-1.5 rounded-md ${darkMode ? 'bg-primary-500/20' : 'bg-primary-50'}`}>
          <Calendar className={`w-4 h-4 ${darkMode ? 'text-primary-400' : 'text-primary-600'}`} />
        </div>
        <span className={`text-sm font-medium ${darkMode ? 'text-text-dark-primary' : 'text-gray-700'}`}>
          {selectedLabel}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} ${darkMode ? 'text-text-dark-tertiary' : 'text-gray-400'}`} />
      </button>

      {isOpen && (
        <div 
          className={`absolute right-0 mt-2 w-56 rounded-lg shadow-lg overflow-hidden z-10 border ${
            darkMode 
              ? 'bg-surface-dark border-surface-dark-border' 
              : 'bg-white border-gray-100'
          }`}
        >
          <div className={`p-2`}>
            {ranges.map((range) => (
              <button
                key={range.value}
                onClick={() => handleSelect(range.value)}
                className={`w-full text-left px-4 py-2.5 rounded-lg mb-1 last:mb-0 transition-colors ${
                  selectedRange === range.value
                    ? darkMode 
                      ? 'bg-primary-500/20 text-primary-400' 
                      : 'bg-primary-50 text-primary-700'
                    : darkMode 
                      ? 'text-text-dark-primary hover:bg-surface-dark-hover' 
                      : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangeSelector;
// Header.jsx
import React from 'react';
import { Moon, Sun, RefreshCw } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useDashboard } from '../../context/DashboardContext';

const Header = ({ children }) => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { fetchDashboardData, dateRange } = useDashboard();
  
  const handleRefresh = () => {
    fetchDashboardData(dateRange);
  };
  
  return (
    <header className="sticky top-0 z-20 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/80 dark:border-gray-800/50 px-6 py-4 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {children} {/* Mobile menu button */}
          <div className="md:hidden">
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">Streamify</h1>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button 
            onClick={handleRefresh}
            className="p-2.5 rounded-full text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200"
            aria-label="Refresh dashboard data"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
          
          <button 
            onClick={toggleDarkMode}
            className="p-2.5 rounded-full text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white font-medium shadow-md">
              AU
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden md:inline">Admin User</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
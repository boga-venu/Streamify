// Fixed MetricCard.jsx
import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const MetricCard = ({
  title,
  value,
  trend,
  icon: Icon,
  showTrend = true
}) => {
  const { darkMode } = useTheme();
  const isPositive = trend >= 0;
  
  // Determine color based on card type
  const getColorClass = () => {
    switch (title.toLowerCase()) {
      case 'total users':
        return darkMode ? 'from-primary-500/20 to-blue-500/10' : 'from-primary-50 to-blue-50';
      case 'active users':
        return darkMode ? 'from-blue-500/20 to-secondary-500/10' : 'from-blue-50 to-cyan-50';
      case 'total streams':
        return darkMode ? 'from-secondary-500/20 to-teal-500/10' : 'from-cyan-50 to-teal-50';
      case 'revenue':
        return darkMode ? 'from-teal-500/20 to-green-500/10' : 'from-teal-50 to-green-50';
      case 'top artist':
        return darkMode ? 'from-purple-500/20 to-primary-500/10' : 'from-purple-50 to-primary-50';
      default:
        return darkMode ? 'from-primary-500/20 to-secondary-500/10' : 'from-primary-50 to-secondary-50';
    }
  };
  
  // Determine icon background color
  const getIconBgClass = () => {
    switch (title.toLowerCase()) {
      case 'total users':
        return darkMode ? 'bg-primary-500/20' : 'bg-primary-100';
      case 'active users':
        return darkMode ? 'bg-blue-500/20' : 'bg-blue-100';
      case 'total streams':
        return darkMode ? 'bg-secondary-500/20' : 'bg-cyan-100';
      case 'revenue':
        return darkMode ? 'bg-teal-500/20' : 'bg-teal-100';
      case 'top artist':
        return darkMode ? 'bg-purple-500/20' : 'bg-purple-100';
      default:
        return darkMode ? 'bg-primary-500/20' : 'bg-primary-100';
    }
  };
  
  // Determine icon color
  const getIconColorClass = () => {
    switch (title.toLowerCase()) {
      case 'total users':
        return darkMode ? 'text-primary-400' : 'text-primary-600';
      case 'active users':
        return darkMode ? 'text-blue-400' : 'text-blue-600';
      case 'total streams':
        return darkMode ? 'text-secondary-400' : 'text-cyan-600';
      case 'revenue':
        return darkMode ? 'text-teal-400' : 'text-teal-600';
      case 'top artist':
        return darkMode ? 'text-purple-400' : 'text-purple-600';
      default:
        return darkMode ? 'text-primary-400' : 'text-primary-600';
    }
  };
  
  const colorClass = getColorClass();
  const iconBgClass = getIconBgClass();
  const iconColorClass = getIconColorClass();
 
  return (
    <div className={`relative ${darkMode ? 'bg-surface-dark border-surface-dark-border/50' : 'bg-white border-gray-100/80'} backdrop-blur-md rounded-xl border p-5 overflow-hidden group transition-all duration-300 hover:-translate-y-1 ${darkMode ? 'hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)]' : 'hover:shadow-lg'}`}>
      {/* Background glow effect - subtle */}
      <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full opacity-20 bg-gradient-to-br ${colorClass} blur-3xl transform transition-transform duration-500 group-hover:scale-125`}></div>
                     
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-2.5 rounded-xl ${iconBgClass}`}>
            <Icon className={`w-5 h-5 ${iconColorClass}`} />
          </div>
          
          {showTrend && (
            <div className={`flex items-center space-x-1 px-3 py-1.5 rounded-full
              ${isPositive 
                ? darkMode 
                  ? 'bg-green-500/10 text-green-400' 
                  : 'bg-green-50 text-green-600' 
                : darkMode 
                  ? 'bg-rose-500/10 text-rose-400'
                  : 'bg-rose-50 text-rose-600'
              } transition-transform duration-300`}>
              {isPositive ? (
                <ArrowUpRight className="w-3.5 h-3.5" />
              ) : (
                <ArrowDownRight className="w-3.5 h-3.5" />
              )}
              <span className="text-xs font-semibold">{Math.abs(trend)}%</span>
            </div>
          )}
        </div>
        
        <div>
          <p className={`text-sm ${darkMode ? 'text-text-dark-secondary' : 'text-gray-600'} mb-1`}>{title}</p>
          <h3 className={`text-2xl font-bold ${darkMode ? 'text-text-dark-primary' : 'text-gray-900'}`}>{value}</h3>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
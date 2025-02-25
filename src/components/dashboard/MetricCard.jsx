import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const MetricCard = ({
  title,
  value,
  trend,
  icon: Icon,
  showTrend = true
}) => {
  const isPositive = trend >= 0;
 
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 
                    rounded-xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] 
                    border border-gray-100/80 dark:border-gray-800/40 backdrop-blur-sm
                    transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg group">
      {/* Glow effect */}
      <div className={`absolute -right-8 -top-8 w-24 h-24 rounded-full blur-xl opacity-30 dark:opacity-20
                     ${showTrend 
                        ? (isPositive 
                          ? 'bg-green-200 dark:bg-green-400' 
                          : 'bg-red-200 dark:bg-pink-400') 
                        : 'bg-primary-200 dark:bg-violet-400'}`}></div>
                     
      <div className="flex items-center justify-between relative">
        <div className="flex items-center space-x-3">
          <div className={`p-2.5 rounded-xl ${showTrend 
            ? (isPositive 
              ? 'bg-gradient-to-br from-green-50 to-green-100/90 dark:from-green-500/20 dark:to-green-300/10' 
              : 'bg-gradient-to-br from-red-50 to-red-100/90 dark:from-pink-500/20 dark:to-red-300/10') 
            : 'bg-gradient-to-br from-primary-50 to-primary-100/90 dark:from-violet-500/20 dark:to-purple-300/10'}`}>
            <Icon className={`w-5 h-5 ${showTrend 
              ? (isPositive 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-red-600 dark:text-pink-400') 
              : 'text-primary-600 dark:text-violet-400'}`} />
          </div>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{title}</span>
        </div>
        {showTrend && (
          <div className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full backdrop-blur-sm
            ${isPositive 
              ? 'bg-green-50/90 dark:bg-green-500/10 text-green-600 dark:text-green-400 ring-1 ring-green-100 dark:ring-green-500/20' 
              : 'bg-red-50/90 dark:bg-pink-500/10 text-red-600 dark:text-pink-400 ring-1 ring-red-100 dark:ring-pink-500/20'
            } transition-transform duration-300 group-hover:scale-105`}>
            {isPositive ? (
              <ArrowUpRight className="w-3.5 h-3.5" />
            ) : (
              <ArrowDownRight className="w-3.5 h-3.5" />
            )}
            <span className="text-xs font-semibold">{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
      <div className="mt-5 relative">
        <h3 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{value}</h3>
      </div>
    </div>
  );
};

export default MetricCard;
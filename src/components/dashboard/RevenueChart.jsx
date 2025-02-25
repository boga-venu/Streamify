// Enhanced RevenueChart.jsx
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { mockData, formatCurrency } from '../../data/mockData';
import { useDashboard } from '../../context/DashboardContext';

// Updated with more vibrant colors
const COLORS = {
  'Premium Subscriptions': '#6366f1',
  'Ad Revenue': '#10b981'
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    const percentage = ((data.value / mockData.metrics.revenue) * 100).toFixed(1);
    
    return (
      <div className="bg-white/90 dark:bg-gray-900/90 p-4 border border-gray-200/70 dark:border-gray-800/70 rounded-lg shadow-xl backdrop-blur-md">
        <p className="font-semibold text-gray-900 dark:text-white mb-1">{data.name}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Amount: <span className="font-medium text-gray-900 dark:text-white">{formatCurrency(data.value)}</span>
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Share: <span className="font-medium text-gray-900 dark:text-white">{percentage}%</span>
        </p>
      </div>
    );
  }
  return null;
};

const RevenueChart = () => {
  const { getCurrentData, activeRevenueSource, setActiveRevenueSource } = useDashboard();
  const data = getCurrentData();
  const revenueData = data?.revenueDistribution || mockData.revenueDistribution;
  const totalRevenue = data?.metrics?.revenue || mockData.metrics.revenue;

  const renderLegend = () => {
    return (
      <div className="grid grid-cols-1 gap-3 mt-4">
        {revenueData.map((entry) => {
          const percentage = ((entry.value / totalRevenue) * 100).toFixed(1);
          const isActive = activeRevenueSource === entry.name;
          
          return (
            <div
              key={entry.name}
              onClick={() => setActiveRevenueSource(isActive ? null : entry.name)}
              className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-300
                ${isActive 
                  ? 'bg-gradient-to-r from-gray-50 to-gray-50/80 dark:from-gray-800/80 dark:to-gray-800/60 shadow-sm border border-gray-100/70 dark:border-gray-700/50 transform scale-[1.02]' 
                  : 'hover:bg-gray-50 dark:hover:bg-gray-800/70 hover:shadow-sm'}`}
            >
              <div className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-full shadow-sm ring-2 ring-white dark:ring-gray-800"
                  style={{ backgroundColor: COLORS[entry.name] }}
                />
                <span className="text-sm font-medium text-gray-900 dark:text-white">{entry.name}</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{formatCurrency(entry.value)}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{percentage}%</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl 
                    shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)]
                    border border-gray-100 dark:border-gray-800/70 
                    transition-all duration-300 hover:shadow-[0_10px_40px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Revenue Distribution</h2>
        <div className="flex items-baseline space-x-2">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(totalRevenue)}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">total revenue</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-[300px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <defs>
                {/* Glow filters for each segment */}
                <filter id="premiumGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feFlood floodColor={COLORS['Premium Subscriptions']} floodOpacity="0.15" result="color" />
                  <feComposite in="color" in2="blur" operator="in" result="glow" />
                  <feMerge>
                    <feMergeNode in="glow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                
                <filter id="adGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feFlood floodColor={COLORS['Ad Revenue']} floodOpacity="0.15" result="color" />
                  <feComposite in="color" in2="blur" operator="in" result="glow" />
                  <feMerge>
                    <feMergeNode in="glow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              
              <Pie
                data={revenueData}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                onClick={(data) => setActiveRevenueSource(
                  activeRevenueSource === data.name ? null : data.name
                )}
              >
                {revenueData.map((entry) => {
                  const isActive = activeRevenueSource === entry.name;
                  const filterName = entry.name === 'Premium Subscriptions' ? 'premiumGlow' : 'adGlow';
                  
                  return (
                    <Cell 
                      key={entry.name}
                      fill={COLORS[entry.name]}
                      stroke="none"
                      filter={isActive ? `url(#${filterName})` : 'none'}
                      style={{
                        cursor: 'pointer',
                        opacity: activeRevenueSource && activeRevenueSource !== entry.name ? 0.6 : 1,
                        transition: 'all 0.3s ease',
                      }}
                    />
                  );
                })}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div>
          {renderLegend()}
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;
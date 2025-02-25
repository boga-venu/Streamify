// Improved RevenueChart.jsx with Better Colors
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { mockData, formatCurrency } from '../../data/mockData';
import { useDashboard } from '../../context/DashboardContext';
import { useTheme } from '../../context/ThemeContext';

// More appealing color scheme
const COLORS = {
  'Premium Subscriptions': '#8859A8', // Refined plum
  'Ad Revenue': '#48A49A'  // Muted emerald/teal
};

const CustomTooltip = ({ active, payload }) => {
  const { darkMode } = useTheme();
  
  if (active && payload && payload.length) {
    const data = payload[0];
    const percentage = ((data.value / mockData.metrics.revenue) * 100).toFixed(1);
    
    return (
      <div className={`${darkMode 
        ? 'bg-surface-dark/90 border-surface-dark-border' 
        : 'bg-white/90 border-gray-200/70'} 
        p-4 border rounded-lg shadow-lg backdrop-blur-md`}>
        <p className={`font-semibold ${darkMode ? 'text-text-dark-primary' : 'text-gray-900'} mb-1`}>{data.name}</p>
        <p className={`text-sm ${darkMode ? 'text-text-dark-secondary' : 'text-gray-600'}`}>
          Amount: <span className={`font-medium ${darkMode ? 'text-text-dark-primary' : 'text-gray-900'}`}>{formatCurrency(data.value)}</span>
        </p>
        <p className={`text-sm ${darkMode ? 'text-text-dark-secondary' : 'text-gray-600'}`}>
          Share: <span className={`font-medium ${darkMode ? 'text-text-dark-primary' : 'text-gray-900'}`}>{percentage}%</span>
        </p>
      </div>
    );
  }
  return null;
};

const RevenueChart = () => {
  const { getCurrentData, activeRevenueSource, setActiveRevenueSource } = useDashboard();
  const { darkMode } = useTheme();
  
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
                  ? darkMode
                    ? 'bg-surface-dark-hover border border-surface-dark-border shadow-sm transform scale-[1.02]' 
                    : 'bg-gray-50 border border-gray-100 shadow-sm transform scale-[1.02]'
                  : darkMode
                    ? 'hover:bg-surface-dark-hover hover:shadow-sm'
                    : 'hover:bg-gray-50 hover:shadow-sm'
                }`}
            >
              <div className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-full shadow-sm"
                  style={{ 
                    backgroundColor: COLORS[entry.name],
                    boxShadow: darkMode ? '0 0 0 2px #181A22' : '0 0 0 2px #ffffff'
                  }}
                />
                <span className={`text-sm font-medium ${darkMode ? 'text-text-dark-primary' : 'text-gray-900'}`}>{entry.name}</span>
              </div>
              <div className="text-right">
                <p className={`text-sm font-medium ${darkMode ? 'text-text-dark-primary' : 'text-gray-900'}`}>{formatCurrency(entry.value)}</p>
                <p className={`text-xs ${darkMode ? 'text-text-dark-secondary' : 'text-gray-500'}`}>{percentage}%</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={`${darkMode 
      ? 'bg-surface-dark border-surface-dark-border/50' 
      : 'bg-white border-gray-100'} 
      backdrop-blur-md rounded-xl border p-5 transition-all duration-300 
      ${darkMode ? 'hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)]' : 'hover:shadow-lg'}`}>
      <div className="mb-6">
        <h2 className={`text-lg font-semibold ${darkMode ? 'text-text-dark-primary' : 'text-gray-900'}`}>Revenue Distribution</h2>
        <div className="flex items-baseline space-x-2">
          <p className={`text-2xl font-bold ${darkMode ? 'text-text-dark-primary' : 'text-gray-900'}`}>{formatCurrency(totalRevenue)}</p>
          <p className={`text-sm ${darkMode ? 'text-text-dark-secondary' : 'text-gray-500'}`}>total revenue</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-[300px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
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
                  
                  return (
                    <Cell 
                      key={entry.name}
                      fill={COLORS[entry.name]}
                      stroke={darkMode ? "#1F2937" : "#F9FAFB"}
                      strokeWidth={2}
                      style={{
                        cursor: 'pointer',
                        opacity: activeRevenueSource && activeRevenueSource !== entry.name ? 0.6 : 1,
                        transition: 'all 0.3s ease',
                      }}
                    />
                  );
                })}
              </Pie>
              
              {/* Center content */}
              <foreignObject x="25%" y="35%" width="50%" height="30%">
                <div className="h-full w-full flex flex-col items-center justify-center">
                  <p className={`text-sm mb-1 ${darkMode ? 'text-text-dark-secondary' : 'text-gray-500'}`}>Total</p>
                  <p className={`text-xl font-bold ${darkMode ? 'text-text-dark-primary' : 'text-gray-900'}`}>
                    {formatCurrency(totalRevenue)}
                  </p>
                </div>
              </foreignObject>
              
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
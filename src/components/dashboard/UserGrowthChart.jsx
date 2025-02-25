// Fixed UserGrowthChart.jsx
import React, { useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockData, formatNumber } from '../../data/mockData';
import { useDashboard } from '../../context/DashboardContext';
import { useTheme } from '../../context/ThemeContext';

const CustomTooltip = ({ active, payload, label }) => {
  const { darkMode } = useTheme();
  
  if (active && payload && payload.length) {
    return (
      <div className={`${darkMode 
        ? 'bg-surface-dark/90 border-surface-dark-border' 
        : 'bg-white/90 border-gray-200/70'} 
        p-4 border rounded-lg shadow-lg backdrop-blur-md`}>
        <p className={`font-semibold ${darkMode ? 'text-text-dark-primary' : 'text-gray-900'} mb-2`}>{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center space-x-2 mb-1">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <p className="text-sm">
              <span className={darkMode ? 'text-text-dark-secondary' : 'text-gray-600'}>{entry.name}: </span>
              <span className={`font-medium ${darkMode ? 'text-text-dark-primary' : 'text-gray-900'}`}>{formatNumber(entry.value)}</span>
            </p>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const UserGrowthChart = () => {
  const { getCurrentData, focusedTimeRange, setFocusedTimeRange } = useDashboard();
  const { darkMode } = useTheme();
  
  const data = getCurrentData();
  const growthData = data?.userGrowthData || mockData.userGrowthData;
  
  const handleMouseMove = useCallback((data) => {
    if (data && data.activePayload) {
      const payload = data.activePayload[0].payload;
      const date = new Date(payload.month);
      setFocusedTimeRange({
        start: new Date(date.getFullYear(), date.getMonth(), 1),
        end: new Date(date.getFullYear(), date.getMonth() + 1, 0),
        month: payload.month
      });
    }
  }, [setFocusedTimeRange]);

  const handleMouseLeave = useCallback(() => {
    setFocusedTimeRange(null);
  }, [setFocusedTimeRange]);

  // Colors
  const totalUsersColor = '#8859A8';  // refined plum
  const activeUsersColor = '#48A49A';  // muted emerald/teal

  return (
    <div className={`${darkMode 
      ? 'bg-surface-dark border-surface-dark-border/50' 
      : 'bg-white border-gray-100'} 
      backdrop-blur-md rounded-xl border p-5 transition-all duration-300 
      ${darkMode ? 'hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)]' : 'hover:shadow-lg'}`}>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className={`text-lg font-semibold ${darkMode ? 'text-text-dark-primary' : 'text-gray-900'}`}>User Growth</h2>
          <p className={`text-sm ${darkMode ? 'text-text-dark-secondary' : 'text-gray-500'}`}>
            {focusedTimeRange 
              ? `Showing data for ${focusedTimeRange.month}`
              : 'Monthly active vs total users'}
          </p>
        </div>
        <div className={`flex items-center space-x-2 py-1 px-2 rounded-lg border ${darkMode 
          ? 'bg-primary-500/10 border-primary-500/20 text-primary-400' 
          : 'bg-primary-50 border-primary-100 text-primary-600'}`}>
          <span className="text-xs font-medium">+12.5%</span>
        </div>
      </div>
      
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={growthData}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <defs>
              <linearGradient id="totalUsersGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={totalUsersColor} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={totalUsersColor} stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="activeUsersGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={activeUsersColor} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={activeUsersColor} stopOpacity={0}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke={darkMode ? "rgba(55, 65, 81, 0.3)" : "#f0f0f0"} 
              vertical={false} 
            />
            
            <XAxis 
              dataKey="month" 
              stroke={darkMode ? "#71717A" : "#9CA3AF"}
              fontSize={12}
              tickLine={false}
              axisLine={false}
              padding={{ left: 10, right: 10 }}
            />
            
            <YAxis 
              stroke={darkMode ? "#71717A" : "#9CA3AF"}
              fontSize={12}
              tickFormatter={formatNumber}
              tickLine={false}
              axisLine={false}
            />
            
            <Tooltip 
              content={<CustomTooltip />}
              cursor={{ 
                stroke: totalUsersColor, 
                strokeWidth: 1, 
                strokeDasharray: '5 5' 
              }}
            />
            
            <Line
              type="monotone"
              dataKey="totalUsers"
              name="Total Users"
              stroke={totalUsersColor}
              strokeWidth={2.5}
              dot={false}
              activeDot={{ 
                r: 6, 
                stroke: totalUsersColor,
                strokeWidth: 2,
                fill: darkMode ? '#181A22' : '#ffffff',
              }}
              fillOpacity={1}
              fill="url(#totalUsersGradient)"
            />
            
            <Line
              type="monotone"
              dataKey="activeUsers"
              name="Active Users"
              stroke={activeUsersColor}
              strokeWidth={2.5}
              dot={false}
              activeDot={{ 
                r: 6, 
                stroke: activeUsersColor,
                strokeWidth: 2,
                fill: darkMode ? '#181A22' : '#ffffff',
              }}
              fillOpacity={1}
              fill="url(#activeUsersGradient)"
            />
            
            <Legend 
              verticalAlign="top" 
              align="right"
              wrapperStyle={{
                paddingBottom: '10px',
                color: darkMode ? '#A1A1AA' : '#6B7280'
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserGrowthChart;
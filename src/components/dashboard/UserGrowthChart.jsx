// Enhanced UserGrowthChart.jsx
import React, { useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockData, formatNumber } from '../../data/mockData';
import { useDashboard } from '../../context/DashboardContext';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 dark:bg-gray-900/90 p-4 border border-gray-200/70 dark:border-gray-800/70 rounded-lg shadow-xl backdrop-blur-md">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center space-x-2 mb-1">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <p className="text-sm">
              <span className="text-gray-600 dark:text-gray-400">{entry.name}: </span>
              <span className="font-medium text-gray-900 dark:text-white">{formatNumber(entry.value)}</span>
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

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl 
                   shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)]
                   border border-gray-100 dark:border-gray-800/70 
                   transition-all duration-300 hover:shadow-[0_10px_40px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">User Growth</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {focusedTimeRange 
              ? `Showing data for ${focusedTimeRange.month}`
              : 'Monthly active vs total users'}
          </p>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <div className="text-right">
            <p className="text-gray-500 dark:text-gray-400">Growth Rate</p>
            <p className="font-medium text-emerald-600 dark:text-emerald-400">+12.5%</p>
          </div>
          <div className="text-right">
            <p className="text-gray-500 dark:text-gray-400">Retention Rate</p>
            <p className="font-medium text-violet-600 dark:text-violet-400">72%</p>
          </div>
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
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="activeUsersGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
              </linearGradient>
              
              {/* Glow filter effects */}
              <filter id="glow-purple" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feFlood floodColor="#8b5cf6" floodOpacity="0.2" result="color" />
                <feComposite in="color" in2="blur" operator="in" result="glow" />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              
              <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feFlood floodColor="#06b6d4" floodOpacity="0.2" result="color" />
                <feComposite in="color" in2="blur" operator="in" result="glow" />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} className="dark:stroke-gray-800" />
            <XAxis 
              dataKey="month" 
              stroke="#9CA3AF"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              padding={{ left: 10, right: 10 }}
              className="dark:stroke-gray-500"
            />
            <YAxis 
              stroke="#9CA3AF"
              fontSize={12}
              tickFormatter={formatNumber}
              tickLine={false}
              axisLine={false}
              className="dark:stroke-gray-500"
            />
            <Tooltip 
              content={<CustomTooltip />}
              cursor={{ 
                stroke: '#8b5cf6', 
                strokeWidth: 1, 
                strokeDasharray: '5 5' 
              }}
            />
            <Line
              type="monotone"
              dataKey="totalUsers"
              name="Total Users"
              stroke="#8b5cf6"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ 
                r: 6, 
                stroke: '#8b5cf6',
                strokeWidth: 2,
                fill: '#fff',
                filter: 'url(#glow-purple)'
              }}
              style={{ filter: 'url(#glow-purple)' }}
              fillOpacity={1}
              fill="url(#totalUsersGradient)"
            />
            <Line
              type="monotone"
              dataKey="activeUsers"
              name="Active Users"
              stroke="#06b6d4"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ 
                r: 6, 
                stroke: '#06b6d4',
                strokeWidth: 2,
                fill: '#fff',
                filter: 'url(#glow-cyan)'
              }}
              style={{ filter: 'url(#glow-cyan)' }}
              fillOpacity={1}
              fill="url(#activeUsersGradient)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserGrowthChart;
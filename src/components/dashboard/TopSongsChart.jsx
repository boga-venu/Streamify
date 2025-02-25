// Updated TopSongsChart.jsx with Theme Support
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Music, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { mockData, formatNumber } from '../../data/mockData';
import { useDashboard } from '../../context/DashboardContext';
import { useTheme } from '../../context/ThemeContext';

const CustomTooltip = ({ active, payload, label }) => {
  const { darkMode } = useTheme();
  
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className={`${darkMode 
        ? 'bg-surface-dark/90 border-surface-dark-border' 
        : 'bg-white/90 border-gray-200/70'} 
        p-4 border rounded-lg shadow-lg backdrop-blur-md`}>
        <p className={`font-semibold ${darkMode ? 'text-text-dark-primary' : 'text-gray-900'} mb-1`}>{data.name}</p>
        <p className={`text-sm ${darkMode ? 'text-text-dark-secondary' : 'text-gray-600'} mb-1`}>by {data.artist}</p>
        <div className={`flex items-center space-x-1 text-sm`}>
          <Music className={`w-4 h-4 ${darkMode ? 'text-primary-400' : 'text-primary-600'}`} />
          <span className={`font-medium ${darkMode ? 'text-text-dark-primary' : 'text-gray-900'}`}>{formatNumber(data.streams)} streams</span>
        </div>
      </div>
    );
  }
  return null;
};

const TopSongsChart = () => {
  const { getCurrentData, activeSong, setActiveSong, setActiveArtist } = useDashboard();
  const { darkMode } = useTheme();
  
  const data = getCurrentData();
  const songsData = data?.topSongs || mockData.topSongs;

  // Add rank numbers to the data
  const chartData = songsData.map((song, index) => ({
    ...song,
    rank: index + 1
  }));

  const handleSongSelect = (song) => {
    if (activeSong === song.name) {
      // If clicking the active song, clear the selection
      setActiveSong(null);
      setActiveArtist(null);
    } else {
      // Set both song and artist
      setActiveSong(song.name);
      setActiveArtist(song.artist);
    }
  };

  const barColor = darkMode ? '#8B5CF6' : '#8B5CF6';  // Primary purple in both themes
  const activeBarColor = darkMode ? '#A78BFA' : '#A78BFA';  // Lighter purple when active

  return (
    <div className={`${darkMode 
      ? 'bg-surface-dark border-surface-dark-border/50' 
      : 'bg-white border-gray-100'} 
      backdrop-blur-md rounded-xl border p-5 transition-all duration-300 
      ${darkMode ? 'hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)]' : 'hover:shadow-lg'}`}>
      <div className="mb-6">
        <h2 className={`text-lg font-semibold ${darkMode ? 'text-text-dark-primary' : 'text-gray-900'}`}>Top Streamed Songs</h2>
        <p className={`text-sm ${darkMode ? 'text-text-dark-secondary' : 'text-gray-500'}`}>Most popular tracks this month</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              barSize={45}
            >
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke={darkMode ? "rgba(55, 65, 81, 0.3)" : "#f0f0f0"} 
                vertical={false} 
              />
              
              <XAxis
                dataKey="name"
                stroke={darkMode ? "#71717A" : "#9CA3AF"}
                fontSize={12}
                tickLine={false}
                axisLine={false}
                interval={0}
                tick={({ x, y, payload }) => (
                  <g transform={`translate(${x},${y})`}>
                    <text
                      x={0}
                      y={0}
                      dy={16}
                      textAnchor="middle"
                      fill={darkMode ? "#A1A1AA" : "#6B7280"}
                      fontSize={12}
                    >
                      {payload.value.length > 15
                        ? `${payload.value.substring(0, 15)}...`
                        : payload.value}
                    </text>
                  </g>
                )}
              />
              
              <YAxis
                stroke={darkMode ? "#71717A" : "#9CA3AF"}
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={formatNumber}
              />
              
              <Tooltip 
                content={<CustomTooltip />} 
                cursor={{ fill: darkMode ? 'rgba(55, 65, 81, 0.3)' : 'rgba(243, 244, 246, 0.6)' }} 
              />
              
              <Bar
                dataKey="streams"
                onClick={handleSongSelect}
                cursor="pointer"
                radius={[4, 4, 0, 0]}
              >
                {chartData.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={activeSong === entry.name ? activeBarColor : barColor}
                    style={{
                      opacity: activeSong && activeSong !== entry.name ? 0.6 : 1,
                      transition: 'all 0.3s ease'
                    }}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={`lg:border-l ${darkMode ? 'lg:border-surface-dark-border/30' : 'lg:border-gray-100'} lg:pl-6`}>
          <div className="space-y-3">
            {chartData.map((song) => (
              <div
                key={song.name}
                onClick={() => handleSongSelect(song)}
                className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-300
                  ${activeSong === song.name 
                    ? darkMode
                      ? 'bg-primary-500/10 border border-primary-500/20 transform scale-[1.02]' 
                      : 'bg-primary-50 border border-primary-100 transform scale-[1.02]'
                    : darkMode
                      ? 'hover:bg-surface-dark-hover'
                      : 'hover:bg-gray-50'
                  }`}
              >
                <span className={`flex items-center justify-center w-8 h-8 rounded-full 
                                ${activeSong === song.name 
                                  ? darkMode
                                    ? 'bg-primary-500 text-white' 
                                    : 'bg-primary-500 text-white'
                                  : darkMode
                                    ? 'bg-surface-dark-hover text-text-dark-secondary'
                                    : 'bg-gray-100 text-gray-600'
                                } text-sm font-medium shadow-sm`}>
                  {song.rank}
                </span>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${darkMode ? 'text-text-dark-primary' : 'text-gray-900'} truncate`}>{song.name}</p>
                  <p className={`text-xs ${darkMode ? 'text-text-dark-secondary' : 'text-gray-500'} truncate`}>{song.artist}</p>
                </div>
                <span className={`text-xs font-medium ${darkMode ? 'text-text-dark-secondary' : 'text-gray-600'}`}>
                  {formatNumber(song.streams)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopSongsChart;
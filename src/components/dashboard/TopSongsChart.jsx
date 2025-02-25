// Enhanced TopSongsChart.jsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Music } from 'lucide-react';
import { mockData, formatNumber } from '../../data/mockData';
import { useDashboard } from '../../context/DashboardContext';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white/90 dark:bg-gray-900/90 p-4 border border-gray-200/70 dark:border-gray-800/70 rounded-lg shadow-xl backdrop-blur-md">
        <p className="font-semibold text-gray-900 dark:text-white mb-1">{data.name}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">by {data.artist}</p>
        <div className="flex items-center space-x-1 text-sm">
          <Music className="w-4 h-4 text-primary-500 dark:text-primary-400" />
          <span className="font-medium text-gray-900 dark:text-white">{formatNumber(data.streams)} streams</span>
        </div>
      </div>
    );
  }
  return null;
};

const TopSongsChart = () => {
  const { getCurrentData, activeSong, setActiveSong, setActiveArtist } = useDashboard();
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

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl 
                   shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)]
                   border border-gray-100 dark:border-gray-800/70 
                   transition-all duration-300 hover:shadow-[0_10px_40px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Top 5 Streamed Songs</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Most popular tracks this month</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              barSize={45}
            >
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={1}/>
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity={1}/>
                </linearGradient>
                
                <filter id="barGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feFlood floodColor="#8b5cf6" floodOpacity="0.15" result="color" />
                  <feComposite in="color" in2="blur" operator="in" result="glow" />
                  <feMerge>
                    <feMergeNode in="glow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} className="dark:stroke-gray-800" />
              <XAxis
                dataKey="name"
                stroke="#9CA3AF"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                interval={0}
                className="dark:stroke-gray-500"
                tick={({ x, y, payload }) => (
                  <g transform={`translate(${x},${y})`}>
                    <text
                      x={0}
                      y={0}
                      dy={16}
                      textAnchor="middle"
                      fill="#6B7280"
                      className="dark:fill-gray-400"
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
                stroke="#9CA3AF"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={formatNumber}
                className="dark:stroke-gray-500"
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(243, 244, 246, 0.4)', className: 'dark:fill-gray-800/40' }} />
              <Bar
                dataKey="streams"
                onClick={handleSongSelect}
                cursor="pointer"
                radius={[4, 4, 0, 0]}
              >
                {chartData.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={activeSong === entry.name ? 'url(#barGradient)' : '#8B5CF6'}
                    filter={activeSong === entry.name ? 'url(#barGlow)' : 'none'}
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

        <div className="lg:border-l lg:border-gray-100 lg:dark:border-gray-800 lg:pl-6">
          <div className="space-y-3">
            {chartData.map((song) => (
              <div
                key={song.name}
                onClick={() => handleSongSelect(song)}
                className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-300
                  ${activeSong === song.name 
                    ? 'bg-gradient-to-r from-indigo-50/80 to-purple-50/80 dark:from-indigo-900/20 dark:to-purple-900/20 ring-1 ring-indigo-100 dark:ring-indigo-800/30 transform scale-[1.02]' 
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800/70'}`}
              >
                <span className={`flex items-center justify-center w-8 h-8 rounded-full 
                                ${activeSong === song.name 
                                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white' 
                                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'} 
                                text-sm font-medium shadow-sm`}>
                  {song.rank}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{song.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{song.artist}</p>
                </div>
                <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
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
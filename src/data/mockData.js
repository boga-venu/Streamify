export const mockData = {
  // Metrics for different time periods
  metrics: {
    '7d': {
      totalUsers: 2850000,
      activeUsers: 2100000,
      totalStreams: 42000000,
      revenue: 1250000,
      topArtist: "Taylor Swift",
      userGrowth: 1.2,
      revenueGrowth: 2.1,
      streamGrowth: 2.8
    },
    '30d': {
      totalUsers: 2800000,
      activeUsers: 2000000,
      totalStreams: 168000000,
      revenue: 5200000,
      topArtist: "Taylor Swift",
      userGrowth: 5.5,
      revenueGrowth: 6.2,
      streamGrowth: 7.8
    },
    '90d': {
      totalUsers: 2600000,
      activeUsers: 1800000,
      totalStreams: 486000000,
      revenue: 15000000,
      topArtist: "Morgan Wallen",
      userGrowth: 15.0,
      revenueGrowth: 16.5,
      streamGrowth: 18.4
    },
    'year': {
      totalUsers: 2850000,
      activeUsers: 2100000,
      totalStreams: 1920000000,
      revenue: 58000000,
      topArtist: "Taylor Swift",
      userGrowth: 32.0,
      revenueGrowth: 35.2,
      streamGrowth: 38.8
    }
  },

  // Monthly user growth data (last 12 months)
  userGrowthData: [
    { month: 'Feb 2023', totalUsers: 2160000, activeUsers: 1580000 },
    { month: 'Mar 2023', totalUsers: 2250000, activeUsers: 1650000 },
    { month: 'Apr 2023', totalUsers: 2320000, activeUsers: 1720000 },
    { month: 'May 2023', totalUsers: 2380000, activeUsers: 1780000 },
    { month: 'Jun 2023', totalUsers: 2450000, activeUsers: 1820000 },
    { month: 'Jul 2023', totalUsers: 2520000, activeUsers: 1850000 },
    { month: 'Aug 2023', totalUsers: 2580000, activeUsers: 1890000 },
    { month: 'Sep 2023', totalUsers: 2630000, activeUsers: 1920000 },
    { month: 'Oct 2023', totalUsers: 2680000, activeUsers: 1950000 },
    { month: 'Nov 2023', totalUsers: 2720000, activeUsers: 1980000 },
    { month: 'Dec 2023', totalUsers: 2780000, activeUsers: 2020000 },
    { month: 'Jan 2024', totalUsers: 2850000, activeUsers: 2100000 }
  ],

  // Revenue distribution for different periods
  revenueDistribution: {
    '7d': [
      { name: 'Premium Subscriptions', value: 1000000, color: '#8B5CF6' },
      { name: 'Ad Revenue', value: 250000, color: '#10B981' }
    ],
    '30d': [
      { name: 'Premium Subscriptions', value: 4150000, color: '#8B5CF6' },
      { name: 'Ad Revenue', value: 1050000, color: '#10B981' }
    ],
    '90d': [
      { name: 'Premium Subscriptions', value: 12000000, color: '#8B5CF6' },
      { name: 'Ad Revenue', value: 3000000, color: '#10B981' }
    ],
    'year': [
      { name: 'Premium Subscriptions', value: 46000000, color: '#8B5CF6' },
      { name: 'Ad Revenue', value: 12000000, color: '#10B981' }
    ]
  },

  // Top songs for different periods
  topSongs: {
    '7d': [
      { name: 'Cruel Summer', artist: 'Taylor Swift', streams: 3500000 },
      { name: 'vampire', artist: 'Olivia Rodrigo', streams: 3200000 },
      { name: 'Last Night', artist: 'Morgan Wallen', streams: 2800000 },
      { name: 'Kill Bill', artist: 'SZA', streams: 2500000 },
      { name: 'Anti-Hero', artist: 'Taylor Swift', streams: 2200000 }
    ],
    '30d': [
      { name: 'Cruel Summer', artist: 'Taylor Swift', streams: 14000000 },
      { name: 'vampire', artist: 'Olivia Rodrigo', streams: 12800000 },
      { name: 'Last Night', artist: 'Morgan Wallen', streams: 11200000 },
      { name: 'Kill Bill', artist: 'SZA', streams: 10000000 },
      { name: 'Anti-Hero', artist: 'Taylor Swift', streams: 8800000 }
    ],
    '90d': [
      { name: 'Last Night', artist: 'Morgan Wallen', streams: 42000000 },
      { name: 'Cruel Summer', artist: 'Taylor Swift', streams: 38400000 },
      { name: 'vampire', artist: 'Olivia Rodrigo', streams: 33600000 },
      { name: 'Kill Bill', artist: 'SZA', streams: 30000000 },
      { name: 'Anti-Hero', artist: 'Taylor Swift', streams: 26400000 }
    ],
    'year': [
      { name: 'Last Night', artist: 'Morgan Wallen', streams: 168000000 },
      { name: 'Cruel Summer', artist: 'Taylor Swift', streams: 153600000 },
      { name: 'vampire', artist: 'Olivia Rodrigo', streams: 134400000 },
      { name: 'Kill Bill', artist: 'SZA', streams: 120000000 },
      { name: 'Anti-Hero', artist: 'Taylor Swift', streams: 105600000 }
    ]
  },

  // Recent streams data for different periods
  recentStreams: {
    '7d': [
      {
        id: 1,
        song: 'Cruel Summer',
        artist: 'Taylor Swift',
        dailyStreams: 500000,
        uniqueListeners: 420000,
        trend: '+8.5%'
      },
      {
        id: 2,
        song: 'vampire',
        artist: 'Olivia Rodrigo',
        dailyStreams: 457000,
        uniqueListeners: 380000,
        trend: '+7.2%'
      },
      {
        id: 3,
        song: 'Last Night',
        artist: 'Morgan Wallen',
        dailyStreams: 400000,
        uniqueListeners: 340000,
        trend: '+5.8%'
      },
      {
        id: 4,
        song: 'Kill Bill',
        artist: 'SZA',
        dailyStreams: 357000,
        uniqueListeners: 305000,
        trend: '+4.5%'
      },
      {
        id: 5,
        song: 'Anti-Hero',
        artist: 'Taylor Swift',
        dailyStreams: 314000,
        uniqueListeners: 275000,
        trend: '+3.2%'
      },
      {
        id: 6,
        song: 'Rich Flex',
        artist: 'Drake',
        dailyStreams: 298000,
        uniqueListeners: 258000,
        trend: '+2.8%'
      },
      {
        id: 7,
        song: 'Flowers',
        artist: 'Miley Cyrus',
        dailyStreams: 285000,
        uniqueListeners: 245000,
        trend: '+2.1%'
      },
      {
        id: 8,
        song: 'As It Was',
        artist: 'Harry Styles',
        dailyStreams: 275000,
        uniqueListeners: 238000,
        trend: '-1.5%'
      },
      {
        id: 9,
        song: 'About Damn Time',
        artist: 'Lizzo',
        dailyStreams: 268000,
        uniqueListeners: 232000,
        trend: '-2.3%'
      },
      {
        id: 10,
        song: 'Bad Habit',
        artist: 'Steve Lacy',
        dailyStreams: 262000,
        uniqueListeners: 228000,
        trend: '-3.1%'
      }
    ],
    '30d': [
      {
        id: 1,
        song: 'Cruel Summer',
        artist: 'Taylor Swift',
        dailyStreams: 466000,
        uniqueListeners: 390000,
        trend: '+12.5%'
      },
      {
        id: 2,
        song: 'vampire',
        artist: 'Olivia Rodrigo',
        dailyStreams: 427000,
        uniqueListeners: 355000,
        trend: '+11.2%'
      },
      {
        id: 3,
        song: 'Last Night',
        artist: 'Morgan Wallen',
        dailyStreams: 373000,
        uniqueListeners: 315000,
        trend: '+9.8%'
      },
      {
        id: 4,
        song: 'Kill Bill',
        artist: 'SZA',
        dailyStreams: 333000,
        uniqueListeners: 282000,
        trend: '+8.5%'
      },
      {
        id: 5,
        song: 'Anti-Hero',
        artist: 'Taylor Swift',
        dailyStreams: 293000,
        uniqueListeners: 250000,
        trend: '+7.2%'
      },
      {
        id: 6,
        song: 'Rich Flex',
        artist: 'Drake',
        dailyStreams: 278000,
        uniqueListeners: 238000,
        trend: '+5.8%'
      },
      {
        id: 7,
        song: 'Flowers',
        artist: 'Miley Cyrus',
        dailyStreams: 265000,
        uniqueListeners: 228000,
        trend: '+4.5%'
      },
      {
        id: 8,
        song: 'As It Was',
        artist: 'Harry Styles',
        dailyStreams: 255000,
        uniqueListeners: 220000,
        trend: '-2.8%'
      },
      {
        id: 9,
        song: 'About Damn Time',
        artist: 'Lizzo',
        dailyStreams: 248000,
        uniqueListeners: 215000,
        trend: '-3.5%'
      },
      {
        id: 10,
        song: 'Bad Habit',
        artist: 'Steve Lacy',
        dailyStreams: 242000,
        uniqueListeners: 210000,
        trend: '-4.2%'
      }
    ],
    '90d': [
      {
        id: 1,
        song: 'Last Night',
        artist: 'Morgan Wallen',
        dailyStreams: 466000,
        uniqueListeners: 390000,
        trend: '+18.5%'
      },
      {
        id: 2,
        song: 'Cruel Summer',
        artist: 'Taylor Swift',
        dailyStreams: 427000,
        uniqueListeners: 355000,
        trend: '+16.8%'
      },
      {
        id: 3,
        song: 'vampire',
        artist: 'Olivia Rodrigo',
        dailyStreams: 373000,
        uniqueListeners: 315000,
        trend: '+15.2%'
      },
      {
        id: 4,
        song: 'Kill Bill',
        artist: 'SZA',
        dailyStreams: 333000,
        uniqueListeners: 282000,
        trend: '+13.5%'
      },
      {
        id: 5,
        song: 'Anti-Hero',
        artist: 'Taylor Swift',
        dailyStreams: 293000,
        uniqueListeners: 250000,
        trend: '+12.2%'
      },
      {
        id: 6,
        song: 'Rich Flex',
        artist: 'Drake',
        dailyStreams: 278000,
        uniqueListeners: 238000,
        trend: '+10.8%'
      },
      {
        id: 7,
        song: 'Flowers',
        artist: 'Miley Cyrus',
        dailyStreams: 265000,
        uniqueListeners: 228000,
        trend: '-5.5%'
      },
      {
        id: 8,
        song: 'As It Was',
        artist: 'Harry Styles',
        dailyStreams: 255000,
        uniqueListeners: 220000,
        trend: '-6.8%'
      },
      {
        id: 9,
        song: 'About Damn Time',
        artist: 'Lizzo',
        dailyStreams: 248000,
        uniqueListeners: 215000,
        trend: '-7.5%'
      },
      {
        id: 10,
        song: 'Bad Habit',
        artist: 'Steve Lacy',
        dailyStreams: 242000,
        uniqueListeners: 210000,
        trend: '-8.2%'
      }
    ],
    'year': [
      {
        id: 1,
        song: 'Last Night',
        artist: 'Morgan Wallen',
        dailyStreams: 460000,
        uniqueListeners: 385000,
        trend: '+35.5%'
      },
      {
        id: 2,
        song: 'Cruel Summer',
        artist: 'Taylor Swift',
        dailyStreams: 421000,
        uniqueListeners: 350000,
        trend: '+32.8%'
      },
      {
        id: 3,
        song: 'vampire',
        artist: 'Olivia Rodrigo',
        dailyStreams: 368000,
        uniqueListeners: 310000,
        trend: '+30.2%'
      },
      {
        id: 4,
        song: 'Kill Bill',
        artist: 'SZA',
        dailyStreams: 328000,
        uniqueListeners: 278000,
        trend: '+28.5%'
      },
      {
        id: 5,
        song: 'Anti-Hero',
        artist: 'Taylor Swift',
        dailyStreams: 288000,
        uniqueListeners: 245000,
        trend: '+25.2%'
      },
      {
        id: 6,
        song: 'Rich Flex',
        artist: 'Drake',
        dailyStreams: 273000,
        uniqueListeners: 233000,
        trend: '+22.8%'
      },
      {
        id: 7,
        song: 'Flowers',
        artist: 'Miley Cyrus',
        dailyStreams: 260000,
        uniqueListeners: 223000,
        trend: '-12.5%'
      },
      {
        id: 8,
        song: 'As It Was',
        artist: 'Harry Styles',
        dailyStreams: 250000,
        uniqueListeners: 215000,
        trend: '-15.8%'
      },
      {
        id: 9,
        song: 'About Damn Time',
        artist: 'Lizzo',
        dailyStreams: 243000,
        uniqueListeners: 210000,
        trend: '-18.5%'
      },
      {
        id: 10,
        song: 'Bad Habit',
        artist: 'Steve Lacy',
        dailyStreams: 237000,
        uniqueListeners: 205000,
        trend: '-20.2%'
      }
    ]
  }
};

// Utility functions
export const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

export const formatCurrency = (num) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(num);
};
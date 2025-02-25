// Dashboard.jsx with Date Selector
import React, { useEffect } from 'react';
import { Users, Headphones, Music2, DollarSign, Trophy } from 'lucide-react';
import MetricCard from '../components/dashboard/MetricCard';
import UserGrowthChart from '../components/dashboard/UserGrowthChart';
import RevenueChart from '../components/dashboard/RevenueChart';
import TopSongsChart from '../components/dashboard/TopSongsChart';
import StreamsTable from '../components/dashboard/StreamsTable';
import DateRangeSelector from '../components/dashboard/DateRangeSelector';
import { useDashboard } from '../context/DashboardContext';
import { formatNumber, formatCurrency } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';

const Dashboard = () => {
    const { 
        dateRange, 
        setDateRange, 
        isLoading, 
        fetchDashboardData,
        currentData 
    } = useDashboard();
    
    const { darkMode } = useTheme();

    useEffect(() => {
        // Fetch data when component mounts or date range changes
        fetchDashboardData(dateRange);
    }, [dateRange, fetchDashboardData]);

    // Check if data is available
    const isDataAvailable = currentData && Object.keys(currentData).length > 0;

    if (isLoading || !isDataAvailable) {
        return <DashboardSkeleton />;
    }

    const metrics = [
        {
            title: "Total Users",
            value: formatNumber(currentData.totalUsers || 0),
            trend: currentData.userGrowth || 0,
            icon: Users,
        },
        {
            title: "Active Users",
            value: formatNumber(currentData.activeUsers || 0),
            trend: currentData.userGrowth || 0,
            icon: Headphones,
        },
        {
            title: "Total Streams",
            value: formatNumber(currentData.totalStreams || 0),
            trend: currentData.streamGrowth || 0,
            icon: Music2,
        },
        {
            title: "Revenue",
            value: formatCurrency(currentData.revenue || 0),
            trend: currentData.revenueGrowth || 0,
            icon: DollarSign,
        },
        {
            title: "Top Artist",
            value: currentData.topArtist || 'N/A',
            trend: null,
            icon: Trophy,
            showTrend: false
        }
    ];

    return (
        <div className="space-y-8">
            {/* Header with Date Range Selector */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className={`text-2xl md:text-3xl font-bold tracking-tight ${darkMode ? 'text-text-dark-primary' : 'text-gray-900'}`}>Dashboard Overview</h1>
                    <p className={`${darkMode ? 'text-text-dark-secondary' : 'text-gray-500'} mt-1.5`}>Track your music streaming metrics and performance</p>
                </div>
                <DateRangeSelector
                    selectedRange={dateRange}
                    onRangeChange={(range) => {
                        setDateRange(range);
                        fetchDashboardData(range);
                    }}
                />
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {metrics.map((metric, index) => (
                    <MetricCard
                        key={index}
                        title={metric.title}
                        value={metric.value}
                        trend={metric.trend}
                        icon={metric.icon}
                        showTrend={metric.showTrend !== false}
                    />
                ))}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <UserGrowthChart />
                <RevenueChart />
                <div className="lg:col-span-2">
                    <TopSongsChart />
                </div>
            </div>
            
            <div className="mt-8">
                <StreamsTable />
            </div>
        </div>
    );
};

const DashboardSkeleton = () => {
    const { darkMode } = useTheme();
    
    return (
        <div className="space-y-8">
            {/* Header Skeleton */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className={`h-8 w-64 ${darkMode ? 'bg-surface-dark-hover' : 'bg-gray-200'} rounded-lg animate-pulse`}></div>
                    <div className={`h-4 w-96 mt-2 ${darkMode ? 'bg-surface-dark-hover' : 'bg-gray-200'} rounded-lg animate-pulse`}></div>
                </div>
                <div className={`h-10 w-40 ${darkMode ? 'bg-surface-dark-hover' : 'bg-gray-200'} rounded-lg animate-pulse`}></div>
            </div>

            {/* Metrics Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className={`${darkMode ? 'bg-surface-dark border-surface-dark-border/30' : 'bg-white border-gray-100'} rounded-xl p-5 border`}>
                        <div className="flex items-center justify-between mb-4">
                            <div className={`h-10 w-10 rounded-lg ${darkMode ? 'bg-surface-dark-hover' : 'bg-gray-200'} animate-pulse`}></div>
                            <div className={`h-6 w-16 rounded-full ${darkMode ? 'bg-surface-dark-hover' : 'bg-gray-200'} animate-pulse`}></div>
                        </div>
                        <div className={`h-4 w-24 mb-2 ${darkMode ? 'bg-surface-dark-hover' : 'bg-gray-200'} rounded animate-pulse`}></div>
                        <div className={`h-7 w-32 ${darkMode ? 'bg-surface-dark-hover' : 'bg-gray-200'} rounded animate-pulse`}></div>
                    </div>
                ))}
            </div>

            {/* Charts Grid Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className={`${darkMode ? 'bg-surface-dark border-surface-dark-border/30' : 'bg-white border-gray-100'} rounded-xl p-5 border h-[350px]`}>
                    <div className={`h-6 w-48 mb-2 ${darkMode ? 'bg-surface-dark-hover' : 'bg-gray-200'} rounded animate-pulse`}></div>
                    <div className={`h-4 w-32 mb-6 ${darkMode ? 'bg-surface-dark-hover' : 'bg-gray-200'} rounded animate-pulse`}></div>
                    <div className={`h-[260px] ${darkMode ? 'bg-surface-dark-hover' : 'bg-gray-200'} rounded-lg animate-pulse`}></div>
                </div>
                <div className={`${darkMode ? 'bg-surface-dark border-surface-dark-border/30' : 'bg-white border-gray-100'} rounded-xl p-5 border h-[350px]`}>
                    <div className={`h-6 w-48 mb-2 ${darkMode ? 'bg-surface-dark-hover' : 'bg-gray-200'} rounded animate-pulse`}></div>
                    <div className={`h-4 w-32 mb-6 ${darkMode ? 'bg-surface-dark-hover' : 'bg-gray-200'} rounded animate-pulse`}></div>
                    <div className={`h-[260px] ${darkMode ? 'bg-surface-dark-hover' : 'bg-gray-200'} rounded-lg animate-pulse`}></div>
                </div>
                <div className={`lg:col-span-2 ${darkMode ? 'bg-surface-dark border-surface-dark-border/30' : 'bg-white border-gray-100'} rounded-xl p-5 border h-[400px]`}>
                    <div className={`h-6 w-48 mb-2 ${darkMode ? 'bg-surface-dark-hover' : 'bg-gray-200'} rounded animate-pulse`}></div>
                    <div className={`h-4 w-32 mb-6 ${darkMode ? 'bg-surface-dark-hover' : 'bg-gray-200'} rounded animate-pulse`}></div>
                    <div className={`h-[320px] ${darkMode ? 'bg-surface-dark-hover' : 'bg-gray-200'} rounded-lg animate-pulse`}></div>
                </div>
            </div>

            {/* Table Skeleton */}
            <div className={`${darkMode ? 'bg-surface-dark border-surface-dark-border/30' : 'bg-white border-gray-100'} rounded-xl p-5 border mt-8`}>
                <div className={`h-6 w-48 mb-2 ${darkMode ? 'bg-surface-dark-hover' : 'bg-gray-200'} rounded animate-pulse`}></div>
                <div className={`h-4 w-64 mb-6 ${darkMode ? 'bg-surface-dark-hover' : 'bg-gray-200'} rounded animate-pulse`}></div>
                <div className={`h-[400px] ${darkMode ? 'bg-surface-dark-hover' : 'bg-gray-200'} rounded-lg animate-pulse`}></div>
            </div>
        </div>
    );
};

export default Dashboard;
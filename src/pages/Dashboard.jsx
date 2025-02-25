// Enhanced Dashboard.jsx
import React, { useEffect } from 'react';
import { Users, PlayCircle, Music, DollarSign, Trophy } from 'lucide-react';
import MetricCard from '../components/dashboard/MetricCard';
import UserGrowthChart from '../components/dashboard/UserGrowthChart';
import RevenueChart from '../components/dashboard/RevenueChart';
import TopSongsChart from '../components/dashboard/TopSongsChart';
import StreamsTable from '../components/dashboard/StreamsTable';
import DateRangeSelector from '../components/dashboard/DateRangeSelector';
import Skeleton from '../components/ui/Skeleton';
import { useDashboard } from '../context/DashboardContext';
import { formatNumber, formatCurrency } from '../data/mockData';

const Dashboard = () => {
    const { 
        dateRange, 
        setDateRange, 
        isLoading, 
        fetchDashboardData,
        currentData 
    } = useDashboard();

    useEffect(() => {
        fetchDashboardData(dateRange);
    }, [dateRange, fetchDashboardData]);

    if (isLoading) {
        return <DashboardSkeleton />;
    }

    const metrics = [
        {
            title: "Total Users",
            value: formatNumber(currentData.totalUsers),
            trend: currentData.userGrowth,
            icon: Users,
            trendLabel: "vs. last month"
        },
        {
            title: "Active Users",
            value: formatNumber(currentData.activeUsers),
            trend: currentData.userGrowth,
            icon: PlayCircle,
            trendLabel: "vs. last month"
        },
        {
            title: "Total Streams",
            value: formatNumber(currentData.totalStreams),
            trend: currentData.streamGrowth,
            icon: Music,
            trendLabel: "vs. last month"
        },
        {
            title: "Revenue",
            value: formatCurrency(currentData.revenue),
            trend: currentData.revenueGrowth,
            icon: DollarSign,
            trendLabel: "vs. last month"
        },
        {
            title: "Top Artist",
            value: currentData.topArtist,
            trend: null,
            icon: Trophy,
            showTrend: false
        }
    ];

    return (
        <div className="space-y-8">
            {/* Header with subtle gradient backdrop */}
            <div className="relative py-6 px-8 -mx-8 -mt-8 mb-12 bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 border-b border-gray-100 dark:border-gray-800/50">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/10 to-purple-50/5 dark:from-indigo-900/10 dark:to-purple-900/5"></div>
                <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Dashboard Overview</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1.5">Track your music streaming metrics and performance</p>
                    </div>
                    <DateRangeSelector
                        selectedRange={dateRange}
                        onRangeChange={setDateRange}
                    />
                </div>
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
                        trendLabel={metric.trendLabel}
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
    // Enhanced skeleton with gradient pulse effect
    return (
        <div className="space-y-8">
            <div className="py-6 px-8 -mx-8 -mt-8 mb-12 bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
                <div>
                    <Skeleton className="h-9 w-64 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-800 dark:to-gray-700" />
                    <Skeleton className="h-5 w-96 mt-2 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-800 dark:to-gray-700" />
                </div>
                <Skeleton className="h-10 w-40 mt-4 ml-auto bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-800 dark:to-gray-700" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800/50">
                        <div className="flex items-center justify-between">
                            <Skeleton className="h-8 w-8 rounded-lg bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-800 dark:to-gray-700" />
                            <Skeleton className="h-6 w-16 rounded-full bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-800 dark:to-gray-700" />
                        </div>
                        <Skeleton className="h-8 w-32 mt-5 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-800 dark:to-gray-700" />
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Skeleton className="h-[400px] rounded-xl bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-800 dark:to-gray-700" />
                <Skeleton className="h-[400px] rounded-xl bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-800 dark:to-gray-700" />
                <Skeleton className="h-[400px] rounded-xl lg:col-span-2 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-800 dark:to-gray-700" />
            </div>
        </div>
    );
};

export default Dashboard;
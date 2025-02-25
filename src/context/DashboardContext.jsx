import React, { createContext, useContext, useState, useCallback } from 'react';
import { mockData } from '../data/mockData';

const DashboardContext = createContext();

export function DashboardProvider({ children }) {
    const [dateRange, setDateRange] = useState('30d');
    const [isLoading, setIsLoading] = useState(false);
    const [activeRevenueSource, setActiveRevenueSource] = useState(null);
    const [activeArtist, setActiveArtist] = useState(null);
    const [activeSong, setActiveSong] = useState(null);
    const [focusedTimeRange, setFocusedTimeRange] = useState(null);
    const [currentData, setCurrentData] = useState(mockData.metrics['30d']); // Initialize with default data

    const getCurrentData = useCallback(() => {
        return {
            metrics: mockData.metrics[dateRange],
            revenueDistribution: mockData.revenueDistribution[dateRange],
            topSongs: mockData.topSongs[dateRange],
            recentStreams: mockData.recentStreams[dateRange],
            userGrowthData: mockData.userGrowthData
        };
    }, [dateRange]);

    const getFilteredData = useCallback(() => {
        const data = getCurrentData();
        if (!data) return null;
        let filteredStreams = [...data.recentStreams];
        
        if (activeRevenueSource) {
            filteredStreams = filteredStreams.filter(stream =>
                stream.revenueSource === activeRevenueSource
            );
        }
        if (activeArtist) {
            filteredStreams = filteredStreams.filter(stream =>
                stream.artist === activeArtist
            );
        }
        if (activeSong) {
            filteredStreams = filteredStreams.filter(stream =>
                stream.song === activeSong
            );
        }
        if (focusedTimeRange) {
            filteredStreams = filteredStreams.filter(stream => {
                const streamDate = new Date(stream.date);
                return streamDate >= focusedTimeRange.start &&
                       streamDate <= focusedTimeRange.end;
            });
        }
        return {
            ...data,
            recentStreams: filteredStreams
        };
    }, [getCurrentData, activeRevenueSource, activeArtist, activeSong, focusedTimeRange]);

    const fetchDashboardData = useCallback(async (range) => {
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            const data = getCurrentData();
            setCurrentData(data.metrics);
            return data;
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [getCurrentData]);

    const value = {
        dateRange,
        setDateRange,
        isLoading,
        fetchDashboardData,
        activeRevenueSource,
        setActiveRevenueSource,
        activeArtist,
        setActiveArtist,
        activeSong,
        setActiveSong,
        focusedTimeRange,
        setFocusedTimeRange,
        getFilteredData,
        getCurrentData,
        currentData
    };

    return (
        <DashboardContext.Provider value={value}>
            {children}
        </DashboardContext.Provider>
    );
}

export function useDashboard() {
    const context = useContext(DashboardContext);
    if (!context) {
        throw new Error('useDashboard must be used within a DashboardProvider');
    }
    return context;
}
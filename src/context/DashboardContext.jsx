// Fixed DashboardContext.jsx to resolve Fast Refresh error
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { mockData } from '../data/mockData';

// Create the context
const DashboardContext = createContext(undefined);

// Custom hook for using the dashboard context
export function useDashboard() {
    const context = useContext(DashboardContext);
    if (!context) {
        throw new Error('useDashboard must be used within a DashboardProvider');
    }
    return context;
}

// Provider component
export function DashboardProvider({ children }) {
    // Initialize with default data range
    const [dateRange, setDateRange] = useState('30d');
    const [isLoading, setIsLoading] = useState(true);
    const [activeRevenueSource, setActiveRevenueSource] = useState(null);
    const [activeArtist, setActiveArtist] = useState(null);
    const [activeSong, setActiveSong] = useState(null);
    const [focusedTimeRange, setFocusedTimeRange] = useState(null);
    
    // Initialize with default data rather than empty object
    const [currentData, setCurrentData] = useState(mockData.metrics['30d']);

    const getCurrentData = useCallback(() => {
        return {
            metrics: mockData.metrics[dateRange] || mockData.metrics['30d'],
            revenueDistribution: mockData.revenueDistribution[dateRange] || mockData.revenueDistribution['30d'],
            topSongs: mockData.topSongs[dateRange] || mockData.topSongs['30d'],
            recentStreams: mockData.recentStreams[dateRange] || mockData.recentStreams['30d'],
            userGrowthData: mockData.userGrowthData
        };
    }, [dateRange]);

    const getFilteredData = useCallback(() => {
        const data = getCurrentData();
        if (!data) return null;
        let filteredStreams = [...data.recentStreams];
        
        // Remove activeRevenueSource from filtering logic
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
    }, [getCurrentData, activeArtist, activeSong, focusedTimeRange]); // Removed activeRevenueSource dependency

    // Initial data load
    useEffect(() => {
        fetchDashboardData('30d');
    }, []);

    const fetchDashboardData = useCallback(async (range) => {
        setIsLoading(true);
        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Use provided range or current state if not provided
            const rangeToUse = range || dateRange;
            
            // If range has changed, update the state
            if (range && range !== dateRange) {
                setDateRange(range);
            }
            
            // Get data for the selected range with fallback
            const metrics = mockData.metrics[rangeToUse] || mockData.metrics['30d'];
            
            // Update current data
            setCurrentData(metrics);
            
            return {
                metrics,
                revenueDistribution: mockData.revenueDistribution[rangeToUse] || mockData.revenueDistribution['30d'],
                topSongs: mockData.topSongs[rangeToUse] || mockData.topSongs['30d'],
                recentStreams: mockData.recentStreams[rangeToUse] || mockData.recentStreams['30d'],
                userGrowthData: mockData.userGrowthData
            };
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            // Set default data on error
            setCurrentData(mockData.metrics['30d']);
            return null;
        } finally {
            setIsLoading(false);
        }
    }, [dateRange]);

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
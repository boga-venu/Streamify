// src/context/ThemeContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    // Check if user has a preference saved in localStorage
    const [darkMode, setDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('streamify-theme');
        return savedTheme === 'dark';
    });

    // Toggle theme function
    const toggleDarkMode = () => {
        setDarkMode(prev => !prev);
    };

    // Update localStorage and apply class to document whenever theme changes
    useEffect(() => {
        localStorage.setItem('streamify-theme', darkMode ? 'dark' : 'light');
        
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    return (
        <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
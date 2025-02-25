// Updated ThemeContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    // Always start with dark mode for Streamify
    const [darkMode, setDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('streamify-theme');
        return savedTheme === 'light' ? false : true; // Default to dark if no preference
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
            document.body.style.backgroundColor = '#0F1116'; // Dark background
            document.body.style.color = '#FFFFFF';
        } else {
            document.documentElement.classList.remove('dark');
            document.body.style.backgroundColor = '#FFFFFF'; // Light background
            document.body.style.color = '#111827';
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
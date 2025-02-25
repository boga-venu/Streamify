// Fixed Layout.jsx
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Menu, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const Layout = ({ children }) => {
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const { darkMode } = useTheme();
  
  return (
    <div className={`min-h-screen ${darkMode ? 'bg-background-dark text-text-dark-primary' : 'bg-gray-50 text-gray-900'} relative`}>
      {/* Background gradient elements - only in dark mode */}
      {darkMode && (
        <>
          <div className="absolute top-0 right-0 w-1/3 h-1/3 rounded-full opacity-10 bg-primary-600 blur-[120px] -z-10"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 rounded-full opacity-5 bg-secondary-600 blur-[120px] -z-10"></div>
        </>
      )}
      
      {/* Desktop Sidebar - hidden on mobile */}
      <div className="hidden md:block">
        <Sidebar />
      </div>
      
      {/* Mobile Sidebar - only shows when menu is clicked */}
      {showMobileSidebar && (
        <div className={`md:hidden fixed inset-0 z-50 ${darkMode ? 'bg-background-dark/95' : 'bg-white/95'} backdrop-blur-sm transition-all duration-300`}>
          <div className="flex justify-end p-4">
            <button 
              onClick={() => setShowMobileSidebar(false)}
              className={`${darkMode ? 'text-text-dark-secondary hover:text-text-dark-primary' : 'text-gray-500 hover:text-gray-900'} transition-colors p-2`}
              aria-label="Close sidebar"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <Sidebar />
        </div>
      )}
      
      <div className="md:pl-72"> {/* Space for sidebar */}
        <Header>
          {/* Add mobile menu button */}
          <button 
            className={`md:hidden p-2 ${darkMode ? 'text-text-dark-secondary hover:text-text-dark-primary' : 'text-gray-600 hover:text-gray-900'} transition-colors`} 
            onClick={() => setShowMobileSidebar(true)}
            aria-label="Open sidebar"
          >
            <Menu className="w-6 h-6" />
          </button>
        </Header>
        <main className="p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
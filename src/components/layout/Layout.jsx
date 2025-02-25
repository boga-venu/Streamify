// Layout.jsx
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Menu } from 'lucide-react';

const Layout = ({ children }) => {
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 transition-colors duration-300">
      {/* Desktop Sidebar - hidden on mobile */}
      <div className="hidden md:block">
        <Sidebar />
      </div>
      
      {/* Mobile Sidebar - only shows when menu is clicked */}
      {showMobileSidebar && (
        <div className="md:hidden fixed inset-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm transition-all duration-300">
          <div className="flex justify-end p-4">
            <button 
              onClick={() => setShowMobileSidebar(false)}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <span className="text-xl font-bold">×</span>
            </button>
          </div>
          <Sidebar />
        </div>
      )}
      
      <div className="md:pl-72"> {/* Increased space for sidebar */}
        <Header>
          {/* Add mobile menu button */}
          <button 
            className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors" 
            onClick={() => setShowMobileSidebar(true)}
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
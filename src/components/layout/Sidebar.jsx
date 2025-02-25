// Fixed Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  TrendingUp, 
  Music2, 
  Users, 
  Settings,
  DollarSign,
  Lock,
  Headphones
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const Sidebar = () => {
  const { darkMode } = useTheme();
  
  const navItems = [
    { name: 'Dashboard', icon: TrendingUp, path: '/', available: true },
    { name: 'Songs', icon: Music2, path: '/songs', available: false },
    { name: 'Audience', icon: Users, path: '/audience', available: false },
    { name: 'Revenue', icon: DollarSign, path: '/revenue', available: false },
    { name: 'Settings', icon: Settings, path: '/settings', available: false },
  ];

  return (
    <aside className={`fixed left-0 top-0 h-screen w-72 ${darkMode 
      ? 'bg-background-dark border-surface-dark-border/50' 
      : 'bg-white border-gray-200/70'} 
      border-r backdrop-blur-sm z-30 transition-all duration-300`}>
      <div className={`p-6 border-b ${darkMode ? 'border-surface-dark-border/30' : 'border-gray-100/80'}`}>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
            <Music2 className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">Streamify</h1>
        </div>
      </div>
      <nav className="mt-6 px-3">
        {navItems.map((item) => (
          <div key={item.name} className="relative group mb-1.5">
            {item.available ? (
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                    isActive 
                      ? darkMode 
                        ? 'bg-gradient-to-r from-primary-500/20 to-secondary-500/10 text-text-dark-primary' 
                        : 'bg-gradient-to-r from-primary-50 to-primary-100/50 text-primary-700'
                      : darkMode
                        ? 'text-text-dark-secondary hover:text-text-dark-primary hover:bg-surface-dark-hover'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`
                }
              >
                <span className={item.path === '/' ? (darkMode ? 'text-primary-400' : 'text-primary-600') : (darkMode ? 'text-text-dark-tertiary' : 'text-gray-500')}>
                  <item.icon className="w-5 h-5" />
                </span>
                <span className="font-medium">{item.name}</span>
                {item.available && item.path === '/' && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-500"></div>
                )}
              </NavLink>
            ) : (
              <div className={`flex items-center justify-between space-x-3 px-4 py-3 rounded-lg cursor-not-allowed group relative
                ${darkMode ? 'text-text-dark-tertiary' : 'text-gray-400'}`}>
                <div className="flex items-center space-x-3">
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </div>
                <Lock className="w-4 h-4 opacity-60" />
                
                {/* Tooltip that appears on hover */}
                <div className={`absolute right-16 top-1/2 -translate-y-1/2 invisible group-hover:visible opacity-0 group-hover:opacity-100 
                  ${darkMode 
                    ? 'bg-surface-dark text-text-dark-primary' 
                    : 'bg-gray-800 text-white'} 
                  text-xs rounded-lg py-1.5 px-3 whitespace-nowrap z-10 shadow-lg transition-all duration-200 transform translate-x-2 group-hover:translate-x-0`}>
                  Coming soon
                </div>
              </div>
            )}
          </div>
        ))}
      </nav>
      
      <div className="absolute bottom-8 left-0 right-0 px-6">
        <div className={`${darkMode 
          ? 'bg-gradient-to-r from-primary-500/10 to-secondary-500/10 border-surface-dark-border/30' 
          : 'bg-gradient-to-r from-primary-50 to-secondary-50 border-gray-200/50'} 
          rounded-xl p-4 shadow-sm border`}>
          <div className="flex items-center space-x-3">
            <div className={`p-2 ${darkMode ? 'bg-surface-dark' : 'bg-white'} rounded-lg shadow-sm`}>
              <Headphones className={`w-5 h-5 ${darkMode ? 'text-primary-400' : 'text-primary-600'}`} />
            </div>
            <div>
              <p className={`text-xs font-medium ${darkMode ? 'text-primary-300' : 'text-primary-700'}`}>Pro Version Available</p>
              <p className={`text-xs ${darkMode ? 'text-text-dark-secondary' : 'text-gray-600'} mt-0.5`}>Get access to all features</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
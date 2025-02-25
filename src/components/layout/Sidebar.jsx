// Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Music2, 
  Users, 
  Settings,
  Lock
} from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', icon: Home, path: '/', available: true },
    { name: 'Songs', icon: Music2, path: '/songs', available: false },
    { name: 'Users', icon: Users, path: '/users', available: false },
    { name: 'Settings', icon: Settings, path: '/settings', available: false },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-white dark:bg-gray-900 border-r border-gray-200/70 dark:border-gray-800/50 backdrop-blur-sm z-30 transition-all duration-300">
      <div className="p-6 border-b border-gray-100 dark:border-gray-800/50">
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400">Streamify</h1>
      </div>
      <nav className="mt-6 px-3">
        {navItems.map((item) => (
          <div key={item.name} className="relative group mb-1.5">
            {item.available ? (
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 
                  ${isActive 
                    ? 'bg-gradient-to-r from-primary-500/10 to-primary-500/5 dark:from-primary-500/20 dark:to-primary-500/10 text-primary-700 dark:text-primary-300 font-medium' 
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'} 
                  transition-all duration-200`
                }
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
                {item.available && item.path === '/' && (
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary-500"></span>
                )}
              </NavLink>
            ) : (
              <div className="flex items-center justify-between space-x-3 px-4 py-3 rounded-xl text-gray-400 dark:text-gray-500 cursor-not-allowed group relative">
                <div className="flex items-center space-x-3">
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </div>
                <Lock className="w-4 h-4 opacity-60" />
                
                {/* Tooltip that appears on hover */}
                <div className="absolute right-16 top-1/2 -translate-y-1/2 invisible group-hover:visible opacity-0 group-hover:opacity-100 bg-gray-800 dark:bg-gray-700 text-white text-xs rounded-lg py-1.5 px-3 whitespace-nowrap z-10 shadow-lg transition-all duration-200 transform translate-x-2 group-hover:translate-x-0">
                  Coming soon
                </div>
              </div>
            )}
          </div>
        ))}
      </nav>
      
      <div className="absolute bottom-8 left-0 right-0 px-6">
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl p-4 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <Music2 className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <p className="text-xs font-medium text-primary-800 dark:text-primary-300">Pro Version Available</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">Get access to all features</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
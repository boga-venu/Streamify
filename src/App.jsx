// Updated App.jsx with code splitting
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { DashboardProvider } from './context/DashboardContext';
import { ThemeProvider } from './context/ThemeContext';

// Use lazy loading for the dashboard page
const Landing = lazy(() => import('./pages/Landing'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

// Simple loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center w-full h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <DashboardProvider>
        <Router>
            <Suspense fallback={<LoadingFallback />}>
            <Routes>
              {/* Landing page is the default route */}
              <Route path="/" element={<Landing />} />
              
              {/* Dashboard within the Layout component */}
              <Route path="/dashboard" element={
                <Layout>
                  <Dashboard />
                </Layout>
              } />
            </Routes>
            </Suspense>
        </Router>
      </DashboardProvider>
    </ThemeProvider>
  );
}

export default App;
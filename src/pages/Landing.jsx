import React, { useState, useEffect } from 'react';
import { ChevronRight, BarChart2, Users, Music2, DollarSign, Zap, Code, LineChart, ArrowRight, Sun, Moon, Github } from 'lucide-react';

// Mock imports - in a real implementation these would be actual image files
const mockDashboardImage = "/Dashboard.png";
const mockDashboardLight = "/dash-light.png";
const mockMetricsImage = "metrics.png";
const mockChartsImage = "charts.png";
const mockTableImage = "stream.png";

const StreamifyLanding = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Toggle between light and dark modes
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };
  
  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} min-h-screen transition-colors duration-300`}>
      {/* Gradient background elements */}
      <div className="fixed inset-0 pointer-events-none">
        {darkMode && (
          <>
            <div className="absolute top-0 right-0 w-1/3 h-1/3 rounded-full opacity-10 bg-purple-600 blur-[120px] -z-10"></div>
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 rounded-full opacity-5 bg-teal-600 blur-[120px] -z-10"></div>
          </>
        )}
      </div>
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? (darkMode ? 'bg-gray-900/80 backdrop-blur-md shadow-lg' : 'bg-white/80 backdrop-blur-md shadow-md') : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-teal-500 flex items-center justify-center">
              <Music2 className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-teal-500">Streamify</h1>
          </div>
          <div className="flex items-center space-x-6">
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 text-gray-300 hover:text-white' : 'bg-gray-100 text-gray-600 hover:text-gray-900'} transition-colors`}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <a 
              href="https://github.com/boga-venu/Streamify/" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 text-gray-300 hover:text-white' : 'bg-gray-100 text-gray-600 hover:text-gray-900'} transition-colors`}
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="/dashboard" 
              className={`px-5 py-2.5 rounded-lg ${darkMode ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-purple-500 hover:bg-purple-600 text-white'} transition-colors font-medium`}
            >
              View Dashboard
            </a>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="w-full md:w-1/2 mb-12 md:mb-0 pr-0 md:pr-8">
              <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Music Analytics<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-teal-500">
                  Reimagined
                </span>
              </h2>
              <p className={`text-lg md:text-xl mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                A powerful analytics dashboard for music streaming platforms. 
                Make data-driven decisions with real-time insights on user growth, 
                content performance, and revenue metrics.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="/dashboard" 
                  className={`px-6 py-3 rounded-lg ${darkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-500 hover:bg-purple-600'} text-white transition-colors font-medium flex items-center justify-center sm:justify-start`}
                >
                  Explore Dashboard
                  <ChevronRight className="w-5 h-5 ml-2" />
                </a>
                <a 
                  href="#features" 
                  className={`px-6 py-3 rounded-lg ${darkMode ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'} transition-colors font-medium flex items-center justify-center sm:justify-start`}
                >
                  See Features
                </a>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className={`relative rounded-xl overflow-hidden shadow-2xl ${darkMode ? 'border border-gray-700' : 'border border-gray-200'}`}>
                <img 
                  src={mockDashboardImage} 
                  alt="Streamify Dashboard Preview" 
                  className="w-full h-auto"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-teal-500/10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-20 px-6">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-16">
      <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        Powerful Features
      </h2>
      <p className={`text-lg max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        Everything you need to analyze music streaming performance and make data-driven decisions.
      </p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        {
          icon: <BarChart2 className="w-6 h-6" />,
          title: "Key Metrics Dashboard",
          description: "Monitor total users, active users, streams, revenue, and top artists in real-time with intuitive metric cards.",
          image: mockMetricsImage,
          alt: "Metrics Dashboard",
          color: "purple"
        },
        {
          icon: <LineChart className="w-6 h-6" />,
          title: "Interactive Visualizations",
          description: "Explore user growth, revenue distribution, and top content with beautiful, interactive charts.",
          image: mockChartsImage,
          alt: "Interactive Charts",
          color: "teal"
        },
        {
          icon: <Music2 className="w-6 h-6" />,
          title: "Streaming Analytics",
          description: "Track song performance with detailed tables featuring sorting, filtering, and search capabilities.",
          image: mockTableImage,
          alt: "Streaming Analytics Table",
          color: "blue"
        }
      ].map((feature, index) => (
        <div 
          key={index} 
          className={`rounded-xl p-6 flex flex-col ${darkMode ? 'bg-gray-800/50 hover:bg-gray-800/80' : 'bg-white hover:bg-gray-50'} transition-colors duration-300 border ${darkMode ? 'border-gray-700' : 'border-gray-200'} group`}
        >
          {/* Fixed height content area */}
          <div className="min-h-[180px]">
            <div className={`p-3 rounded-lg w-fit mb-4 ${
              feature.color === 'purple'
                ? (darkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600')
                : feature.color === 'teal'
                  ? (darkMode ? 'bg-teal-500/20 text-teal-400' : 'bg-teal-100 text-teal-600')
                  : (darkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600')
            }`}>
              {feature.icon}
            </div>
            <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {feature.title}
            </h3>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {feature.description}
            </p>
          </div>
          
          {/* Image container with consistent bottom position */}
          <div className="mt-6">
            <div className={`rounded-lg overflow-hidden ${darkMode ? 'border border-gray-700' : 'border border-gray-200'} transition-all duration-300 group-hover:shadow-lg`}>
              <img 
                src={feature.image} 
                alt={feature.alt} 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
      
      {/* Technical Excellence */}
      <section className={`py-20 px-6 ${darkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Technical Excellence
            </h2>
            <p className={`text-lg max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Built with modern technologies and optimized for exceptional performance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Performance */}
            <div className={`rounded-xl p-8 ${darkMode ? 'bg-gray-900/80' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex items-center mb-6">
                <div className={`p-3 rounded-lg ${darkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600'} mr-4`}>
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Performance Optimized
                </h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Lazy loading and code splitting for fast initial load",
                  "Component memoization to minimize re-renders",
                  "Optimized React hooks with proper dependency arrays",
                  "Efficient state management with Context API",
                  "Tailwind CSS for faster styling and reduced CSS size"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className={`p-1 rounded-full ${darkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600'} mr-3 mt-1`}>
                      <ChevronRight className="w-3 h-3" />
                    </div>
                    <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Tech Stack */}
            <div className={`rounded-xl p-8 ${darkMode ? 'bg-gray-900/80' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex items-center mb-6">
                <div className={`p-3 rounded-lg ${darkMode ? 'bg-teal-500/20 text-teal-400' : 'bg-teal-100 text-teal-600'} mr-4`}>
                  <Code className="w-6 h-6" />
                </div>
                <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Modern Tech Stack
                </h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "React", desc: "UI Library" },
                  { name: "Context API", desc: "State Management" },
                  { name: "Recharts", desc: "Data Visualization" },
                  { name: "TanStack Table", desc: "Data Tables" },
                  { name: "Tailwind CSS", desc: "Styling" },
                  { name: "Vite", desc: "Build Tool" },
                  { name: "React Router", desc: "Navigation" },
                  { name: "Lucide Icons", desc: "SVG Icons" }
                ].map((tech, index) => (
                  <div key={index} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'} transition-colors`}>
                    <p className={`font-medium mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{tech.name}</p>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{tech.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Highlight */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              User-Focused Features
            </h2>
            <p className={`text-lg max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Designed with both usability and aesthetics in mind.
            </p>
          </div>
          
          <div className="space-y-24">
            {/* Feature 1 */}
            <div className="flex flex-col md:flex-row items-center md:space-x-12">
              <div className="w-full md:w-1/2 mb-8 md:mb-0">
                <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Beautiful Dark & Light Modes
                </h3>
                <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Toggle between dark and light themes with a single click.
                  The entire UI adapts seamlessly while maintaining perfect contrast and readability.
                </p>
                <ul className="space-y-3">
                  {[
                    "Automatic theme preference detection",
                    "Consistent color scheme in both modes",
                    "Carefully designed for reduced eye strain",
                    "Persistent theme preference storage"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className={`p-1 rounded-full ${darkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600'} mr-3 mt-1`}>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                      <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full md:w-1/2 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="relative">
                  <img 
                    src={mockDashboardLight} 
                    alt="Theme Toggle Preview" 
                    className="w-full h-auto"
                  />
                  </div>
              </div>
            </div>
            
            {/* Feature 2 */}
            <div className="flex flex-col md:flex-row-reverse items-center md:space-x-reverse md:space-x-12">
              <div className="w-full md:w-1/2 mb-8 md:mb-0">
                <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Interactive Time Period Selection
                </h3>
                <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Analyze data across different time ranges with our intuitive time period selector.
                  All charts and metrics update instantly to reflect your selection.
                </p>
                <ul className="space-y-3">
                  {[
                    "Quick selection of common time periods (7d, 30d, 90d, Year)",
                    "All visualizations update synchronously",
                    "Time-aware data filtering",
                    "Persistent selection across dashboard views"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className={`p-1 rounded-full ${darkMode ? 'bg-teal-500/20 text-teal-400' : 'bg-teal-100 text-teal-600'} mr-3 mt-1`}>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                      <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full md:w-1/2 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="relative">
                  <img 
                    src={mockDashboardImage} 
                    alt="Time Period Selection" 
                    className="w-full h-auto"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-bl from-teal-500/10 to-purple-500/10"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Development Process */}
      <section className={`py-20 px-6 ${darkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Development Approach
            </h2>
            <p className={`text-lg max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              A look at the process behind building this dashboard.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Planning & Architecture",
                desc: "Started with a clear vision and component architecture to ensure maintainability and performance.",
                color: "purple"
              },
              {
                step: "02",
                title: "Data Visualization Design",
                desc: "Carefully designed charts and metrics to highlight key insights while maintaining visual clarity.",
                color: "teal"
              },
              {
                step: "03",
                title: "Performance Optimization",
                desc: "Implemented best practices for React performance to create a smooth and responsive experience.",
                color: "blue"
              }
            ].map((item, index) => (
              <div key={index} className={`rounded-xl p-8 ${darkMode ? 'bg-gray-900/80' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 ${
                  item.color === 'purple' 
                    ? (darkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600')
                    : item.color === 'teal'
                      ? (darkMode ? 'bg-teal-500/20 text-teal-400' : 'bg-teal-100 text-teal-600')
                      : (darkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600')
                }`}>
                  <span className="text-xl font-bold">{item.step}</span>
                </div>
                <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {item.title}
                </h3>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Dashboard Preview */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              The Complete Dashboard
            </h2>
            <p className={`text-lg max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              See all the features coming together in one powerful interface.
            </p>
          </div>
          
          <div className={`rounded-xl overflow-hidden shadow-2xl border ${darkMode ? 'border-gray-700' : 'border-gray-200'} mb-10`}>
            <div className="relative">
              <img 
                src={mockDashboardImage} 
                alt="Full Dashboard Preview" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-teal-500/10"></div>
            </div>
          </div>
          
          <div className="text-center">
            <p className={`text-lg mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Ready to explore the dashboard yourself?
            </p>
            <a 
              href="/dashboard" 
              className={`px-8 py-4 rounded-lg ${darkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-500 hover:bg-purple-600'} text-white transition-colors font-medium inline-flex items-center`}
            >
              View Full Dashboard
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </div>
        </div>
      </section>
      
      {/* Tech Implementations */}
      <section className={`py-20 px-6 ${darkMode ? 'bg-gradient-to-b from-gray-900 to-gray-800' : 'bg-gradient-to-b from-gray-50 to-white'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Technical Implementation
            </h2>
            <p className={`text-lg max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Key technical aspects that make this dashboard stand out.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {[
              {
                title: "Context API State Management",
                desc: "Efficient state management with React's Context API ensures data flows smoothly between components while minimizing re-renders.",
                icon: <Code className="w-6 h-6" />,
                color: "purple"
              },
              {
                title: "Component Memoization",
                desc: "Strategic use of React.memo, useMemo, and useCallback prevents unnecessary component re-renders for optimal performance.",
                icon: <Zap className="w-6 h-6" />,
                color: "teal"
              },
              {
                title: "Responsive Layout Design",
                desc: "Fully responsive component architecture adapts seamlessly from mobile to desktop screens using Tailwind CSS.",
                icon: <Users className="w-6 h-6" />,
                color: "blue"
              },
              {
                title: "Interactive Data Visualization",
                desc: "Custom-configured Recharts components with interactive tooltips and coordinated cross-filtering capabilities.",
                icon: <BarChart2 className="w-6 h-6" />,
                color: "indigo"
              }
            ].map((item, index) => (
              <div key={index} className={`rounded-xl p-8 ${darkMode ? 'bg-gray-800/80' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'} hover:shadow-lg transition-shadow duration-300`}>
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-lg ${
                    item.color === 'purple' 
                      ? (darkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600')
                      : item.color === 'teal'
                        ? (darkMode ? 'bg-teal-500/20 text-teal-400' : 'bg-teal-100 text-teal-600')
                        : item.color === 'blue'
                          ? (darkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600')
                          : (darkMode ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-100 text-indigo-600')
                  } mr-4`}>
                    {item.icon}
                  </div>
                  <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {item.title}
                  </h3>
                </div>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} ml-16`}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Ready to Explore?
          </h2>
          <p className={`text-lg mb-10 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Dive into the Streamify dashboard and discover the power of music streaming analytics.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="/dashboard" 
              className={`px-8 py-4 rounded-lg ${darkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-500 hover:bg-purple-600'} text-white transition-colors font-medium w-full sm:w-auto text-center`}
            >
              View Dashboard
            </a>
            <a 
              href="https://github.com/boga-venu/Streamify/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`px-8 py-4 rounded-lg ${darkMode ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'} transition-colors font-medium w-full sm:w-auto text-center`}
            >
              View Source Code
            </a>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className={`py-12 px-6 ${darkMode ? 'bg-gray-900 border-t border-gray-800' : 'bg-gray-50 border-t border-gray-100'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-teal-500 flex items-center justify-center">
                <Music2 className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-teal-500">Streamify</h1>
            </div>
            
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              &copy; {new Date().getFullYear()} Streamify Dashboard
            </div>
            
            <div className="flex items-center space-x-4 mt-6 md:mt-0">
              <button 
                onClick={toggleTheme}
                className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 text-gray-300 hover:text-white' : 'bg-gray-100 text-gray-600 hover:text-gray-900'} transition-colors`}
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <a 
                href="https://github.com/boga-venu/Streamify/" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 text-gray-300 hover:text-white' : 'bg-gray-100 text-gray-600 hover:text-gray-900'} transition-colors`}
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StreamifyLanding;
# Streamify Technical Documentation

## Architecture Overview

Streamify is built using a component-based architecture focused on performance, maintainability, and user experience. This document covers the technical implementation details, architecture decisions, and optimization strategies.

## Technology Stack

- **Frontend Framework**: React (w/ hooks and Context API)
- **Build Tool**: Vite
- **Routing**: React Router v7
- **Styling**: Tailwind CSS
- **Charting Library**: Recharts
- **Table Library**: TanStack Table (formerly React Table)
- **Icons**: Lucide React
- **Package Manager**: npm/yarn

## Application Structure

```
src/
├── components/         # UI components 
│   ├── dashboard/      # Dashboard-specific components
│   └── layout/         # Layout components
├── context/            # React Context providers
├── data/               # Mock data and utilities
├── pages/              # Page components
├── App.jsx             # Main application component
├── App.css             # Global styles
├── index.css           # Global Tailwind imports
└── main.jsx            # Application entry point
```

## State Management Architecture

Streamify uses React's Context API for state management, split into two primary contexts:

### ThemeContext

Handles the application's theme state (dark/light mode):

```jsx
// ThemeContext.jsx simplified
export function ThemeProvider({ children }) {
    const [darkMode, setDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('streamify-theme');
        return savedTheme === 'light' ? false : true;
    });

    const toggleDarkMode = () => setDarkMode(prev => !prev);

    useEffect(() => {
        localStorage.setItem('streamify-theme', darkMode ? 'dark' : 'light');
        // Apply theme to document
    }, [darkMode]);

    return (
        <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
}
```

### DashboardContext

Manages dashboard-specific state and data filtering:

```jsx
// DashboardContext.jsx simplified
export function DashboardProvider({ children }) {
    const [dateRange, setDateRange] = useState('30d');
    const [isLoading, setIsLoading] = useState(true);
    const [activeRevenueSource, setActiveRevenueSource] = useState(null);
    const [activeArtist, setActiveArtist] = useState(null);
    const [activeSong, setActiveSong] = useState(null);
    const [focusedTimeRange, setFocusedTimeRange] = useState(null);
    const [currentData, setCurrentData] = useState(mockData.metrics['30d']);

    // Data fetching and filtering methods...

    return (
        <DashboardContext.Provider value={{
            dateRange, setDateRange,
            isLoading, fetchDashboardData,
            activeRevenueSource, setActiveRevenueSource,
            // Other values and methods...
        }}>
            {children}
        </DashboardContext.Provider>
    );
}
```

## Performance Optimization Strategies

### 1. Lazy Loading and Code Splitting

Components are loaded on-demand using React's lazy loading API:

```jsx
// App.jsx
const Dashboard = lazy(() => import('./pages/Dashboard'));

function App() {
  return (
    <ThemeProvider>
      <DashboardProvider>
        <Router>
          <Layout>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
              </Routes>
            </Suspense>
          </Layout>
        </Router>
      </DashboardProvider>
    </ThemeProvider>
  );
}
```

### 2. Component Memoization

Components use React.memo and extracted sub-components to prevent unnecessary re-renders:

```jsx
// Example from UserGrowthChart.jsx
const CustomTooltip = React.memo(({ active, payload, label }) => {
  // Tooltip implementation
});

const UserGrowthChart = () => {
  // Component implementation
};

export default React.memo(UserGrowthChart);
```

### 3. Optimized Hook Usage

Careful use of React hooks with proper dependency arrays:

```jsx
// From StreamsTable.jsx
const filteredData = useMemo(() => {
  const contextData = getFilteredData();
  const streams = contextData?.recentStreams || [];
  return handleFilter(streams);
}, [getFilteredData, handleFilter]);

const handlePreviousPage = useCallback(() => table.previousPage(), [table]);
```

### 4. Virtualization and Pagination

The StreamsTable component implements pagination to limit DOM nodes:

```jsx
const table = useReactTable({
  // Other configuration...
  getPaginationRowModel: getPaginationRowModel(),
  initialState: {
    pagination: {
      pageSize: 10,
    },
  },
});
```

### 5. Conditional Rendering

Components use conditional rendering to prevent unnecessary calculations:

```jsx
// From Dashboard.jsx
if (isLoading || !isDataAvailable) {
  return <DashboardSkeleton darkMode={darkMode} />;
}
```

## Component Documentation

### MetricCard

Displays a single metric with trend indicator and icon:

```jsx
const MetricCard = ({
  title,        // Title of the metric
  value,        // Value to display
  trend,        // Percentage trend (positive/negative)
  icon: Icon,   // Lucide icon component
  showTrend     // Whether to show trend indicator (default: true)
}) => {
  // Implementation...
};
```

### DateRangeSelector

Allows users to select different time ranges for data:

```jsx
const DateRangeSelector = ({ 
  selectedRange,    // Currently selected range
  onRangeChange     // Callback when range changes
}) => {
  // Implementation...
};
```

### Charts (UserGrowthChart, RevenueChart, TopSongsChart)

Display interactive data visualizations:

```jsx
// All charts follow similar patterns with these key components:
// 1. Data retrieval from DashboardContext
// 2. Event handlers for interactivity
// 3. Custom tooltips for data display
// 4. Responsive containers for layout adaptation
```

### StreamsTable

Displays tabular data with sorting, filtering, and pagination:

```jsx
const StreamsTable = () => {
  // Key features:
  // 1. Column definitions with custom cell renderers
  // 2. Filter functions for global and column-specific filtering
  // 3. Pagination controls
  // 4. Sorting functionality
};
```

## Styling Architecture

Streamify uses Tailwind CSS with a customized configuration. Key features:

### 1. Custom Color System

```js
// tailwind.config.js
colors: {
  // Primary brand colors with complete scale
  primary: {
    50: '#F3EFFB',
    // Other shades...
    500: '#8B5CF6', // Main purple
    // Other shades...
  },
  // Other color definitions...
}
```

### 2. Dark Mode Support

```jsx
// Component styling example
<div className={`${darkMode 
  ? 'bg-surface-dark border-surface-dark-border/50' 
  : 'bg-white border-gray-100'} 
  backdrop-blur-md rounded-xl border p-5`}>
```

### 3. Responsive Design

All components use responsive class variants:

```jsx
<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
  // Content adapts between column (mobile) and row (desktop)
</div>
```

## Mock Data Structure

Streamify uses a comprehensive mock data system:

```js
// mockData.js overview
export const mockData = {
  // Different metrics for different time periods
  metrics: {
    '7d': { /* data */ },
    '30d': { /* data */ },
    '90d': { /* data */ },
    'year': { /* data */ }
  },
  
  // Monthly user growth data (12 months)
  userGrowthData: [ /* data */ ],
  
  // Revenue distribution by time period
  revenueDistribution: {
    '7d': [ /* data */ ],
    // Other periods...
  },
  
  // Top songs by time period
  topSongs: { /* data */ },
  
  // Recent streams by time period
  recentStreams: { /* data */ }
};
```

## Deployment Configuration

Vite is configured for optimal production builds:

```js
// vite.config.js
export default defineConfig({
  plugins: [react()],
  // Additional configuration options can be added:
  // - Code splitting strategies
  // - Build optimization settings
  // - Environment variables
});
```

## Browser Compatibility

The application is compatible with:
- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Android Chrome)

## Performance Metrics

Key performance targets:
- First Contentful Paint (FCP): < 1.5s
- Time to Interactive (TTI): < 3.0s
- Largest Contentful Paint (LCP): < 2.5s
- Total Bundle Size: < 350KB (gzipped)

## Security Considerations

1. **XSS Prevention**: React's automatic escaping helps prevent XSS attacks
2. **Data Validation**: Input validation for all user-entered data
3. **Local Storage**: Only non-sensitive data stored in localStorage (theme preference)

## Testing Strategy

### Unit Testing (Recommended)

Component testing with React Testing Library:

```jsx
// Example test structure
test('MetricCard renders correctly with positive trend', () => {
  render(<MetricCard title="Users" value="2.5M" trend={5.2} icon={Users} />);
  
  expect(screen.getByText('Users')).toBeInTheDocument();
  expect(screen.getByText('2.5M')).toBeInTheDocument();
  expect(screen.getByText('5.2%')).toBeInTheDocument();
  // Check for positive trend indicator
});
```

### End-to-End Testing (Future Recommendation)

Cypress or Playwright could be used for critical user flows:
- Dashboard loading and data display
- Filter interactions
- Chart interactions
- Responsive layout testing

## Conclusion

Streamify is a technically sophisticated dashboard application built with modern React practices. Its architecture emphasizes performance, maintainability, and user experience through thoughtful component design, state management, and optimization strategies.

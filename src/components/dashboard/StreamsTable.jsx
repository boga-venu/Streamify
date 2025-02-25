// Fixed StreamsTable.jsx with Theme Support
import React, { useState, useMemo, useCallback } from 'react';
import { 
  useReactTable, 
  getCoreRowModel, 
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
} from '@tanstack/react-table';
import { 
  ChevronUp, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight,
  Search,
  SlidersHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  ListMusic
} from 'lucide-react';
import { formatNumber } from '../../data/mockData';
import { useDashboard } from '../../context/DashboardContext';
import { useTheme } from '../../context/ThemeContext';

const StreamsTable = () => {
  const { 
    getCurrentData,
    activeRevenueSource, 
    activeArtist, 
    activeSong, 
    focusedTimeRange,
    getFilteredData 
  } = useDashboard();
  
  const { darkMode } = useTheme();
  
  // State for sorting and filtering
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnFilters, setColumnFilters] = useState({
    artist: '',
    song: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  // Column definitions
  const columns = useMemo(() => [
    {
      accessorKey: 'song',
      header: 'Song & Artist',
      cell: (info) => (
        <div className="flex flex-col">
          <span className={`font-medium ${darkMode ? 'text-text-dark-primary' : 'text-gray-900'}`}>{info.getValue()}</span>
          <span className={`text-sm ${darkMode ? 'text-text-dark-secondary' : 'text-gray-500'}`}>{info.row.original.artist}</span>
        </div>
      ),
    },
    {
      accessorKey: 'dailyStreams',
      header: 'Daily Streams',
      cell: (info) => (
        <span className={`font-medium ${darkMode ? 'text-text-dark-primary' : 'text-gray-900'}`}>
          {formatNumber(info.getValue())}
        </span>
      ),
    },
    {
      accessorKey: 'uniqueListeners',
      header: 'Unique Listeners',
      cell: (info) => (
        <span className={darkMode ? 'text-text-dark-primary' : 'text-gray-900'}>
          {formatNumber(info.getValue())}
        </span>
      ),
    },
    {
      accessorKey: 'trend',
      header: 'Growth Rate',
      cell: (info) => {
        const value = info.getValue();
        const isPositive = value.startsWith('+');
        return (
          <div className={`flex items-center space-x-1 ${
            isPositive 
              ? darkMode ? 'text-green-400' : 'text-green-600'
              : darkMode ? 'text-rose-400' : 'text-rose-600'
          }`}>
            {isPositive ? (
              <ArrowUpRight className="w-4 h-4" />
            ) : (
              <ArrowDownRight className="w-4 h-4" />
            )}
            <span className="font-medium">{value}</span>
          </div>
        );
      },
    },
  ], [darkMode]);

  // Filter function
  const handleFilter = useCallback((data) => {
    if (!data) return [];
    
    return data.filter(row => {
      const matchesArtist = columnFilters.artist === '' || 
        row.artist.toLowerCase().includes(columnFilters.artist.toLowerCase());
      const matchesSong = columnFilters.song === '' || 
        row.song.toLowerCase().includes(columnFilters.song.toLowerCase());
      const matchesGlobal = !globalFilter || 
        Object.values(row).some(value => 
          String(value).toLowerCase().includes(globalFilter.toLowerCase())
        );
      return matchesArtist && matchesSong && matchesGlobal;
    });
  }, [columnFilters, globalFilter]);

  // Get filtered data
  const filteredData = useMemo(() => {
    const contextData = getFilteredData();
    const streams = contextData?.recentStreams || [];
    return handleFilter(streams);
  }, [getFilteredData, handleFilter, activeRevenueSource, activeArtist, activeSong, focusedTimeRange]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className={`${darkMode 
      ? 'bg-surface-dark border-surface-dark-border/50' 
      : 'bg-white border-gray-100'} 
      backdrop-blur-md rounded-xl border p-5 transition-all duration-300 
      ${darkMode ? 'hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)]' : 'hover:shadow-lg'}`}>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className={`text-lg font-semibold ${darkMode ? 'text-text-dark-primary' : 'text-gray-900'}`}>Recent Streams</h2>
          <p className={`text-sm ${darkMode ? 'text-text-dark-secondary' : 'text-gray-500'}`}>Detailed view of streaming activity</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-text-dark-tertiary' : 'text-gray-400'} w-4 h-4`} />
            <input
              type="text"
              placeholder="Search streams..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className={`pl-10 pr-4 py-2 border rounded-lg 
                        ${darkMode 
                          ? 'bg-surface-dark-hover border-surface-dark-border/50 text-text-dark-primary placeholder-text-dark-tertiary' 
                          : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'} 
                        focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-primary-500/30' : 'focus:ring-primary-500/20'} 
                        transition-all duration-200`}
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2 border rounded-lg 
                      ${showFilters 
                        ? darkMode
                          ? 'bg-primary-500/20 text-primary-400 border-primary-500/30' 
                          : 'bg-primary-50 text-primary-600 border-primary-100'
                        : darkMode
                          ? 'bg-surface-dark-hover border-surface-dark-border/50 text-text-dark-secondary' 
                          : 'bg-white border-gray-200 text-gray-500'}
                      ${darkMode 
                        ? 'hover:bg-primary-500/20 hover:text-primary-400' 
                        : 'hover:bg-primary-50 hover:text-primary-600'} 
                      transition-colors duration-200`}
            aria-label="Toggle filters"
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Column Filters */}
      {showFilters && (
        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 p-4 rounded-lg
                      ${darkMode 
                        ? 'bg-surface-dark-hover/50 border border-surface-dark-border/30' 
                        : 'bg-gray-50 border border-gray-100/80'}`}>
          <div>
            <label className={`block text-sm font-medium ${darkMode ? 'text-text-dark-secondary' : 'text-gray-700'} mb-1`}>
              Filter by Artist
            </label>
            <input
              type="text"
              value={columnFilters.artist}
              onChange={(e) => setColumnFilters(prev => ({ ...prev, artist: e.target.value }))}
              placeholder="Enter artist name..."
              className={`w-full p-2 border rounded-lg 
                        ${darkMode 
                          ? 'bg-surface-dark border-surface-dark-border/50 text-text-dark-primary placeholder-text-dark-tertiary' 
                          : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'} 
                        focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-primary-500/30' : 'focus:ring-primary-500/20'}`}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium ${darkMode ? 'text-text-dark-secondary' : 'text-gray-700'} mb-1`}>
              Filter by Song
            </label>
            <input
              type="text"
              value={columnFilters.song}
              onChange={(e) => setColumnFilters(prev => ({ ...prev, song: e.target.value }))}
              placeholder="Enter song name..."
              className={`w-full p-2 border rounded-lg 
                        ${darkMode 
                          ? 'bg-surface-dark border-surface-dark-border/50 text-text-dark-primary placeholder-text-dark-tertiary' 
                          : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'} 
                        focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-primary-500/30' : 'focus:ring-primary-500/20'}`}
            />
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        {filteredData.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className={`border-b ${darkMode ? 'border-surface-dark-border/30' : 'border-gray-100'}`}>
                {table.getFlatHeaders().map((header) => (
                  <th
                    key={header.id}
                    className={`px-4 py-3 text-left text-xs font-medium ${darkMode ? 'text-text-dark-tertiary' : 'text-gray-500'} uppercase tracking-wider cursor-pointer`}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center space-x-1">
                      <span>{flexRender(header.column.columnDef.header, header.getContext())}</span>
                      {header.column.getIsSorted() ? (
                        header.column.getIsSorted() === 'asc' ? (
                          <ChevronUp className={`w-4 h-4 ${darkMode ? 'text-primary-400' : 'text-primary-600'}`} />
                        ) : (
                          <ChevronDown className={`w-4 h-4 ${darkMode ? 'text-primary-400' : 'text-primary-600'}`} />
                        )
                      ) : (
                        <div className="w-4 h-4 opacity-20 flex flex-col">
                          <ChevronUp className="w-4 h-4 -mb-1" />
                          <ChevronDown className="w-4 h-4 -mt-1" />
                        </div>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className={`divide-y ${darkMode ? 'divide-surface-dark-border/30' : 'divide-gray-100'}`}>
              {table.getRowModel().rows.map((row) => (
                <tr 
                  key={row.id}
                  className={`transition-colors duration-150 ${darkMode ? 'hover:bg-primary-500/5' : 'hover:bg-primary-50/40'}`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-4 whitespace-nowrap">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className={`flex flex-col items-center justify-center py-12`}>
            <div className={`p-3 rounded-full ${darkMode ? 'bg-surface-dark-hover' : 'bg-gray-100'} mb-4`}>
              <ListMusic className={`w-6 h-6 ${darkMode ? 'text-text-dark-tertiary' : 'text-gray-400'}`} />
            </div>
            <p className={`font-medium ${darkMode ? 'text-text-dark-secondary' : 'text-gray-600'}`}>No streams found</p>
            <p className={`text-sm mt-1 ${darkMode ? 'text-text-dark-tertiary' : 'text-gray-500'}`}>Try adjusting your filters</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredData.length > 0 && (
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-2">
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
              className={`border rounded-lg px-3 py-2 text-sm
                        ${darkMode 
                          ? 'bg-surface-dark-hover border-surface-dark-border/50 text-text-dark-primary' 
                          : 'bg-white border-gray-200 text-gray-900'} 
                        focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-primary-500/30' : 'focus:ring-primary-500/20'}`}
            >
              {[10, 20, 30, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize} className={darkMode ? 'bg-background-card' : 'bg-white'}>
                  Show {pageSize}
                </option>
              ))}
            </select>
            <span className={`text-sm ${darkMode ? 'text-text-dark-secondary' : 'text-gray-500'}`}>
              entries per page
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className={`p-2 border rounded-lg transition-colors
                       ${!table.getCanPreviousPage() ? 'opacity-30 cursor-not-allowed' : ''}
                       ${darkMode 
                         ? 'border-surface-dark-border/50 text-text-dark-secondary hover:bg-primary-500/10 hover:border-primary-500/30 hover:text-primary-400' 
                         : 'border-gray-200 text-gray-600 hover:bg-primary-50 hover:border-primary-100 hover:text-primary-600'}`}
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className={`text-sm ${darkMode ? 'text-text-dark-secondary' : 'text-gray-600'}`}>
              Page {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount()}
            </span>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className={`p-2 border rounded-lg transition-colors
                       ${!table.getCanNextPage() ? 'opacity-30 cursor-not-allowed' : ''}
                       ${darkMode 
                         ? 'border-surface-dark-border/50 text-text-dark-secondary hover:bg-primary-500/10 hover:border-primary-500/30 hover:text-primary-400' 
                         : 'border-gray-200 text-gray-600 hover:bg-primary-50 hover:border-primary-100 hover:text-primary-600'}`}
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StreamsTable;
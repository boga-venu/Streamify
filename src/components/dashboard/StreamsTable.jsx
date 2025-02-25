// Enhanced StreamsTable.jsx
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
  ArrowDownRight  
} from 'lucide-react';
import { formatNumber } from '../../data/mockData';
import { useDashboard } from '../../context/DashboardContext';

const StreamsTable = () => {
  const { 
    getCurrentData,
    activeRevenueSource, 
    activeArtist, 
    activeSong, 
    focusedTimeRange,
    getFilteredData 
  } = useDashboard();
  
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
          <span className="font-medium text-gray-900 dark:text-white">{info.getValue()}</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">{info.row.original.artist}</span>
        </div>
      ),
    },
    {
      accessorKey: 'dailyStreams',
      header: 'Daily Streams',
      cell: (info) => (
        <span className="font-medium text-gray-900 dark:text-white">
          {formatNumber(info.getValue())}
        </span>
      ),
    },
    {
      accessorKey: 'uniqueListeners',
      header: 'Unique Listeners',
      cell: (info) => (
        <span className="text-gray-900 dark:text-white">
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
            isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
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
  ], []);

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
    <div className="bg-white dark:bg-gray-900 rounded-xl 
                     shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)]
                     border border-gray-100 dark:border-gray-800/70 
                     transition-all duration-300 hover:shadow-[0_10px_40px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
      <div className="p-6">
        {/* Header and Search */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Streams</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Detailed view of streaming activity</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search streams..."
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg 
                           bg-white dark:bg-gray-800 text-gray-900 dark:text-white 
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600
                           transition-all duration-200"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg 
                         bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 
                         text-gray-500 dark:text-gray-400 transition-colors duration-200"
              aria-label="Toggle filters"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Column Filters */}
        {showFilters && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 p-4 
                         bg-gradient-to-r from-gray-50 to-gray-50/60 dark:from-gray-800/60 dark:to-gray-800/40 
                         rounded-lg border border-gray-100/60 dark:border-gray-700/40">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Filter by Artist
              </label>
              <input
                type="text"
                value={columnFilters.artist}
                onChange={(e) => setColumnFilters(prev => ({ ...prev, artist: e.target.value }))}
                placeholder="Enter artist name..."
                className="w-full p-2 border border-gray-200 dark:border-gray-600 rounded-lg 
                           bg-white dark:bg-gray-800 text-gray-900 dark:text-white 
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Filter by Song
              </label>
              <input
                type="text"
                value={columnFilters.song}
                onChange={(e) => setColumnFilters(prev => ({ ...prev, song: e.target.value }))}
                placeholder="Enter song name..."
                className="w-full p-2 border border-gray-200 dark:border-gray-600 rounded-lg 
                           bg-white dark:bg-gray-800 text-gray-900 dark:text-white 
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600"
              />
            </div>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-700">
                {table.getFlatHeaders().map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center space-x-1">
                      <span>{flexRender(header.column.columnDef.header, header.getContext())}</span>
                      {header.column.getIsSorted() && (
                        header.column.getIsSorted() === 'asc' ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {table.getRowModel().rows.map((row) => (
                <tr 
                  key={row.id}
                  className="hover:bg-indigo-50/30 dark:hover:bg-indigo-900/10 transition-colors duration-150"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-2">
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
              className="border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm 
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-white 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600"
            >
              {[10, 20, 30, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              entries per page
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg 
                       disabled:opacity-50 disabled:cursor-not-allowed 
                       hover:bg-gray-50 dark:hover:bg-gray-700 
                       text-gray-600 dark:text-gray-300 transition-colors duration-200"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Page {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount()}
            </span>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg 
                       disabled:opacity-50 disabled:cursor-not-allowed 
                       hover:bg-gray-50 dark:hover:bg-gray-700 
                       text-gray-600 dark:text-gray-300 transition-colors duration-200"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreamsTable;
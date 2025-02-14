"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
} from "@tanstack/react-table"
import { useState, useMemo } from "react"
import { FaSearch } from "react-icons/fa"

interface DataTableProps<TData> {
  columns: ColumnDef<TData, any>[]
  data: TData[]
  searchKey?: string
  searchPlaceholder?: string
}

export function DataTable<TData>({
  columns,
  data,
  searchKey,
  searchPlaceholder,
}: DataTableProps<TData>) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isDarkMode] = useState(false)

  const filteredData = useMemo(() => {
    if (!searchKey || !searchQuery) return data
    return data.filter((item: any) => {
      const value = item[searchKey]?.toString().toLowerCase()
      return value?.includes(searchQuery.toLowerCase())
    })
  }, [data, searchKey, searchQuery])

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
    <div>
      {searchKey && (
        <div className={`p-4 border-b ${isDarkMode ? 'border-white/[0.05]' : 'border-slate-300'}`}>
          <div className="relative">
            <FaSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-slate-400'}`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={searchPlaceholder || "Search..."}
              className={`w-full pl-10 pr-4 py-2 rounded-lg transition-colors duration-300
                ${isDarkMode 
                  ? 'border-white/10 bg-white/[0.09] text-white focus:border-crystal-blue' 
                  : 'border-slate-300 bg-white/[0.04] text-slate-900 focus:border-crystal-blue'} 
                border focus:outline-none focus:ring-2 focus:ring-crystal-blue`}
            />
          </div>
        </div>
      )}

      <div className={`${isDarkMode ? 'border-y border-white/[0.05]' : 'border-y border-slate-300'} overflow-hidden backdrop-blur-sm`}>
        <table className="w-full">
          <thead>
            <tr className={`border-b ${isDarkMode ? 'border-white/10' : 'border-slate-300'}`}>
              {table.getHeaderGroups().map((headerGroup) => (
                headerGroup.headers.map((header) => (
                  <th 
                    key={header.id}
                    className={`whitespace-nowrap px-6 py-3 text-left text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))
              ))}
            </tr>
          </thead>
          <tbody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className={`border-b ${isDarkMode ? 'border-white/10 hover:bg-white/[0.02]' : 'border-slate-300 hover:bg-slate-50/50'}`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="whitespace-nowrap px-6 py-4">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td 
                  colSpan={columns.length} 
                  className={`h-24 text-center ${isDarkMode ? 'text-white/70' : 'text-slate-500'}`}
                >
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
} 
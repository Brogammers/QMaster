'use client'

import { useState } from 'react';
import { DataTable } from '@/components/ui/data-table';
import { columns, type StoreData } from './columns';
import { FaPlus } from 'react-icons/fa';

const initialData: StoreData[] = [
  {
    id: '1',
    name: 'ELFADY Motors',
    category: 'Auto & Motorcycles',
    storeStatus: 'APPROVED',
    requestDate: '2024-01-10',
    productsCount: 45,
    monthlyRevenue: '$12,500',
  },
  {
    id: '2',
    name: 'Cairo Bikes',
    category: 'Auto & Motorcycles',
    storeStatus: 'PENDING',
    requestDate: '2024-01-13',
    productsCount: 0,
    monthlyRevenue: '$0',
  },
  {
    id: '3',
    name: 'Alexandria Parts',
    category: 'Auto Parts',
    storeStatus: 'NOT_REQUESTED',
    requestDate: '-',
    productsCount: 0,
    monthlyRevenue: '$0',
  },
];

export default function StorePage() {
  const [isDarkMode] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          Store Management
        </h1>
        <button 
          className="flex items-center gap-2 px-4 py-2 bg-crystal-blue text-black rounded-lg hover:bg-opacity-90"
        >
          <FaPlus /> Add Store
        </button>
      </div>

      <div className={`${isDarkMode ? 'border-y border-white/[0.05]' : 'border-y border-slate-300'} overflow-hidden backdrop-blur-sm`}>
        <DataTable
          columns={columns}
          data={initialData}
          searchKey="name"
          searchPlaceholder="Search stores..."
        />
      </div>
    </div>
  );
} 
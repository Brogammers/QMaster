'use client'

import { useState } from 'react';
import { DataTable } from '@/components/ui/data-table';
import { columns, type StoreData } from './columns';
import { FaPlus } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { FileText, CheckCircle, XCircle } from 'lucide-react';

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

// Mock pending requests data
const pendingRequests = [
  {
    id: '1',
    partnerName: 'Cairo Bikes',
    category: 'Auto & Motorcycles',
    submissionDate: '2024-01-13',
    documents: [
      { name: 'Commercial Registration', status: 'pending' },
      { name: 'Tax Card', status: 'pending' },
      { name: 'VAT Registration', status: 'pending' },
      { name: 'National ID', status: 'pending' },
      { name: 'Bank Account', status: 'pending' },
    ],
  },
  {
    id: '2',
    partnerName: 'Delta Electronics',
    category: 'Electronics',
    submissionDate: '2024-01-14',
    documents: [
      { name: 'Commercial Registration', status: 'pending' },
      { name: 'Tax Card', status: 'pending' },
      { name: 'VAT Registration', status: 'pending' },
      { name: 'National ID', status: 'pending' },
      { name: 'Bank Account', status: 'pending' },
    ],
  },
];

export default function StorePage() {
  const [isDarkMode] = useState(false);

  return (
    <div className="space-y-8">
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

      {/* Pending Requests Section */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Pending Store Requests</h2>
          <p className="text-sm text-gray-500 mt-1">Review submitted documents and approve or reject store requests</p>
        </div>
        
        <div className="divide-y">
          {pendingRequests.map((request) => (
            <div key={request.id} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium">{request.partnerName}</h3>
                  <div className="text-sm text-gray-500 space-y-1">
                    <p>Category: {request.category}</p>
                    <p>Submitted: {request.submissionDate}</p>
                  </div>
                </div>
                <Button
                  className="bg-baby-blue hover:bg-ocean-blue text-white"
                  onClick={() => {
                    // Handle document review
                    console.log('Reviewing documents for:', request.partnerName);
                  }}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Review Documents
                </Button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {request.documents.map((doc) => (
                  <div
                    key={doc.name}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <FileText className="w-4 h-4 text-gray-400" />
                      {doc.status === 'approved' ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : doc.status === 'rejected' ? (
                        <XCircle className="w-4 h-4 text-red-500" />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-yellow-400" />
                      )}
                    </div>
                    <p className="text-sm font-medium">{doc.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{doc.status}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 
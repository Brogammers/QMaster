'use client'

import { useState } from 'react';
import { DataTable } from '@/components/ui/data-table';
import { columns, type StoreData } from './columns';
import { FaPlus } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { FileText, CheckCircle, XCircle, ChevronLeft, ChevronRight, ListFilter } from 'lucide-react';

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
  const [currentRequestIndex, setCurrentRequestIndex] = useState(0);
  const [showAllRequests, setShowAllRequests] = useState(false);

  const currentRequest = pendingRequests[currentRequestIndex];

  const handleNext = () => {
    setCurrentRequestIndex((prev) => 
      prev < pendingRequests.length - 1 ? prev + 1 : prev
    );
  };

  const handlePrevious = () => {
    setCurrentRequestIndex((prev) => prev > 0 ? prev - 1 : prev);
  };

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
      <div className={`${isDarkMode ? 'bg-slate-900' : 'bg-white'} rounded-lg border border-slate-200`}>
        <div className="p-6 border-b border-slate-200">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">Pending Store Requests</h2>
              <p className="text-sm text-slate-500 mt-1">Review submitted documents and approve or reject store requests</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <span>{currentRequestIndex + 1}</span>
                <span>/</span>
                <span>{pendingRequests.length}</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrevious}
                  disabled={currentRequestIndex === 0}
                  className="border-slate-200"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNext}
                  disabled={currentRequestIndex === pendingRequests.length - 1}
                  className="border-slate-200"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAllRequests(true)}
                  className="border-slate-200"
                >
                  <ListFilter className="w-4 h-4 mr-2" />
                  View All Requests
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-lg font-medium">{currentRequest.partnerName}</h3>
              <div className="text-sm text-slate-500 space-y-1">
                <p>Category: {currentRequest.category}</p>
                <p>Submitted: {currentRequest.submissionDate}</p>
              </div>
            </div>
            <Button
              className="bg-crystal-blue hover:bg-opacity-90 text-black"
              onClick={() => {
                // Handle document review
                console.log('Reviewing documents for:', currentRequest.partnerName);
              }}
            >
              <FileText className="w-4 h-4 mr-2" />
              Review Documents
            </Button>
          </div>
          
          <div className="grid grid-cols-5 gap-4">
            {currentRequest.documents.map((doc) => (
              <div
                key={doc.name}
                className={`p-4 rounded-lg border ${
                  isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <FileText className="w-4 h-4 text-slate-400" />
                  {doc.status === 'approved' ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : doc.status === 'rejected' ? (
                    <XCircle className="w-4 h-4 text-red-500" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-yellow-400" />
                  )}
                </div>
                <p className="text-sm font-medium">{doc.name}</p>
                <p className="text-xs text-slate-500 capitalize">{doc.status}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 
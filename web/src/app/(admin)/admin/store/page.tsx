'use client'

import { useState } from 'react';
import { DataTable } from '@/components/ui/data-table';
import { columns, type StoreData, type StoreStatus } from './columns';
import { FaPlus } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FileText, CheckCircle, XCircle, ChevronLeft, ChevronRight, ListFilter, Download, Eye } from 'lucide-react';
import toast from 'react-hot-toast';

const mockInitialData: StoreData[] = [
  {
    id: '1',
    name: 'ELFADY Motors',
    category: 'Auto & Motorcycles',
    storeStatus: 'APPROVED' as const,
    requestDate: '2024-01-10',
    productsCount: 45,
    monthlyRevenue: '$12,500',
  },
  {
    id: '2',
    name: 'Cairo Bikes',
    category: 'Auto & Motorcycles',
    storeStatus: 'PENDING' as const,
    requestDate: '2024-01-13',
    productsCount: 0,
    monthlyRevenue: '$0',
  },
  {
    id: '3',
    name: 'Alexandria Parts',
    category: 'Auto Parts',
    storeStatus: 'NOT_REQUESTED' as const,
    requestDate: '-',
    productsCount: 0,
    monthlyRevenue: '$0',
  },
];

// Mock pending requests data with document URLs
const pendingRequests: PendingRequest[] = [
  {
    id: '1',
    partnerName: 'Cairo Bikes',
    category: 'Auto & Motorcycles',
    submissionDate: '2024-01-13',
    documents: [
      { name: 'Commercial Registration', status: 'pending' as const, url: '/mock-docs/cr.pdf' },
      { name: 'Tax Card', status: 'pending' as const, url: '/mock-docs/tax.pdf' },
      { name: 'VAT Registration', status: 'pending' as const, url: '/mock-docs/vat.pdf' },
      { name: 'National ID', status: 'pending' as const, url: '/mock-docs/id.pdf' },
      { name: 'Bank Account', status: 'pending' as const, url: '/mock-docs/bank.pdf' },
    ],
  },
  {
    id: '2',
    partnerName: 'Delta Electronics',
    category: 'Electronics',
    submissionDate: '2024-01-14',
    documents: [
      { name: 'Commercial Registration', status: 'pending' as const, url: '/mock-docs/cr2.pdf' },
      { name: 'Tax Card', status: 'pending' as const, url: '/mock-docs/tax2.pdf' },
      { name: 'VAT Registration', status: 'pending' as const, url: '/mock-docs/vat2.pdf' },
      { name: 'National ID', status: 'pending' as const, url: '/mock-docs/id2.pdf' },
      { name: 'Bank Account', status: 'pending' as const, url: '/mock-docs/bank2.pdf' },
    ],
  },
];

interface Document {
  name: string;
  status: 'pending' | 'approved' | 'rejected';
  url: string;
}

interface PendingRequest {
  id: string;
  partnerName: string;
  category: string;
  submissionDate: string;
  documents: Document[];
}

export default function StorePage() {
  const [isDarkMode] = useState(false);
  const [currentRequestIndex, setCurrentRequestIndex] = useState(0);
  const [showAllRequests, setShowAllRequests] = useState(false);
  const [showDocumentPreview, setShowDocumentPreview] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [storeData, setStoreData] = useState<StoreData[]>(mockInitialData);
  const [pendingRequestsState, setPendingRequests] = useState<PendingRequest[]>(pendingRequests);

  const currentRequest = pendingRequestsState[currentRequestIndex];

  const handleNext = () => {
    setCurrentRequestIndex((prev) => 
      prev < pendingRequests.length - 1 ? prev + 1 : prev
    );
  };

  const handlePrevious = () => {
    setCurrentRequestIndex((prev) => prev > 0 ? prev - 1 : prev);
  };

  const handleDocumentAction = (action: 'approve' | 'reject') => {
    if (!selectedDocument || !currentRequest) return;

    // Update the document status
    const updatedRequests = pendingRequestsState.map(request => {
      if (request.id === currentRequest.id) {
        return {
          ...request,
          documents: request.documents.map(doc => {
            if (doc.name === selectedDocument.name) {
              const newStatus = action === 'approve' ? 'approved' : 'rejected';
              return {
                ...doc,
                status: newStatus as Document['status']
              };
            }
            return doc;
          })
        };
      }
      return request;
    });

    // Check if all documents are reviewed (either approved or rejected)
    const allDocumentsReviewed = currentRequest.documents.every(
      doc => doc.status === 'approved' || doc.status === 'rejected'
    );

    // If all documents are reviewed, update the store status in the table
    if (allDocumentsReviewed) {
      const allDocumentsApproved = currentRequest.documents.every(
        doc => doc.status === 'approved'
      );

      const updatedData = storeData.map(store => {
        if (store.name === currentRequest.partnerName) {
          return {
            ...store,
            storeStatus: allDocumentsApproved ? 'APPROVED' : 'REJECTED'
          } as StoreData;
        }
        return store;
      });

      // Update the table data
      setStoreData(updatedData);

      // Show success message
      toast.success(
        `Store request ${allDocumentsApproved ? 'approved' : 'rejected'} successfully`
      );
    } else {
      // Show document review message
      toast.success(`Document ${action === 'approve' ? 'approved' : 'rejected'} successfully`);
    }

    // Update the requests state
    setPendingRequests(updatedRequests);
    setShowDocumentPreview(false);
  };

  const handleDownloadAll = (request: typeof pendingRequests[0]) => {
    // Here you would typically handle the batch download of all documents
    console.log('Downloading all documents for:', request.partnerName);
    toast.success('Downloading all documents...');
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
          data={storeData}
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
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="border-slate-200"
                onClick={() => handleDownloadAll(currentRequest)}
              >
                <Download className="w-4 h-4 mr-2" />
                Download All
              </Button>
              <Button
                className="bg-crystal-blue hover:bg-opacity-90 text-black"
                onClick={() => {
                  setSelectedDocument(currentRequest.documents[0]);
                  setShowDocumentPreview(true);
                }}
              >
                <FileText className="w-4 h-4 mr-2" />
                Review Documents
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-5 gap-4">
            {currentRequest.documents.map((doc) => (
              <div
                key={doc.name}
                className={`p-4 rounded-lg border ${
                  isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                } cursor-pointer hover:border-crystal-blue transition-colors`}
                onClick={() => {
                  setSelectedDocument(doc);
                  setShowDocumentPreview(true);
                }}
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
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full mt-2 h-8"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* View All Requests Modal */}
      <Dialog open={showAllRequests} onOpenChange={setShowAllRequests}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>All Pending Store Requests</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6">
            {pendingRequests.map((request) => (
              <div
                key={request.id}
                className="p-6 border border-slate-200 rounded-lg hover:border-crystal-blue transition-colors"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-medium">{request.partnerName}</h3>
                    <div className="text-sm text-slate-500 space-y-1">
                      <p>Category: {request.category}</p>
                      <p>Submitted: {request.submissionDate}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="border-slate-200"
                      onClick={() => handleDownloadAll(request)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download All
                    </Button>
                    <Button
                      className="bg-crystal-blue hover:bg-opacity-90 text-black"
                      onClick={() => {
                        setCurrentRequestIndex(pendingRequests.indexOf(request));
                        setShowAllRequests(false);
                      }}
                    >
                      Review
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-5 gap-4">
                  {request.documents.map((doc) => (
                    <div
                      key={doc.name}
                      className="p-3 rounded-lg border border-slate-200 bg-slate-50"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <FileText className="w-4 h-4 text-slate-400" />
                        {doc.status === 'approved' ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : doc.status === 'rejected' ? (
                          <XCircle className="w-4 h-4 text-red-500" />
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-yellow-400" />
                        )}
                      </div>
                      <p className="text-sm font-medium truncate">{doc.name}</p>
                      <p className="text-xs text-slate-500 capitalize">{doc.status}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Document Preview Modal */}
      <Dialog open={showDocumentPreview} onOpenChange={setShowDocumentPreview}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Document Preview - {selectedDocument?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Document Preview */}
            <div className="aspect-[4/3] bg-slate-100 rounded-lg overflow-hidden">
              <iframe
                src={selectedDocument?.url}
                className="w-full h-full"
                title={selectedDocument?.name}
              />
            </div>
            {/* Action Buttons */}
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowDocumentPreview(false)}
              >
                Close
              </Button>
              <Button
                variant="outline"
                className="border-red-500 text-red-500 hover:bg-red-50"
                onClick={() => handleDocumentAction('reject')}
              >
                <XCircle className="w-4 h-4 mr-2" />
                Reject
              </Button>
              <Button
                className="bg-green-500 text-white hover:bg-green-600"
                onClick={() => handleDocumentAction('approve')}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Approve
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 
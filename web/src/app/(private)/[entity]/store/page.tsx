'use client'

import { useState } from 'react';
import Entity from '../page';
import QueueModal from '@/app/shared/QueueModal';
import { Store, ShoppingBag, Package, DollarSign, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';

const StoreStatus = {
  NOT_REQUESTED: 'NOT_REQUESTED',
  DOCUMENTS_PENDING: 'DOCUMENTS_PENDING',
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
} as const;

type StoreStatus = typeof StoreStatus[keyof typeof StoreStatus];

interface Document {
  type: string;
  file: File | null;
}

interface StoreRequestViewProps {
  onRequest: () => void;
}

const requiredDocuments = [
  {
    type: 'Commercial Registration',
    description: 'Valid commercial registration certificate (CR) from the Egyptian Commercial Registry'
  },
  {
    type: 'Tax Card',
    description: 'Valid tax card showing your tax registration number'
  },
  {
    type: 'VAT Registration',
    description: 'VAT registration certificate if applicable (for businesses with annual revenue over EGP 500,000)'
  },
  {
    type: 'National ID',
    description: 'Copy of the business owner\'s national ID'
  },
  {
    type: 'Bank Account',
    description: 'Business bank account details'
  }
];

const StoreRequestView = ({ onRequest }: StoreRequestViewProps) => (
  <div className="p-8 text-center">
    <Store className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
    <h2 className="text-2xl font-semibold mb-4">Start Selling Online</h2>
    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
      Transform your physical store into an online marketplace. Reach more customers and increase your revenue with QMaster&apos;s e-commerce solution.
    </p>
    <Button 
      onClick={onRequest}
      size="lg"
      className="!bg-gradient-to-r !from-baby-blue !to-ocean-blue hover:!opacity-90 !text-white"
    >
      Get Started
    </Button>
  </div>
);

const DocumentUploadView = ({ onSubmit }: { onSubmit: (files: Document[]) => void }) => {
  const [documents, setDocuments] = useState<Document[]>(
    requiredDocuments.map(doc => ({ type: doc.type, file: null }))
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (index: number, file: File | null) => {
    const newDocuments = [...documents];
    newDocuments[index].file = file;
    setDocuments(newDocuments);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Here you would typically upload the files to your server
      await onSubmit(documents);
      toast.success('Documents submitted successfully!', {
        style: {
          background: '#10B981',
          color: '#fff',
        },
        duration: 4000,
      });
    } catch (error) {
      toast.error('Error submitting documents. Please try again.', {
        style: {
          background: '#EF4444',
          color: '#fff',
        },
        duration: 4000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">Required Documents</h2>
      <p className="text-muted-foreground mb-8 text-center max-w-2xl mx-auto">
        To comply with Egyptian e-commerce regulations, please provide the following documents. All documents must be clear, valid, and in PDF format.
      </p>
      
      <div className="space-y-6 max-w-2xl mx-auto">
        {requiredDocuments.map((doc, index) => (
          <div key={doc.type} className="p-4 border-2 border-white/20 rounded-xl backdrop-blur-sm">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-lg">{doc.type}</h3>
                <p className="text-sm text-muted-foreground">{doc.description}</p>
              </div>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => handleFileChange(index, e.target.files?.[0] || null)}
                className="text-sm text-white/70 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-baby-blue file:text-white hover:file:bg-ocean-blue"
              />
            </div>
            {documents[index].file && (
              <p className="text-sm text-green-500 mt-2">
                ✓ {documents[index].file.name}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Button
          onClick={handleSubmit}
          disabled={!documents.every(doc => doc.file) || isSubmitting}
          className="!bg-gradient-to-r !from-baby-blue !to-ocean-blue hover:!opacity-90 !text-white"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Documents'}
        </Button>
      </div>
    </div>
  );
};

const StorePendingView = () => (
  <div className="p-8 text-center">
    <Store className="h-16 w-16 mx-auto mb-4 text-yellow-500" />
    <h2 className="text-2xl font-semibold mb-4">Documents Under Review</h2>
    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
      We are reviewing your submitted documents. This process typically takes 2-3 business days. We&apos;ll notify you via email once the review is complete.
    </p>
  </div>
);

const StoreApprovedView = () => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="p-6 bg-white/5 rounded-2xl backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <ShoppingBag className="h-10 w-10 text-baby-blue" />
          <div>
            <p className="text-sm text-muted-foreground">Total Orders</p>
            <h3 className="text-2xl font-bold">142</h3>
          </div>
        </div>
      </div>
      
      <div className="p-6 bg-white/5 rounded-2xl backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <Package className="h-10 w-10 text-baby-blue" />
          <div>
            <p className="text-sm text-muted-foreground">Products</p>
            <h3 className="text-2xl font-bold">45</h3>
          </div>
        </div>
      </div>

      <div className="p-6 bg-white/5 rounded-2xl backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <DollarSign className="h-10 w-10 text-baby-blue" />
          <div>
            <p className="text-sm text-muted-foreground">Revenue</p>
            <h3 className="text-2xl font-bold">$12,500</h3>
          </div>
        </div>
      </div>

      <div className="p-6 bg-white/5 rounded-2xl backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <Users className="h-10 w-10 text-baby-blue" />
          <div>
            <p className="text-sm text-muted-foreground">Customers</p>
            <h3 className="text-2xl font-bold">89</h3>
          </div>
        </div>
      </div>
    </div>

    <div className="flex justify-end gap-4">
      <Button 
        variant="outline"
        className="border-2 hover:bg-white/5"
      >
        Manage Products
      </Button>
      <Button
        className="!bg-gradient-to-r !from-baby-blue !to-ocean-blue hover:!opacity-90 !text-white"
      >
        View Store
      </Button>
    </div>
  </div>
);

export default function StorePage() {
  const [storeStatus, setStoreStatus] = useState<StoreStatus>(StoreStatus.NOT_REQUESTED);

  const handleStoreRequest = () => {
    setStoreStatus(StoreStatus.DOCUMENTS_PENDING);
  };

  const handleDocumentSubmit = async (documents: Document[]) => {
    // Here you would typically upload the documents to your server
    setStoreStatus(StoreStatus.PENDING);
    // Simulate approval after 2 seconds
    setTimeout(() => {
      setStoreStatus(StoreStatus.APPROVED);
      toast.success('Your store has been approved!', {
        style: {
          background: '#10B981',
          color: '#fff',
        },
        duration: 4000,
      });
    }, 2000);
  };

  return (
    <Entity>
      <QueueModal title="Store">
        <div className="max-w-4xl mx-auto py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 bg-white/10 backdrop-blur-md rounded-3xl border-2 border-white/20 shadow-lg"
          >
            {storeStatus === StoreStatus.NOT_REQUESTED && <StoreRequestView onRequest={handleStoreRequest} />}
            {storeStatus === StoreStatus.DOCUMENTS_PENDING && <DocumentUploadView onSubmit={handleDocumentSubmit} />}
            {storeStatus === StoreStatus.PENDING && <StorePendingView />}
            {storeStatus === StoreStatus.APPROVED && <StoreApprovedView />}
          </motion.div>
        </div>
      </QueueModal>
    </Entity>
  );
} 
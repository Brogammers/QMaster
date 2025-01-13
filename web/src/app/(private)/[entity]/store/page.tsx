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
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
} as const;

type StoreStatus = typeof StoreStatus[keyof typeof StoreStatus];

interface StoreRequestViewProps {
  onRequest: () => void;
}

const StoreRequestView = ({ onRequest }: StoreRequestViewProps) => (
  <div className="p-8 text-center">
    <Store className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
    <h2 className="text-2xl font-semibold mb-4">Start Selling Online</h2>
    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
      Transform your physical store into an online marketplace. Reach more customers and increase your revenue with QMaster&apos;s e-commerce solution.
    </p>
    <Button 
      onClick={() => {
        toast.success('Store request submitted successfully!', {
          style: {
            background: '#10B981',
            color: '#fff',
          },
          duration: 4000,
        });
        onRequest();
      }}
      size="lg"
      className="!bg-gradient-to-r !from-baby-blue !to-ocean-blue hover:!opacity-90 !text-white"
    >
      Request Store Access
    </Button>
  </div>
);

const StorePendingView = () => (
  <div className="p-8 text-center">
    <Store className="h-16 w-16 mx-auto mb-4 text-yellow-500" />
    <h2 className="text-2xl font-semibold mb-4">Store Request Pending</h2>
    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
      Your store request is being reviewed. We&apos;ll notify you once it&apos;s approved. This usually takes 1-2 business days.
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
    setStoreStatus(StoreStatus.PENDING);
    // Simulate approval after 2 seconds
    setTimeout(() => {
      setStoreStatus(StoreStatus.APPROVED);
      toast.success('Your store request has been approved!', {
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
            {storeStatus === StoreStatus.PENDING && <StorePendingView />}
            {storeStatus === StoreStatus.APPROVED && <StoreApprovedView />}
          </motion.div>
        </div>
      </QueueModal>
    </Entity>
  );
} 
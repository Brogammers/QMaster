import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Store, ShoppingBag, Package, DollarSign, Users } from 'lucide-react';

type StoreStatus = 'NOT_REQUESTED' | 'PENDING' | 'APPROVED' | 'REJECTED';

// This would come from your API
const storeStatus: StoreStatus = 'NOT_REQUESTED'; // or 'PENDING', 'APPROVED', 'REJECTED'

const StoreRequestView = () => (
  <Card className="p-8 text-center">
    <Store className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
    <h2 className="text-2xl font-semibold mb-4">Start Selling Online</h2>
    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
      Transform your physical store into an online marketplace. Reach more customers and increase your revenue with QMaster&apos;s e-commerce solution.
    </p>
    <Button size="lg">
      Request Store Access
    </Button>
  </Card>
);

const StorePendingView = () => (
  <Card className="p-8 text-center">
    <Store className="h-16 w-16 mx-auto mb-4 text-yellow-500" />
    <h2 className="text-2xl font-semibold mb-4">Store Request Pending</h2>
    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
      Your store request is being reviewed. We&apos;ll notify you once it&apos;s approved. This usually takes 1-2 business days.
    </p>
  </Card>
);

const StoreApprovedView = () => (
  <div className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="p-6">
        <div className="flex items-center space-x-4">
          <ShoppingBag className="h-10 w-10 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Total Orders</p>
            <h3 className="text-2xl font-bold">142</h3>
          </div>
        </div>
      </Card>
      
      <Card className="p-6">
        <div className="flex items-center space-x-4">
          <Package className="h-10 w-10 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Products</p>
            <h3 className="text-2xl font-bold">45</h3>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center space-x-4">
          <DollarSign className="h-10 w-10 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Revenue</p>
            <h3 className="text-2xl font-bold">$12,500</h3>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center space-x-4">
          <Users className="h-10 w-10 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Customers</p>
            <h3 className="text-2xl font-bold">89</h3>
          </div>
        </div>
      </Card>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
        {/* Order list would go here */}
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Popular Products</h3>
        {/* Products list would go here */}
      </Card>
    </div>

    <div className="flex justify-end space-x-4">
      <Button variant="outline">
        Manage Products
      </Button>
      <Button>
        View Store
      </Button>
    </div>
  </div>
);

export default function StorePage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <Heading
          title="Store"
          description="Manage your online store and products"
        />
      </div>
      <Separator />
      
      {storeStatus === 'NOT_REQUESTED' && <StoreRequestView />}
      {storeStatus === 'PENDING' && <StorePendingView />}
      {storeStatus === 'APPROVED' && <StoreApprovedView />}
    </div>
  );
} 
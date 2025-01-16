import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '@/components/ui/button';
import { Store, ShoppingBag, Search } from 'lucide-react';
import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
  image: string;
}

interface StorePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  storeName: string;
  products: Product[];
}

export default function StorePreviewModal({
  isOpen,
  onClose,
  storeName,
  products,
}: StorePreviewModalProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Store className="w-6 h-6" />
            {storeName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-black/50" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-black/10 focus:outline-none focus:border-baby-blue"
            />
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="border rounded-xl p-4 space-y-4 hover:border-baby-blue transition-colors"
              >
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-lg font-bold text-baby-blue">
                    EGP {product.price}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        product.status === 'in_stock'
                          ? 'bg-green-100 text-green-700'
                          : product.status === 'low_stock'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {product.status === 'in_stock'
                        ? 'In Stock'
                        : product.status === 'low_stock'
                        ? 'Low Stock'
                        : 'Out of Stock'}
                    </span>
                    <span className="text-sm text-black/50">
                      {product.stock} units
                    </span>
                  </div>
                </div>
                <Button
                  className="w-full !bg-gradient-to-r !from-baby-blue !to-ocean-blue hover:!opacity-90 !text-white"
                  disabled={product.stock === 0}
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-8">
              <p className="text-black/50">No products found</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
} 
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '@/components/ui/button';
import { Package, ShoppingCart } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
  image: string;
}

interface ProductPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

export default function ProductPreviewModal({
  isOpen,
  onClose,
  product,
}: ProductPreviewModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Product Preview</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6">
          {/* Product Image */}
          <div className="aspect-square rounded-lg overflow-hidden bg-gray-50">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-2xl font-bold text-baby-blue mt-2">
                EGP {product.price}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-black/70 mb-1">
                Description
              </h4>
              <p className="text-black/60">{product.description}</p>
            </div>

            <div className="flex items-center gap-2">
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
              <span className="text-sm text-black/50">{product.stock} units</span>
            </div>

            <div className="pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="border-2 border-baby-blue text-baby-blue hover:bg-baby-blue/5 bg-transparent"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 
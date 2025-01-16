import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
  image: string;
}

interface ProductGridViewProps {
  products: Product[];
  mode: 'view' | 'manage';
  onDelete?: (productId: number) => void;
  onProductClick?: (product: Product) => void;
}

export default function ProductGridView({
  products,
  mode,
  onDelete,
  onProductClick,
}: ProductGridViewProps) {
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  const handleDeleteSelected = () => {
    if (onDelete && selectedProducts.length > 0) {
      selectedProducts.forEach(productId => {
        onDelete(productId);
      });
      setSelectedProducts([]);
      setIsDeleteMode(false);
    }
  };

  const vibrationAnimation = {
    animate: isDeleteMode ? {
      rotate: [0, -1, 1, -1, 1, 0],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: "loop" as const,
      },
    } : {},
  };

  return (
    <div className="space-y-4">
      {/* Delete mode header */}
      {isDeleteMode && (
        <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-black/10">
          <span className="font-medium">
            {selectedProducts.length} items selected
          </span>
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="border-2 border-baby-blue text-baby-blue hover:bg-baby-blue/5 bg-transparent"
              onClick={() => {
                setIsDeleteMode(false);
                setSelectedProducts([]);
              }}
            >
              Cancel
            </Button>
            <Button
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={handleDeleteSelected}
              disabled={selectedProducts.length === 0}
            >
              Delete Selected
            </Button>
          </div>
        </div>
      )}

      {/* Products grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products.map((product) => (
          <motion.div
            key={product.id}
            className={`relative border rounded-xl p-4 space-y-4 ${
              mode === 'manage' ? 'cursor-pointer' : ''
            }`}
            {...vibrationAnimation}
            onClick={() => {
              if (mode === 'manage' && isDeleteMode) {
                if (selectedProducts.includes(product.id)) {
                  setSelectedProducts(selectedProducts.filter(id => id !== product.id));
                } else {
                  setSelectedProducts([...selectedProducts, product.id]);
                }
              } else if (onProductClick && !isDeleteMode) {
                onProductClick(product);
              }
            }}
          >
            {mode === 'manage' && isDeleteMode && (
              <div className={`absolute inset-0 rounded-xl border-2 transition-colors ${
                selectedProducts.includes(product.id) 
                  ? 'bg-red-500/10 border-red-500' 
                  : 'border-transparent'
              }`}>
                {selectedProducts.includes(product.id) && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
            )}

            <div className="aspect-square rounded-lg overflow-hidden bg-gray-50">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-lg font-bold text-baby-blue">
                    EGP {product.price}
                  </p>
                </div>
                {mode === 'manage' && !isDeleteMode && (
                  <Button
                    variant="ghost"
                    className="!p-2 !min-w-0 text-red-500 hover:bg-red-500/5 hover:text-red-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onDelete) {
                        onDelete(product.id);
                      }
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
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
          </motion.div>
        ))}
      </div>
    </div>
  );
} 
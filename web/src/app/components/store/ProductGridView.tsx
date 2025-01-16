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

  const vibrationAnimation = {
    initial: { rotate: 0 },
    animate: {
      rotate: [0, -1, 1, -1, 1, 0],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: "loop" as const,
      },
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <motion.div
          key={product.id}
          className={`relative border rounded-xl p-4 space-y-4 ${
            mode === 'manage' ? 'cursor-pointer' : ''
          }`}
          {...(mode === 'manage' ? vibrationAnimation : {})}
          onClick={() => {
            if (mode === 'manage') {
              if (selectedProducts.includes(product.id)) {
                setSelectedProducts(selectedProducts.filter(id => id !== product.id));
              } else {
                setSelectedProducts([...selectedProducts, product.id]);
              }
            } else if (onProductClick) {
              onProductClick(product);
            }
          }}
        >
          {mode === 'manage' && selectedProducts.includes(product.id) && (
            <div className="absolute inset-0 bg-red-500/10 rounded-xl border-2 border-red-500 z-10">
              <Button
                className="absolute top-2 right-2 !p-2 !min-w-0 bg-red-500 hover:bg-red-600 text-white rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onDelete) {
                    onDelete(product.id);
                    setSelectedProducts(selectedProducts.filter(id => id !== product.id));
                  }
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
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
        </motion.div>
      ))}
    </div>
  );
} 
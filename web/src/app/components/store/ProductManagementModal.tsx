import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '@/components/ui/button';
import { Package } from 'lucide-react';
import { useState } from 'react';

interface ProductManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: any;
  mode: 'add' | 'edit';
  onSubmit: (values: any) => void;
}

export default function ProductManagementModal({
  isOpen,
  onClose,
  product,
  mode,
  onSubmit,
}: ProductManagementModalProps) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || '',
    quantity: product?.quantity || '',
    type: product?.type || 'PHYSICAL',
    image: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            {mode === 'add' ? 'Add New Product' : 'Edit Product'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div className="flex justify-center">
            <div className="w-40 h-40 relative">
              <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-black/10 rounded-xl bg-white/5">
                {formData.image || product?.image ? (
                  <div className="relative w-full h-full">
                    <img
                      src={formData.image ? URL.createObjectURL(formData.image) : product?.image}
                      alt="Product"
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, image: null })}
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setFormData({ ...formData, image: file });
                        }
                      }}
                      className="hidden"
                      id="product-image"
                    />
                    <label
                      htmlFor="product-image"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <Package className="w-12 h-12 text-black/50 mb-2" />
                      <span className="text-sm text-black/50">Upload Image</span>
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Product Type */}
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: 'PHYSICAL' })}
              className={`p-4 rounded-lg border-2 transition-colors ${
                formData.type === 'PHYSICAL'
                  ? 'border-baby-blue bg-baby-blue/5'
                  : 'border-black/10 hover:border-baby-blue/50'
              }`}
            >
              <Package className={`w-8 h-8 mx-auto mb-2 ${
                formData.type === 'PHYSICAL' ? 'text-baby-blue' : 'text-black/50'
              }`} />
              <p className={`text-sm font-medium ${
                formData.type === 'PHYSICAL' ? 'text-baby-blue' : 'text-black/70'
              }`}>
                Physical Product
              </p>
            </button>

            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: 'DIGITAL' })}
              className={`p-4 rounded-lg border-2 transition-colors ${
                formData.type === 'DIGITAL'
                  ? 'border-baby-blue bg-baby-blue/5'
                  : 'border-black/10 hover:border-baby-blue/50'
              }`}
            >
              <Package className={`w-8 h-8 mx-auto mb-2 ${
                formData.type === 'DIGITAL' ? 'text-baby-blue' : 'text-black/50'
              }`} />
              <p className={`text-sm font-medium ${
                formData.type === 'DIGITAL' ? 'text-baby-blue' : 'text-black/70'
              }`}>
                Digital Product
              </p>
            </button>
          </div>

          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-black/70 mb-1">
              Product Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-black/10 text-black"
              placeholder="Enter product name"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-black/70 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-black/10 min-h-[100px] text-black"
              placeholder="Enter product description"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-black/70 mb-1">
                Price (EGP)
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-black/10 text-black"
                placeholder="0.00"
                min="0"
                step="0.01"
              />
            </div>

            {/* Stock (only for PHYSICAL products) */}
            {formData.type === 'PHYSICAL' && (
              <div>
                <label className="block text-sm font-medium text-black/70 mb-1">
                  Stock
                </label>
                <input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-black/10 text-black"
                  placeholder="0"
                  min="0"
                />
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-2 border-baby-blue text-baby-blue hover:bg-baby-blue/5 bg-transparent"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="!bg-gradient-to-r !from-baby-blue !to-ocean-blue hover:!opacity-90 !text-white"
            >
              {mode === 'add' ? 'Add Product' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 
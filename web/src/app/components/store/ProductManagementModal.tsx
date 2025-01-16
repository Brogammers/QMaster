import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '@/components/ui/button';
import { Package, Plus, Upload } from 'lucide-react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
  image: string;
}

interface ProductManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product;
  mode: 'add' | 'edit';
  onSubmit: (values: {
    name: string;
    description: string;
    price: number;
    stock: number;
    image: File | null;
  }) => void;
}

const productSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Name must be at least 3 characters')
    .required('Name is required'),
  description: Yup.string()
    .min(10, 'Description must be at least 10 characters')
    .required('Description is required'),
  price: Yup.number()
    .min(0.01, 'Price must be greater than 0')
    .required('Price is required'),
  stock: Yup.number()
    .min(0, 'Stock cannot be negative')
    .required('Stock is required'),
  image: Yup.mixed().required('Product image is required'),
});

export default function ProductManagementModal({
  isOpen,
  onClose,
  product,
  mode,
}: ProductManagementModalProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(
    product?.image || null
  );

  const handleSubmit = async (values: any) => {
    // Here you would typically send the data to your backend
    console.log('Submitting product:', values);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {mode === 'add' ? 'Add New Product' : 'Edit Product'}
          </DialogTitle>
        </DialogHeader>

        <Formik
          initialValues={{
            name: product?.name || '',
            description: product?.description || '',
            price: product?.price || '',
            stock: product?.stock || '',
            image: null,
          }}
          validationSchema={productSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, setFieldValue }) => (
            <Form className="space-y-6">
              <div className="space-y-4">
                {/* Image Upload */}
                <div className="flex justify-center">
                  <div className="w-40 h-40 relative">
                    <input
                      type="file"
                      id="image"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setFieldValue('image', file);
                          setPreviewImage(URL.createObjectURL(file));
                        }
                      }}
                    />
                    <label
                      htmlFor="image"
                      className={`w-full h-full rounded-lg border-2 border-dashed flex flex-col items-center justify-center cursor-pointer
                        ${
                          previewImage
                            ? ''
                            : 'border-baby-blue hover:border-ocean-blue'
                        }`}
                    >
                      {previewImage ? (
                        <div className="relative w-full h-full">
                          <img
                            src={previewImage}
                            alt="Preview"
                            className="w-full h-full object-cover rounded-lg"
                          />
                          <Button
                            type="button"
                            onClick={() => {
                              setPreviewImage(null);
                              setFieldValue('image', null);
                            }}
                            className="absolute -top-2 -right-2 !p-1 !min-w-0 rounded-full bg-red-500 hover:bg-red-600 text-white"
                          >
                            ×
                          </Button>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-8 h-8 text-baby-blue mb-2" />
                          <span className="text-sm text-black/60">
                            Upload Image
                          </span>
                        </>
                      )}
                    </label>
                  </div>
                </div>

                {/* Product Name */}
                <div>
                  <label className="block text-sm font-medium text-black/70 mb-1">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-black/10"
                  />
                  {touched.name && errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-black/70 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-black/10"
                  />
                  {touched.description && errors.description && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.description}
                    </p>
                  )}
                </div>

                {/* Price and Stock */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-black/70 mb-1">
                      Price (EGP)
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={values.price}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-2 rounded-lg border border-black/10"
                    />
                    {touched.price && errors.price && (
                      <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black/70 mb-1">
                      Stock
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={values.stock}
                      onChange={handleChange}
                      min="0"
                      className="w-full px-4 py-2 rounded-lg border border-black/10"
                    />
                    {touched.stock && errors.stock && (
                      <p className="text-red-500 text-sm mt-1">{errors.stock}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="border-2 hover:bg-white/5"
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
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
} 
import { useState } from 'react';
import { Button } from '../ui/button';
import { Package, Plus, Search, Download, Edit, Eye, Trash } from 'lucide-react';
import ProductManagementModal from './ProductManagementModal';
import ProductPreviewModal from './ProductPreviewModal';
import ExportProductsModal from './ExportProductsModal';
import StorePreviewModal from './StorePreviewModal';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
  image: string;
}

export default function ProductManagement() {
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showStorePreviewModal, setShowStorePreviewModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - replace with real data from your backend
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Sample Product',
      description: 'This is a sample product description',
      price: 299.99,
      stock: 15,
      status: 'in_stock',
      image: 'https://via.placeholder.com/150',
    },
  ]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handler functions
  const handleAddProduct = () => {
    setShowAddModal(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const handlePreviewProduct = (product: Product) => {
    setSelectedProduct(product);
    setShowPreviewModal(true);
  };

  const handleDeleteProduct = async (productId: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        // Here you would typically call your backend API
        // await deleteProduct(productId);
        setProducts(products.filter(p => p.id !== productId));
      } catch (error) {
        console.error('Failed to delete product:', error);
      }
    }
  };

  const handleExport = () => {
    setShowExportModal(true);
  };

  const handleViewStore = () => {
    setShowStorePreviewModal(true);
  };

  const handleProductSubmit = async (values: any, mode: 'add' | 'edit') => {
    try {
      if (mode === 'add') {
        // Here you would typically call your backend API
        const newProduct = {
          ...values,
          id: products.length + 1,
          status: values.stock > 10 ? 'in_stock' : values.stock > 0 ? 'low_stock' : 'out_of_stock',
        };
        setProducts([...products, newProduct]);
      } else {
        // Here you would typically call your backend API
        const updatedProducts = products.map(p =>
          p.id === selectedProduct?.id ? { ...p, ...values } : p
        );
        setProducts(updatedProducts);
      }
      setShowAddModal(false);
      setShowEditModal(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error('Failed to save product:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <Package className="w-6 h-6" />
          Products
        </h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="border-2 hover:bg-white/5"
            onClick={handleViewStore}
          >
            <Eye className="w-4 h-4 mr-2" />
            View Store
          </Button>
          <Button
            variant="outline"
            className="border-2 hover:bg-white/5"
            onClick={handleExport}
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button
            className="!bg-gradient-to-r !from-baby-blue !to-ocean-blue hover:!opacity-90 !text-white"
            onClick={handleAddProduct}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>

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

      {/* Products Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-black/10">
              <th className="text-left py-4 px-4 font-medium text-black/70">Product</th>
              <th className="text-left py-4 px-4 font-medium text-black/70">Price</th>
              <th className="text-left py-4 px-4 font-medium text-black/70">Stock</th>
              <th className="text-left py-4 px-4 font-medium text-black/70">Status</th>
              <th className="text-right py-4 px-4 font-medium text-black/70">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} className="border-b border-black/10 hover:bg-black/[0.02]">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-50">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-sm text-black/50 truncate max-w-[300px]">
                        {product.description}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="font-medium">EGP {product.price}</span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-black/70">{product.stock} units</span>
                </td>
                <td className="py-4 px-4">
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
                </td>
                <td className="py-4 px-4">
                  <div className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border hover:bg-white/5"
                      onClick={() => handlePreviewProduct(product)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border hover:bg-white/5"
                      onClick={() => handleEditProduct(product)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border hover:bg-red-50 text-red-600 border-red-200"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredProducts.length === 0 && (
          <div className="text-center py-8">
            <p className="text-black/50">No products found</p>
          </div>
        )}
      </div>

      {/* Modals */}
      <ProductManagementModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        mode="add"
        onSubmit={(values) => handleProductSubmit(values, 'add')}
      />

      {selectedProduct && (
        <>
          <ProductManagementModal
            isOpen={showEditModal}
            onClose={() => {
              setShowEditModal(false);
              setSelectedProduct(null);
            }}
            mode="edit"
            product={selectedProduct}
            onSubmit={(values) => handleProductSubmit(values, 'edit')}
          />
          <ProductPreviewModal
            isOpen={showPreviewModal}
            onClose={() => {
              setShowPreviewModal(false);
              setSelectedProduct(null);
            }}
            product={selectedProduct}
          />
        </>
      )}

      <ExportProductsModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
      />

      <StorePreviewModal
        isOpen={showStorePreviewModal}
        onClose={() => setShowStorePreviewModal(false)}
        storeName="Your Store Name"
        products={products}
      />
    </div>
  );
} 
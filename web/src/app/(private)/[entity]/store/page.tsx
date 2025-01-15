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
  SETUP_PENDING: 'SETUP_PENDING',
  SETUP_COMPLETED: 'SETUP_COMPLETED',
} as const;

type StoreStatus = typeof StoreStatus[keyof typeof StoreStatus];

interface Document {
  type: string;
  file: File | null;
}

interface SetupStep {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
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
              <div className="flex flex-col items-end gap-2">
                <label className="cursor-pointer text-sm px-4 py-2 rounded-full bg-baby-blue hover:bg-ocean-blue transition-colors text-white w-[120px] text-center">
                  {documents[index].file ? 'Replace File' : 'Attach File'}
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileChange(index, e.target.files?.[0] || null)}
                    className="hidden"
                  />
                </label>
                {documents[index].file && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-green-500">✓</span>
                    <span className="max-w-[200px] truncate text-white/70">{documents[index].file.name}</span>
                  </div>
                )}
              </div>
            </div>
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

const StoreSetupView = ({ onComplete }: { onComplete: () => void }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [setupSteps, setSetupSteps] = useState<SetupStep[]>([
    {
      id: 'branding',
      title: 'Store Branding',
      description: 'Upload your logo and choose your store theme colors',
      isCompleted: false
    },
    {
      id: 'products',
      title: 'Add Products',
      description: 'Add your first products with images, prices, and inventory',
      isCompleted: false
    },
    {
      id: 'payment',
      title: 'Payment Setup',
      description: 'Configure your payment methods and bank account',
      isCompleted: false
    },
    {
      id: 'shipping',
      title: 'Shipping Options',
      description: 'Set up your shipping zones and delivery methods',
      isCompleted: false
    }
  ]);

  const [showGuide, setShowGuide] = useState(true);
  const [logo, setLogo] = useState<File | null>(null);
  const [products, setProducts] = useState<Array<{
    id: string;
    name: string;
    description: string;
    price: number;
    type: 'physical' | 'digital';
    stock: number;
    images: File[];
  }>>([]);
  const [paymentInfo, setPaymentInfo] = useState({
    accountName: '',
    iban: '',
    bank: '',
  });
  const [shippingInfo, setShippingInfo] = useState({
    courierType: 'self' as 'self' | 'outsourced',
    courierCompany: '',
    averageDeliveryTime: '',
    termsAccepted: false
  });

  const egyptianBanks = [
    'National Bank of Egypt',
    'Banque Misr',
    'Commercial International Bank',
    'QNB Al Ahli',
    'Arab African International Bank',
    'HSBC Egypt',
    'Credit Agricole Egypt',
    'Arab Bank',
    'Bank of Alexandria',
    'Emirates NBD Egypt'
  ];

  const courierCompanies = [
    'Aramex',
    'DHL Express',
    'FedEx Express',
    'UPS',
    'Egypt Post',
    'Bosta',
    'R2S',
    'Mylerz',
    'EGEX',
    'Fetchr'
  ];

  const handleStepComplete = (stepId: string) => {
    setSetupSteps(steps => 
      steps.map(step => 
        step.id === stepId ? { ...step, isCompleted: true } : step
      )
    );
    setCurrentStep(curr => Math.min(curr + 1, setupSteps.length - 1));
  };

  const allStepsCompleted = setupSteps.every(step => step.isCompleted);

  const renderCurrentStep = () => {
    switch (setupSteps[currentStep].id) {
      case 'branding':
        return (
          <div className="space-y-6">
            <div className="p-6 bg-black/30 rounded-2xl backdrop-blur-sm border border-white/20">
              <h3 className="text-lg font-semibold mb-4 text-white">Store Logo</h3>
              <div className="flex items-center space-x-4">
                {logo ? (
                  <div className="w-32 h-32 rounded-lg overflow-hidden">
                    <img 
                      src={URL.createObjectURL(logo)} 
                      alt="Store logo" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-32 h-32 rounded-lg border-2 border-dashed border-white/20 flex items-center justify-center">
                    <p className="text-sm text-white/50">No logo uploaded</p>
                  </div>
                )}
                <div className="space-y-2">
                  <label className="cursor-pointer px-4 py-2 rounded-lg bg-baby-blue hover:bg-ocean-blue transition-colors text-white">
                    Upload Logo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setLogo(e.target.files?.[0] || null)}
                      className="hidden"
                    />
                  </label>
                  <p className="text-sm text-white/50">Recommended size: 512x512px</p>
                </div>
              </div>
            </div>
            <Button
              onClick={() => handleStepComplete('branding')}
              disabled={!logo}
              className="!bg-gradient-to-r !from-baby-blue !to-ocean-blue hover:!opacity-90 !text-white"
            >
              Continue
            </Button>
          </div>
        );

      case 'products':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {products.map((product, index) => (
                <div key={product.id} className="p-4 bg-black/30 rounded-xl border border-white/20">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-lg font-semibold text-white">Product {index + 1}</h4>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setProducts(products.filter(p => p.id !== product.id));
                      }}
                      className="text-red-500 border-red-500 hover:bg-red-500/10"
                    >
                      Remove
                    </Button>
                  </div>
                  {/* Product form fields */}
                  <div className="space-y-4 divide-y divide-white/10">
                    <div>
                      <label className="block text-base text-baby-blue mb-2 font-semibold">Product Name</label>
                      <input
                        type="text"
                        placeholder="Product name"
                        value={product.name}
                        onChange={(e) => {
                          const newProducts = [...products];
                          newProducts[index].name = e.target.value;
                          setProducts(newProducts);
                        }}
                        className="w-full p-2 rounded bg-black/40 border border-white/30 text-white placeholder:text-white/70"
                      />
                    </div>
                    <div>
                      <label className="block text-base text-baby-blue mb-2 font-semibold">Product Description</label>
                      <textarea
                        placeholder="Product description"
                        value={product.description}
                        onChange={(e) => {
                          const newProducts = [...products];
                          newProducts[index].description = e.target.value;
                          setProducts(newProducts);
                        }}
                        className="w-full p-2 rounded bg-black/40 border border-white/30 text-white placeholder:text-white/70"
                      />
                    </div>
                    <div className="flex space-x-4">
                      <div>
                        <label className="block text-base text-baby-blue mb-2 font-semibold">Price</label>
                        <input
                          type="number"
                          placeholder="Price"
                          value={product.price}
                          onChange={(e) => {
                            const newProducts = [...products];
                            newProducts[index].price = Number(e.target.value);
                            setProducts(newProducts);
                          }}
                          className="w-full p-2 rounded bg-black/40 border border-white/30 text-white placeholder:text-white/70"
                        />
                      </div>
                      <select
                        value={product.type}
                        onChange={(e) => {
                          const newProducts = [...products];
                          newProducts[index].type = e.target.value as 'physical' | 'digital';
                          setProducts(newProducts);
                        }}
                        className="w-full p-2 rounded bg-black/40 border border-white/30 text-white placeholder:text-white/70"
                      >
                        <option value="physical">Physical Product</option>
                        <option value="digital">Digital Product</option>
                      </select>
                    </div>
                    {product.type === 'physical' && (
                      <div>
                        <label className="block text-base text-baby-blue mb-2 font-semibold">Stock Quantity</label>
                        <input
                          type="number"
                          placeholder="Stock quantity"
                          value={product.stock}
                          onChange={(e) => {
                            const newProducts = [...products];
                            newProducts[index].stock = Number(e.target.value);
                            setProducts(newProducts);
                          }}
                          className="w-full p-2 rounded bg-black/40 border border-white/30 text-white placeholder:text-white/70"
                        />
                      </div>
                    )}
                    <div>
                      <label className="cursor-pointer px-4 py-2 rounded-lg bg-baby-blue hover:bg-ocean-blue transition-colors text-white font-medium">
                        Add Product Images
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(e) => {
                            const newProducts = [...products];
                            newProducts[index].images = Array.from(e.target.files || []);
                            setProducts(newProducts);
                          }}
                          className="hidden"
                        />
                      </label>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {product.images.map((image, imgIndex) => (
                          <div key={imgIndex} className="w-16 h-16 rounded overflow-hidden">
                            <img
                              src={URL.createObjectURL(image)}
                              alt={`Product ${index + 1} image ${imgIndex + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              className="w-full border-2 border-baby-blue text-baby-blue hover:bg-baby-blue/10 font-medium"
            >
              Add Another Product
            </Button>
            <Button
              onClick={() => handleStepComplete('products')}
              disabled={products.length === 0}
              className="!bg-gradient-to-r !from-baby-blue !to-ocean-blue hover:!opacity-90 !text-white w-full"
            >
              Continue
            </Button>
          </div>
        );

      case 'payment':
        return (
          <div className="space-y-6">
            <div className="p-6 bg-black/30 rounded-2xl backdrop-blur-sm border border-white/20">
              <h3 className="text-lg font-semibold mb-4 text-white">Payment Information</h3>
              <div className="space-y-4 divide-y divide-white/10">
                <div>
                  <label className="block text-base text-baby-blue mb-2 font-semibold">Account Name</label>
                  <input
                    type="text"
                    value={paymentInfo.accountName}
                    onChange={(e) => setPaymentInfo({ ...paymentInfo, accountName: e.target.value })}
                    className="w-full p-2 rounded bg-black/40 border border-white/30 text-white placeholder:text-white/70"
                    placeholder="Enter account holder name"
                  />
                </div>
                <div>
                  <label className="block text-base text-baby-blue mb-2 font-semibold">IBAN</label>
                  <input
                    type="text"
                    value={paymentInfo.iban}
                    onChange={(e) => setPaymentInfo({ ...paymentInfo, iban: e.target.value })}
                    className="w-full p-2 rounded bg-black/40 border border-white/30 text-white placeholder:text-white/70"
                    placeholder="Enter IBAN"
                  />
                </div>
                <div>
                  <label className="block text-base text-baby-blue mb-2 font-semibold">Bank</label>
                  <select
                    value={paymentInfo.bank}
                    onChange={(e) => setPaymentInfo({ ...paymentInfo, bank: e.target.value })}
                    className="w-full p-2 rounded bg-black/40 border border-white/30 text-white placeholder:text-white/70"
                  >
                    <option value="">Select a bank</option>
                    {egyptianBanks.map(bank => (
                      <option key={bank} value={bank}>{bank}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <Button
              onClick={() => handleStepComplete('payment')}
              disabled={!paymentInfo.accountName || !paymentInfo.iban || !paymentInfo.bank}
              className="!bg-gradient-to-r !from-baby-blue !to-ocean-blue hover:!opacity-90 !text-white w-full"
            >
              Continue
            </Button>
          </div>
        );

      case 'shipping':
        return (
          <div className="space-y-6">
            <div className="p-6 bg-black/30 rounded-2xl backdrop-blur-sm border border-white/20">
              <h3 className="text-lg font-semibold mb-4 text-white">Shipping Information</h3>
              <div className="space-y-4 divide-y divide-white/10">
                <div>
                  <label className="block text-base text-baby-blue mb-2 font-semibold">Delivery Method</label>
                  <select
                    value={shippingInfo.courierType}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, courierType: e.target.value as 'self' | 'outsourced' })}
                    className="w-full p-2 rounded bg-black/40 border border-white/30 text-white placeholder:text-white/70"
                  >
                    <option value="self">Self-delivery</option>
                    <option value="outsourced">Outsourced Courier</option>
                  </select>
                </div>
                {shippingInfo.courierType === 'outsourced' && (
                  <div>
                    <label className="block text-base text-baby-blue mb-2 font-semibold">Courier Company</label>
                    <select
                      value={shippingInfo.courierCompany}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, courierCompany: e.target.value })}
                      className="w-full p-2 rounded bg-black/40 border border-white/30 text-white placeholder:text-white/70"
                    >
                      <option value="">Select a courier company</option>
                      {courierCompanies.map(company => (
                        <option key={company} value={company}>{company}</option>
                      ))}
                    </select>
                  </div>
                )}
                <div>
                  <label className="block text-base text-baby-blue mb-2 font-semibold">Average Delivery Time</label>
                  <input
                    type="text"
                    value={shippingInfo.averageDeliveryTime}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, averageDeliveryTime: e.target.value })}
                    className="w-full p-2 rounded bg-black/40 border border-white/30 text-white placeholder:text-white/70"
                    placeholder="e.g., 2-3 business days"
                  />
                </div>
                <div className="p-4 bg-black/30 rounded-xl border border-white/20">
                  <label className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      checked={shippingInfo.termsAccepted}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, termsAccepted: e.target.checked })}
                      className="mt-1"
                    />
                    <span className="text-sm text-white/90">
                      I acknowledge and agree that I am solely responsible for fulfilling all orders and delivering products to customers. QMaster acts solely as an intermediary platform facilitating the transaction between my business and customers. I understand that I am liable for ensuring timely delivery, product quality, and handling any shipping-related issues or returns. QMaster is not responsible for any delivery delays, damages, or disputes arising from the shipping process.
                    </span>
                  </label>
                </div>
              </div>
            </div>
            <Button
              onClick={() => handleStepComplete('shipping')}
              disabled={!shippingInfo.averageDeliveryTime || !shippingInfo.termsAccepted || (shippingInfo.courierType === 'outsourced' && !shippingInfo.courierCompany)}
              className="!bg-gradient-to-r !from-baby-blue !to-ocean-blue hover:!opacity-90 !text-white w-full"
            >
              Complete Setup
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Progress Bar */}
      <div className="relative pt-4">
        <div className="absolute top-8 left-0 right-0 h-0.5 bg-white/10">
          <div
            className="h-full bg-baby-blue transition-all duration-300"
            style={{ width: `${(currentStep / (setupSteps.length - 1)) * 100}%` }}
          />
        </div>
        <div className="flex justify-between mb-4 relative">
          {setupSteps.map((step, index) => (
            <div
              key={step.id}
              className={`flex flex-col items-center w-40 relative ${
                index === currentStep ? 'text-baby-blue' : 
                step.isCompleted ? 'text-green-500' : 'text-white/50'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 bg-black
                ${index === currentStep ? 'border-baby-blue bg-baby-blue/20' : 
                step.isCompleted ? 'border-green-500 bg-green-500/20' : 'border-white/50 bg-white/10'}`}
              >
                {step.isCompleted ? '✓' : index + 1}
              </div>
              <p className="text-xs mt-2 text-center font-medium text-white">{step.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Current Step Content */}
      <div className="bg-black/20 rounded-2xl p-8 backdrop-blur-sm border-2 border-white/10">
        <h3 className="text-2xl font-bold mb-2 text-baby-blue">{setupSteps[currentStep].title}</h3>
        <p className="text-white text-lg mb-6">{setupSteps[currentStep].description}</p>
        {renderCurrentStep()}
      </div>

      {/* Guide Popup */}
      {showGuide && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-8 right-8 bg-white/10 backdrop-blur-md p-6 rounded-2xl border-2 border-white/20 shadow-lg max-w-md z-50"
        >
          <h4 className="text-lg font-semibold text-white mb-4">Welcome to Store Setup! 🎉</h4>
          <p className="text-base text-white mb-4">
            Let's set up your online store. We'll guide you through:
            <ul className="list-disc ml-4 mt-2 space-y-2 text-white/90">
              <li>Uploading your store logo</li>
              <li>Adding your products (physical or digital)</li>
              <li>Setting up payment information</li>
              <li>Configuring shipping options</li>
            </ul>
          </p>
          <Button
            onClick={() => setShowGuide(false)}
            variant="outline"
            className="w-full border-2 hover:bg-white/5"
          >
            Got it!
          </Button>
        </motion.div>
      )}

      {allStepsCompleted && (
        <div className="text-center">
          <Button
            onClick={onComplete}
            className="!bg-gradient-to-r !from-baby-blue !to-ocean-blue hover:!opacity-90 !text-white"
          >
            Launch Store
          </Button>
        </div>
      )}
    </div>
  );
};

const StoreDashboardView = () => (
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
    setStoreStatus(StoreStatus.PENDING);
    // Simulate approval after 2 seconds
    setTimeout(() => {
      setStoreStatus(StoreStatus.SETUP_PENDING);
      toast.success('Your store has been approved! Let&apos;s set it up.', {
        style: {
          background: '#10B981',
          color: '#fff',
        },
        duration: 4000,
      });
    }, 2000);
  };

  const handleSetupComplete = () => {
    setStoreStatus(StoreStatus.SETUP_COMPLETED);
    toast.success('Congratulations! Your store is now live.', {
      style: {
        background: '#10B981',
        color: '#fff',
      },
      duration: 4000,
    });
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
            {storeStatus === StoreStatus.SETUP_PENDING && <StoreSetupView onComplete={handleSetupComplete} />}
            {storeStatus === StoreStatus.SETUP_COMPLETED && <StoreDashboardView />}
          </motion.div>
        </div>
      </QueueModal>
    </Entity>
  );
}
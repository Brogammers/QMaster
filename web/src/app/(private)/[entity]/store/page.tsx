'use client'

import { useState } from 'react';
import Entity from '../page';
import QueueModal from '@/app/shared/QueueModal';
import { Store, ShoppingBag, Package, DollarSign, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';

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

interface FileWithPreview extends File {
  preview?: string;
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

const StoreSetupSchema = Yup.object().shape({
  logo: Yup.mixed<FileWithPreview>()
    .required('Logo is required')
    .test('fileType', 'Logo must be JPG or PNG format', (value) => {
      if (!value) return false;
      return ['image/jpeg', 'image/png'].includes(value.type);
    })
    .test('fileSize', 'Logo must be less than 5MB', (value) => {
      if (!value) return false;
      return value.size <= 5 * 1024 * 1024;
    }),
  products: Yup.array().of(
    Yup.object().shape({
      name: Yup.string()
        .min(3, 'Name must be at least 3 characters')
        .required('Name is required'),
      description: Yup.string()
        .min(10, 'Description must be at least 10 characters')
        .required('Description is required'),
      price: Yup.number()
        .min(0.01, 'Price must be greater than 0')
        .required('Price is required'),
      type: Yup.string()
        .oneOf(['physical', 'digital'], 'Invalid product type')
        .required('Product type is required'),
      stock: Yup.number()
        .when('type', {
          is: 'physical',
          then: (schema) => schema.min(1, 'Stock must be greater than 0 for physical products'),
          otherwise: (schema) => schema.min(0),
        }),
      images: Yup.array()
        .min(1, 'At least one image is required')
        .required('Product image is required'),
    })
  ).min(1, 'At least one product is required'),
  paymentInfo: Yup.object().shape({
    accountName: Yup.string()
      .min(3, 'Account name must be at least 3 characters')
      .required('Account name is required'),
    iban: Yup.string()
      .matches(/^EG\d{27}$/, 'Invalid Egyptian IBAN format')
      .required('IBAN is required'),
    bank: Yup.string()
      .required('Bank selection is required'),
  }),
  shippingInfo: Yup.object().shape({
    courierType: Yup.string()
      .oneOf(['self', 'outsourced'], 'Invalid courier type')
      .required('Delivery method is required'),
    courierCompany: Yup.string()
      .when('courierType', {
        is: 'outsourced',
        then: (schema) => schema.required('Courier company is required'),
      }),
    averageDeliveryTime: Yup.string()
      .matches(/^\d+-\d+$/, 'Must be in format x-y')
      .test('valid-range', 'First number must be less than second', (value) => {
        if (!value) return false;
        const [first, second] = value.split('-').map(Number);
        return first < second;
      })
      .required('Delivery time is required'),
    termsAccepted: Yup.boolean()
      .oneOf([true], 'You must accept the terms')
      .required('You must accept the terms'),
  }),
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
  'Emirates NBD Egypt',
  'Faisal Islamic Bank',
  'Suez Canal Bank',
  'Al Baraka Bank',
  'Abu Dhabi Islamic Bank',
  'Egyptian Gulf Bank',
  'Export Development Bank',
  'Housing and Development Bank',
  'Industrial Development Bank',
  'United Bank',
  'Ahli United Bank',
  'Misr Iran Development Bank',
  'Blom Bank Egypt'
];

const StoreSetupView = ({ onComplete }: { onComplete: () => void }) => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [showGuide, setShowGuide] = useState(true);

  const setupSteps = [
    {
      id: 'branding',
      title: 'Store Branding',
      description: 'Upload your store logo',
      isCompleted: false,
    },
    {
      id: 'products',
      title: 'Add Products',
      description: 'Add your first product',
      isCompleted: false,
    },
    {
      id: 'payment',
      title: 'Payment Setup',
      description: 'Set up your payment information',
      isCompleted: false,
    },
    {
      id: 'shipping',
      title: 'Shipping Options',
      description: 'Configure your shipping options',
      isCompleted: false,
    },
  ];

  const validateStep = async (formik: any) => {
    try {
      const stepFields = {
        0: ['logo'],
        1: ['products'],
        2: ['paymentInfo'],
        3: ['shippingInfo'],
      } as const;

      const currentStepFields = stepFields[currentStep as keyof typeof stepFields];
      await formik.validateForm();

      // Special handling for products step
      if (currentStep === 1 && formik.values.products.length === 0) {
        toast.error('Please add at least one product');
        return;
      }

      const stepErrors = currentStepFields.some(field => {
        const fieldError = formik.errors[field];
        const fieldTouched = formik.touched[field];
        const fieldValue = formik.values[field];

        // For products, check if any product is incomplete
        if (field === 'products' && fieldValue.length > 0) {
          return fieldValue.some((product: any) => 
            !product.name || !product.description || !product.price || !product.images?.length
          );
        }

        // For other fields, check if there are errors or if the field is empty
        return fieldError || (fieldTouched && !fieldValue);
      });

      if (!stepErrors) {
        if (currentStep < 3) {
          setCurrentStep(currentStep + 1);
        } else {
          await formik.submitForm();
        }
      } else {
        toast.error('Please fill in all required fields correctly');
      }
    } catch (error) {
      console.error('Validation error:', error);
      toast.error('Please fix the validation errors before continuing');
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      // Here you would typically send the data to your backend
      await onComplete();
      router.push('/store/dashboard'); // Redirect to dashboard after completion
    } catch (error) {
      toast.error('Failed to complete store setup');
    }
  };

  const renderCurrentStep = (formik: any) => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-black/10 rounded-xl p-8">
              {formik.values.logo ? (
                <div className="relative">
                  <img
                    src={URL.createObjectURL(formik.values.logo)}
                      alt="Store logo" 
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  <Button
                    onClick={() => formik.setFieldValue('logo', null)}
                    className="absolute -top-2 -right-2 !p-1 !min-w-0 rounded-full bg-red-500 hover:bg-red-600 text-white"
                  >
                    ×
                  </Button>
                  </div>
                ) : (
                <div className="text-center">
                    <input
                      type="file"
                    accept="image/jpeg,image/png"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        formik.setFieldValue('logo', file);
                      }
                    }}
                      className="hidden"
                    id="logo-upload"
                  />
                  <label
                    htmlFor="logo-upload"
                    className="cursor-pointer inline-flex flex-col items-center"
                  >
                    <Store className="w-12 h-12 text-black/50 mb-2" />
                    <span className="text-sm text-black/50">Click to upload logo</span>
                  </label>
                </div>
              )}
            </div>
            {formik.touched.logo && formik.errors.logo && (
              <p className="text-red-500 text-sm">{formik.errors.logo}</p>
            )}
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            {formik.values.products.map((product: any, index: number) => (
              <div key={index} className="border rounded-xl p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-black/70 mb-1">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name={`products.${index}.name`}
                    value={product.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-4 py-2 rounded-lg border border-black/10"
                  />
                  {formik.touched.products?.[index]?.name && formik.errors.products?.[index]?.name && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.products[index].name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-black/70 mb-1">
                    Description
                  </label>
                  <textarea
                    name={`products.${index}.description`}
                    value={product.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-4 py-2 rounded-lg border border-black/10 min-h-[100px]"
                  />
                  {formik.touched.products?.[index]?.description && formik.errors.products?.[index]?.description && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.products[index].description}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-black/70 mb-1">
                      Price (EGP)
                    </label>
                    <input
                      type="text"
                      name={`products.${index}.price`}
                      value={product.price}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9.]/g, '');
                        formik.setFieldValue(`products.${index}.price`, value);
                      }}
                      onBlur={formik.handleBlur}
                      className="w-full px-4 py-2 rounded-lg border border-black/10"
                    />
                    {formik.touched.products?.[index]?.price && formik.errors.products?.[index]?.price && (
                      <p className="text-red-500 text-sm mt-1">{formik.errors.products[index].price}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black/70 mb-1">
                      Product Type
                    </label>
                    <select
                      name={`products.${index}.type`}
                      value={product.type}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full px-4 py-2 rounded-lg border border-black/10"
                    >
                      <option value="physical">Physical Product</option>
                      <option value="digital">Digital Product</option>
                    </select>
                  </div>
                </div>

                {product.type === 'physical' && (
                  <div>
                    <label className="block text-sm font-medium text-black/70 mb-1">
                      Stock Quantity
                    </label>
                    <input
                      type="text"
                      name={`products.${index}.stock`}
                      value={product.stock}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, '');
                        formik.setFieldValue(`products.${index}.stock`, value);
                      }}
                      onBlur={formik.handleBlur}
                      className="w-full px-4 py-2 rounded-lg border border-black/10"
                    />
                    {formik.touched.products?.[index]?.stock && formik.errors.products?.[index]?.stock && (
                      <p className="text-red-500 text-sm mt-1">{formik.errors.products[index].stock}</p>
                    )}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-black/70 mb-1">
                    Product Image
                  </label>
                  <div className="flex items-center space-x-4">
                    {product.images?.length > 0 ? (
                      <div className="relative">
                        <img
                          src={URL.createObjectURL(product.images[0])}
                          alt={`Product ${index + 1}`}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          onClick={() => formik.setFieldValue(`products.${index}.images`, [])}
                          className="absolute -top-2 -right-2 !p-1 !min-w-0 rounded-full bg-red-500 hover:bg-red-600 text-white"
                        >
                          ×
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <input
                          type="file"
                          id={`product-image-${index}`}
                          accept="image/jpeg,image/png"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              formik.setFieldValue(`products.${index}.images`, [file]);
                            }
                          }}
                          className="hidden"
                        />
                        <label
                          htmlFor={`product-image-${index}`}
                          className="cursor-pointer px-4 py-2 rounded-lg bg-baby-blue hover:bg-ocean-blue text-white transition-colors inline-block"
                        >
                          Upload Image
                        </label>
                      </div>
                    )}
                  </div>
                  {formik.touched.products?.[index]?.images && formik.errors.products?.[index]?.images && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.products[index].images}</p>
                  )}
                </div>

                <Button
                  type="button"
                  onClick={() => {
                    const newProducts = [...formik.values.products];
                    newProducts.splice(index, 1);
                    formik.setFieldValue('products', newProducts);
                  }}
                  variant="outline"
                  className="w-full border-2 border-red-500 text-red-500 hover:bg-red-500/10"
                >
                  Remove Product
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={() => {
                formik.setFieldValue('products', [
                  ...formik.values.products,
                  { name: '', description: '', price: '', type: 'physical', stock: '', images: [] },
                ]);
              }}
              className="w-full !bg-gradient-to-r !from-baby-blue !to-ocean-blue hover:!opacity-90 !text-white"
            >
              Add Product
            </Button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-black/70 mb-1">
                Account Name
              </label>
              <input
                type="text"
                name="paymentInfo.accountName"
                value={formik.values.paymentInfo.accountName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-2 rounded-lg border border-black/10"
                placeholder="Enter account holder name"
              />
              {formik.touched.paymentInfo?.accountName && formik.errors.paymentInfo?.accountName && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.paymentInfo.accountName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-black/70 mb-1">
                IBAN
              </label>
              <input
                type="text"
                name="paymentInfo.iban"
                value={formik.values.paymentInfo.iban}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-2 rounded-lg border border-black/10"
                placeholder="Enter Egyptian IBAN (starts with EG)"
              />
              {formik.touched.paymentInfo?.iban && formik.errors.paymentInfo?.iban && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.paymentInfo.iban}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-black/70 mb-1">
                Bank
              </label>
              <select
                name="paymentInfo.bank"
                value={formik.values.paymentInfo.bank}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-2 rounded-lg border border-black/10"
              >
                <option value="">Select a bank</option>
                {egyptianBanks.map(bank => (
                  <option key={bank} value={bank}>{bank}</option>
                ))}
              </select>
              {formik.touched.paymentInfo?.bank && formik.errors.paymentInfo?.bank && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.paymentInfo.bank}</p>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
                <div>
              <label className="block text-sm font-medium text-black/70 mb-1">
                Delivery Method
              </label>
                  <select
                name="shippingInfo.courierType"
                value={formik.values.shippingInfo.courierType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-2 rounded-lg border border-black/10"
              >
                <option value="self">Self-Delivery</option>
                    <option value="outsourced">Outsourced Courier</option>
                  </select>
              {formik.touched.shippingInfo?.courierType && formik.errors.shippingInfo?.courierType && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.shippingInfo.courierType}</p>
              )}
            </div>
            {/* Add other shipping fields similarly */}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Formik
      initialValues={{
        logo: null,
        products: [],
        paymentInfo: {
          accountName: '',
          iban: '',
          bank: '',
        },
        shippingInfo: {
          courierType: 'self',
          courierCompany: '',
          averageDeliveryTime: '',
          termsAccepted: false,
        },
      }}
      validationSchema={StoreSetupSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form className="space-y-8">
          {/* Progress Bar */}
          <div className="relative pt-4">
            <div className="absolute top-8 left-0 right-0 h-0.5 bg-black/10">
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
                    step.isCompleted ? 'text-green-500' : 'text-black/50'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2
                    ${index === currentStep ? 'border-baby-blue bg-baby-blue/20 text-baby-blue' : 
                    step.isCompleted ? 'border-green-500 bg-green-500/20 text-green-500' : 'border-black/50 bg-black/10 text-black/50'}`}
                  >
                    {step.isCompleted ? '✓' : index + 1}
                  </div>
                  <p className="text-xs mt-2 text-center font-medium text-black">{step.title}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Current Step Content */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-black/10">
            <h3 className="text-2xl font-bold mb-2 text-baby-blue">{setupSteps[currentStep].title}</h3>
            <p className="text-black text-lg mb-6">{setupSteps[currentStep].description}</p>
            {renderCurrentStep(formik)}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between gap-4">
            <Button
              type="button"
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              variant="outline"
              className="flex-1 border-2 border-baby-blue text-baby-blue hover:bg-baby-blue/10"
            >
              Back
            </Button>
            <Button
              type="button"
              onClick={() => validateStep(formik)}
              className="flex-1 !bg-gradient-to-r !from-baby-blue !to-ocean-blue hover:!opacity-90 !text-white"
            >
              {currentStep === setupSteps.length - 1 ? 'Complete Setup' : 'Continue'}
            </Button>
          </div>

          {/* Guide Popup */}
          {showGuide && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="fixed bottom-8 right-8 bg-white shadow-lg p-6 rounded-2xl border border-black/10 max-w-md z-50"
            >
              <h4 className="text-lg font-semibold text-black mb-4">Welcome to Store Setup! 🎉</h4>
              <p className="text-base text-black mb-4">
                Let&apos;s set up your online store. We&apos;ll guide you through:
                <ul className="list-disc ml-4 mt-2 space-y-2 text-black/80">
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
        </Form>
      )}
    </Formik>
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
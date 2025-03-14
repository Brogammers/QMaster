"use client";

import ExportProductsModal from "@/app/components/store/ExportProductsModal";
import ProductGridView, {
  Product,
} from "@/app/components/store/ProductGridView";
import ProductManagementModal from "@/app/components/store/ProductManagementModal";
import ProductPreviewModal from "@/app/components/store/ProductPreviewModal";
import QueueModal from "@/app/shared/QueueModal";
import { Button } from "@/components/ui/button";
import { useLocation } from "@/ctx/LocationContext";
import axios from "axios";
import { Form, Formik } from "formik";
import { motion } from "framer-motion";
import {
  DollarSign,
  Package,
  ShoppingBag,
  Store,
  Trash2,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import toast from "react-hot-toast";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import * as Yup from "yup";
import Entity from "../page";
import Image from "next/image";
import { withRoleProtection } from "@/lib/auth/withRoleProtection";

const StoreStatus = {
  NOT_REQUESTED: "NOT_REQUESTED",
  DOCUMENTS_PENDING: "DOCUMENTS_PENDING",
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  SETUP_PENDING: "SETUP_PENDING",
  SETUP_COMPLETED: "SETUP_COMPLETED",
} as const;

type StoreStatus = (typeof StoreStatus)[keyof typeof StoreStatus];

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
    type: "Commercial Registration",
    description:
      "Valid commercial registration certificate (CR) from the Egyptian Commercial Registry",
  },
  {
    type: "Tax Card",
    description: "Valid tax card showing your tax registration number",
  },
  {
    type: "VAT Registration",
    description:
      "VAT registration certificate if applicable (for businesses with annual revenue over EGP 500,000)",
  },
  {
    type: "National ID",
    description: "Copy of the business owner's national ID",
  },
  {
    type: "Bank Account",
    description: "Business bank account details",
  },
];

const StoreRequestView = ({ onRequest }: StoreRequestViewProps) => (
  <div className="p-8 text-center">
    <Store className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
    <h2 className="text-2xl font-semibold mb-4">Start Selling Online</h2>
    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
      Transform your physical store into an online marketplace. Reach more
      customers and increase your revenue with QMaster&apos;s e-commerce
      solution.
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

const DocumentUploadView = ({
  onSubmit,
}: {
  onSubmit: (files: Document[]) => void;
}) => {
  const [documents, setDocuments] = useState<Document[]>(
    requiredDocuments.map((doc) => ({ type: doc.type, file: null }))
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
      toast.success("Documents submitted successfully!", {
        duration: 5000,
        style: {
          background: "#17222D",
          color: "#FFF",
        },
      });
    } catch (error) {
      toast.error("Error submitting documents. Please try again.", {
        duration: 5000,
        style: {
          background: "#17222D",
          color: "#FFF",
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Required Documents
      </h2>
      <p className="text-muted-foreground mb-8 text-center max-w-2xl mx-auto">
        To comply with Egyptian e-commerce regulations, please provide the
        following documents. All documents must be clear, valid, and in PDF
        format.
      </p>

      <div className="space-y-6 max-w-2xl mx-auto">
        {requiredDocuments.map((doc, index) => (
          <div
            key={doc.type}
            className="p-4 border-2 border-white/20 rounded-xl backdrop-blur-sm"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-lg">{doc.type}</h3>
                <p className="text-sm text-muted-foreground">
                  {doc.description}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <label className="cursor-pointer text-sm px-4 py-2 rounded-full bg-baby-blue hover:bg-ocean-blue transition-colors text-white w-[120px] text-center">
                  {documents[index].file ? "Replace File" : "Attach File"}
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) =>
                      handleFileChange(index, e.target.files?.[0] || null)
                    }
                    className="hidden"
                  />
                </label>
                {documents[index].file && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-green-500">✓</span>
                    <span className="max-w-[200px] truncate text-white/70">
                      {documents[index].file.name}
                    </span>
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
          disabled={!documents.every((doc) => doc.file) || isSubmitting}
          className="!bg-gradient-to-r !from-baby-blue !to-ocean-blue hover:!opacity-90 !text-white"
        >
          {isSubmitting ? "Submitting..." : "Submit Documents"}
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
      We are reviewing your submitted documents. This process typically takes
      2-3 business days. We&apos;ll notify you via email once the review is
      complete.
    </p>
  </div>
);

const courierCompanies = [
  "Aramex",
  "Bosta",
  "DHL Express",
  "Egypt Post",
  "EGEX",
  "FedEx Express",
  "Fetchr",
  "J&T Express",
  "Mylerz",
  "Naqel Express",
  "R2S",
  "UPS",
].sort();

const StoreSetupSchema = Yup.object().shape({
  logo: Yup.mixed<FileWithPreview>()
    .required("Logo is required")
    .test("fileType", "Logo must be JPG or PNG format", (value) => {
      if (!value) return false;
      return ["image/jpeg", "image/png"].includes(value.type);
    })
    .test("fileSize", "Logo must be less than 5MB", (value) => {
      if (!value) return false;
      return value.size <= 5 * 1024 * 1024;
    }),
  products: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string()
          .min(3, "Name must be at least 3 characters")
          .required("Name is required"),
        description: Yup.string()
          .min(10, "Description must be at least 10 characters")
          .required("Description is required"),
        price: Yup.number()
          .min(0.01, "Price must be greater than 0")
          .required("Price is required"),
        type: Yup.string()
          .oneOf(["PHYSICAL", "DIGITAL"], "Invalid product type")
          .required("Product type is required"),
        quantity: Yup.number().when("type", {
          is: "PHYSICAL",
          then: (schema) =>
            schema.min(1, "Stock must be greater than 0 for physical products"),
          otherwise: (schema) => schema.min(0),
        }),
        images: Yup.array()
          .min(1, "At least one image is required")
          .required("Product image is required"),
      })
    )
    .min(1, "At least one product is required"),
  paymentInfo: Yup.object().shape({
    accountName: Yup.string()
      .min(3, "Account name must be at least 3 characters")
      .required("Account name is required"),
    iban: Yup.string()
      .matches(/^EG\d{27}$/, "Invalid Egyptian IBAN format")
      .required("IBAN is required"),
    bank: Yup.string().required("Bank selection is required"),
  }),
  shippingInfo: Yup.object().shape({
    deliveryOptions: Yup.array()
      .min(1, "Select at least one delivery option")
      .required("Select at least one delivery option"),
    courierType: Yup.string().when("deliveryOptions", {
      is: (options: string[]) => options.includes("shipping"),
      then: (schema) =>
        schema
          .oneOf(["self", "outsourced"], "Invalid courier type")
          .required("Delivery method is required"),
    }),
    courierCompany: Yup.string().when(["deliveryOptions", "courierType"], {
      is: (options: string[], type: string) =>
        options.includes("shipping") && type === "outsourced",
      then: (schema) => schema.required("Courier company is required"),
    }),
    averageDeliveryTime: Yup.string().when(["deliveryOptions", "courierType"], {
      is: (options: string[], type: string) =>
        options.includes("shipping") && type === "self",
      then: (schema) =>
        schema
          .matches(
            /^\d+-\d+ business days$/,
            "Must be in format x-y business days"
          )
          .test(
            "valid-range",
            "First number must be less than second",
            (value) => {
              if (!value) return false;
              const [range] = value.split(" business days");
              const [first, second] = range.split("-").map(Number);
              return first < second;
            }
          )
          .required("Delivery time is required"),
    }),
    termsAccepted: Yup.boolean().when("deliveryOptions", {
      is: (options: string[]) => options.includes("shipping"),
      then: (schema) =>
        schema
          .oneOf([true], "You must accept the terms")
          .required("You must accept the terms"),
    }),
  }),
});

const egyptianBanks = [
  "National Bank of Egypt",
  "Banque Misr",
  "Commercial International Bank",
  "QNB Al Ahli",
  "Arab African International Bank",
  "HSBC Egypt",
  "Credit Agricole Egypt",
  "Arab Bank",
  "Bank of Alexandria",
  "Emirates NBD Egypt",
  "Faisal Islamic Bank",
  "Suez Canal Bank",
  "Al Baraka Bank",
  "Abu Dhabi Islamic Bank",
  "Egyptian Gulf Bank",
  "Export Development Bank",
  "Housing and Development Bank",
  "Industrial Development Bank",
  "United Bank",
  "Ahli United Bank",
  "Misr Iran Development Bank",
  "Blom Bank Egypt",
];

const StoreSetupView = ({ onComplete }: { onComplete: () => void }) => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [showGuide, setShowGuide] = useState(true);
  const { selectedLocation } = useLocation();

  const setupSteps = [
    {
      id: "logo",
      title: "Store Logo",
      description: "Upload your store logo",
      isCompleted: false,
    },
    {
      id: "products",
      title: "Add Products",
      description: "Add your first product",
      isCompleted: false,
    },
    {
      id: "payment",
      title: "Payment Setup",
      description: "Set up your payment information",
      isCompleted: false,
    },
    {
      id: "shipping",
      title: "Shipping Options",
      description: "Configure your shipping options",
      isCompleted: false,
    },
  ];

  const validateStep = async (formik: any) => {
    try {
      const stepFields = {
        0: ["logo"],
        1: ["products"],
        2: ["paymentInfo"],
        3: ["shippingInfo"],
      } as const;

      const currentStepFields =
        stepFields[currentStep as keyof typeof stepFields];

      // Validate the entire form
      const errors = await formik.validateForm();

      // Special handling for products step
      if (currentStep === 1 && formik.values.products.length === 0) {
        toast.error("Please add at least one product", {
          duration: 5000,
          style: {
            background: "#17222D",
            color: "#FFF",
          },
        });
        return;
      }

      // Check for errors in current step fields
      const hasStepErrors = currentStepFields.some((field) => {
        return errors[field];
      });

      if (!hasStepErrors) {
        if (currentStep < 3) {
          setCurrentStep(currentStep + 1);
        } else {
          // On final step, check if the entire form is valid
          const isValid = Object.keys(errors).length === 0;
          if (isValid) {
            await formik.submitForm();
          } else {
            toast.error("Please fill in all required fields correctly", {
              duration: 5000,
              style: {
                background: "#17222D",
                color: "#FFF",
              },
            });
          }
        }
      } else {
        toast.error("Please fill in all required fields correctly", {
          duration: 5000,
          style: {
            background: "#17222D",
            color: "#FFF",
          },
        });
      }
    } catch (error) {
      console.error("Validation error:", error);
      toast.error("Please fix the validation errors before continuing", {
        duration: 5000,
        style: {
          background: "#17222D",
          color: "#FFF",
        },
      });
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      const url = process.env.NEXT_PUBLIC_API_BASE_URL_SETUP_STORE || "";

      axios
        .post(url, { ...values, locationId: selectedLocation?.id })
        .then((response) => {
          if (response.status === 201) {
            return response.data;
          } else {
            throw new Error("Failed to complete store setup");
          }
        })
        .then(async (data) => {
          console.log(data);

          // Show success message
          toast.success("Store setup completed successfully!", {
            duration: 5000,
            style: {
              background: "#17222D",
              color: "#FFF",
            },
          });

          // Call the onComplete callback to update the store status
          await onComplete();
        });
    } catch (error) {
      console.error("Failed to complete store setup:", error);
      toast.error("Failed to complete store setup. Please try again.", {
        duration: 5000,
        style: {
          background: "#17222D",
          color: "#FFF",
        },
      });
    }
  };

  const renderCurrentStep = (formik: any) => {
    switch (currentStep) {
      case 0:
        return (
          <div className="flex flex-col items-center justify-center">
            <div className="w-40 h-40 mb-8">
              <div className="relative w-full h-full flex items-center justify-center border-2 border-dashed border-black/10 rounded-xl bg-white/5">
                {formik.values.logo ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={URL.createObjectURL(formik.values.logo)}
                      alt="Store logo"
                      fill
                      className="w-full h-full object-contain rounded-lg"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <Button
                      onClick={() => formik.setFieldValue("logo", null)}
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
                          formik.setFieldValue("logo", file);
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
                      <span className="text-sm text-black/50">
                        Click to upload logo
                      </span>
                      <span className="text-xs text-black/40 mt-1">
                        JPG or PNG, max 5MB
                      </span>
                    </label>
                  </div>
                )}
              </div>
            </div>
            {formik.touched.logo && formik.errors.logo && (
              <p className="text-red-500 text-sm mt-2">{formik.errors.logo}</p>
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
                  {formik.touched.products?.[index]?.name &&
                    formik.errors.products?.[index]?.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {formik.errors.products[index].name}
                      </p>
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
                  {formik.touched.products?.[index]?.description &&
                    formik.errors.products?.[index]?.description && (
                      <p className="text-red-500 text-sm mt-1">
                        {formik.errors.products[index].description}
                      </p>
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
                        const value = e.target.value.replace(/[^0-9.]/g, "");
                        formik.setFieldValue(`products.${index}.price`, value);
                      }}
                      onBlur={formik.handleBlur}
                      className="w-full px-4 py-2 rounded-lg border border-black/10"
                    />
                    {formik.touched.products?.[index]?.price &&
                      formik.errors.products?.[index]?.price && (
                        <p className="text-red-500 text-sm mt-1">
                          {formik.errors.products[index].price}
                        </p>
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
                      <option value="PHYSICAL">Physical Product</option>
                      <option value="DIGITAL">Digital Product</option>
                    </select>
                  </div>
                </div>

                {product.type === "PHYSICAL" && (
                  <div>
                    <label className="block text-sm font-medium text-black/70 mb-1">
                      Stock Quantity
                    </label>
                    <input
                      type="text"
                      name={`products.${index}.quantity`}
                      value={product.quantity}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, "");
                        formik.setFieldValue(
                          `products.${index}.quantity`,
                          value
                        );
                      }}
                      onBlur={formik.handleBlur}
                      className="w-full px-4 py-2 rounded-lg border border-black/10"
                    />
                    {formik.touched.products?.[index]?.quantity &&
                      formik.errors.products?.[index]?.quantity && (
                        <p className="text-red-500 text-sm mt-1">
                          {formik.errors.products[index].quantity}
                        </p>
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
                        <Image
                          src={URL.createObjectURL(product.images[0])}
                          alt={`Product ${index + 1}`}
                          fill
                          className="w-24 h-24 object-cover rounded-lg"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <Button
                          type="button"
                          onClick={() =>
                            formik.setFieldValue(`products.${index}.images`, [])
                          }
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
                              formik.setFieldValue(`products.${index}.images`, [
                                file,
                              ]);
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
                  {formik.touched.products?.[index]?.images &&
                    formik.errors.products?.[index]?.images && (
                      <p className="text-red-500 text-sm mt-1">
                        {formik.errors.products[index].images}
                      </p>
                    )}
                </div>

                <Button
                  type="button"
                  onClick={() => {
                    const newProducts = [...formik.values.products];
                    newProducts.splice(index, 1);
                    formik.setFieldValue("products", newProducts);
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
                formik.setFieldValue("products", [
                  ...formik.values.products,
                  {
                    name: "",
                    description: "",
                    price: "",
                    type: "PHYSICAL",
                    quantity: "",
                    images: [],
                  },
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
              {formik.touched.paymentInfo?.accountName &&
                formik.errors.paymentInfo?.accountName && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.paymentInfo.accountName}
                  </p>
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
              {formik.touched.paymentInfo?.iban &&
                formik.errors.paymentInfo?.iban && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.paymentInfo.iban}
                  </p>
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
                {egyptianBanks.map((bank) => (
                  <option key={bank} value={bank}>
                    {bank}
                  </option>
                ))}
              </select>
              {formik.touched.paymentInfo?.bank &&
                formik.errors.paymentInfo?.bank && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.paymentInfo.bank}
                  </p>
                )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-black/70 mb-1">
                Delivery Options
              </label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formik.values.shippingInfo.deliveryOptions?.includes(
                      "pickup"
                    )}
                    onChange={(e) => {
                      const currentOptions =
                        formik.values.shippingInfo.deliveryOptions || [];
                      const newOptions = e.target.checked
                        ? [...currentOptions, "pickup"]
                        : currentOptions.filter(
                            (opt: string) => opt !== "pickup"
                          );
                      formik.setFieldValue(
                        "shippingInfo.deliveryOptions",
                        newOptions
                      );
                    }}
                    className="rounded border-black/10"
                  />
                  <span>Pickup at Location</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formik.values.shippingInfo.deliveryOptions?.includes(
                      "shipping"
                    )}
                    onChange={(e) => {
                      const currentOptions =
                        formik.values.shippingInfo.deliveryOptions || [];
                      const newOptions = e.target.checked
                        ? [...currentOptions, "shipping"]
                        : currentOptions.filter(
                            (opt: string) => opt !== "shipping"
                          );
                      formik.setFieldValue(
                        "shippingInfo.deliveryOptions",
                        newOptions
                      );
                    }}
                    className="rounded border-black/10"
                  />
                  <span>Delivery Service</span>
                </label>
              </div>
              {formik.touched.shippingInfo?.deliveryOptions &&
                formik.errors.shippingInfo?.deliveryOptions && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.shippingInfo.deliveryOptions}
                  </p>
                )}
            </div>

            {formik.values.shippingInfo.deliveryOptions?.includes(
              "shipping"
            ) && (
              <>
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
                  {formik.touched.shippingInfo?.courierType &&
                    formik.errors.shippingInfo?.courierType && (
                      <p className="text-red-500 text-sm mt-1">
                        {formik.errors.shippingInfo.courierType}
                      </p>
                    )}
                </div>

                {formik.values.shippingInfo.courierType === "outsourced" ? (
                  <div>
                    <label className="block text-sm font-medium text-black/70 mb-1">
                      Courier Company
                    </label>
                    <select
                      name="shippingInfo.courierCompany"
                      value={formik.values.shippingInfo.courierCompany}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full px-4 py-2 rounded-lg border border-black/10"
                    >
                      <option value="">Select a courier company</option>
                      {courierCompanies.map((company) => (
                        <option key={company} value={company}>
                          {company}
                        </option>
                      ))}
                    </select>
                    {formik.touched.shippingInfo?.courierCompany &&
                      formik.errors.shippingInfo?.courierCompany && (
                        <p className="text-red-500 text-sm mt-1">
                          {formik.errors.shippingInfo.courierCompany}
                        </p>
                      )}
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-black/70 mb-1">
                      Average Delivery Time
                    </label>
                    <input
                      type="text"
                      name="shippingInfo.averageDeliveryTime"
                      value={formik.values.shippingInfo.averageDeliveryTime}
                      onChange={(e) => {
                        const value = e.target.value;
                        // Only allow numbers and a single hyphen
                        if (value.split("-").length > 2) return;
                        if (
                          /^(\d*-?\d*)?$/.test(
                            value.replace(" business days", "")
                          )
                        ) {
                          formik.setFieldValue(
                            "shippingInfo.averageDeliveryTime",
                            value
                          );
                        }
                      }}
                      onBlur={(e) => {
                        const value = e.target.value
                          .replace(" business days", "")
                          .trim();
                        // Must have exactly two numbers separated by a hyphen
                        const match = value.match(/^(\d+)-(\d+)$/);
                        if (!match) {
                          formik.setFieldValue(
                            "shippingInfo.averageDeliveryTime",
                            ""
                          );
                          return;
                        }

                        const [_, first, second] = match;
                        const num1 = parseInt(first);
                        const num2 = parseInt(second);

                        if (!isNaN(num1) && !isNaN(num2) && num1 < num2) {
                          formik.setFieldValue(
                            "shippingInfo.averageDeliveryTime",
                            `${num1}-${num2} business days`
                          );
                        } else {
                          formik.setFieldValue(
                            "shippingInfo.averageDeliveryTime",
                            ""
                          );
                        }
                      }}
                      className="w-full px-4 py-2 rounded-lg border border-black/10"
                      placeholder="e.g., 2-3"
                    />
                    {formik.touched.shippingInfo?.averageDeliveryTime &&
                      formik.errors.shippingInfo?.averageDeliveryTime && (
                        <p className="text-red-500 text-sm mt-1">
                          {formik.errors.shippingInfo.averageDeliveryTime}
                        </p>
                      )}
                  </div>
                )}

                <div className="p-4 bg-white/5 rounded-xl border border-black/10">
                  <label className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      name="shippingInfo.termsAccepted"
                      checked={formik.values.shippingInfo.termsAccepted}
                      onChange={formik.handleChange}
                      className="mt-1 rounded border-black/10"
                    />
                    <span className="text-sm text-black/70">
                      I acknowledge and agree that I am solely responsible for
                      fulfilling all orders and delivering products to
                      customers. QMaster acts solely as an intermediary platform
                      facilitating the transaction between my business and
                      customers. I understand that I am liable for ensuring
                      timely delivery, product quality, and handling any
                      shipping-related issues or returns. QMaster is not
                      responsible for any delivery delays, damages, or disputes
                      arising from the shipping process.
                    </span>
                  </label>
                  {formik.touched.shippingInfo?.termsAccepted &&
                    formik.errors.shippingInfo?.termsAccepted && (
                      <p className="text-red-500 text-sm mt-1">
                        {formik.errors.shippingInfo.termsAccepted}
                      </p>
                    )}
                </div>
              </>
            )}
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
          accountName: "",
          iban: "",
          bank: "",
        },
        shippingInfo: {
          deliveryOptions: [],
          courierType: "self",
          courierCompany: "",
          averageDeliveryTime: "",
          termsAccepted: false,
        },
      }}
      validationSchema={StoreSetupSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          setSubmitting(true);
          await handleSubmit(values);
        } catch (error) {
          console.error("Form submission error:", error);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {(formik) => (
        <Form className="space-y-8">
          {/* Progress Bar */}
          <div className="relative pt-4">
            <div className="absolute top-8 left-0 right-0 h-0.5 bg-black/10">
              <div
                className="h-full bg-baby-blue transition-all duration-300"
                style={{
                  width: `${(currentStep / (setupSteps.length - 1)) * 100}%`,
                }}
              />
            </div>
            <div className="flex justify-between mb-4 relative">
              {setupSteps.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex flex-col items-center w-40 relative ${
                    index === currentStep
                      ? "text-baby-blue"
                      : step.isCompleted
                      ? "text-green-500"
                      : "text-black/50"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border-2 bg-white
                    ${
                      index === currentStep
                        ? "border-baby-blue bg-baby-blue/20 text-baby-blue"
                        : step.isCompleted
                        ? "border-green-500 bg-green-500/20 text-green-500"
                        : "border-black/50 bg-black/10 text-black/50"
                    }`}
                  >
                    {step.isCompleted ? "✓" : index + 1}
                  </div>
                  <p className="text-xs mt-2 text-center font-medium text-black">
                    {step.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Current Step Content */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-black/10">
            <h3 className="text-2xl font-bold mb-2 text-baby-blue">
              {setupSteps[currentStep].title}
            </h3>
            <p className="text-black text-lg mb-6">
              {setupSteps[currentStep].description}
            </p>
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
              {currentStep === setupSteps.length - 1
                ? "Complete Setup"
                : "Continue"}
            </Button>
          </div>

          {/* Guide Popup */}
          {showGuide && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="fixed bottom-8 right-8 bg-white shadow-lg p-6 rounded-2xl border border-black/10 max-w-md z-50"
            >
              <h4 className="text-lg font-semibold text-black mb-2">
                Welcome to Store Setup! 🎉
              </h4>
              <p className="text-sm text-black/70 mb-4">
                Let&apos;s set up your online store. We&apos;ll guide you
                through:
              </p>
              <ul className="list-disc ml-4 mb-4 space-y-1 text-sm text-black/60">
                <li>Uploading your store logo</li>
                <li>Adding your products</li>
                <li>Setting up payment information</li>
                <li>Configuring shipping options</li>
              </ul>
              <Button
                onClick={() => setShowGuide(false)}
                className="w-full !bg-gradient-to-r !from-baby-blue !to-ocean-blue hover:!opacity-90 !text-white"
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

// Add mock data for graphs
const mockGraphData = {
  revenue: [
    { name: "Jan", value: 3000 },
    { name: "Feb", value: 4500 },
    { name: "Mar", value: 3800 },
    { name: "Apr", value: 5200 },
    { name: "May", value: 4800 },
    { name: "Jun", value: 6000 },
  ],
  orders: [
    { name: "Jan", value: 25 },
    { name: "Feb", value: 40 },
    { name: "Mar", value: 35 },
    { name: "Apr", value: 50 },
    { name: "May", value: 45 },
    { name: "Jun", value: 60 },
  ],
};

const StoreDashboardView = () => {
  // Add state for modals and views
  const [showProductManagement, setShowProductManagement] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [showStorePreview, setShowStorePreview] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showProductPreview, setShowProductPreview] = useState(false);
  const [isManagingProducts, setIsManagingProducts] = useState(false);
  const [showProductGrid, setShowProductGrid] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const { selectedLocation } = useLocation();

  // Mock data for testing
  const mockAnalytics = {
    orders: {
      total: 142,
      change: 12.5, // percentage change
      pending: 15,
      completed: 120,
      cancelled: 7,
    },
    products: {
      total: 45,
      inStock: 38,
      lowStock: 5,
      outOfStock: 2,
      change: 8.3,
    },
    revenue: {
      total: 12500,
      change: -2.1,
      thisMonth: 4200,
      lastMonth: 4300,
    },
    customers: {
      total: 89,
      change: 15.7,
      returning: 45,
      new: 44,
    },
  };

  const handleDeleteProduct = (productId: number) => {
    const url = process.env.NEXT_PUBLIC_API_BASE_URL_PRODUCT || "";
    axios
      .delete(url, {
        data: {
          productId: productId,
          locationId: selectedLocation?.id,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          return;
        } else {
          throw new Error("Failed to delete product");
        }
      })
      .then(() => {
        setProducts((prev) =>
          prev.filter((product) => product.id !== productId)
        );
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  const handleAddOnSubmit = (formData: Product) => {
    const url = process.env.NEXT_PUBLIC_API_BASE_URL_PRODUCT || "";

    const data = {
      ...formData,
      locationId: selectedLocation?.id,
    };

    axios
      .post(url, data)
      .then((response) => {
        if (response.status === 201) {
          return response.data.product;
        } else {
          throw new Error("Failed to add product");
        }
      })
      .then((data) => {
        const product = {
          ...data,
          status:
            data.quantity > 10
              ? "in_stock"
              : data.quantity > 0
              ? "low_stock"
              : "out_of_stock",
        };
        setSelectedProduct(null);
        setProducts([...products, product]);
        toast.success("Product added successfully!", {
          duration: 5000,
          style: {
            background: "#17222D",
            color: "#FFF",
          },
        });
      })
      .catch(() => {
        toast.error("Failed to add product. Please try again.", {
          duration: 5000,
          style: {
            background: "#17222D",
            color: "#FFF",
          },
        });
      });

    setShowProductManagement(false);
  };

  const handleEditOnSubmit = () => {};

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_API_BASE_URL_GET_PRODUCT_LIST;

    axios
      .get(
        `${url}?page=${page}&per-page=${perPage}&locationId=${selectedLocation?.id}`
      )
      .then((response) => {
        if (response.status === 200) {
          return response.data.products.content;
        } else {
          throw new Error("Failed to fetch product data");
        }
      })
      .then((data) => {
        const productsData: Product[] = data.map((product: any) => {
          return {
            id: product.id,
            name: product.name,
            price: product.price,
            description: product.description,
            quantity: product.quantity,
            status:
              product.quantity > 10
                ? "in_stock"
                : product.quantity > 0
                ? "low_stock"
                : "out_of_stock",
            image: null,
          };
        });

        setProducts(productsData);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }, [selectedLocation, page, perPage]);

  if (showProductGrid) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Store Products</h2>
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="border-2 border-baby-blue text-baby-blue hover:bg-baby-blue/5 bg-transparent"
              onClick={() => setShowProductGrid(false)}
            >
              Back to Dashboard
            </Button>
            <Button
              variant="outline"
              className="border-2 border-red-500 text-red-500 hover:bg-red-500/5 bg-transparent"
              onClick={() => setIsDeleteMode(!isDeleteMode)}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              {isDeleteMode ? "Cancel Delete" : "Delete Products"}
            </Button>
          </div>
        </div>

        <ProductGridView
          products={products}
          mode="view"
          onDelete={handleDeleteProduct}
          isDeleteMode={isDeleteMode}
          onCancelDelete={() => setIsDeleteMode(false)}
          onProductClick={(product) => {
            if (!isDeleteMode) {
              setSelectedProduct(product);
              setShowProductPreview(true);
            }
          }}
        />

        {/* Modals */}
        <ProductManagementModal
          isOpen={showProductManagement}
          onClose={() => {
            setShowProductManagement(false);
            setSelectedProduct(null);
          }}
          product={selectedProduct}
          mode={selectedProduct ? "edit" : "add"}
          onSubmit={selectedProduct ? handleEditOnSubmit : handleAddOnSubmit}
        />

        {selectedProduct && (
          <ProductPreviewModal
            isOpen={showProductPreview}
            onClose={() => {
              setShowProductPreview(false);
              setSelectedProduct(null);
            }}
            product={selectedProduct}
          />
        )}
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={() => {}}>
      <div className="space-y-8">
        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-6 bg-white rounded-2xl shadow-sm border border-black/10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <ShoppingBag className="h-10 w-10 text-baby-blue" />
                <div>
                  <p className="text-sm text-black/70">Total Orders</p>
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-bold">
                      {mockAnalytics.orders.total}
                    </h3>
                    <span
                      className={`text-sm ${
                        mockAnalytics.orders.change >= 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {mockAnalytics.orders.change >= 0 ? "↑" : "↓"}{" "}
                      {Math.abs(mockAnalytics.orders.change)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-sm">
              <div className="p-2 rounded-lg bg-green-50">
                <p className="text-green-600 font-medium">
                  {mockAnalytics.orders.completed}
                </p>
                <p className="text-black/50">Completed</p>
              </div>
              <div className="p-2 rounded-lg bg-yellow-50">
                <p className="text-yellow-600 font-medium">
                  {mockAnalytics.orders.pending}
                </p>
                <p className="text-black/50">Pending</p>
              </div>
              <div className="p-2 rounded-lg bg-red-50">
                <p className="text-red-600 font-medium">
                  {mockAnalytics.orders.cancelled}
                </p>
                <p className="text-black/50">Cancelled</p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-sm border border-black/10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <Package className="h-10 w-10 text-baby-blue" />
                <div>
                  <p className="text-sm text-black/70">Products</p>
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-bold">
                      {mockAnalytics.products.total}
                    </h3>
                    <span
                      className={`text-sm ${
                        mockAnalytics.products.change >= 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {mockAnalytics.products.change >= 0 ? "↑" : "↓"}{" "}
                      {Math.abs(mockAnalytics.products.change)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-sm">
              <div className="p-2 rounded-lg bg-green-50">
                <p className="text-green-600 font-medium">
                  {mockAnalytics.products.inStock}
                </p>
                <p className="text-black/50">In Stock</p>
              </div>
              <div className="p-2 rounded-lg bg-yellow-50">
                <p className="text-yellow-600 font-medium">
                  {mockAnalytics.products.lowStock}
                </p>
                <p className="text-black/50">Low Stock</p>
              </div>
              <div className="p-2 rounded-lg bg-red-50">
                <p className="text-red-600 font-medium">
                  {mockAnalytics.products.outOfStock}
                </p>
                <p className="text-black/50">Out of Stock</p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-sm border border-black/10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <DollarSign className="h-10 w-10 text-baby-blue" />
                <div>
                  <p className="text-sm text-black/70">Revenue</p>
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-bold">
                      EGP {mockAnalytics.revenue.total}
                    </h3>
                    <span
                      className={`text-sm ${
                        mockAnalytics.revenue.change >= 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {mockAnalytics.revenue.change >= 0 ? "↑" : "↓"}{" "}
                      {Math.abs(mockAnalytics.revenue.change)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center text-sm">
              <div className="p-2 rounded-lg bg-blue-50">
                <p className="text-blue-600 font-medium">
                  EGP {mockAnalytics.revenue.thisMonth}
                </p>
                <p className="text-black/50">This Month</p>
              </div>
              <div className="p-2 rounded-lg bg-gray-50">
                <p className="text-gray-600 font-medium">
                  EGP {mockAnalytics.revenue.lastMonth}
                </p>
                <p className="text-black/50">Last Month</p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-sm border border-black/10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <Users className="h-10 w-10 text-baby-blue" />
                <div>
                  <p className="text-sm text-black/70">Customers</p>
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-bold">
                      {mockAnalytics.customers.total}
                    </h3>
                    <span
                      className={`text-sm ${
                        mockAnalytics.customers.change >= 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {mockAnalytics.customers.change >= 0 ? "↑" : "↓"}{" "}
                      {Math.abs(mockAnalytics.customers.change)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center text-sm">
              <div className="p-2 rounded-lg bg-purple-50">
                <p className="text-purple-600 font-medium">
                  {mockAnalytics.customers.returning}
                </p>
                <p className="text-black/50">Returning</p>
              </div>
              <div className="p-2 rounded-lg bg-indigo-50">
                <p className="text-indigo-600 font-medium">
                  {mockAnalytics.customers.new}
                </p>
                <p className="text-black/50">New</p>
              </div>
            </div>
          </div>
        </div>

        {/* Graphs */}
        <Droppable droppableId="graphs" direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <Draggable draggableId="revenue-graph" index={0}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="p-6 bg-white rounded-2xl shadow-sm border border-black/10 transition-transform hover:scale-[1.02]"
                  >
                    <h3 className="text-lg font-semibold mb-4">
                      Revenue Trend
                    </h3>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={mockGraphData.revenue}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#0EA5E9"
                            strokeWidth={2}
                            dot={{ fill: "#0EA5E9" }}
                            activeDot={{ r: 8 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}
              </Draggable>

              <Draggable draggableId="orders-graph" index={1}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="p-6 bg-white rounded-2xl shadow-sm border border-black/10 transition-transform hover:scale-[1.02]"
                  >
                    <h3 className="text-lg font-semibold mb-4">Orders Trend</h3>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={mockGraphData.orders}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#0EA5E9"
                            strokeWidth={2}
                            dot={{ fill: "#0EA5E9" }}
                            activeDot={{ r: 8 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}
              </Draggable>
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        {/* Quick Inventory Overview */}
        <div className="bg-white rounded-2xl shadow-sm border border-black/10 p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold mb-1">
                Quick Inventory Overview
              </h2>
              <p className="text-sm text-black/60">Showing top 3 products</p>
            </div>
            <div className="flex gap-4">
              <Button
                variant="outline"
                className="border-2 border-baby-blue text-baby-blue hover:bg-baby-blue/5 bg-transparent"
                onClick={() => setShowExport(true)}
              >
                Export
              </Button>
              <Button
                className="!bg-gradient-to-r !from-baby-blue !to-ocean-blue hover:!opacity-90 !text-white"
                onClick={() => setShowProductManagement(true)}
              >
                Add Product
              </Button>
              <Button
                className="!bg-gradient-to-r !from-baby-blue !to-ocean-blue hover:!opacity-90 !text-white"
                onClick={() => {
                  setIsManagingProducts(false);
                  setShowProductGrid(true);
                }}
              >
                View Store
              </Button>
            </div>
          </div>

          <div className="relative h-[200px] mt-8">
            {products.slice(0, 3).map((product, index) => (
              <div
                key={product.id}
                className={`absolute w-[280px] transition-all duration-300 hover:z-10 hover:scale-105 cursor-pointer
                  ${
                    index === 0
                      ? "left-0 rotate-[-5deg] z-[3]"
                      : index === 1
                      ? "left-[20%] z-[2]"
                      : "left-[40%] rotate-[5deg] z-[1]"
                  }`}
                onClick={() => {
                  setSelectedProduct(product);
                  setShowProductPreview(true);
                }}
              >
                <div className="bg-white rounded-xl border border-black/10 p-3 shadow-md">
                  <div className="flex gap-3">
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="w-full h-full object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate text-sm">
                        {product.name}
                      </h3>
                      <p className="text-base font-bold text-baby-blue">
                        EGP {product.price}
                      </p>
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs mt-1 ${
                          product.status === "in_stock"
                            ? "bg-green-100 text-green-700"
                            : product.status === "low_stock"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {product.status === "in_stock"
                          ? "In Stock"
                          : product.status === "low_stock"
                          ? "Low Stock"
                          : "Out of Stock"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modals */}
        <ProductManagementModal
          isOpen={showProductManagement}
          onClose={() => {
            setShowProductManagement(false);
            setSelectedProduct(null);
          }}
          product={selectedProduct}
          mode={selectedProduct ? "edit" : "add"}
          onSubmit={selectedProduct ? handleEditOnSubmit : handleAddOnSubmit}
        />

        <ExportProductsModal
          isOpen={showExport}
          onClose={() => setShowExport(false)}
        />

        {selectedProduct && (
          <ProductPreviewModal
            isOpen={showProductPreview}
            onClose={() => {
              setShowProductPreview(false);
              setSelectedProduct(null);
            }}
            product={selectedProduct}
          />
        )}
      </div>
    </DragDropContext>
  );
};

function StorePage() {
  const [storeStatus, setStoreStatus] = useState<StoreStatus>(
    StoreStatus.NOT_REQUESTED
  );
  const { selectedLocation } = useLocation();

  const handleStoreRequest = () => {
    // TODO: Send request to backend
    setStoreStatus(StoreStatus.DOCUMENTS_PENDING);
  };

  const handleDocumentSubmit = async (documents: Document[]) => {
    const url = process.env.NEXT_PUBLIC_API_BASE_URL_SUBMIT_DOCUMENTS || "";

    axios
      .post(url, {
        locationId: selectedLocation?.id,
        // documents: documents
      })
      .then((response) => {
        if (response.status === 201) {
          return response.data;
        } else {
          throw new Error("Failed to submit documents");
        }
      })
      .then((data) => {
        setStoreStatus(StoreStatus.PENDING);
      });

    // setStoreStatus(StoreStatus.PENDING);
    // Simulate approval after 2 seconds
    // setTimeout(() => {
    //   setStoreStatus(StoreStatus.SETUP_PENDING);
    //   toast.success("Your store has been approved! Let&apos;s set it up.", {
    //     duration: 5000,
    // style: {
    //   background: "#17222D",
    //   color: "#FFF",
    // },
    //     duration: 4000,
    //   });
    // }, 2000);
  };

  const handleSetupComplete = async () => {
    try {
      // Here you would typically make an API call to update the store status
      setStoreStatus(StoreStatus.SETUP_COMPLETED);

      toast.success("Congratulations! Your store is now live.", {
        duration: 5000,
        style: {
          background: "#17222D",
          color: "#FFF",
        },
      });
    } catch (error) {
      console.error("Failed to complete setup:", error);
      toast.error("Failed to complete setup. Please try again.", {
        duration: 5000,
        style: {
          background: "#17222D",
          color: "#FFF",
        },
      });
    }
  };

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_API_BASE_URL_GET_STORE_STATUS || "";

    axios
      .get(`${url}?id=${selectedLocation?.id}`)
      .then((response) => {
        if (response.status === 200) {
          return response.data.status;
        } else {
          throw new Error("Failed to fetch store status");
        }
      })
      .then((data) => {
        switch (data) {
          case "NOT_REQUESTED":
            setStoreStatus(StoreStatus.NOT_REQUESTED);
            break;
          case "DOCUMENTS_PENDING":
            setStoreStatus(StoreStatus.DOCUMENTS_PENDING);
            break;
          case "PENDING":
            setStoreStatus(StoreStatus.PENDING);
            break;
          case "SETUP_PENDING":
            setStoreStatus(StoreStatus.SETUP_PENDING);
            break;
          case "SETUP_COMPLETE":
            setStoreStatus(StoreStatus.SETUP_COMPLETED);
            break;
          default:
            setStoreStatus(StoreStatus.NOT_REQUESTED);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch store status:", error);
        setStoreStatus(StoreStatus.NOT_REQUESTED);
      });
  }, [selectedLocation]);

  return (
    <Entity>
      {storeStatus === StoreStatus.SETUP_COMPLETED ? (
        // Full-width dashboard after setup
        <div className="container mx-auto py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <StoreDashboardView />
          </motion.div>
        </div>
      ) : (
        // Compact modal during setup
        <QueueModal title="Store">
          <div className="max-w-4xl mx-auto py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 bg-white/10 backdrop-blur-md rounded-3xl border-2 border-white/20 shadow-lg"
            >
              {storeStatus === StoreStatus.NOT_REQUESTED && (
                <StoreRequestView onRequest={handleStoreRequest} />
              )}
              {storeStatus === StoreStatus.DOCUMENTS_PENDING && (
                <DocumentUploadView onSubmit={handleDocumentSubmit} />
              )}
              {storeStatus === StoreStatus.PENDING && <StorePendingView />}
              {storeStatus === StoreStatus.SETUP_PENDING && (
                <StoreSetupView onComplete={handleSetupComplete} />
              )}
            </motion.div>
          </div>
        </QueueModal>
      )}
    </Entity>
  );
}

export default withRoleProtection(StorePage, "view_store");

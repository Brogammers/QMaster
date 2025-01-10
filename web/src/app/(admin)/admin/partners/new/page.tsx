'use client'

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import CustomButton from '@/app/shared/CustomButton';
import { businessCategories } from '@/app/constants/businessCategories';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  category: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  phone: Yup.string().required('Required'),
  address: Yup.string().required('Required'),
  openingHours: Yup.object().shape({
    monday: Yup.object().shape({
      open: Yup.string(),
      close: Yup.string(),
      closed: Yup.boolean()
    }),
    // ... repeat for other days
  }),
  services: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required('Required'),
      description: Yup.string(),
      estimatedTime: Yup.number(),
      type: Yup.string().oneOf(['counter', 'appointment', 'ticket'])
    })
  ),
  branches: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required('Required'),
      address: Yup.string().required('Required'),
      phone: Yup.string()
    })
  )
});

export default function NewPartner() {
  const initialValues = {
    name: '',
    category: '',
    description: '',
    email: '',
    phone: '',
    address: '',
    logo: null,
    openingHours: {
      monday: { open: '09:00', close: '17:00', closed: false },
      // ... other days
    },
    services: [],
    branches: []
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Register New Partner</h1>
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values, errors, touched, setFieldValue }) => (
          <Form className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-700">Basic Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Business Name</label>
                  <input
                    type="text"
                    name="name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-baby-blue focus:ring-baby-blue"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <select
                    name="category"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-baby-blue focus:ring-baby-blue"
                  >
                    {businessCategories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-700">Services</h2>
              {/* Add dynamic service fields here */}
            </div>

            {/* Branches */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-700">Branches</h2>
              {/* Add dynamic branch fields here */}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <CustomButton
                text="Register Partner"
                type="submit"
                variant="primary"
                size="lg"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
} 
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Store, Image, Palette, Globe, DollarSign } from 'lucide-react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

interface StoreSettingsProps {
  storeName: string;
  logo: string;
  colors: {
    primary: string;
    secondary: string;
  };
  currency: string;
  language: string;
}

const settingsSchema = Yup.object().shape({
  storeName: Yup.string().required('Store name is required'),
  logo: Yup.mixed(),
  colors: Yup.object().shape({
    primary: Yup.string().required('Primary color is required'),
    secondary: Yup.string().required('Secondary color is required'),
  }),
  currency: Yup.string().required('Currency is required'),
  language: Yup.string().required('Language is required'),
});

const currencies = [
  { code: 'EGP', name: 'Egyptian Pound' },
  { code: 'USD', name: 'US Dollar' },
  { code: 'EUR', name: 'Euro' },
  { code: 'GBP', name: 'British Pound' },
];

const languages = [
  { code: 'ar', name: 'Arabic' },
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'French' },
];

export default function StoreSettings({ 
  storeName,
  logo,
  colors,
  currency,
  language,
}: StoreSettingsProps) {
  const [previewLogo, setPreviewLogo] = useState<string>(logo);

  const handleSubmit = async (values: any) => {
    // Here you would typically send the data to your backend
    console.log('Submitting settings:', values);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold flex items-center gap-2">
        <Store className="w-6 h-6" />
        Store Settings
      </h2>

      <Formik
        initialValues={{
          storeName,
          logo,
          colors,
          currency,
          language,
        }}
        validationSchema={settingsSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, setFieldValue }) => (
          <Form className="space-y-8">
            {/* Store Name */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <Store className="w-5 h-5" />
                Basic Information
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-black/70 mb-1">
                    Store Name
                  </label>
                  <input
                    type="text"
                    name="storeName"
                    value={values.storeName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-black/10 focus:outline-none focus:border-baby-blue"
                  />
                  {touched.storeName && errors.storeName && (
                    <p className="text-red-500 text-sm mt-1">{errors.storeName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-black/70 mb-1">
                    Store Logo
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 relative">
                      <input
                        type="file"
                        id="logo"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setFieldValue('logo', file);
                            setPreviewLogo(URL.createObjectURL(file));
                          }
                        }}
                      />
                      <label
                        htmlFor="logo"
                        className={`w-full h-full rounded-lg border-2 border-dashed flex flex-col items-center justify-center cursor-pointer
                          ${
                            previewLogo
                              ? ''
                              : 'border-baby-blue hover:border-ocean-blue'
                          }`}
                      >
                        {previewLogo ? (
                          <div className="relative w-full h-full">
                            <img
                              src={previewLogo}
                              alt="Store Logo"
                              className="w-full h-full object-contain rounded-lg"
                            />
                            <Button
                              type="button"
                              onClick={() => {
                                setPreviewLogo('');
                                setFieldValue('logo', null);
                              }}
                              className="absolute -top-2 -right-2 !p-1 !min-w-0 rounded-full bg-red-500 hover:bg-red-600 text-white"
                            >
                              ×
                            </Button>
                          </div>
                        ) : (
                          <>
                            <Image className="w-6 h-6 text-baby-blue mb-1" />
                            <span className="text-xs text-black/60">
                              Upload Logo
                            </span>
                          </>
                        )}
                      </label>
                    </div>
                    <div className="text-sm text-black/60">
                      <p>Recommended size: 512x512px</p>
                      <p>Max file size: 2MB</p>
                      <p>Formats: PNG, JPG</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Theme Colors */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Theme Colors
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-black/70 mb-1">
                    Primary Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      name="colors.primary"
                      value={values.colors.primary}
                      onChange={handleChange}
                      className="w-10 h-10 rounded border-0 cursor-pointer"
                    />
                    <input
                      type="text"
                      name="colors.primary"
                      value={values.colors.primary}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-black/10 focus:outline-none focus:border-baby-blue"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-black/70 mb-1">
                    Secondary Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      name="colors.secondary"
                      value={values.colors.secondary}
                      onChange={handleChange}
                      className="w-10 h-10 rounded border-0 cursor-pointer"
                    />
                    <input
                      type="text"
                      name="colors.secondary"
                      value={values.colors.secondary}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-black/10 focus:outline-none focus:border-baby-blue"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Localization */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Localization
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-black/70 mb-1">
                    Currency
                  </label>
                  <select
                    name="currency"
                    value={values.currency}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-black/10 focus:outline-none focus:border-baby-blue"
                  >
                    {currencies.map((curr) => (
                      <option key={curr.code} value={curr.code}>
                        {curr.name} ({curr.code})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-black/70 mb-1">
                    Language
                  </label>
                  <select
                    name="language"
                    value={values.language}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-black/10 focus:outline-none focus:border-baby-blue"
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                className="!bg-gradient-to-r !from-baby-blue !to-ocean-blue hover:!opacity-90 !text-white"
              >
                Save Changes
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
} 
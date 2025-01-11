"use client";

import { useState } from "react";
import Entity from "../../page";
import QueueModal from "@/app/shared/QueueModal";
import { Form, Input, TimePicker, Button, Tabs, Select } from 'antd';
import { motion } from 'framer-motion';
import { FaEdit, FaPhone, FaMapMarkerAlt, FaGlobe, FaClock } from 'react-icons/fa';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { TabPane } = Tabs;

interface BusinessDetails {
  name: string;
  phone: string;
  address: string;
  website: string;
  description: string;
  openingHours: {
    [key: string]: {
      open: string;
      close: string;
    };
  };
  category: string;
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function Details() {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('1');

  // This would typically come from your API
  const initialValues: BusinessDetails = {
    name: "Sample Business",
    phone: "+1234567890",
    address: "123 Business St, City",
    website: "www.business.com",
    description: "A sample business description",
    openingHours: DAYS.reduce((acc, day) => ({
      ...acc,
      [day]: { open: "09:00", close: "17:00" }
    }), {}),
    category: "RETAIL"
  };

  const handleModificationRequest = async (values: Partial<BusinessDetails>) => {
    setIsSubmitting(true);
    try {
      // Here you would typically send this to your API
      console.log('Modification requested:', values);
      toast.success('Modification request submitted successfully', {
        style: {
          background: '#10B981',
          color: '#fff',
        },
      });
    } catch (error) {
      toast.error('Failed to submit modification request', {
        style: {
          background: '#ef4444',
          color: '#fff',
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Entity>
      <QueueModal title="Business Details">
        <div className="max-w-4xl mx-auto py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 bg-white/10 backdrop-blur-md rounded-3xl border-2 border-white/20 shadow-lg"
          >
            <Tabs activeKey={activeTab} onChange={setActiveTab}>
              <TabPane tab="Basic Information" key="1">
                <Form
                  form={form}
                  layout="vertical"
                  initialValues={initialValues}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-2 gap-6">
                    <div className="relative group">
                      <Form.Item
                        label={
                          <div className="flex items-center gap-2">
                            <span>Business Name</span>
                            <FaEdit className="w-4 h-4 text-ocean-blue opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        }
                        name="name"
                      >
                        <Input
                          readOnly
                          className="border-ocean-blue border-4 w-full bg-white/50 rounded-xl px-4 py-2 cursor-not-allowed"
                        />
                      </Form.Item>
                      <Button
                        onClick={() => handleModificationRequest({ name: form.getFieldValue('name') })}
                        className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity
                          !bg-ocean-blue/90 !text-white hover:!bg-ocean-blue !border-0 !rounded-xl"
                      >
                        Request Change
                      </Button>
                    </div>

                    <div className="relative group">
                      <Form.Item
                        label={
                          <div className="flex items-center gap-2">
                            <FaPhone className="w-4 h-4" />
                            <span>Phone Number</span>
                            <FaEdit className="w-4 h-4 text-ocean-blue opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        }
                        name="phone"
                      >
                        <Input
                          readOnly
                          className="border-ocean-blue border-4 w-full bg-white/50 rounded-xl px-4 py-2 cursor-not-allowed"
                        />
                      </Form.Item>
                      <Button
                        onClick={() => handleModificationRequest({ phone: form.getFieldValue('phone') })}
                        className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity
                          !bg-ocean-blue/90 !text-white hover:!bg-ocean-blue !border-0 !rounded-xl"
                      >
                        Request Change
                      </Button>
                    </div>
                  </div>

                  <div className="relative group">
                    <Form.Item
                      label={
                        <div className="flex items-center gap-2">
                          <FaMapMarkerAlt className="w-4 h-4" />
                          <span>Address</span>
                          <FaEdit className="w-4 h-4 text-ocean-blue opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      }
                      name="address"
                    >
                      <TextArea
                        readOnly
                        rows={2}
                        className="border-ocean-blue border-4 w-full bg-white/50 rounded-xl px-4 py-2 cursor-not-allowed"
                      />
                    </Form.Item>
                    <Button
                      onClick={() => handleModificationRequest({ address: form.getFieldValue('address') })}
                      className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity
                        !bg-ocean-blue/90 !text-white hover:!bg-ocean-blue !border-0 !rounded-xl"
                    >
                      Request Change
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="relative group">
                      <Form.Item
                        label={
                          <div className="flex items-center gap-2">
                            <FaGlobe className="w-4 h-4" />
                            <span>Website</span>
                            <FaEdit className="w-4 h-4 text-ocean-blue opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        }
                        name="website"
                      >
                        <Input
                          readOnly
                          className="border-ocean-blue border-4 w-full bg-white/50 rounded-xl px-4 py-2 cursor-not-allowed"
                        />
                      </Form.Item>
                      <Button
                        onClick={() => handleModificationRequest({ website: form.getFieldValue('website') })}
                        className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity
                          !bg-ocean-blue/90 !text-white hover:!bg-ocean-blue !border-0 !rounded-xl"
                      >
                        Request Change
                      </Button>
                    </div>

                    <div className="relative group">
                      <Form.Item
                        label="Business Category"
                        name="category"
                      >
                        <Select
                          disabled
                          options={[
                            { value: 'RETAIL', label: 'Retail' },
                            { value: 'HEALTHCARE', label: 'Healthcare' },
                            { value: 'BANKING', label: 'Banking' },
                            { value: 'RESTAURANT', label: 'Restaurant' },
                          ]}
                          className="cursor-not-allowed"
                        />
                      </Form.Item>
                    </div>
                  </div>
                </Form>
              </TabPane>

              <TabPane tab="Opening Hours" key="2">
                <div className="space-y-4">
                  {DAYS.map((day) => (
                    <div key={day} className="relative group flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                      <FaClock className="w-4 h-4" />
                      <span className="w-32">{day}</span>
                      <div className="flex items-center gap-4">
                        <TimePicker
                          disabled
                          format="HH:mm"
                          value={dayjs(initialValues.openingHours[day].open, 'HH:mm')}
                          className="cursor-not-allowed"
                        />
                        <span>to</span>
                        <TimePicker
                          disabled
                          format="HH:mm"
                          value={dayjs(initialValues.openingHours[day].close, 'HH:mm')}
                          className="cursor-not-allowed"
                        />
                      </div>
                      <Button
                        onClick={() => handleModificationRequest({ 
                          openingHours: { 
                            [day]: initialValues.openingHours[day] 
                          } 
                        })}
                        className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity
                          !bg-ocean-blue/90 !text-white hover:!bg-ocean-blue !border-0 !rounded-xl"
                      >
                        Request Change
                      </Button>
                    </div>
                  ))}
                </div>
              </TabPane>
            </Tabs>
          </motion.div>
        </div>
      </QueueModal>
    </Entity>
  );
}

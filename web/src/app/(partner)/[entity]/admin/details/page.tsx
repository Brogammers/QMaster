"use client";

import QueueModal from "@/app/shared/QueueModal";
import { Button, Form, Input, Select, Tabs, TimePicker } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaClock,
  FaEdit,
  FaGlobe,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";
import Entity from "../../page";
import { useLocation } from "@/ctx/LocationContext";

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

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

// This would typically come from your API
const initialValues: BusinessDetails = {
  name: "",
  phone: "",
  address: "",
  website: "",
  description: "",
  openingHours: DAYS.reduce(
    (acc, day) => ({
      ...acc,
      [day]: { open: "09:00", close: "17:00" },
    }),
    {}
  ),
  category: "",
};

export default function Details() {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [businessDetails, setBusinessDetails] =
    useState<BusinessDetails>(initialValues);
  const { selectedLocation } = useLocation();

  const handleModificationRequest = async (
    values: Partial<BusinessDetails>
  ) => {
    setIsSubmitting(true);
    try {
      // Here you would typically send this to your API
      console.log("Modification requested:", values);
      toast.success("Modification request submitted successfully", {
        duration: 5000,
        style: {
          background: "#17222D",
          color: "#FFF",
        },
      });
    } catch (error) {
      toast.error("Failed to submit modification request", {
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

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_API_BASE_URL_GET_BUSINESS_DATA || "";

    axios
      .get(`${url}?locationId=${selectedLocation?.id}`)
      .then((response) => {
        if (response.status === 200) {
          return response.data.info;
        } else {
          throw new Error("Failed to fetch business data");
        }
      })
      .then((data) => {
        const businessDetails = {
          name: data.businessName,
          phone: data.phoneNumber,
          address: data.address,
          website: initialValues.website,
          description: data.description,
          openingHours: data.openingHours,
          category: data.businessCategory,
        };
        setBusinessDetails(businessDetails);
        form.setFieldsValue(businessDetails);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to fetch business data", {
          duration: 5000,
          style: {
            background: "#17222D",
            color: "#FFF",
          },
        });
      });
  }, [selectedLocation, form]);

  return (
    <Entity>
      <QueueModal title="Business Details">
        <div className="w-full max-w-4xl mx-auto p-2 sm:p-4 lg:p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 sm:p-4 lg:p-6 bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-white/20 shadow-lg"
          >
            <Tabs 
              activeKey={activeTab} 
              onChange={setActiveTab}
              className="!text-sm sm:!text-base"
            >
              <TabPane tab="Basic Information" key="1">
                <Form
                  form={form}
                  layout="vertical"
                  initialValues={businessDetails}
                  className="space-y-3 sm:space-y-4 lg:space-y-6"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                    <div className="relative group">
                      <Form.Item
                        label={
                          <div className="flex items-center gap-2 text-sm sm:text-base">
                            <span>Business Name</span>
                            <FaEdit className="w-3 h-3 sm:w-4 sm:h-4 text-ocean-blue opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        }
                        name="name"
                        className="mb-1"
                      >
                        <Input
                          readOnly
                          className="border-ocean-blue border-2 sm:border-4 w-full bg-white/50 rounded-lg sm:rounded-xl px-3 py-1.5 sm:px-4 sm:py-2 cursor-not-allowed text-sm sm:text-base"
                        />
                      </Form.Item>
                      <Button
                        onClick={() => handleModificationRequest({ name: form.getFieldValue("name") })}
                        className="absolute right-0 -top-1 text-xs sm:text-sm opacity-0 h-fit w-fit border-0 shadow-none group-hover:opacity-100 
                        transition-all pb-0.5 !text-black hover:!text-blue-500"
                      >
                        Request Change
                      </Button>
                    </div>

                    <div className="relative group">
                      <Form.Item
                        label={
                          <div className="flex items-center gap-2 text-sm sm:text-base">
                            <FaPhone className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>Phone Number</span>
                            <FaEdit className="w-3 h-3 sm:w-4 sm:h-4 text-ocean-blue opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        }
                        name="phone"
                        className="mb-1"
                      >
                        <Input
                          readOnly
                          className="border-ocean-blue border-2 sm:border-4 w-full bg-white/50 rounded-lg sm:rounded-xl px-3 py-1.5 sm:px-4 sm:py-2 cursor-not-allowed text-sm sm:text-base"
                        />
                      </Form.Item>
                      <Button
                        onClick={() => handleModificationRequest({ phone: form.getFieldValue("phone") })}
                        className="absolute right-0 -top-1 text-xs sm:text-sm opacity-0 h-fit w-fit border-0 shadow-none group-hover:opacity-100 
                        transition-all pb-0.5 !text-black hover:!text-blue-500"
                      >
                        Request Change
                      </Button>
                    </div>
                  </div>

                  <div className="relative group">
                    <Form.Item
                      label={
                        <div className="flex items-center gap-2 text-sm sm:text-base">
                          <FaMapMarkerAlt className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>Address</span>
                          <FaEdit className="w-3 h-3 sm:w-4 sm:h-4 text-ocean-blue opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      }
                      name="address"
                      className="mb-1"
                    >
                      <TextArea
                        readOnly
                        rows={2}
                        className="border-ocean-blue border-2 sm:border-4 w-full bg-white/50 rounded-lg sm:rounded-xl px-3 py-1.5 sm:px-4 sm:py-2 cursor-not-allowed text-sm sm:text-base"
                      />
                    </Form.Item>
                    <Button
                      onClick={() => handleModificationRequest({ address: form.getFieldValue("address") })}
                      className="absolute right-0 -top-1 text-xs sm:text-sm opacity-0 h-fit w-fit border-0 shadow-none group-hover:opacity-100 
                        transition-all pb-0.5 !text-black hover:!text-blue-500"
                    >
                      Request Change
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                    <div className="relative group">
                      <Form.Item
                        label={
                          <div className="flex items-center gap-2 text-sm sm:text-base">
                            <FaGlobe className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>Website</span>
                            <FaEdit className="w-3 h-3 sm:w-4 sm:h-4 text-ocean-blue opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        }
                        name="website"
                        className="mb-1"
                      >
                        <Input
                          readOnly
                          className="border-ocean-blue border-2 sm:border-4 w-full bg-white/50 rounded-lg sm:rounded-xl px-3 py-1.5 sm:px-4 sm:py-2 cursor-not-allowed text-sm sm:text-base"
                        />
                      </Form.Item>
                      <Button
                        onClick={() => handleModificationRequest({ website: form.getFieldValue("website") })}
                        className="absolute right-0 -top-1 text-xs sm:text-sm opacity-0 h-fit w-fit border-0 shadow-none group-hover:opacity-100 
                        transition-all pb-0.5 !text-black hover:!text-blue-500"
                      >
                        Request Change
                      </Button>
                    </div>

                    <div className="relative group">
                      <Form.Item
                        label={
                          <div className="flex items-center gap-2 text-sm sm:text-base">
                            <span>Business Category</span>
                          </div>
                        }
                        name="category"
                        className="mb-1"
                      >
                        <Select
                          disabled
                          className="!rounded-xl"
                          options={[
                            { value: "RETAIL", label: "Retail" },
                            { value: "HEALTHCARE", label: "Healthcare" },
                            { value: "BANKING", label: "Banking" },
                            { value: "RESTAURANT", label: "Restaurant" },
                          ]}
                        />
                      </Form.Item>
                    </div>
                  </div>
                </Form>
              </TabPane>

              <TabPane tab="Opening Hours" key="2">
                <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                  {DAYS.map((day) => (
                    <div
                      key={day}
                      className="relative group p-3 sm:p-4 bg-white/5 rounded-lg sm:rounded-xl"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4">
                        <div className="flex items-center gap-2 min-w-[100px]">
                          <FaClock className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="text-sm sm:text-base font-medium">{day}</span>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-2 lg:gap-4">
                          <TimePicker
                            disabled
                            format="HH:mm"
                            value={dayjs(businessDetails.openingHours[day].open, "HH:mm")}
                            className="!w-24 sm:!w-28 text-sm sm:text-base cursor-not-allowed"
                          />
                          <span className="text-sm sm:text-base">to</span>
                          <TimePicker
                            disabled
                            format="HH:mm"
                            value={dayjs(businessDetails.openingHours[day].close, "HH:mm")}
                            className="!w-24 sm:!w-28 text-sm sm:text-base cursor-not-allowed"
                          />
                          
                          <Button
                            onClick={() => handleModificationRequest({
                              openingHours: { [day]: businessDetails.openingHours[day] }
                            })}
                            className="text-xs sm:text-sm ml-auto h-fit w-fit border-0 shadow-none 
                              opacity-100 lg:opacity-0 group-hover:opacity-100 transition-all 
                              pb-0.5 !text-black hover:!text-blue-500"
                          >
                            Request Change
                          </Button>
                        </div>
                      </div>
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

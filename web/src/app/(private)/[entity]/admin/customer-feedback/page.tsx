"use client";

import { useState } from "react";
import Entity from "../../page";
import QueueModal from "@/app/shared/QueueModal";
import { Form, Input, Select, Rate, Button, Radio } from "antd";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const { TextArea } = Input;

interface FeedbackForm {
  ticketNumber: string;
  serviceType: string;
  waitingTime: number;
  serviceQuality: number;
  staffBehavior: number;
  systemUsability: number;
  issue: string;
  suggestionType: "SYSTEM" | "SERVICE" | "STAFF" | "OTHER";
  suggestion: string;
  issueUrgency: "LOW" | "MEDIUM" | "HIGH";
  businessImpact: "LOW" | "MEDIUM" | "HIGH";
  // customerImpact: "INDIVIDUAL" | "GROUP" | "ALL_CUSTOMERS";
  isRegularCustomer: boolean;
  calculatedPriority?: string;
}

export default function CustomerFeedback() {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculatePriority = (values: FeedbackForm) => {
    let score = 0;

    if (values.waitingTime > 30) score += 3;
    else if (values.waitingTime > 15) score += 2;
    else if (values.waitingTime > 5) score += 1;

    if (values.serviceQuality <= 2) score += 3;
    else if (values.serviceQuality <= 3) score += 2;
    else if (values.serviceQuality <= 4) score += 1;

    score +=
      values.issueUrgency === "HIGH"
        ? 3
        : values.issueUrgency === "MEDIUM"
        ? 2
        : 1;

    score +=
      values.businessImpact === "HIGH"
        ? 3
        : values.businessImpact === "MEDIUM"
        ? 2
        : 1;

    score +=
      values.customerImpact === "ALL_CUSTOMERS"
        ? 3
        : values.customerImpact === "GROUP"
        ? 2
        : 1;

    if (values.isRegularCustomer) score += 1;

    if (score >= 13) return "CRITICAL";
    if (score >= 10) return "HIGH";
    if (score >= 7) return "MEDIUM";
    return "LOW";
  };

  const handleSubmit = async (values: FeedbackForm) => {
    setIsSubmitting(true);
    try {
      const calculatedPriority = calculatePriority(values);
      const finalValues = { ...values, calculatedPriority };
      console.log("Feedback submitted:", finalValues);
      toast.success("Feedback submitted successfully", {
        style: {
          background: "#10B981",
          color: "#fff",
        },
      });
      form.resetFields();
    } catch (error) {
      toast.error("Failed to submit feedback", {
        style: {
          background: "#ef4444",
          color: "#fff",
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Entity>
      <QueueModal title="Customer Feedback Form">
        <div className="max-w-3xl mx-auto py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 bg-white/10 backdrop-blur-md rounded-3xl border-2 border-white/20 shadow-lg"
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              className="space-y-6"
            >
              <div className="grid grid-cols-2 gap-6">
                <Form.Item
                  label="Ticket Number"
                  name="ticketNumber"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the ticket number",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter ticket number"
                    className="border-ocean-blue border-4 w-full bg-white/50 rounded-xl px-4 py-2"
                  />
                </Form.Item>

                <Form.Item
                  label="Waiting Time (minutes)"
                  name="waitingTime"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the waiting time",
                    },
                  ]}
                >
                  <Input
                    type="number"
                    placeholder="Enter waiting time"
                    className="border-ocean-blue border-4 w-full bg-white/50 rounded-xl px-4 py-2"
                  />
                </Form.Item>
              </div>

              <div className="grid grid-cols-2 gap-6">
              <Form.Item
                  label="Service Type"
                  name="serviceType"
                  rules={[
                    {
                      required: true,
                      message: "Please select the service type",
                    },
                  ]}
                >
                  <Select
                    placeholder="Select service type"
                    options={[
                      { value: "COUNTER", label: "Counter Service" },
                      { value: "TABLE", label: "Table Service" },
                      { value: "APPOINTMENT", label: "Appointment" },
                      { value: "BOOKING", label: "Booking" },
                    ]}
                  />
                </Form.Item>

                <Form.Item
                  label="Issue Urgency"
                  name="issueUrgency"
                  rules={[
                    {
                      required: true,
                      message: "Please select the issue urgency",
                    },
                  ]}
                  tooltip="How time-sensitive is this issue?"
                >
                  <Select
                    options={[
                      { value: "LOW", label: "Can be addressed later" },
                      { value: "MEDIUM", label: "Should be addressed soon" },
                      { value: "HIGH", label: "Requires immediate attention" },
                    ]}
                  />
                </Form.Item>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <Form.Item
                  label="Service Quality"
                  name="serviceQuality"
                  rules={[
                    {
                      required: true,
                      message: "Please rate the service quality",
                    },
                  ]}
                >
                  <Rate />
                </Form.Item>

                <Form.Item
                  label="Staff Behavior"
                  name="staffBehavior"
                  rules={[
                    {
                      required: true,
                      message: "Please rate the staff behavior",
                    },
                  ]}
                >
                  <Rate />
                </Form.Item>

                <Form.Item
                  label="System Usability"
                  name="systemUsability"
                  rules={[
                    {
                      required: true,
                      message: "Please rate the system usability",
                    },
                  ]}
                >
                  <Rate />
                </Form.Item>
              </div>

              <Form.Item
                label="Issue Description"
                name="issue"
                rules={[
                  { required: true, message: "Please describe the issue" },
                ]}
              >
                <TextArea
                  rows={4}
                  placeholder="Describe the issue in detail"
                  className="border-ocean-blue border-4 w-full bg-white/50 rounded-xl px-4 py-2"
                />
              </Form.Item>

              <div className="grid grid-cols-2 gap-6">
                <Form.Item
                  label="Business Impact"
                  name="businessImpact"
                  rules={[
                    {
                      required: true,
                      message: "Please select the business impact",
                    },
                  ]}
                  tooltip="How does this affect our business operations?"
                >
                  <Select
                    options={[
                      { value: "LOW", label: "Minor inconvenience" },
                      { value: "MEDIUM", label: "Affects service quality" },
                      { value: "HIGH", label: "Severely impacts operations" },
                    ]}
                  />
                </Form.Item>

                {/* <Form.Item
                  label="Customer Impact Scope"
                  name="customerImpact"
                  rules={[
                    {
                      required: true,
                      message: "Please select the customer impact scope",
                    },
                  ]}
                  tooltip="How many customers are affected by this issue?"
                >
                  <Select
                    options={[
                      { value: "INDIVIDUAL", label: "Single customer" },
                      { value: "GROUP", label: "Group of customers" },
                      { value: "ALL_CUSTOMERS", label: "All customers" },
                    ]}
                  />
                </Form.Item> */}
                <Form.Item
                  label="Suggestion Type"
                  name="suggestionType"
                  rules={[
                    {
                      required: true,
                      message: "Please select the suggestion type",
                    },
                  ]}
                >
                  <Select
                    placeholder="Select suggestion type"
                    options={[
                      { value: "SYSTEM", label: "System Improvement" },
                      { value: "SERVICE", label: "Service Improvement" },
                      { value: "STAFF", label: "Staff Related" },
                      { value: "OTHER", label: "Other" },
                    ]}
                  />
                </Form.Item>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <Form.Item
                  label="Regular Customer"
                  name="isRegularCustomer"
                  valuePropName="checked"
                  tooltip="Is this a frequent/regular customer?"
                >
                  <Radio.Group>
                    <Radio value={true}>Yes</Radio>
                    <Radio value={false}>No</Radio>
                  </Radio.Group>
                </Form.Item>
              </div>

              <Form.Item
                label="Suggestion"
                name="suggestion"
                rules={[
                  { required: false, message: "Please provide a suggestion" },
                ]}
              >
                <TextArea
                  rows={4}
                  placeholder="Enter your suggestion"
                  className="border-ocean-blue border-4 w-full bg-white/50 rounded-xl px-4 py-2"
                />
              </Form.Item>

              <Form.Item className="mb-0">
                <Button
                  htmlType="submit"
                  loading={isSubmitting}
                  className="!bg-gradient-to-r !from-baby-blue !to-ocean-blue hover:!opacity-90 !text-white !border-0 !rounded-xl w-full !h-12"
                >
                  Submit Feedback
                </Button>
              </Form.Item>
            </Form>
          </motion.div>
        </div>
      </QueueModal>
    </Entity>
  );
}

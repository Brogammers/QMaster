"use client";

import { useState } from "react";
import Entity from "../../page";
import QueueModal from "@/app/shared/QueueModal";
import { Form, Input, Select, Rate, Button, Radio } from "antd";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { withRoleProtection } from "@/lib/auth/withRoleProtection";

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
  customerImpact: "INDIVIDUAL" | "GROUP" | "ALL_CUSTOMERS";
  isRegularCustomer: boolean;
  calculatedPriority?: string;
}

function CustomerFeedbackPage() {
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
        duration: 5000,
        style: {
          background: "#17222D",
          color: "#FFF",
        },
      });
      form.resetFields();
    } catch (error) {
      toast.error("Failed to submit feedback", {
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
    <Entity>
      <QueueModal title="Customer Feedback Form">
        <div className="w-full max-w-3xl mx-auto p-2 sm:p-4 lg:p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 sm:p-6 lg:p-8 bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-white/20 shadow-lg"
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              className="space-y-4 sm:space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <Form.Item
                  label="Ticket Number"
                  name="ticketNumber"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the ticket number",
                    },
                  ]}
                  className="mb-0"
                >
                  <Input
                    placeholder="Enter ticket number"
                    className="border-ocean-blue border-2 sm:border-4 w-full bg-white/50 rounded-lg sm:rounded-xl px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base"
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
                  className="mb-0"
                >
                  <Input
                    type="number"
                    placeholder="Enter waiting time"
                    className="border-ocean-blue border-2 sm:border-4 w-full bg-white/50 rounded-lg sm:rounded-xl px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base"
                  />
                </Form.Item>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <Form.Item
                  label="Service Type"
                  name="serviceType"
                  rules={[
                    {
                      required: true,
                      message: "Please select the service type",
                    },
                  ]}
                  className="mb-0"
                >
                  <Select
                    placeholder="Select service type"
                    className="!text-sm sm:!text-base"
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
                  className="mb-0"
                >
                  <Select
                    className="!text-sm sm:!text-base"
                    options={[
                      { value: "LOW", label: "Can be addressed later" },
                      { value: "MEDIUM", label: "Should be addressed soon" },
                      { value: "HIGH", label: "Requires immediate attention" },
                    ]}
                  />
                </Form.Item>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <Form.Item
                  label="Service Quality"
                  name="serviceQuality"
                  rules={[
                    {
                      required: true,
                      message: "Please rate the service quality",
                    },
                  ]}
                  className="mb-0"
                >
                  <Rate className="text-sm sm:text-base" />
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
                  className="mb-0"
                >
                  <Rate className="text-sm sm:text-base" />
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
                  className="mb-0"
                >
                  <Rate className="text-sm sm:text-base" />
                </Form.Item>
              </div>

              <Form.Item
                label="Issue Description"
                name="issue"
                rules={[
                  { required: true, message: "Please describe the issue" },
                ]}
                className="mb-0"
              >
                <TextArea
                  rows={4}
                  placeholder="Describe the issue in detail"
                  className="border-ocean-blue border-2 sm:border-4 w-full bg-white/50 rounded-lg sm:rounded-xl px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base"
                />
              </Form.Item>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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
                  className="mb-0"
                >
                  <Select
                    className="!text-sm sm:!text-base"
                    options={[
                      { value: "LOW", label: "Minor inconvenience" },
                      { value: "MEDIUM", label: "Affects service quality" },
                      { value: "HIGH", label: "Severely impacts operations" },
                    ]}
                  />
                </Form.Item>

                <Form.Item
                  label="Suggestion Type"
                  name="suggestionType"
                  rules={[
                    {
                      required: true,
                      message: "Please select the suggestion type",
                    },
                  ]}
                  className="mb-0"
                >
                  <Select
                    placeholder="Select suggestion type"
                    className="!text-sm sm:!text-base"
                    options={[
                      { value: "SYSTEM", label: "System Improvement" },
                      { value: "SERVICE", label: "Service Improvement" },
                      { value: "STAFF", label: "Staff Related" },
                      { value: "OTHER", label: "Other" },
                    ]}
                  />
                </Form.Item>
              </div>

              <Form.Item
                label="Regular Customer"
                name="isRegularCustomer"
                valuePropName="checked"
                tooltip="Is this a frequent/regular customer?"
                className="mb-0"
              >
                <Radio.Group className="flex flex-col sm:flex-row gap-4">
                  <Radio value={true} className="text-sm sm:text-base">
                    Yes
                  </Radio>
                  <Radio value={false} className="text-sm sm:text-base">
                    No
                  </Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item label="Suggestion" name="suggestion" className="mb-0">
                <TextArea
                  rows={4}
                  placeholder="Enter your suggestion"
                  className="border-ocean-blue border-2 sm:border-4 w-full bg-white/50 rounded-lg sm:rounded-xl px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base"
                />
              </Form.Item>

              <Form.Item className="mb-0 pt-2">
                <Button
                  htmlType="submit"
                  loading={isSubmitting}
                  className="!bg-gradient-to-r !from-baby-blue !to-ocean-blue hover:!opacity-90 
                    !text-white !border-0 !rounded-lg sm:!rounded-xl w-full !h-10 sm:!h-12
                    !text-sm sm:!text-base"
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

export default withRoleProtection(CustomerFeedbackPage, "view_feedback");
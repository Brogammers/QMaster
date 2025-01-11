"use client";

import { useState } from "react";
import Entity from "../../page";
import QueueModal from "@/app/shared/QueueModal";
import { Form, Input, Select, Rate, Button, Radio } from 'antd';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const { TextArea } = Input;

interface FeedbackForm {
  ticketNumber: string;
  serviceType: string;
  waitingTime: number;
  serviceQuality: number;
  staffBehavior: number;
  systemUsability: number;
  issue: string;
  suggestionType: 'SYSTEM' | 'SERVICE' | 'STAFF' | 'OTHER';
  suggestion: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
}

export default function CustomerFeedback() {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: FeedbackForm) => {
    setIsSubmitting(true);
    try {
      // Here you would typically send this to your API
      console.log('Feedback submitted:', values);
      toast.success('Feedback submitted successfully', {
        style: {
          background: '#10B981',
          color: '#fff',
        },
      });
      form.resetFields();
    } catch (error) {
      toast.error('Failed to submit feedback', {
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
                  rules={[{ required: true, message: 'Please enter the ticket number' }]}
                >
                  <Input 
                    placeholder="Enter ticket number"
                    className="border-ocean-blue border-4 w-full bg-white/50 rounded-xl px-4 py-2"
                  />
                </Form.Item>

                <Form.Item
                  label="Service Type"
                  name="serviceType"
                  rules={[{ required: true, message: 'Please select the service type' }]}
                >
                  <Select
                    placeholder="Select service type"
                    options={[
                      { value: 'COUNTER', label: 'Counter Service' },
                      { value: 'TABLE', label: 'Table Service' },
                      { value: 'APPOINTMENT', label: 'Appointment' },
                      { value: 'BOOKING', label: 'Booking' },
                    ]}
                  />
                </Form.Item>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <Form.Item
                  label="Waiting Time (minutes)"
                  name="waitingTime"
                  rules={[{ required: true, message: 'Please enter the waiting time' }]}
                >
                  <Input
                    type="number"
                    placeholder="Enter waiting time"
                    className="border-ocean-blue border-4 w-full bg-white/50 rounded-xl px-4 py-2"
                  />
                </Form.Item>

                <Form.Item
                  label="Priority"
                  name="priority"
                  rules={[{ required: true, message: 'Please select the priority' }]}
                >
                  <Radio.Group>
                    <Radio.Button value="LOW">Low</Radio.Button>
                    <Radio.Button value="MEDIUM">Medium</Radio.Button>
                    <Radio.Button value="HIGH">High</Radio.Button>
                  </Radio.Group>
                </Form.Item>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <Form.Item
                  label="Service Quality"
                  name="serviceQuality"
                  rules={[{ required: true, message: 'Please rate the service quality' }]}
                >
                  <Rate />
                </Form.Item>

                <Form.Item
                  label="Staff Behavior"
                  name="staffBehavior"
                  rules={[{ required: true, message: 'Please rate the staff behavior' }]}
                >
                  <Rate />
                </Form.Item>

                <Form.Item
                  label="System Usability"
                  name="systemUsability"
                  rules={[{ required: true, message: 'Please rate the system usability' }]}
                >
                  <Rate />
                </Form.Item>
              </div>

              <Form.Item
                label="Issue Description"
                name="issue"
                rules={[{ required: true, message: 'Please describe the issue' }]}
              >
                <TextArea
                  rows={4}
                  placeholder="Describe the issue in detail"
                  className="border-ocean-blue border-4 w-full bg-white/50 rounded-xl px-4 py-2"
                />
              </Form.Item>

              <div className="grid grid-cols-2 gap-6">
                <Form.Item
                  label="Suggestion Type"
                  name="suggestionType"
                  rules={[{ required: true, message: 'Please select the suggestion type' }]}
                >
                  <Select
                    placeholder="Select suggestion type"
                    options={[
                      { value: 'SYSTEM', label: 'System Improvement' },
                      { value: 'SERVICE', label: 'Service Improvement' },
                      { value: 'STAFF', label: 'Staff Related' },
                      { value: 'OTHER', label: 'Other' },
                    ]}
                  />
                </Form.Item>

                <Form.Item
                  label="Suggestion"
                  name="suggestion"
                  rules={[{ required: true, message: 'Please provide a suggestion' }]}
                >
                  <TextArea
                    rows={4}
                    placeholder="Enter your suggestion"
                    className="border-ocean-blue border-4 w-full bg-white/50 rounded-xl px-4 py-2"
                  />
                </Form.Item>
              </div>

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

"use client";

import { useEffect, useState } from "react";
import Entity from "../../page";
import QueueModal from "@/app/shared/QueueModal";
import { Button, Select, Input, Switch, TimePicker } from 'antd';
import { FaPlus, FaClock, FaUsers } from 'react-icons/fa';
import { motion } from 'framer-motion';
import axios from "axios";

interface QueueConfig {
  name: string;
  type: 'COUNTER' | 'TABLE' | 'APPOINTMENT' | 'BOOKING';
  maxQueueSize: number;
  isActive: boolean;
  averageServiceTime: number; // in minutes
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  allowsPreBooking: boolean;
  storeId: number;
  operatingHours?: {
    start: string;
    end: string;
  };
}

export default function Queues() {
  const userId = document.cookie
      .split(";")
      .find((cookie) => cookie.includes("userId"))
      ?.split("=")[1];
  const [queueConfigs, setQueueConfigs] = useState<QueueConfig[]>([]);
  const [isAddingQueue, setIsAddingQueue] = useState(false);
  const [newQueue, setNewQueue] = useState<Partial<QueueConfig>>({
    type: 'COUNTER',
    isActive: true,
    priority: 'MEDIUM',
    allowsPreBooking: false,
  });

  const handleAddQueue = () => {
    if (newQueue.name && newQueue.maxQueueSize) {
      const newQueueConfig: QueueConfig = {
          storeId: 7,
          name: newQueue.name,
          type: newQueue.type || "COUNTER",
          maxQueueSize: newQueue.maxQueueSize,
          isActive: newQueue.isActive || true,
          averageServiceTime: newQueue.averageServiceTime || 10,
          priority: newQueue.priority || "MEDIUM",
          allowsPreBooking: newQueue.allowsPreBooking || false,
          operatingHours: newQueue.operatingHours,
      };

      const url = process.env.NEXT_PUBLIC_API_BASE_URL_CREATE_QUEUE || "";

      const queueBody = {
        id: userId,
        storeId: newQueueConfig.storeId,
        name: newQueueConfig.name,
        maxQueueSize: newQueueConfig.maxQueueSize,
        isActive: newQueueConfig.isActive,
        averageServiceTime: newQueueConfig.averageServiceTime,
      }
      console.log("Adding queue:", queueBody);
      
      axios.post(url, queueBody)
        .then(res => {
            if(res.status === 200 || res.status === 201) {  
            setQueueConfigs([...queueConfigs, newQueueConfig]);
            setIsAddingQueue(false);
            setNewQueue({
                type: "COUNTER",
                isActive: true,
                priority: "MEDIUM",
                allowsPreBooking: false,
            });
          } else {
            console.error("Error adding queue:", res.data);
          }
        }).catch(err => {
          console.error("Error adding queue:", err);
        });
    }
  };

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_API_BASE_URL_GET_BUSINESS_QUEUES || "";
    axios.get(url)
      .then(res => {
        if(res.status === 200) {
          console.log("Queues:", res.data.queues);
        } else {
          console.error("Error fetching queues:", res.data);
        }
      }).catch(err => {
        console.error("Error fetching queues:", err);
      });
  }, []);

  return (
    <Entity>
      <QueueModal title="Queue Management">
        <div className="max-w-4xl mx-auto py-8 space-y-8">
          {/* Queue List */}
          <div className="space-y-4">
            {queueConfigs.map((queue, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 bg-white/10 backdrop-blur-md rounded-3xl border-2 border-white/20 shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${queue.isActive ? 'bg-green-500' : 'bg-gray-400'}`} />
                    <h3 className="text-lg font-semibold">{queue.name}</h3>
                    <span className="px-3 py-1 text-sm rounded-full bg-ocean-blue/20 text-ocean-blue">
                      {queue.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FaUsers className="w-4 h-4" />
                      <span>Max: {queue.maxQueueSize}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FaClock className="w-4 h-4" />
                      <span>~{queue.averageServiceTime}min</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Add Queue Form */}
          {isAddingQueue ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-6 bg-white/10 backdrop-blur-md rounded-3xl border-2 border-white/20 shadow-lg space-y-6"
            >
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Queue Name<p className="inline text-red-600">*</p></label>
                  <Input
                    placeholder="Enter queue name"
                    value={newQueue.name}
                    onChange={(e) => setNewQueue({ ...newQueue, name: e.target.value })}
                    className="border-ocean-blue border-4 w-full bg-white/50 rounded-xl px-4 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Queue Type</label>
                  <Select
                    value={newQueue.type}
                    onChange={(value) => setNewQueue({ ...newQueue, type: value })}
                    className="w-full"
                    options={[
                      { value: 'COUNTER', label: 'Counter' },
                      { value: 'TABLE', label: 'Table' },
                      { value: 'APPOINTMENT', label: 'Appointment' },
                      { value: 'BOOKING', label: 'Booking' },
                    ]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Max Capacity<p className="inline text-red-600">*</p></label>
                  <Input
                    type="number"
                    placeholder="Enter max capacity"
                    value={newQueue.maxQueueSize}
                    onChange={(e) => setNewQueue({ ...newQueue, maxQueueSize: parseInt(e.target.value) })}
                    className="border-ocean-blue border-4 w-full bg-white/50 rounded-xl px-4 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Average Service Time (min)</label>
                  <Input
                    type="number"
                    placeholder="Enter average time"
                    value={newQueue.averageServiceTime}
                    onChange={(e) => setNewQueue({ ...newQueue, averageServiceTime: parseInt(e.target.value) })}
                    className="border-ocean-blue border-4 w-full bg-white/50 rounded-xl px-4 py-2"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={newQueue.isActive}
                    onChange={(checked) => setNewQueue({ ...newQueue, isActive: checked })}
                  />
                  <span className="text-sm">Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={newQueue.allowsPreBooking}
                    onChange={(checked) => setNewQueue({ ...newQueue, allowsPreBooking: checked })}
                  />
                  <span className="text-sm">Allow Pre-booking</span>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button
                  onClick={() => setIsAddingQueue(false)}
                  className="px-6 py-2 rounded-xl border border-gray-300"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddQueue}
                  className="!bg-gradient-to-r !from-baby-blue !to-ocean-blue hover:!opacity-90 !text-white !border-0 !rounded-xl"
                >
                  Add Queue
                </Button>
              </div>
            </motion.div>
          ) : (
            <Button
              onClick={() => setIsAddingQueue(true)}
              icon={<FaPlus className="mr-2" />}
              className="!bg-gradient-to-r !from-baby-blue !to-ocean-blue hover:!opacity-90 !text-white !border-0 !rounded-xl w-full !h-12"
            >
              Add New Queue
            </Button>
          )}
        </div>
      </QueueModal>
    </Entity>
  );
}

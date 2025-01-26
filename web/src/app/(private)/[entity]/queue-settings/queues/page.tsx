"use client";

import QueueModal from "@/app/shared/QueueModal";
import { useLocation } from "@/ctx/LocationContext";
import { Button, Input, InputNumber, Switch } from "antd";
import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaClock, FaEdit, FaPlus, FaUsers } from "react-icons/fa";
import Entity from "../../page";

interface Counter {
  id: number;
  name: string;
}

interface CounterConfig {
  startNumber: number;
  increment: number;
  numberOfCounters: number;
  manualNames: boolean;
  counters: Counter[];
}

interface QueueConfig {
  id?: number;
  name: string;
  maxQueueSize: number;
  isActive: boolean;
  averageServiceTime: number;
  locationId: number;
  counterConfig: CounterConfig;
}

export default function Queues() {
  const userId = document.cookie
    .split(";")
    .find((cookie) => cookie.includes("userId"))
    ?.split("=")[1];
  const [queueConfigs, setQueueConfigs] = useState<QueueConfig[]>([]);
  const [isAddingQueue, setIsAddingQueue] = useState(false);
  const [isEditingQueue, setIsEditingQueue] = useState<number | null>(null);
  const [newQueue, setNewQueue] = useState<Partial<QueueConfig>>({
    isActive: true,
    counterConfig: {
      startNumber: 1,
      increment: 1,
      numberOfCounters: 1,
      manualNames: false,
      counters: [],
    },
  });
  const { selectedLocation } = useLocation();

  const generateCounterNames = (config: CounterConfig) => {
    const counters: Counter[] = [];
    for (let i = 0; i < config.numberOfCounters; i++) {
      const counterNumber = config.startNumber + i * config.increment;
      counters.push({
        id: i + 1,
        name: `Counter ${counterNumber}`,
      });
    }
    return counters;
  };

  const handleCounterConfigChange = (
    field: keyof CounterConfig,
    value: any
  ) => {
    const updatedConfig = {
      ...newQueue.counterConfig!,
      [field]: value,
    };

    // Initialize or update counters when manual naming is toggled or when counters array is empty
    if (
      (field === "manualNames" && value === true) ||
      (updatedConfig.manualNames &&
        (!updatedConfig.counters || updatedConfig.counters.length === 0))
    ) {
      updatedConfig.counters = generateCounterNames(updatedConfig);
    } else if (!updatedConfig.manualNames) {
      updatedConfig.counters = generateCounterNames(updatedConfig);
    }

    setNewQueue({
      ...newQueue,
      counterConfig: updatedConfig,
    });
  };

  useEffect(() => {
    if (!newQueue.counterConfig?.manualNames) return;

    const currentCounters = newQueue.counterConfig.counters;
    const targetCount = newQueue.counterConfig.numberOfCounters || 0;
    let updatedCounters = [...currentCounters];

    if (currentCounters.length < targetCount) {
      for (let i = currentCounters.length; i < targetCount; i++) {
        updatedCounters.push({
          id: i + 1,
          name: `Counter ${
            newQueue.counterConfig.startNumber +
            i * newQueue.counterConfig.increment
          }`,
        });
      }
    } else if (currentCounters.length > targetCount) {
      updatedCounters = currentCounters.slice(0, targetCount);
    }

    if (updatedCounters.length !== currentCounters.length) {
      setNewQueue((prevQueue) => ({
        ...prevQueue,
        counterConfig: {
          ...prevQueue.counterConfig!,
          counters: updatedCounters,
        },
      }));
    }
  }, [
    newQueue.counterConfig?.numberOfCounters,
    newQueue.counterConfig?.startNumber,
    newQueue.counterConfig?.increment,
    newQueue.counterConfig?.manualNames,
    newQueue.counterConfig?.counters,
  ]);

  const handleCounterNameChange = (counterId: number, name: string) => {
    const updatedCounters = newQueue.counterConfig!.counters.map((counter) =>
      counter.id === counterId ? { ...counter, name } : counter
    );

    setNewQueue({
      ...newQueue,
      counterConfig: {
        ...newQueue.counterConfig!,
        counters: updatedCounters,
      },
    });
  };

  const handleAddQueue = () => {
    if (newQueue.name && newQueue.maxQueueSize) {
      const queueBody = {
        id: userId,
        locationId: selectedLocation?.id || -1,
        name: newQueue.name,
        maxQueueSize: newQueue.maxQueueSize,
        isActive: newQueue.isActive,
        averageServiceTime: newQueue.averageServiceTime,
        counterConfig: newQueue.counterConfig,
      };

      const url = process.env.NEXT_PUBLIC_API_BASE_URL_CREATE_QUEUE || "";

      toast.promise(axios.post(url, queueBody), {
        loading: "Creating queue...",
        success: () => {
          setQueueConfigs([...queueConfigs, queueBody as QueueConfig]);
          setIsAddingQueue(false);
          setNewQueue({
            isActive: true,
            counterConfig: {
              startNumber: 1,
              increment: 1,
              numberOfCounters: 1,
              manualNames: false,
              counters: [],
            },
          });
          return "Queue created successfully!";
        },
        error: "Failed to create queue",
      });
    }
  };

  const handleEditQueue = (queue: QueueConfig) => {
    setIsEditingQueue(queue.id!);
    setNewQueue({
      ...queue,
      counterConfig: {
        ...queue.counterConfig,
        counters: [...queue.counterConfig.counters],
      },
    });
    setIsAddingQueue(true);
  };

  const handleUpdateQueue = () => {
    if (!isEditingQueue) return;

    const url =
      `${process.env.NEXT_PUBLIC_API_BASE_URL_UPDATE_QUEUE}/${isEditingQueue}` ||
      "";

    toast.promise(axios.put(url, newQueue), {
      loading: "Updating queue...",
      success: () => {
        setQueueConfigs(
          queueConfigs.map((q) =>
            q.id === isEditingQueue ? (newQueue as QueueConfig) : q
          )
        );
        setIsAddingQueue(false);
        setIsEditingQueue(null);
        setNewQueue({
          isActive: true,
          counterConfig: {
            startNumber: 1,
            increment: 1,
            numberOfCounters: 1,
            manualNames: false,
            counters: [],
          },
        });
        return "Queue updated successfully!";
      },
      error: "Failed to update queue",
    });
  };

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_API_BASE_URL_GET_BUSINESS_QUEUES || "";

    toast.promise(axios.get(`${url}?locationId=${selectedLocation?.id}`), {
      loading: "Loading queues...",
      success: (res) => {
        const modifiedData: QueueConfig[] = res.data.queues.map(
          (queue: any) => ({
            id: queue.id,
            name: queue.name,
            maxQueueSize: queue.maxQueueSize,
            isActive: queue.isActive,
            averageServiceTime: queue.averageServiceTime,
            storeId: queue.storeId,
            counterConfig: queue.counterConfig || {
              startNumber: 1,
              increment: 1,
              numberOfCounters: 1,
              manualNames: false,
              counters: [{ id: 1, name: "Counter 1" }],
            },
          })
        );
        setQueueConfigs(modifiedData);
        return "Queues loaded successfully!";
      },
      error: "Failed to load queues",
    });
  }, [userId]);

  return (
    <Entity>
      <QueueModal title="Queue Management">
        <div className="max-w-4xl mx-auto py-8 space-y-8">
          {/* Queue List */}
          <div className="space-y-4">
            {queueConfigs.map((queue) => (
              <motion.div
                key={queue.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 bg-white/10 backdrop-blur-md rounded-3xl border-2 border-white/20 shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        queue.isActive ? "bg-green-500" : "bg-gray-400"
                      }`}
                    />
                    <h3 className="text-lg font-semibold">{queue.name}</h3>
                    <span className="px-3 py-1 text-sm rounded-full bg-ocean-blue/20 text-ocean-blue">
                      {queue.counterConfig.numberOfCounters} Counters
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
                    <Button
                      onClick={() => handleEditQueue(queue)}
                      icon={<FaEdit />}
                      className="!bg-ocean-blue/20 !text-ocean-blue !border-0 !rounded-xl"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Add/Edit Queue Form */}
          {isAddingQueue && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="p-6 bg-white/10 backdrop-blur-md rounded-3xl border-2 border-white/20 shadow-lg space-y-6"
            >
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Queue Name<p className="inline text-red-600">*</p>
                  </label>
                  <Input
                    placeholder="Enter queue name"
                    value={newQueue.name}
                    onChange={(e) =>
                      setNewQueue({ ...newQueue, name: e.target.value })
                    }
                    className="border-ocean-blue border-4 w-full bg-white/50 rounded-xl px-4 py-3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Number of Counters<p className="inline text-red-600">*</p>
                  </label>
                  <InputNumber
                    min={1}
                    value={newQueue.counterConfig?.numberOfCounters}
                    onChange={(value) =>
                      handleCounterConfigChange("numberOfCounters", value)
                    }
                    className="border-ocean-blue border-4 w-full bg-white/50 rounded-xl px-4 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Start Number
                  </label>
                  <InputNumber
                    min={1}
                    value={newQueue.counterConfig?.startNumber}
                    onChange={(value) =>
                      handleCounterConfigChange("startNumber", value)
                    }
                    className="border-ocean-blue border-4 w-full bg-white/50 rounded-xl px-4 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Increment By
                  </label>
                  <InputNumber
                    min={1}
                    value={newQueue.counterConfig?.increment}
                    onChange={(value) =>
                      handleCounterConfigChange("increment", value)
                    }
                    className="border-ocean-blue border-4 w-full bg-white/50 rounded-xl px-4 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Max Capacity<p className="inline text-red-600">*</p>
                  </label>
                  <InputNumber
                    min={1}
                    placeholder="Enter max capacity"
                    value={newQueue.maxQueueSize}
                    onChange={(value) =>
                      setNewQueue({ ...newQueue, maxQueueSize: value! })
                    }
                    className="border-ocean-blue border-4 w-full bg-white/50 rounded-xl px-4 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Average Service Time (min)
                  </label>
                  <InputNumber
                    min={1}
                    placeholder="Enter average time"
                    value={newQueue.averageServiceTime}
                    onChange={(value) =>
                      setNewQueue({ ...newQueue, averageServiceTime: value! })
                    }
                    className="border-ocean-blue border-4 w-full bg-white/50 rounded-xl px-4 py-2"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={newQueue.isActive}
                    onChange={(checked) =>
                      setNewQueue({ ...newQueue, isActive: checked })
                    }
                  />
                  <span className="text-sm">Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={newQueue.counterConfig?.manualNames}
                    onChange={(checked) =>
                      handleCounterConfigChange("manualNames", checked)
                    }
                  />
                  <span className="text-sm">Manual Counter Names</span>
                </div>
              </div>

              {newQueue.counterConfig?.manualNames && (
                <div className="grid grid-cols-2 gap-4">
                  {newQueue.counterConfig.counters.map((counter) => (
                    <div key={counter.id}>
                      <label className="block text-sm font-medium mb-2">
                        Counter {counter.id} Name
                      </label>
                      <Input
                        value={counter.name}
                        onChange={(e) =>
                          handleCounterNameChange(counter.id, e.target.value)
                        }
                        className="border-ocean-blue border-4 w-full bg-white/50 rounded-xl px-4 py-2"
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-end gap-4">
                <Button
                  onClick={() => {
                    setIsAddingQueue(false);
                    setIsEditingQueue(null);
                    setNewQueue({
                      isActive: true,
                      counterConfig: {
                        startNumber: 1,
                        increment: 1,
                        numberOfCounters: 1,
                        manualNames: false,
                        counters: [],
                      },
                    });
                  }}
                  className="px-6 py-2 rounded-xl border border-gray-300"
                >
                  Cancel
                </Button>
                <Button
                  onClick={isEditingQueue ? handleUpdateQueue : handleAddQueue}
                  className="!bg-gradient-to-r !from-baby-blue !to-ocean-blue hover:!opacity-90 !text-white !border-0 !rounded-xl"
                >
                  {isEditingQueue ? "Update Queue" : "Add Queue"}
                </Button>
              </div>
            </motion.div>
          )}

          {/* Add Queue Button */}
          {!isAddingQueue && (
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

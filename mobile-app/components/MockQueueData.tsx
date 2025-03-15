import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToQueue, setActiveQueue, QueueItem } from "@/app/redux/queueSlice";
import { RootState } from "@/app/redux/store";

// This component doesn't render anything visible
// It just adds a mock queue to the Redux store for testing
export default function MockQueueData() {
  const dispatch = useDispatch();
  const queueState = useSelector((state: RootState) => state.queue);

  useEffect(() => {
    // Only add the mock queue if there are no queues yet
    if (queueState.currentQueues.length === 0) {
      const mockQueue: QueueItem = {
        id: 1,
        name: "Starbucks Coffee",
        serviceType: "Coffee Order",
        position: 3, // Start at position 3
        estimatedTime: 6, // 6 minutes
        location: "Mall of Arabia",
        timestamp: new Date().toISOString(),
        image: "https://example.com/starbucks.png",
      };

      dispatch(addToQueue(mockQueue));
      dispatch(setActiveQueue(mockQueue));
    }
  }, []);

  return null;
}

import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { useNotification } from "@/ctx/NotificationContext";
import i18n from "@/i18n";
import { useLinkTo } from "@react-navigation/native";

/**
 * QueueNotificationMonitor - A component that monitors queue positions and triggers in-app notifications
 *
 * This component doesn't render anything visible but works in the background to:
 * 1. Monitor active queue position changes
 * 2. Trigger appropriate notifications based on queue position
 * 3. Handle notification actions like navigation
 */
export default function QueueNotificationMonitor() {
  const queueState = useSelector((state: RootState) => state.queue);
  const { addNotification } = useNotification();
  const linkTo = useLinkTo();

  // Keep track of previously notified positions to avoid duplicate notifications
  const notifiedPositionsRef = useRef<Set<number>>(new Set());

  // Monitor queue position changes
  useEffect(() => {
    const activeQueue = queueState.activeQueue;

    if (!activeQueue) {
      // Reset notified positions when no active queue
      notifiedPositionsRef.current = new Set();
      return;
    }

    const currentPosition = activeQueue.position;

    // Check if we've already notified for this position
    if (notifiedPositionsRef.current.has(currentPosition)) {
      return;
    }

    // Notification for position 1 (next in line)
    if (currentPosition === 1 && !notifiedPositionsRef.current.has(1)) {
      addNotification({
        title: i18n.t("your_turn_notification"),
        message: i18n.t("next_in_queue") + ` "${activeQueue.name}"`,
        type: "success",
        duration: 10000, // Show for longer time since it's important
        actionLabel: i18n.t("view_queue"),
        onAction: () => {
          // Navigate to the queue view
          linkTo("/QueueDetails");
        },
      });

      notifiedPositionsRef.current.add(1);
    }
    // Notification for position 2-3 (almost your turn)
    else if (
      currentPosition <= 3 &&
      currentPosition > 1 &&
      !notifiedPositionsRef.current.has(currentPosition)
    ) {
      addNotification({
        title: i18n.t("almost_your_turn"),
        message:
          i18n.t("positions_away", { count: currentPosition }) +
          ` "${activeQueue.name}"`,
        type: "info",
        duration: 7000,
        actionLabel: i18n.t("view_queue"),
        onAction: () => {
          // Navigate to the queue view
          linkTo("/QueueDetails");
        },
      });

      notifiedPositionsRef.current.add(currentPosition);
    }

    // Notification for when the queue is moving slower than expected
    // This would require additional logic to determine if the queue is moving slower
    // For now, we'll leave this as a placeholder

    // Notification for when the queue is closed
    // This would be triggered by a different event, not just position changes
  }, [queueState.activeQueue?.position, queueState.activeQueue?.name]);

  // This component doesn't render anything visible
  return null;
}

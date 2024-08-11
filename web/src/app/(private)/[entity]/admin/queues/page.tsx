"use client";
import QueueModal from "@/app/shared/QueueModal";
import Entity from "../../page";
import QueueBuilder from "@/app/components/QueueBuilder";
import { QueuesData } from "../../../../../../constants";
import QueuesList from "@/app/components/QueuesList";
import { useState } from "react";

export default function Queues() {
  const initialQueueData = [...QueuesData];

  const [queues, setQueues] = useState(initialQueueData);
  return (
    <Entity>
      <QueueModal>
        {queues.length === 0 ? (
          <QueueBuilder />
        ) : (
          <QueuesList queues={queues} setQueues={setQueues} />
        )}
      </QueueModal>
    </Entity>
  );
}

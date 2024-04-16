import QueueModal from "@/app/shared/QueueModal";
import Entity from "../../page";
import QueueBuilder from "@/app/components/QueueBuilder";
import { QueuesData } from "../../../../../data";
import QueuesList from "@/app/components/QueuesList";


export default function Queues() {
  return (
    <Entity>
      <QueueModal>
        {QueuesData.length === 0 ? <QueueBuilder /> : <QueuesList />}
      </QueueModal>
    </Entity>
  )
}
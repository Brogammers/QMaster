import React, { useState } from "react";
import { QueuesData } from "../../../constants";
import QueueBuilderIllustration from "../../../public/QueueBuilder.svg";
import Image from "next/image";
import QueueModal from "../shared/QueueModal";
import { Button, Modal } from "antd";
import CreateNewQueueButton from "./CreateNewQueueButton";

export default function QueueBuilder() {
  const [open, setOpen] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [modalText, setModalText] = useState<string>("Content of the modal");

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  return (
    <div>
      <div className="w-full flex justify-center">
        <div className="w-2/4 h-96 justify-around flex flex-col items-center">
          <Image
            src={QueueBuilderIllustration}
            alt="Queue Builder Illustration"
          />
          <h2>Queue Builder</h2>
          <p className="text-center">
            Welcome to the Queue builder! To create your first Queue, please
            click on the &apos;Create New Queue&apos; button
          </p>
          <CreateNewQueueButton />
        </div>
      </div>
    </div>
  );
}

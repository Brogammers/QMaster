"use client";
import React, { useState } from "react";
import { Button, Modal } from "antd";
import NewQueueForm from "./NewQueueForm";

export default function CreateNewQueueButton({ onAddQueue }: any) {
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

  let initialValues = {
    queueName: "counter",
    enabledOnlyInOpeningHours: "Yes",
    limitQueueLength: "No",
    estimatedWaitingTimeMode: "Auto",
    visitorsToNotify: "3",
  };

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={showModal}
      >
        Create New Queue
      </button>
      <Modal
        title="Create New Queue"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
      >
        <NewQueueForm
          closeModal={handleCancel}
          onAddQueue={onAddQueue}
          initialValues={initialValues}
          source={"CreateNewQueueButton"}
        />
      </Modal>
    </div>
  );
}

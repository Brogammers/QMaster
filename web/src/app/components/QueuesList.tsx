"use client";
import React, { useEffect, useRef, useState } from "react";
import { QueuesData } from "../../../constants";
import QueueBuilderIllustration from "../../../public/QueueBuilder.svg";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faUsers } from "@fortawesome/free-solid-svg-icons";
import CreateNewQueueButton from "./CreateNewQueueButton";
import { Button, Modal } from "antd";
import NewQueueForm from "./NewQueueForm";
import { init } from "next/dist/compiled/webpack/webpack";

export default function QueuesList({
  queues,
  setQueues,
}: {
  queues: any[];
  setQueues: React.Dispatch<React.SetStateAction<any[]>>;
}) {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [modalText, setModalText] = useState<string>("Content of the modal");
  // const menuRef = useRef(null);
  const [initialValues, setInitialValues] = useState<any>({});

  const showModal = (index: number) => {
    //console.log(queues[index]);
    const initialValues = {
      queueName: queues[index][0],
      enabledOnlyInOpeningHours: queues[index][4],
      limitQueueLength: queues[index][1],
      estimatedWaitingTimeMode: queues[index][3],
      visitorsToNotify: queues[index][2],
    };
    //console.log(initialValues);
    setInitialValues(initialValues);
    setOpen(true);
  };

  // useEffect(() => {
  //   function handleClickOutside(event: any) {
  //     if (menuRef.current && (menuRef.current as HTMLElement).contains(event.target)) {
  //       setOpenMenuIndex(null);
  //     }
  //   }

  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, []);

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
    setOpenMenuIndex(null);
  };

  const toggleMenu = (index: any) => {
    if (openMenuIndex === index) {
      setOpenMenuIndex(null); // Close the menu if it's already open
    } else {
      setOpenMenuIndex(index); // Open the menu for the clicked item
    }
  };

  const deleteQueue = (index: any) => {
    const newQueues = queues.filter((_, i) => i !== index);
    setQueues(newQueues);
    setOpenMenuIndex(null); // Close the menu after deleting the item
  };

  const handleAddQueue = (newQueue: any) => {
    setQueues([...queues, newQueue]);
  };

  const handleEditQueue = (newQueue: any) => {
    if (openMenuIndex !== null) {
      const newQueues = [...queues];
      newQueues[openMenuIndex] = newQueue;
      setQueues(newQueues);
      setOpen(false);
      setOpenMenuIndex(null);
    }
  };

  return (
    <div className="w-full">
      <CreateNewQueueButton onAddQueue={handleAddQueue} />

      <Modal
        title="Edit Queue"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
      >
        <NewQueueForm
          closeModal={handleCancel}
          onAddQueue={handleEditQueue}
          initialValues={initialValues}
          source={"QueuesList"}
        />
      </Modal>

      <div className=" w-full grid grid-cols-2 gap-4 mt-4 ">
        {queues.map((queue, index) => (
          <div
            key={index}
            className="w-[415px] h-[305px] bg- flex-shrink-0 rounded-xl p-4 bg-gray-700"
          >
            <div className="flex  justify-between">
              <div className="flex items-center gap-2 mb-4 text-white">
                <FontAwesomeIcon icon={faUsers} className="w-6 h-6 " />
                <h2 className="">{queue[0]}</h2>
              </div>
              <div className="relative w-8 h-8">
                <button
                  className="w-8 h-8 text-white hover:bg-gray-500 rounded-full p-1"
                  onClick={() => toggleMenu(index)}
                >
                  <FontAwesomeIcon
                    icon={faEllipsisVertical}
                    className="w-6 h-6"
                  />
                </button>
                {openMenuIndex === index && (
                  <div className="absolute top-full right-0 bg-white border border-gray-300 rounded-md z-50">
                    <ul className="p-0 m-0">
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          showModal(index);
                        }}
                      >
                        Edit
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          deleteQueue(index);
                          setOpenMenuIndex(null);
                        }}
                      >
                        Delete
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <ul>
              <div className="flex text-white font-bold">
                <p className="w-4/6">Enabled only in opening hours</p>
                <li>{queue[4]}</li>
              </div>
              <div className="flex text-white font-bold">
                <p className="w-4/6">Limit Queue Length</p>
                <li>{queue[1]}</li>
              </div>
              <div className="flex text-white font-bold">
                <p className="w-4/6">Estimated waiting time mode</p>
                <li>{queue[3]}</li>
              </div>
              <div className="flex text-white font-bold">
                <p className="w-4/6">Number of visitors to notify</p>
                <li>{queue[2]}</li>
              </div>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

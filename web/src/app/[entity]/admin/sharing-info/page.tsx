"use client";

import { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import QueueModal from "@/app/shared/QueueModal";
import Entity from "../../page";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import Image from "next/image";

export default function SharingInfo() {
  const [url, setUrl] = useState("");
  const [qrCode, setQrCode] = useState("");

  useEffect(() => {
    if (typeof "entity" === "string") {
      fetch(`/api/entity`)
        .then((response) => response.json())
        .then((data) => {
          setUrl(data.url);
          setQrCode(data.qrCode);
        });
    }
  }, []);

  const handlePreview = () => {
    console.log("Previewing QR code...");
  };

  const handleDownload = () => {
    console.log("Downloading QR code...");
  };

  return (
    <Entity>
      <QueueModal title="Sharing Info">
        <Formik
          initialValues={{ url: url }}
          onSubmit={async (values) => {
            console.log("Handling submission...");
          }}
        >
          <Form>
            <label htmlFor="url" className="text-md font-bold">
              Copy this link or download a QR code to share it anywhere, in any
              way!
            </label>
            <div className="w-full my-4 flex items center gap-4">
              <Field
                placeholder="https://book.qmaster.app/places/gok0IwQodWYLcLxTF9hS"
                id="url"
                name="url"
                type="text"
                className="w-1/2 border border-gray-300 p-2 rounded"
                readOnly
              />
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(url)}
                className="bg-baby-blue px-4 py-2 rounded-lg text-white font-bold"
              >
                Copy URL
              </button>
            </div>
          </Form>
        </Formik>

        {/* <div>
          <Image 
            src={qrCode} 
            alt="QR Code"
          />
        </div> */}
        <span className="text-md font-bold">
          Download and print this document and place it where your customers can
          easily see it.
        </span>
        <div className="my-4 flex space-x-4">
          <button
            onClick={handlePreview}
            className="bg-ignite-black px-4 py-2 rounded-lg text-white font-bold"
          >
            Preview
          </button>
          <button
            onClick={handleDownload}
            className="bg-baby-blue px-4 py-2 rounded-lg text-white font-bold"
          >
            Download QR Code
          </button>
        </div>
      </QueueModal>
    </Entity>
  );
}

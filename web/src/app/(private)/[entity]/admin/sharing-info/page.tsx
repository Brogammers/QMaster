"use client";

import { useState, useEffect, useRef } from "react";
import { Formik, Field, Form } from "formik";
import QueueModal from "@/app/shared/QueueModal";
import Entity from "../../page";
import jsPDF from "jspdf";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "@/app/redux/store";
import QRCode from "qrcode.react";

export default function SharingInfo() {
  const [url, setUrl] = useState<string>("");
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null);
  const qrCodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Replace with actual backend calls
    const fakeUrl = "https://book.qmaster.app/places/gok0IwQodWYLcLxTF9hS";

    // Set URL and trigger QR code generation
    setUrl(fakeUrl);
  }, []);

  const handlePreview = () => {
    if (qrCodeDataUrl) {
      const doc = new jsPDF();

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      const qrCodeHeight = pageHeight / 2;
      const qrCodeWidth = qrCodeHeight;

      const xOffset = (pageWidth - qrCodeWidth) / 2;
      const yOffset = (pageHeight - qrCodeHeight) / 2 + 20;

      doc.setFontSize(18);
      doc.text("Please Scan to Queue Up", pageWidth / 2, yOffset - 10, {
        align: "center",
      });

      doc.addImage(qrCodeDataUrl, "PNG", xOffset, yOffset, qrCodeWidth, qrCodeHeight);

      const pdfBlob = doc.output("blob");
      const pdfUrl = URL.createObjectURL(pdfBlob);

      window.open(pdfUrl, "_blank");
    } else {
      console.error("QR code data URL is not available");
    }
  };

  const handleExportPDF = () => {
    if (qrCodeDataUrl) {
      const doc = new jsPDF();

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      const qrCodeHeight = pageHeight / 2;
      const qrCodeWidth = qrCodeHeight;

      const xOffset = (pageWidth - qrCodeWidth) / 2;
      const yOffset = (pageHeight - qrCodeHeight) / 2 + 20;

      doc.setFontSize(18);
      doc.text("Please Scan to Queue Up", pageWidth / 2, yOffset - 10, {
        align: "center",
      });

      doc.addImage(qrCodeDataUrl, "PNG", xOffset, yOffset, qrCodeWidth, qrCodeHeight);

      doc.save("QRCode.pdf");
    } else {
      console.error("QR code data URL is not available");
    }
  };

  const handleCopyURL = () => {
    if (url) {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          console.log("URL copied to clipboard");
        })
        .catch((error) => {
          console.error("Failed to copy URL: ", error);
        });
    } else {
      console.error("URL not available");
    }
  };

  const generateQrCode = () => {
    if (qrCodeRef.current) {
      const canvas = qrCodeRef.current.querySelector("canvas");
      if (canvas) {
        const dataUrl = canvas.toDataURL("image/png");
        setQrCodeDataUrl(dataUrl);
      }
    }
  };

  useEffect(() => {
    generateQrCode();
  }, [url]);

  return (
    <Entity>
      <QueueModal
        title="Sharing Info"
        description="This QR-code is automatically generated for this Place"
      >
        <Formik
          initialValues={{ url: url }}
          onSubmit={async (values) => {
            console.log("Handling submission...");
          }}
        >
          <Form>
            <label htmlFor="url" className="text-md font-bold">
              Copy this link or download a QR code to share it anywhere, in any way!
            </label>
            <div className="w-full my-4 flex items-center gap-4">
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
                onClick={handleCopyURL}
                className="bg-baby-blue px-4 py-2 rounded-lg text-white text-md font-bold"
              >
                Copy URL
              </button>
            </div>
          </Form>
        </Formik>

        <span className="text-md font-bold">
          Download and print this document and place it where your customers can easily see it.
        </span>
        <div className="my-4 flex space-x-4">
          <button
            onClick={handlePreview}
            className="bg-ignite-black px-4 py-2 rounded-lg text-white text-md font-bold"
          >
            Preview
          </button>
          <button
            onClick={handleExportPDF}
            className="bg-baby-blue px-4 py-2 rounded-lg text-white text-md font-bold"
          >
            Download QR Code
          </button>
        </div>

        {/* QR code rendered here */}
        <div ref={qrCodeRef} style={{ display: "none" }}>
          <QRCode value={url} size={200} />
        </div>
      </QueueModal>
    </Entity>
  );
}
"use client";

import { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import QueueModal from "@/app/shared/QueueModal";
import Entity from "../../page";
import jsPDF from "jspdf";

export default function SharingInfo() {
  const [url, setUrl] = useState("");
  const [qrCode, setQrCode] = useState("");

  useEffect(() => {
    // For testing purposes
    const fakeUrl = "https://book.qmaster.app/places/gok0IwQodWYLcLxTF9hS";
    const fakeQrCodeUrl = "https://via.placeholder.com/300"; 

    setUrl(fakeUrl);
    setQrCode(fakeQrCodeUrl); 
  }, []);

  const handlePreview = () => {
    if (qrCode) {
      const doc = new jsPDF();
  
      // A4 page dimensions in points (595.28 x 841.89)
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
  
      // QR Code dimensions
      const qrCodeHeight = pageHeight / 2; // Half the page height
      const qrCodeWidth = qrCodeHeight; // Maintain aspect ratio (square)
  
      // QR Code position (centered)
      const xOffset = (pageWidth - qrCodeWidth) / 2;
      const yOffset = (pageHeight - qrCodeHeight) / 2 + 20; // Adding some padding for the text
  
      // Adding text above the QR code
      doc.setFontSize(18);
      doc.text("Please Scan to Queue Up", pageWidth / 2, yOffset - 10, { align: "center" });
  
      // Adding the QR code image
      doc.addImage(qrCode, "JPEG", xOffset, yOffset, qrCodeWidth, qrCodeHeight);
  
      // Convert the PDF to a Blob and create a URL for the Blob
      const pdfBlob = doc.output("blob");
      const pdfUrl = URL.createObjectURL(pdfBlob);
  
      // Open the PDF in a new tab using the Blob URL
      window.open(pdfUrl, "_blank");
    } else {
      console.error("QR code URL not available");
    }
  };

  const handleExportPDF = () => {
    if (qrCode) {
      const doc = new jsPDF();

      // A4 page dimensions in points (595.28 x 841.89)
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      // QR Code dimensions
      const qrCodeHeight = pageHeight / 2; // Half the page height
      const qrCodeWidth = qrCodeHeight; // Maintain aspect ratio (square)

      // QR Code position (centered)
      const xOffset = (pageWidth - qrCodeWidth) / 2;
      const yOffset = (pageHeight - qrCodeHeight) / 2 + 20; // Adding some padding for the text

      // Adding text above the QR code
      doc.setFontSize(18);
      doc.text("Please Scan to Queue Up", pageWidth / 2, yOffset - 10, { align: "center" });

      // Adding the QR code image
      doc.addImage(qrCode, "JPEG", xOffset, yOffset, qrCodeWidth, qrCodeHeight);

      // Save the PDF
      doc.save("QRCode.pdf");
    } else {
      console.error("QR code URL not available");
    }
  };

  const handleCopyURL = () => {
    if (url) {
      navigator.clipboard.writeText(url)
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
              Copy this link or download a QR code to share it anywhere, in any
              way!
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
          Download and print this document and place it where your customers can
          easily see it.
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
      </QueueModal>
    </Entity>
  );
}
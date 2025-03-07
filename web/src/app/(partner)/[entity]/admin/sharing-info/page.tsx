"use client";

import { useState, useEffect, useRef } from "react";
import { Formik, Field, Form } from "formik";
import QueueModal from "@/app/shared/QueueModal";
import Entity from "../../page";
import jsPDF from "jspdf";
import { useLocation } from "@/ctx/LocationContext";
import { useParams } from "next/navigation";
import Image from "next/image";
import { withRoleProtection } from "@/lib/auth/withRoleProtection";
// import QRCode from "qrcode.react";

function SharingInfoPage() {
  const { selectedLocation } = useLocation();
  const { entity } = useParams();
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

  useEffect(() => {
    setQrCodeDataUrl(`${process.env.NEXT_PUBLIC_API_BASE_URL_PARTNER_QR_CODE}?partnerName=${entity}&locationId=${selectedLocation?.id}`);
  }, [selectedLocation, entity]);

  return (
    <Entity>
      <QueueModal
        title="Sharing Info"
        description="This QR-code is automatically generated for this Place"
      >
        {
          qrCodeDataUrl &&
          <div className="absolute top-28 right-14 hidden xl:block">
            <h2 className="text-lg font-bold text-center w-full">Here&apos;s your QR!</h2>
            <Image 
              src={qrCodeDataUrl} 
              alt="QR code" 
              className="pt-2 pb-2" 
              width={200}
              height={200}
            />
          </div>
        }
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
            <div className="w-full my-4 flex flex-col sm:flex-row items-center gap-4">
              <Field
                placeholder="https://book.qmaster.app/places/gok0IwQodWYLcLxTF9hS"
                id="url"
                name="url"
                type="text"
                className="w-full sm:w-1/2 border border-gray-300 p-2 rounded"
                readOnly
              />
              <button
                type="button"
                onClick={handleCopyURL}
                className="bg-baby-blue px-4 py-2 rounded-lg text-white text-md font-bold w-full sm:w-auto"
              >
                Copy URL
              </button>
            </div>
          </Form>
        </Formik>

        <span className="text-md font-bold">
          Download and print this document and place it where your customers can easily see it.
        </span>
        <div className="my-4 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            onClick={handlePreview}
            className="bg-ignite-black px-4 py-2 rounded-lg text-white text-md font-bold w-full sm:w-auto"
          >
            Preview
          </button>
          <button
            onClick={handleExportPDF}
            className="bg-baby-blue px-4 py-2 rounded-lg text-white text-md font-bold w-full sm:w-auto"
          >
            Download QR Code
          </button>
        </div>

        {/* QR code rendered here */}
        <div ref={qrCodeRef} style={{ display: "none" }}>
          {/* <QRCode value={url} size={200} /> */}
        </div>
      </QueueModal>
    </Entity>
  );
}

export default withRoleProtection(SharingInfoPage, "view_sharing_info");
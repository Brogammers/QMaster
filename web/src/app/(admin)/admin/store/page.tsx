"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  FileText,
  ListFilter,
  XCircle,
} from "lucide-react";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { StoresContext } from "../../context";
import { columns, type StoreData } from "./columns";
import axios from "axios";

interface Document {
  name: string;
  status: "pending" | "approved" | "rejected";
  url: string;
}

interface PendingRequest {
  id: string;
  partnerName: string;
  category: string;
  submissionDate: string;
  documents: Document[];
}

export default function StorePage() {
  const { stores, setStores } = useContext(StoresContext);
  const [isDarkMode] = useState(false);
  const [currentRequestIndex, setCurrentRequestIndex] = useState(0);
  const [showAllRequests, setShowAllRequests] = useState(false);
  const [showDocumentPreview, setShowDocumentPreview] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null
  );
  const [pendingRequestsState, setPendingRequests] = useState<PendingRequest[]>(
    []
  );

  const currentRequest = pendingRequestsState[currentRequestIndex];

  const handleNext = () => {
    setCurrentRequestIndex((prev) =>
      prev < pendingRequestsState.length - 1 ? prev + 1 : prev
    );
  };

  const handlePrevious = () => {
    setCurrentRequestIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleDocumentAction = (action: "approve" | "reject") => {
    if (!selectedDocument || !currentRequest) return;
    // Update the document status
    setPendingRequests((prev) =>
      prev.map((request) => {
        if (request.id === currentRequest.id) {
          return {
            ...request,
            documents: request.documents.map((doc) => {
              if (doc.name === selectedDocument.name) {
                const newStatus =
                  action === "approve" ? "approved" : "rejected";
                return {
                  ...doc,
                  status: newStatus as Document["status"],
                };
              }
              return doc;
            }),
          };
        }
        return request;
      })
    );
    setShowDocumentPreview(false);
  };

  const handleDownloadAll = (request: (typeof pendingRequestsState)[0]) => {
    // Here you would typically handle the batch download of all documents
    console.log("Downloading all documents for:", request.partnerName);
    toast.success("Downloading all documents...", {
      duration: 5000,
      style: {
        background: "#17222D",
        color: "#FFF",
      },
    });
  };

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_API_BASE_URL_ADMIN_STORES || "";
    axios
      .get(`${url}?page=1&per-page=10`)
      .then((response) => {
        if (response.status === 200) {
          return response.data.stores.content;
        } else {
          throw new Error("Failed to fetch stores data");
        }
      })
      .then((data) => {
        const storeData = data.map((store: any) => ({
          id: store.id,
          name: store.name,
          category: store.category,
          storeStatus: store.storeStatus,
          productsCount: store.productsCount,
          monthlyRevenue: store.monthlyRevenue,
        }));

        setStores(storeData);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to fetch stores data", {
          duration: 5000,
          style: {
            background: "#17222D",
            color: "#FFF",
          },
        });
      });
  }, []);

  useEffect(() => {
    const url =
      process.env.NEXT_PUBLIC_API_BASE_URL_ADMIN_STORES + "/pending" || "";

    axios
      .get(url)
      .then((response) => {
        if (response.status === 200) {
          return response.data.stores;
        } else {
          throw new Error("Failed to fetch pending requests data");
        }
      })
      .then((data) => {
        const pendingRequests = data.map((request: any) => ({
          id: request.id,
          partnerName: request.name,
          category: request.category,
          submissionDate: "2022-01-01",
          documents: [1, 2, 3].map((doc: any, idx: number) => ({
            // request.documents
            name: "Document" + idx,
            status: "pending",
            url: "https://example.com/document.pdf",
          })),
        }));

        setPendingRequests(pendingRequests);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to fetch pending requests data", {
          duration: 5000,
          style: {
            background: "#17222D",
            color: "#FFF",
          },
        });
      });
  }, []);

  useEffect(() => {
    if (!currentRequest) return;

    // Check if all documents are reviewed (either approved or rejected)
    const allDocumentsReviewed = currentRequest.documents.every(
      (doc) => doc.status === "approved" || doc.status === "rejected"
    );

    const allDocumentsApproved = currentRequest.documents.every(
      (doc) => doc.status === "approved"
    );

    // If all documents are reviewed, update the store status in the table
    if (allDocumentsReviewed && allDocumentsApproved) {
      const url =
        process.env.NEXT_PUBLIC_API_BASE_URL_ADMIN_STORES + "/approve" || "";

      axios
        .post(`${url}?id=${currentRequest.id}`)
        .then((response) => {
          if (response.status === 200) {
            return response.data.store;
          } else {
            throw new Error("Failed to approve store request");
          }
        })
        .then((data) => {
          setStores((prev) => [
            ...prev,
            {
              id: data.id,
              name: data.name,
              category: data.category,
              storeStatus: data.storeStatus,
              productsCount: data.productsCount,
              monthlyRevenue: data.monthlyRevenue,
            },
          ]);

          // Update the requests state
          setPendingRequests((prev) =>
            prev.filter((request) => request.id !== currentRequest.id)
          );
          setCurrentRequestIndex(0);

          toast.success("Store request approved successfully", {
            duration: 5000,
            style: {
              background: "#17222D",
              color: "#FFF",
            },
          });
        })
        .catch((error) => {
          console.error(error);
          toast.error("Failed to approve store request", {
            duration: 5000,
            style: {
              background: "#17222D",
              color: "#FFF",
            },
          });
        });
    }
  }, [currentRequest]);

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <h1
          className={`text-3xl font-bold ${
            isDarkMode ? "text-white" : "text-slate-900"
          }`}
        >
          Store Management
        </h1>
        <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-crystal-blue text-black rounded-lg hover:bg-opacity-90">
          <FaPlus /> Add Store
        </button>
      </div>

      {/* Pending Requests Section */}
      {currentRequest && (
        <div
          className={`${
            isDarkMode ? "bg-slate-900" : "bg-white"
          } rounded-lg border border-slate-200`}
        >
          <div className="p-4 sm:p-6 border-b border-slate-200">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div>
                <h2 className="text-xl font-semibold">
                  Pending Store Requests
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Review submitted documents and approve or reject store
                  requests
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <span>{currentRequestIndex + 1}</span>
                  <span>/</span>
                  <span>{pendingRequestsState.length}</span>
                </div>
                <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePrevious}
                    disabled={currentRequestIndex === 0}
                    className="border-slate-200 w-full sm:w-auto"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNext}
                    disabled={
                      currentRequestIndex === pendingRequestsState.length - 1
                    }
                    className="border-slate-200 w-full sm:w-auto"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAllRequests(true)}
                    className="border-slate-200 w-full sm:w-auto"
                  >
                    <ListFilter className="w-4 h-4 mr-2" />
                    View All Requests
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mb-6">
              <div>
                <h3 className="text-lg font-medium">
                  {currentRequest.partnerName}
                </h3>
                <div className="text-sm text-slate-500 space-y-1">
                  <p>Category: {currentRequest.category}</p>
                  <p>Submitted: {currentRequest.submissionDate}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="border-slate-200 w-full sm:w-auto"
                  onClick={() => handleDownloadAll(currentRequest)}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download All
                </Button>
                <Button
                  className="bg-crystal-blue hover:bg-opacity-90 text-black w-full sm:w-auto"
                  onClick={() => {
                    setSelectedDocument(currentRequest.documents[0]);
                    setShowDocumentPreview(true);
                  }}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Review Documents
                </Button>
              </div>
            </div>

            {/* Documents Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {currentRequest.documents.map((doc) => (
                <div
                  key={doc.name}
                  className={`p-4 rounded-lg border ${
                    isDarkMode
                      ? "bg-slate-800 border-slate-700"
                      : "bg-slate-50 border-slate-200"
                  } cursor-pointer hover:border-crystal-blue transition-colors`}
                  onClick={() => {
                    setSelectedDocument(doc);
                    setShowDocumentPreview(true);
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <FileText className="w-4 h-4 text-slate-400" />
                    {doc.status === "approved" ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : doc.status === "rejected" ? (
                      <XCircle className="w-4 h-4 text-red-500" />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-yellow-400" />
                    )}
                  </div>
                  <p className="text-sm font-medium">{doc.name}</p>
                  <p className="text-xs text-slate-500 capitalize">
                    {doc.status}
                  </p>
                  <Button variant="ghost" size="sm" className="w-full mt-2 h-8">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Table Container with proper overflow handling */}
      <div className="overflow-hidden rounded-lg border border-slate-200">
        <div className="overflow-x-auto">
          <div className="min-w-full align-middle inline-block">
            <DataTable
              columns={columns}
              data={stores}
              searchKey="name"
              searchPlaceholder="Search stores..."
            />
          </div>
        </div>
      </div>

      {/* View All Requests Modal */}
      <Dialog open={showAllRequests} onOpenChange={setShowAllRequests}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>All Pending Store Requests</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6">
            {pendingRequestsState.map((request) => (
              <div
                key={request.id}
                className="p-6 border border-slate-200 rounded-lg hover:border-crystal-blue transition-colors"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-medium">
                      {request.partnerName}
                    </h3>
                    <div className="text-sm text-slate-500 space-y-1">
                      <p>Category: {request.category}</p>
                      <p>Submitted: {request.submissionDate}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="border-slate-200"
                      onClick={() => handleDownloadAll(request)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download All
                    </Button>
                    <Button
                      className="bg-crystal-blue hover:bg-opacity-90 text-black"
                      onClick={() => {
                        setCurrentRequestIndex(
                          pendingRequestsState.indexOf(request)
                        );
                        setShowAllRequests(false);
                      }}
                    >
                      Review
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-5 gap-4">
                  {request.documents.map((doc) => (
                    <div
                      key={doc.name}
                      className="p-3 rounded-lg border border-slate-200 bg-slate-50"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <FileText className="w-4 h-4 text-slate-400" />
                        {doc.status === "approved" ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : doc.status === "rejected" ? (
                          <XCircle className="w-4 h-4 text-red-500" />
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-yellow-400" />
                        )}
                      </div>
                      <p className="text-sm font-medium truncate">{doc.name}</p>
                      <p className="text-xs text-slate-500 capitalize">
                        {doc.status}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Document Preview Modal */}
      <Dialog open={showDocumentPreview} onOpenChange={setShowDocumentPreview}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              Document Preview - {selectedDocument?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Document Preview */}
            <div className="aspect-[4/3] bg-slate-100 rounded-lg overflow-hidden">
              <iframe
                src={selectedDocument?.url}
                className="w-full h-full"
                title={selectedDocument?.name}
              />
            </div>
            {/* Action Buttons */}
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowDocumentPreview(false)}
              >
                Close
              </Button>
              <Button
                variant="outline"
                className="border-red-500 text-red-500 hover:bg-red-50"
                onClick={() => handleDocumentAction("reject")}
              >
                <XCircle className="w-4 h-4 mr-2" />
                Reject
              </Button>
              <Button
                className="bg-green-500 text-white hover:bg-green-600"
                onClick={() => handleDocumentAction("approve")}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Approve
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

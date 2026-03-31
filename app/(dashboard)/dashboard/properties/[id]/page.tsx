"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Header } from "@/components/dashboard/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowLeft, Check, X, Eye, Download, Upload, FileText, Trash2 } from "lucide-react";
import Link from "next/link";
import { exportCheckInPdf, exportCheckOutPdf } from "@/lib/exportPdf";
import {
  exportCheckInsCsv,
  exportCheckOutsCsv,
  CHECK_IN_COLUMNS,
  CHECK_OUT_COLUMNS,
  type CheckInColumn,
  type CheckOutColumn,
} from "@/lib/exportCsv";

interface Property {
  id: string;
  name: string;
  address: string | null;
  depositAmount: number;
}

interface CheckIn {
  id: string;
  guestName: string;
  guestEmail: string;
  arrivalDate: string;
  departureDate: string;
  numberOfGuests: number;
  estimatedDepartureHour: string;
  depositConfirmed: boolean;
  conditionConfirmed: boolean;
  signatureDataUrl: string | null;
  createdAt: string;
}

interface CheckOut {
  id: string;
  guestName: string;
  depositReturned: boolean;
  incidentDescription: string | null;
  createdAt: string;
}

interface PropertyDocument {
  id: string;
  name: string;
  fileName: string;
  filePath: string;
  fileSize: number;
  mimeType: string;
  createdAt: string;
}

export default function PropertyDetailPage() {
  const params = useParams();
  const { data: session } = useSession();
  const propertyId = params.id as string;

  const [property, setProperty] = useState<Property | null>(null);
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
  const [checkOuts, setCheckOuts] = useState<CheckOut[]>([]);
  const [activeTab, setActiveTab] = useState<"checkins" | "checkouts" | "documents">("checkins");
  const [loading, setLoading] = useState(true);
  const [signatureView, setSignatureView] = useState<string | null>(null);
  const [csvModalOpen, setCsvModalOpen] = useState(false);
  const [csvType, setCsvType] = useState<"checkins" | "checkouts">("checkins");
  const [selectedCheckInColumns, setSelectedCheckInColumns] = useState<CheckInColumn[]>([]);
  const [selectedCheckOutColumns, setSelectedCheckOutColumns] = useState<CheckOutColumn[]>([]);
  const [documents, setDocuments] = useState<PropertyDocument[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploadDocName, setUploadDocName] = useState("");

  useEffect(() => {
    fetchProperty();
  }, [propertyId]);

  const fetchProperty = async () => {
    try {
      const res = await fetch(`/api/dashboard/properties/${propertyId}`);
      if (res.ok) {
        const data = await res.json();
        setProperty(data.property);
        setCheckIns(data.checkIns);
        setCheckOuts(data.checkOuts);
      }
      const docsRes = await fetch(`/api/properties/${propertyId}/documents`);
      if (docsRes.ok) {
        const docsData = await docsRes.json();
        setDocuments(docsData);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUploadDocument = async (file: File) => {
    if (!uploadDocName.trim()) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", uploadDocName);
      
      const res = await fetch(`/api/properties/${propertyId}/documents`, {
        method: "POST",
        body: formData,
      });
      
      if (res.ok) {
        const newDoc = await res.json();
        setDocuments([...documents, newDoc]);
        setUploadModalOpen(false);
        setUploadDocName("");
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteDocument = async (docId: string) => {
    if (!confirm("Delete this document?")) return;
    try {
      const res = await fetch(`/api/properties/${propertyId}/documents/${docId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setDocuments(documents.filter((d) => d.id !== docId));
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleExportPdf = (checkIn: CheckIn) => {
    if (property) {
      exportCheckInPdf(checkIn, property.name);
    }
  };

  const handleExportCheckOutPdf = (checkOut: CheckOut) => {
    if (property) {
      exportCheckOutPdf(checkOut, property.name);
    }
  };

  const openCsvModal = (type: "checkins" | "checkouts") => {
    setCsvType(type);
    if (type === "checkins") {
      setSelectedCheckInColumns(CHECK_IN_COLUMNS.map((c) => c.key));
    } else {
      setSelectedCheckOutColumns(CHECK_OUT_COLUMNS.map((c) => c.key));
    }
    setCsvModalOpen(true);
  };

  const toggleColumn = (column: CheckInColumn | CheckOutColumn) => {
    if (csvType === "checkins") {
      setSelectedCheckInColumns((prev) => {
        if (prev.includes(column as CheckInColumn)) {
          return prev.filter((c) => c !== column);
        } else {
          return [...prev, column as CheckInColumn];
        }
      });
    } else {
      setSelectedCheckOutColumns((prev) => {
        if (prev.includes(column as CheckOutColumn)) {
          return prev.filter((c) => c !== column);
        } else {
          return [...prev, column as CheckOutColumn];
        }
      });
    }
  };

  const toggleAll = (checked: boolean) => {
    if (csvType === "checkins") {
      const allColumns = CHECK_IN_COLUMNS.map((c) => c.key);
      setSelectedCheckInColumns(checked ? allColumns : []);
    } else {
      const allColumns = CHECK_OUT_COLUMNS.map((c) => c.key);
      setSelectedCheckOutColumns(checked ? allColumns : []);
    }
  };

  const handleDownloadCsv = () => {
    if (csvType === "checkins") {
      exportCheckInsCsv(checkIns, selectedCheckInColumns, property?.name || "");
    } else {
      exportCheckOutsCsv(checkOuts, selectedCheckOutColumns, property?.name || "");
    }
    setCsvModalOpen(false);
  };

  const getSelectedColumns = () => {
    return csvType === "checkins" ? selectedCheckInColumns : selectedCheckOutColumns;
  };

  const isAllSelected = () => {
    if (csvType === "checkins") {
      return selectedCheckInColumns.length === CHECK_IN_COLUMNS.length;
    }
    return selectedCheckOutColumns.length === CHECK_OUT_COLUMNS.length;
  };

  if (loading) {
    return (
      <div>
        <Header title="Property Details" user={{ name: session?.user?.name, email: session?.user?.email }} />
        <div className="p-6 text-center text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!property) {
    return (
      <div>
        <Header title="Property Details" user={{ name: session?.user?.name, email: session?.user?.email }} />
        <div className="p-6 text-center text-gray-500">Property not found</div>
      </div>
    );
  }

  return (
    <div>
      <Header title={property.name} user={{ name: session?.user?.name, email: session?.user?.email }} />
      <div className="p-6">
        <div className="mb-6">
          <Link
            href="/dashboard/properties"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Properties
          </Link>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Property Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{property.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium">{property.address || "Not specified"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Deposit Amount</p>
                <p className="font-medium">€{property.depositAmount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mb-4 flex gap-2">
          <Button
            variant={activeTab === "checkins" ? "default" : "outline"}
            onClick={() => setActiveTab("checkins")}
          >
            Check-ins ({checkIns.length})
          </Button>
          <Button
            variant={activeTab === "checkouts" ? "default" : "outline"}
            onClick={() => setActiveTab("checkouts")}
          >
            Check-outs ({checkOuts.length})
          </Button>
          <Button
            variant={activeTab === "documents" ? "default" : "outline"}
            onClick={() => setActiveTab("documents")}
          >
            Documents ({documents.length}/3)
          </Button>
        </div>

        {activeTab === "checkins" && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Check-ins</CardTitle>
              {checkIns.length > 0 && (
                <Button variant="outline" size="sm" onClick={() => openCsvModal("checkins")}>
                  <Download className="mr-2 h-4 w-4" />
                  Export CSV
                </Button>
              )}
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left text-sm text-gray-600">
                      <th className="pb-3 font-medium">Guest Name</th>
                      <th className="pb-3 font-medium">Email</th>
                      <th className="pb-3 font-medium">Arrival</th>
                      <th className="pb-3 font-medium">Departure</th>
                      <th className="pb-3 font-medium">Guests</th>
                      <th className="pb-3 font-medium">Deposit</th>
                      <th className="pb-3 font-medium">Condition</th>
                      <th className="pb-3 font-medium">Signature</th>
                      <th className="pb-3 font-medium">Date</th>
                      <th className="pb-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {checkIns.map((checkIn) => (
                      <tr key={checkIn.id} className="border-b">
                        <td className="py-3">{checkIn.guestName}</td>
                        <td className="py-3">{checkIn.guestEmail}</td>
                        <td className="py-3">
                          {new Date(checkIn.arrivalDate).toLocaleDateString()}
                        </td>
                        <td className="py-3">
                          {new Date(checkIn.departureDate).toLocaleDateString()}
                        </td>
                        <td className="py-3">{checkIn.numberOfGuests}</td>
                        <td className="py-3">
                          {checkIn.depositConfirmed ? (
                            <Check className="h-5 w-5 text-green-500" />
                          ) : (
                            <X className="h-5 w-5 text-red-500" />
                          )}
                        </td>
                        <td className="py-3">
                          {checkIn.conditionConfirmed ? (
                            <Check className="h-5 w-5 text-green-500" />
                          ) : (
                            <X className="h-5 w-5 text-red-500" />
                          )}
                        </td>
                        <td className="py-3">
                          {checkIn.signatureDataUrl ? (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                setSignatureView(checkIn.signatureDataUrl)
                              }
                            >
                              <Eye className="mr-1 h-4 w-4" />
                              View
                            </Button>
                          ) : (
                            <X className="h-5 w-5 text-red-500" />
                          )}
                        </td>
                        <td className="py-3">
                          {new Date(checkIn.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleExportPdf(checkIn)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                    {checkIns.length === 0 && (
                      <tr>
                        <td colSpan={10} className="py-6 text-center text-gray-500">
                          No check-ins yet
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "checkouts" && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Check-outs</CardTitle>
              {checkOuts.length > 0 && (
                <Button variant="outline" size="sm" onClick={() => openCsvModal("checkouts")}>
                  <Download className="mr-2 h-4 w-4" />
                  Export CSV
                </Button>
              )}
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left text-sm text-gray-600">
                      <th className="pb-3 font-medium">Guest Name</th>
                      <th className="pb-3 font-medium">Deposit Returned</th>
                      <th className="pb-3 font-medium">Incident Description</th>
                      <th className="pb-3 font-medium">Date</th>
                      <th className="pb-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {checkOuts.map((checkOut) => (
                      <tr key={checkOut.id} className="border-b">
                        <td className="py-3">{checkOut.guestName}</td>
                        <td className="py-3">
                          {checkOut.depositReturned ? (
                            <Check className="h-5 w-5 text-green-500" />
                          ) : (
                            <X className="h-5 w-5 text-red-500" />
                          )}
                        </td>
                        <td className="py-3">
                          {checkOut.incidentDescription || "-"}
                        </td>
                        <td className="py-3">
                          {new Date(checkOut.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleExportCheckOutPdf(checkOut)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                    {checkOuts.length === 0 && (
                      <tr>
                        <td colSpan={5} className="py-6 text-center text-gray-500">
                          No check-outs yet
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "documents" && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Property Documents</CardTitle>
              {documents.length < 3 && (
                <Button variant="outline" size="sm" onClick={() => setUploadModalOpen(true)}>
                  <Upload className="mr-2 h-4 w-4" />
                  Add Document
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {documents.length === 0 ? (
                <p className="text-center text-gray-500 py-6">No documents uploaded</p>
              ) : (
                <div className="space-y-2">
                  {documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between border p-3 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-gray-500">
                            {doc.fileName} ({(doc.fileSize / 1024).toFixed(1)} KB)
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <a
                          href={doc.filePath}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 hover:bg-gray-100 rounded"
                        >
                          <Eye className="h-4 w-4" />
                        </a>
                        <button
                          onClick={() => handleDeleteDocument(doc.id)}
                          className="p-2 hover:bg-red-50 text-red-500 rounded"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {documents.length >= 3 && (
                <p className="text-sm text-amber-600 mt-2">Maximum 3 documents per property</p>
              )}
            </CardContent>
          </Card>
        )}

        {signatureView && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="rounded-lg bg-white p-6">
              <h3 className="mb-4 text-lg font-semibold">Guest Signature</h3>
              <img
                src={signatureView}
                alt="Signature"
                className="mb-4 max-h-48 border"
              />
              <div className="flex justify-end">
                <Button onClick={() => setSignatureView(null)}>Close</Button>
              </div>
            </div>
          </div>
        )}

        {csvModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
              <h3 className="mb-4 text-lg font-semibold">
                {csvType === "checkins" ? "Export Check-Ins as CSV" : "Export Check-Outs as CSV"}
              </h3>
              <div className="mb-4">
                <button
                  className="text-sm text-blue-600 hover:underline"
                  onClick={() => toggleAll(!isAllSelected())}
                >
                  {isAllSelected() ? "Deselect All" : "Select All"}
                </button>
              </div>
                  <div className="max-h-60 space-y-2 overflow-y-auto">
                {(csvType === "checkins" ? CHECK_IN_COLUMNS : CHECK_OUT_COLUMNS).map((col) => (
                  <label key={col.key} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={csvType === "checkins" 
                        ? selectedCheckInColumns.includes(col.key as CheckInColumn)
                        : selectedCheckOutColumns.includes(col.key as CheckOutColumn)}
                      onChange={() => toggleColumn(col.key as CheckInColumn | CheckOutColumn)}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <span className="text-sm">{col.label}</span>
                  </label>
                ))}
              </div>
              <div className="mt-6 flex justify-end gap-2">
                <Button variant="outline" onClick={() => setCsvModalOpen(false)}>
                  Cancel
                </Button>
                <Button
                  disabled={getSelectedColumns().length === 0}
                  onClick={handleDownloadCsv}
                >
                  Download CSV
                </Button>
              </div>
            </div>
          </div>
        )}

        {uploadModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
              <h3 className="mb-4 text-lg font-semibold">Upload Document</h3>
              <p className="text-sm text-gray-500 mb-4">
                PDF files only, max 5MB (3 documents per property)
              </p>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Document Name</label>
                <input
                  type="text"
                  value={uploadDocName}
                  onChange={(e) => setUploadDocName(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  placeholder="e.g., House Rules, Welcome Guide"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Select PDF File</label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleUploadDocument(file);
                  }}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => { setUploadModalOpen(false); setUploadDocName(""); }}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
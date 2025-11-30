"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, CheckCircle, FileText, AlertCircle, ChevronRight } from "lucide-react"

interface DocumentUpload {
  id: string
  name: string
  description: string
  uploaded: boolean
  file?: File
}

export default function DriverOnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [documents, setDocuments] = useState<DocumentUpload[]>([
    {
      id: "license",
      name: "Driver License",
      description: "Clear front and back photos of your valid driver license",
      uploaded: false,
    },
    {
      id: "passport",
      name: "Passport",
      description: "Valid passport or government-issued ID",
      uploaded: false,
    },
    {
      id: "cv",
      name: "CV/Resume",
      description: "Your professional CV or resume",
      uploaded: false,
    },
    {
      id: "vehicle_registration",
      name: "Vehicle Registration",
      description: "Vehicle registration document",
      uploaded: false,
    },
    {
      id: "vehicle_insurance",
      name: "Vehicle Insurance",
      description: "Valid vehicle insurance document",
      uploaded: false,
    },
    {
      id: "background_check",
      name: "Background Check Authorization",
      description: "Consent form for background verification",
      uploaded: false,
    },
  ])
  const [bankInfo, setBankInfo] = useState({
    accountName: "",
    accountNumber: "",
    bankName: "",
    routingNumber: "",
  })

  useEffect(() => {
    const role = localStorage.getItem("userRole")
    if (!role || role !== "driver") {
      router.push("/login")
    }
  }, [router])

  const handleFileUpload = (docId: string, file: File) => {
    setDocuments((docs) =>
      docs.map((doc) => (doc.id === docId ? { ...doc, uploaded: true, file } : doc))
    )
  }

  const handleBankInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setBankInfo((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep((s) => s + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((s) => s - 1)
    }
  }

  const handleSubmit = async () => {
    const allDocumentsUploaded = documents.every((doc) => doc.uploaded)
    const bankInfoFilled = bankInfo.accountName && bankInfo.accountNumber && bankInfo.bankName

    if (allDocumentsUploaded && bankInfoFilled) {
      // Simulate submission
      localStorage.setItem("onboardingComplete", "true")
      router.push("/dashboard/driver")
    } else {
      alert("Please complete all required fields and upload all documents")
    }
  }

  const progressSteps = ["Documents", "Bank Details", "Review"]
  const uploadedCount = documents.filter((d) => d.uploaded).length

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold">A</span>
            </div>
          </Link>
          <div>
            <h1 className="font-bold text-foreground">Driver Onboarding</h1>
            <p className="text-sm text-muted-foreground">Complete your profile to start earning</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {progressSteps.map((step, index) => {
              const stepNumber = index + 1
              const isCompleted = currentStep > stepNumber
              const isActive = currentStep === stepNumber
              return (
                <div key={index} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition ${
                      isCompleted || isActive
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {isCompleted ? "✓" : stepNumber}
                  </div>
                  <p className="ml-2 text-sm font-semibold text-foreground hidden sm:block">{step}</p>
                  {index < progressSteps.length - 1 && (
                    <div
                      className={`h-1 mx-4 transition ${currentStep > stepNumber ? "bg-primary" : "bg-muted"}`}
                      style={{ width: "60px" }}
                    ></div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Step 1: Documents */}
        {currentStep === 1 && (
          <Card className="p-8 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Upload Required Documents</h2>
              <p className="text-muted-foreground">
                Upload clear, readable copies of all required documents ({uploadedCount}/{documents.length})
              </p>
            </div>

            <div className="space-y-4">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="border-2 border-dashed border-border rounded-lg p-6 hover:border-primary/50 transition"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {doc.uploaded ? (
                          <CheckCircle size={20} className="text-primary" />
                        ) : (
                          <FileText size={20} className="text-muted-foreground" />
                        )}
                        <h3 className="font-semibold text-foreground">{doc.name}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground ml-6">{doc.description}</p>
                    </div>

                    {/* label + file input */}
                    <div className="flex flex-col items-end gap-2">
                      <label
                        htmlFor={`${doc.id}-file`}
                        className={`inline-flex items-center px-4 py-2 rounded-lg transition cursor-pointer z-10 ${
                          doc.uploaded
                            ? "bg-primary/10 text-primary"
                            : "bg-primary text-primary-foreground hover:bg-primary/90"
                        }`}
                      >
                        <div className="flex items-center gap-2 text-sm font-semibold">
                          <Upload size={16} />
                          {doc.uploaded ? "Uploaded" : "Upload"}
                        </div>
                      </label>
                      <input
                        id={`${doc.id}-file`}
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            handleFileUpload(doc.id, e.target.files[0])
                          }
                        }}
                        accept="image/*,.pdf"
                      />
                      {/* show filename or hint */}
                      <div className="text-xs text-muted-foreground">
                        {doc.file ? doc.file.name : <span>Accepted: JPG, PNG, PDF</span>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
              <AlertCircle className="text-blue-600 flex-shrink-0" size={20} />
              <p className="text-sm text-blue-800">
                All documents must be clear, valid, and match your name. Blurry or invalid documents will be rejected.
              </p>
            </div>
          </Card>
        )}

        {/* Step 2: Bank Details */}
        {currentStep === 2 && (
          <Card className="p-8 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Bank Account Information</h2>
              <p className="text-muted-foreground">We'll use this account for your earnings deposits</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Account Holder Name</label>
                <input
                  type="text"
                  name="accountName"
                  value={bankInfo.accountName}
                  onChange={handleBankInfoChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Bank Name</label>
                <input
                  type="text"
                  name="bankName"
                  value={bankInfo.bankName}
                  onChange={handleBankInfoChange}
                  placeholder="ABC Bank"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Account Number</label>
                  <input
                    type="text"
                    name="accountNumber"
                    value={bankInfo.accountNumber}
                    onChange={handleBankInfoChange}
                    placeholder="1234567890"
                    className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Routing Number</label>
                  <input
                    type="text"
                    name="routingNumber"
                    value={bankInfo.routingNumber}
                    onChange={handleBankInfoChange}
                    placeholder="021000021"
                    className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground"
                  />
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex gap-3">
              <AlertCircle className="text-yellow-600 flex-shrink-0" size={20} />
              <p className="text-sm text-yellow-800">
                Your bank information is encrypted and secure. We only use it for deposits.
              </p>
            </div>
          </Card>
        )}

        {/* Step 3: Review */}
        {currentStep === 3 && (
          <Card className="p-8 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Review Your Information</h2>
              <p className="text-muted-foreground">Please verify all information before submitting</p>
            </div>

            <div className="space-y-4">
              <Card className="p-4 bg-muted/30 border-border">
                <h3 className="font-semibold text-foreground mb-3">Documents Submitted</h3>
                <div className="space-y-2">
                  {documents.map((doc) => (
                    <div key={doc.id} className="flex items-center gap-2">
                      <CheckCircle size={18} className={doc.uploaded ? "text-primary" : "text-destructive"} />
                      <span className="text-sm text-foreground">{doc.name}</span>
                      <span className="text-xs text-muted-foreground ml-auto">
                        {doc.uploaded ? "Uploaded" : "Missing"}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-4 bg-muted/30 border-border">
                <h3 className="font-semibold text-foreground mb-3">Bank Details</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Account Name:</span>
                    <span className="text-foreground font-medium">{bankInfo.accountName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bank Name:</span>
                    <span className="text-foreground font-medium">{bankInfo.bankName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Account Number:</span>
                    <span className="text-foreground font-medium">••••••••{bankInfo.accountNumber?.slice(-4)}</span>
                  </div>
                </div>
              </Card>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3">
              <CheckCircle className="text-green-600 flex-shrink-0" size={20} />
              <p className="text-sm text-green-800">
                Your application looks complete! Submit to proceed with verification (1-2 business days).
              </p>
            </div>
          </Card>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-4 mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex-1 bg-transparent"
          >
            Previous
          </Button>
          {currentStep < 3 ? (
            <Button onClick={handleNext} disabled={currentStep === 1 && uploadedCount < documents.length} className="flex-1">
              Next
              <ChevronRight size={20} className="ml-2" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="flex-1">
              Submit Application
            </Button>
          )}
        </div>
      </main>
    </div>
  )
}

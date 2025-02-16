"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileText, Upload, Download, Trash2, AlertTriangle, CheckCircle, Clock, Eye, Edit, Filter } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface Document {
  id: number
  name: string
  uploadDate: string
  endDate: string
  status: "Approved" | "Pending" | "Rejected"
  feedback?: string
}

export function DocumentManagement() {
  const [documents, setDocuments] = useState<Document[]>([
    { id: 1, name: "Project Plan.pdf", uploadDate: "2023-07-01", endDate: "2024-01-15", status: "Approved" },
    {
      id: 2,
      name: "Building Permit Application.docx",
      uploadDate: "2023-07-05",
      endDate: "2023-12-31",
      status: "Pending",
    },
    {
      id: 3,
      name: "Environmental Impact Assessment.pdf",
      uploadDate: "2023-07-10",
      endDate: "2023-08-15",
      status: "Rejected",
      feedback:
        "The assessment lacks detailed analysis of the project's impact on local wildlife. Please revise section 3.2 and resubmit.",
    },
  ])

  const [newDocument, setNewDocument] = useState<File | null>(null)
  const [statusFilter, setStatusFilter] = useState("all")

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setNewDocument(event.target.files[0])
    }
  }

  const handleUpload = () => {
    if (newDocument) {
      const newDoc: Document = {
        id: documents.length + 1,
        name: newDocument.name,
        uploadDate: new Date().toISOString().split("T")[0],
        endDate: new Date().toISOString().split("T")[0], // Placeholder end date
        status: "Pending",
      }
      setDocuments([...documents, newDoc])
      setNewDocument(null)
    }
  }

  const getStatusIcon = (status: Document["status"]) => {
    switch (status) {
      case "Approved":
        return <CheckCircle className="text-green-500" />
      case "Rejected":
        return <AlertTriangle className="text-red-500" />
      case "Pending":
        return <Clock className="text-yellow-500" />
    }
  }

  const filteredDocuments = documents.filter((doc) =>
    statusFilter === "all" ? true : doc.status.toLowerCase() === statusFilter.toLowerCase(),
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Document Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex items-center space-x-2">
            <Input type="file" onChange={handleFileChange} className="flex-grow" accept=".pdf,.docx,.dwg,.las,.laz" />
            <Button onClick={handleUpload} disabled={!newDocument} className="bg-green-500 hover:bg-green-600">
              <Upload className="mr-2 h-4 w-4" /> Upload File
            </Button>
          </div>
          <div className="mt-2 text-sm text-muted-foreground">Supported file types: .pdf, .docx, .dwg, .las, .laz</div>
        </div>
        <div className="mb-4 flex justify-end">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Documents</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-4">
          {filteredDocuments.map((doc) => (
            <Card key={doc.id} className="bg-gray-50">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-4">
                  <FileText className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">{doc.name}</p>
                    <p className="text-sm text-muted-foreground">Uploaded on {doc.uploadDate}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span
                          className={cn(
                            "text-sm",
                            doc.status === "Approved"
                              ? "text-green-500"
                              : doc.status === "Rejected"
                                ? "text-red-500"
                                : "text-yellow-500",
                          )}
                        >
                          {getStatusIcon(doc.status)}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{doc.status}</p>
                        {doc.status === "Rejected" && <p>Click for feedback</p>}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <div className="mt-2 text-sm text-foreground">
                    <span className="font-medium">Status:</span>{" "}
                    <span
                      className={cn(
                        doc.status === "Approved"
                          ? "text-green-500 dark:text-green-400"
                          : doc.status === "Rejected"
                            ? "text-red-500 dark:text-red-400"
                            : "text-yellow-500 dark:text-yellow-400",
                      )}
                    >
                      {doc.status}
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-foreground">
                    <span className="font-medium">Estimated End Date:</span>{" "}
                    <span className="text-muted-foreground">{doc.endDate}</span>
                  </div>
                  {doc.status === "Rejected" && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          Feedback
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Document Feedback</DialogTitle>
                          <DialogDescription>{doc.feedback}</DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  )}
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-500">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}


"use client"

import { useState, useEffect } from "react"
import { FixedSizeList as List } from "react-window"
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

interface Document {
  id: number
  name: string
  uploadDate: string
  status: "Approved" | "Pending" | "Rejected"
  feedback?: string
  projectId: number
}

interface Project {
  id: number
  name: string
}

export default function Documents() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null)
  const [newDocument, setNewDocument] = useState<File | null>(null)
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    // Fetch projects (mock data for now)
    const mockProjects: Project[] = [
      { id: 1, name: "City Center Renovation" },
      { id: 2, name: "Riverside Development" },
      { id: 3, name: "Metro Station Upgrade" },
    ]
    setProjects(mockProjects)

    // Fetch documents (mock data for now)
    const mockDocuments: Document[] = [
      { id: 1, name: "Project Plan.pdf", uploadDate: "2023-07-01", status: "Approved", projectId: 1 },
      { id: 2, name: "Building Permit Application.docx", uploadDate: "2023-07-05", status: "Pending", projectId: 1 },
      {
        id: 3,
        name: "Environmental Impact Assessment.pdf",
        uploadDate: "2023-07-10",
        status: "Rejected",
        feedback:
          "The assessment lacks detailed analysis of the project's impact on local wildlife. Please revise section 3.2 and resubmit.",
        projectId: 2,
      },
      { id: 4, name: "Site Survey.pdf", uploadDate: "2023-07-15", status: "Approved", projectId: 3 },
    ]
    setDocuments(mockDocuments)
  }, [])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setNewDocument(event.target.files[0])
    }
  }

  const handleUpload = () => {
    if (newDocument && selectedProjectId) {
      const newDoc: Document = {
        id: documents.length + 1,
        name: newDocument.name,
        uploadDate: new Date().toISOString().split("T")[0],
        status: "Pending",
        projectId: selectedProjectId,
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

  const filteredDocuments = documents.filter(
    (doc) =>
      (statusFilter === "all" ? true : doc.status.toLowerCase() === statusFilter.toLowerCase()) &&
      (selectedProjectId ? doc.projectId === selectedProjectId : true),
  )

  const DocumentRow = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const doc = filteredDocuments[index]
    return (
      <div style={style}>
        <Card className="bg-gray-50 mb-2">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <FileText className="h-8 w-8 text-blue-500" />
              <div>
                <p className="font-medium">{doc.name}</p>
                <p className="text-sm text-muted-foreground">Uploaded on {doc.uploadDate}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span
                      className={`text-sm ${
                        doc.status === "Approved"
                          ? "text-green-500"
                          : doc.status === "Rejected"
                            ? "text-red-500"
                            : "text-yellow-500"
                      }`}
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
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Document Management</h1>
        <Button onClick={handleUpload} disabled={!newDocument || !selectedProjectId}>
          <Upload className="mr-2 h-4 w-4" /> Upload New Document
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Select
                value={selectedProjectId?.toString() || ""}
                onValueChange={(value) => setSelectedProjectId(Number(value))}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.id.toString()}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input type="file" onChange={handleFileChange} className="w-64" disabled={!selectedProjectId} />
            </div>
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
          {selectedProjectId ? (
            <List height={400} itemCount={filteredDocuments.length} itemSize={100} width="100%">
              {DocumentRow}
            </List>
          ) : (
            <p className="text-center text-muted-foreground">Please select a project to view its documents.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}


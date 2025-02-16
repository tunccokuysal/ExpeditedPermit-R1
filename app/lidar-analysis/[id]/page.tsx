"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { HelpCircle, Eye, Download, Upload, Trash2, FileText } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"
import { LIDARVisualization3D } from "@/components/lidar-visualization-3d"
import AnalysisWizard from "@/components/AnalysisWizard"

interface UploadedFile {
  id: number
  name: string
  type: "2d" | "lidar"
  uploadDate: string
}

export default function LidarAnalysisPage() {
  const params = useParams()
  const projectId = typeof params.id === "string" ? Number.parseInt(params.id, 10) : 0
  const [projectName, setProjectName] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [processingFile, setProcessingFile] = useState<string | null>(null)

  useEffect(() => {
    const fetchProjectDetails = async () => {
      // In a real app, you would fetch the project details from an API
      // For now, we'll simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 500))
      setProjectName(`Project ${projectId}`)
      // You would typically set more project details here
    }

    if (projectId) {
      fetchProjectDetails()
    }
  }, [projectId])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const fileType = file.name.split(".").pop()?.toLowerCase()
      if (!["dwg", "las", "laz"].includes(fileType || "")) {
        console.error("Unsupported file type")
        return
      }

      const newFile: UploadedFile = {
        id: uploadedFiles.length + 1,
        name: file.name,
        type: fileType === "dwg" ? "2d" : "lidar",
        uploadDate: new Date().toISOString().split("T")[0],
      }
      setUploadedFiles([...uploadedFiles, newFile])

      setProcessingFile(newFile.name)
      // Simulated processing time
      setTimeout(() => {
        setProcessingFile(null)
        console.log(`${newFile.name} processed successfully for ${projectName}`)
      }, 3000)
    }
  }

  const handleFileDelete = (id: number) => {
    setUploadedFiles(uploadedFiles.filter((file) => file.id !== id))
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">LIDAR Analysis - {projectName}</h1>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <HelpCircle className="h-5 w-5" />
            </TooltipTrigger>
            <TooltipContent>
              <p>LIDAR technology creates a 3D model of your building for precise analysis</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <AnalysisWizard projectId={projectId} />

      <Card>
        <CardHeader>
          <CardTitle>Upload Files for Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Input type="file" onChange={handleFileUpload} accept=".dwg,.las,.laz" />
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Upload
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Supported file types: .dwg (2D drawings), .las/.laz (LIDAR point clouds)
          </p>
          <div className="space-y-2">
            {uploadedFiles.map((file) => (
              <div key={file.id} className="flex items-center justify-between bg-muted p-2 rounded-md">
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>{file.name}</span>
                  <span className="text-sm text-muted-foreground">({file.type})</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleFileDelete(file.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          {processingFile && (
            <div className="mt-4 p-2 bg-blue-100 text-blue-700 rounded-md">
              <p>Processing file: {processingFile}</p>
              <Progress value={50} className="mt-2" />
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>3D LIDAR Visualization</CardTitle>
        </CardHeader>
        <CardContent>
          <LIDARVisualization3D />
          <div className="mt-4 flex justify-end space-x-2">
            <Button variant="outline">
              <Eye className="mr-2 h-4 w-4" />
              View Full Screen
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download Scan Data
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


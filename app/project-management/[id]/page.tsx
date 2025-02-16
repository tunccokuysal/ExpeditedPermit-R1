"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { DocumentManagement } from "../../components/document-management"
import { TrelloBoard } from "../../components/trello-board"
import { RFIForm } from "../../components/rfi-form"
import { BlockchainWarranty } from "../../components/blockchain-warranty"
import { LIDARVisualization } from "../../components/lidar-visualization"
import { PermitProcessTracker } from "../../components/permit-process-tracker"
import { PermitWizard } from "../../components/permit-wizard"
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Upload,
  FileText,
  CameraIcon as Camera3d,
  Brain,
  TrendingUp,
  TrendingDown,
  AlertCircle,
} from "lucide-react"
import { useAuth } from "../../auth/authContext"
import type { Project, ProjectStage } from "../../types/project"
import dynamic from "next/dynamic"

const GanttChart = dynamic(() => import("../../components/gantt-chart").then((mod) => mod.GanttChart), { ssr: false })

interface AIInsight {
  type: "positive" | "negative" | "neutral"
  category: "schedule" | "budget" | "quality" | "safety" | "compliance"
  description: string
  impact: "low" | "medium" | "high"
  recommendation?: string
}

interface FileVersion {
  id: number
  name: string
  type: "2d" | "lidar"
  documentType: "drawing" | "lidar" | "document" | "bim"
  stage: ProjectStage
  version: string
  uploadDate: string
}

export default function ProjectDetail() {
  const { user } = useAuth()
  const params = useParams()
  const router = useRouter()
  const projectId = typeof params.id === "string" ? Number.parseInt(params.id) : 0
  const [project, setProject] = useState<Project | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [fileVersions, setFileVersions] = useState<FileVersion[]>([])
  const [selectedStage, setSelectedStage] = useState<ProjectStage>("precon")
  const [uploadStage, setUploadStage] = useState<ProjectStage>("precon")
  const [documentType, setDocumentType] = useState<FileVersion["documentType"]>("drawing")
  const [aiInsights, setAIInsights] = useState<AIInsight[]>([])

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    const fetchProject = async () => {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      const mockProject: Project = {
        id: projectId,
        name: "City Center Renovation",
        type: "Commercial",
        description: "Renovation of the city center including modernization of storefronts and public spaces.",
        status: "In Progress",
        stages: {
          precon: { status: "Completed", progress: 100 },
          construction: { status: "In Progress", progress: 65 },
          handover: { status: "Not Started", progress: 0 },
        },
        startDate: "2023-01-15",
        endDate: "2023-12-31",
      }
      setProject(mockProject)

      // Mock file versions
      const mockFileVersions: FileVersion[] = [
        {
          id: 1,
          name: "initial_scan.las",
          type: "lidar",
          documentType: "lidar",
          stage: "precon",
          version: "1.0",
          uploadDate: "2023-01-20",
        },
        {
          id: 2,
          name: "floor_plan_v1.dwg",
          type: "2d",
          documentType: "drawing",
          stage: "precon",
          version: "1.0",
          uploadDate: "2023-01-25",
        },
        {
          id: 3,
          name: "construction_scan.las",
          type: "lidar",
          documentType: "lidar",
          stage: "construction",
          version: "1.0",
          uploadDate: "2023-03-15",
        },
        {
          id: 4,
          name: "floor_plan_v2.dwg",
          type: "2d",
          documentType: "drawing",
          stage: "construction",
          version: "2.0",
          uploadDate: "2023-03-20",
        },
      ]
      setFileVersions(mockFileVersions)

      // Mock AI Insights
      const mockAIInsights: AIInsight[] = [
        {
          type: "positive",
          category: "schedule",
          description: "Project is currently 2 days ahead of schedule",
          impact: "medium",
          recommendation: "Consider reallocating resources to other critical tasks",
        },
        {
          type: "negative",
          category: "budget",
          description: "Material costs have increased by 5% due to supply chain issues",
          impact: "high",
          recommendation: "Explore alternative suppliers or bulk purchasing options",
        },
        {
          type: "neutral",
          category: "quality",
          description: "Recent LIDAR scan shows 98% alignment with BIM model",
          impact: "low",
        },
        {
          type: "positive",
          category: "safety",
          description: "Zero incidents reported in the last 30 days",
          impact: "high",
          recommendation: "Continue enforcing current safety protocols",
        },
        {
          type: "negative",
          category: "compliance",
          description: "Recent changes in local building codes may affect 2 project areas",
          impact: "medium",
          recommendation: "Schedule urgent meeting with local authorities for clarification",
        },
      ]
      setAIInsights(mockAIInsights)
    }

    fetchProject()
  }, [projectId, user, router])

  if (!project || !user) {
    return <div>Loading...</div>
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="text-green-500" />
      case "Delayed":
        return <AlertTriangle className="text-red-500" />
      case "In Progress":
        return <Clock className="text-blue-500" />
      default:
        return <Clock className="text-gray-500" />
    }
  }

  const renderStageProgress = (stageName: string, stage: { status: string; progress: number }) => (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold">{stageName}</span>
        <div className="flex items-center">
          {getStatusIcon(stage.status)}
          <span className="ml-2">{stage.status}</span>
        </div>
      </div>
      <Progress value={stage.progress} className="h-2" />
      <span className="text-sm">{stage.progress}% Complete</span>
    </div>
  )

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0])
    }
  }

  const handleFileUpload = async () => {
    if (!selectedFile) return

    const fileType = selectedFile.name.split(".").pop()?.toLowerCase()
    if (!["dwg", "pdf", "ifc", "las", "laz"].includes(fileType || "")) {
      console.error("Unsupported file type")
      return
    }

    const newVersion: FileVersion = {
      id: Date.now(),
      name: selectedFile.name,
      type: documentType === "drawing" ? "2d" : "lidar",
      documentType: documentType,
      stage: uploadStage,
      version: "1.0", // You might want to implement proper versioning logic
      uploadDate: new Date().toISOString().split("T")[0],
    }

    setFileVersions([...fileVersions, newVersion])
    setSelectedFile(null)
  }

  const getInsightIcon = (type: AIInsight["type"]) => {
    switch (type) {
      case "positive":
        return <TrendingUp className="text-green-500" />
      case "negative":
        return <TrendingDown className="text-red-500" />
      case "neutral":
        return <AlertCircle className="text-yellow-500" />
    }
  }

  const getInsightColor = (type: AIInsight["type"]) => {
    switch (type) {
      case "positive":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "negative":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "neutral":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{project.name}</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Project Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="font-semibold">Type:</p>
              <p>{project.type}</p>
            </div>
            <div>
              <p className="font-semibold">Status:</p>
              <div className="flex items-center">
                {getStatusIcon(project.status)}
                <span className="ml-2">{project.status}</span>
              </div>
            </div>
            <div>
              <p className="font-semibold">Start Date:</p>
              <p>{project.startDate}</p>
            </div>
            <div>
              <p className="font-semibold">Estimated End Date:</p>
              <p>{project.endDate}</p>
            </div>
          </div>
          <div className="mb-4">
            <p className="font-semibold">Description:</p>
            <p>{project.description}</p>
          </div>
          <div>
            <p className="font-semibold mb-2">Project Stages:</p>
            {renderStageProgress("Precon", project.stages.precon)}
            {renderStageProgress("Construction", project.stages.construction)}
            {renderStageProgress("Handover", project.stages.handover)}
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="mr-2 h-5 w-5" />
            AI Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {aiInsights.map((insight, index) => (
              <Alert key={index} className={getInsightColor(insight.type)}>
                <div className="flex items-center">
                  {getInsightIcon(insight.type)}
                  <AlertTitle className="ml-2">
                    {insight.category.charAt(0).toUpperCase() + insight.category.slice(1)}
                  </AlertTitle>
                </div>
                <AlertDescription>
                  <p className="mt-2">{insight.description}</p>
                  <div className="mt-2 flex items-center">
                    <Badge variant="outline" className="mr-2">
                      Impact: {insight.impact}
                    </Badge>
                    {insight.recommendation && (
                      <p className="text-sm">
                        <strong>Recommendation:</strong> {insight.recommendation}
                      </p>
                    )}
                  </div>
                </AlertDescription>
              </Alert>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>LIDAR and 2D Drawings</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="upload">
            <TabsList>
              <TabsTrigger value="upload">Upload</TabsTrigger>
              <TabsTrigger value="versions">Versions</TabsTrigger>
              <TabsTrigger value="visualization">Visualization</TabsTrigger>
            </TabsList>
            <TabsContent value="upload">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Input type="file" onChange={handleFileChange} accept=".dwg,.pdf,.ifc,.las,.laz" />
                  <Select value={uploadStage} onValueChange={(value) => setUploadStage(value as ProjectStage)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select stage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="precon">Precon</SelectItem>
                      <SelectItem value="construction">Construction</SelectItem>
                      <SelectItem value="handover">Handover</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={documentType}
                    onValueChange={(value) => setDocumentType(value as FileVersion["documentType"])}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="drawing">2D Drawing</SelectItem>
                      <SelectItem value="lidar">LIDAR Scan</SelectItem>
                      <SelectItem value="document">Document</SelectItem>
                      <SelectItem value="bim">BIM Model</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={handleFileUpload} disabled={!selectedFile}>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Supported file types: .dwg (2D drawings), .pdf (documents), .ifc (BIM models), .las/.laz (LIDAR data)
                </p>
              </div>
            </TabsContent>
            <TabsContent value="versions">
              <div className="space-y-4">
                <Select value={selectedStage} onValueChange={(value) => setSelectedStage(value as ProjectStage)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select stage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="precon">Precon</SelectItem>
                    <SelectItem value="construction">Construction</SelectItem>
                    <SelectItem value="handover">Handover</SelectItem>
                  </SelectContent>
                </Select>
                <div className="space-y-2">
                  {fileVersions
                    .filter((file) => file.stage === selectedStage)
                    .map((file) => (
                      <div key={file.id} className="flex items-center justify-between bg-muted p-2 rounded-md">
                        <div className="flex items-center space-x-2">
                          {file.type === "2d" ? <FileText className="h-4 w-4" /> : <Camera3d className="h-4 w-4" />}
                          <span>{file.name}</span>
                          <span className="text-sm text-muted-foreground">v{file.version}</span>
                          <span className="text-sm text-muted-foreground">({file.documentType})</span>
                        </div>
                        <div className="text-sm text-muted-foreground">{file.uploadDate}</div>
                      </div>
                    ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="visualization">
              <LIDARVisualization />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Tabs defaultValue="permit-wizard">
        <TabsList>
          <TabsTrigger value="permit-wizard">Permit Wizard</TabsTrigger>
          <TabsTrigger value="permit-process">Permit Process</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="rfi">RFI</TabsTrigger>
          <TabsTrigger value="warranty">Warranty</TabsTrigger>
        </TabsList>
        <TabsContent value="permit-wizard">
          <PermitWizard />
        </TabsContent>
        <TabsContent value="permit-process">
          <PermitProcessTracker />
        </TabsContent>
        <TabsContent value="timeline">
          <Card>
            <CardHeader>
              <CardTitle>Project Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <GanttChart projectId={project.id} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="documents">
          <DocumentManagement />
        </TabsContent>
        <TabsContent value="tasks">
          <TrelloBoard />
        </TabsContent>
        <TabsContent value="rfi">
          <RFIForm projectId={project.id} />
        </TabsContent>
        <TabsContent value="warranty">
          <BlockchainWarranty projectId={project.id} projectName={project.name} />
        </TabsContent>
      </Tabs>
    </div>
  )
}


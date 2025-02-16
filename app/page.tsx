"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Building2, FileText, AlertTriangle, CheckCircle, Clock, ArrowRight, HardHat } from "lucide-react"
import Link from "next/link"

interface AIAnalysis {
  type: string
  status: "completed" | "in-progress" | "pending"
  result?: string
}

interface ConstructionPhase {
  name: string
  progress: number
  aiAnalyses: AIAnalysis[]
}

interface Project {
  id: number
  name: string
  progress: number
  status: string
  type: string
  lastUpdate: string
  pendingTasks: number
  completedTasks: number
  constructionPhases: ConstructionPhase[]
  buildingCode: "IRC" | "ICC" | "IBC"
}

const projectTypes = ["Konut", "Ticari", "Endüstriyel", "Karma Kullanım"]
const projectStatuses = ["Planlama", "İzin Süreci", "İnşaat", "Tamamlandı"]

const generateDummyProjects = (count: number): Project[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Proje ${i + 1}`,
    progress: Math.floor(Math.random() * 100),
    status: projectStatuses[Math.floor(Math.random() * projectStatuses.length)],
    type: projectTypes[Math.floor(Math.random() * projectTypes.length)],
    lastUpdate: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toLocaleDateString(),
    pendingTasks: Math.floor(Math.random() * 10),
    completedTasks: Math.floor(Math.random() * 20),
    constructionPhases: [
      {
        name: "Precon",
        progress: Math.floor(Math.random() * 100),
        aiAnalyses: [
          { type: "2D Çizim Uyumluluk Analizi", status: "completed", result: "Uyumlu" },
          { type: "Clash Analizi", status: "completed", result: "3 çakışma tespit edildi" },
        ],
      },
      {
        name: "İnşaat",
        progress: Math.floor(Math.random() * 100),
        aiAnalyses: [
          { type: "Yapısal Analiz", status: "in-progress" },
          { type: "Elektrik Kablo Analizi", status: "pending" },
          { type: "Çelik Analizi", status: "pending" },
        ],
      },
      {
        name: "Teslim",
        progress: Math.floor(Math.random() * 100),
        aiAnalyses: [{ type: "Son Uygunluk Kontrolü", status: "pending" }],
      },
    ],
    buildingCode: ["IRC", "ICC", "IBC"][Math.floor(Math.random() * 3)] as "IRC" | "ICC" | "IBC",
  }))
}

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    setProjects(generateDummyProjects(6))
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Tamamlandı":
        return <CheckCircle className="text-green-500" />
      case "İnşaat":
        return <Building2 className="text-blue-500" />
      case "İzin Süreci":
        return <FileText className="text-yellow-500" />
      case "Planlama":
        return <Clock className="text-gray-500" />
      default:
        return <AlertTriangle className="text-red-500" />
    }
  }

  const getAIAnalysisIcon = (status: AIAnalysis["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="text-green-500" />
      case "in-progress":
        return <Clock className="text-yellow-500" />
      case "pending":
        return <AlertTriangle className="text-gray-300" />
    }
  }

  const projectTypeData = projectTypes.map((type) => ({
    name: type,
    count: projects.filter((p) => p.type === type).length,
  }))

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Expedited Permit Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Proje</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">İzin Sürecinde</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.filter((p) => p.status === "İzin Süreci").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">İnşaat Aşamasında</CardTitle>
            <HardHat className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.filter((p) => p.status === "İnşaat").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tamamlanan Projeler</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.filter((p) => p.status === "Tamamlandı").length}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Proje Türü Dağılımı</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={projectTypeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mt-6 mb-4">Aktif Projeler</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{project.name}</span>
                {getStatusIcon(project.status)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">Tür: {project.type}</p>
              <p className="text-sm text-muted-foreground mb-2">Durum: {project.status}</p>
              <p className="text-sm text-muted-foreground mb-2">Bina Kodu: {project.buildingCode}</p>
              <p className="text-sm text-muted-foreground mb-4">Son Güncelleme: {project.lastUpdate}</p>
              <div className="mb-2">
                <span className="text-sm text-muted-foreground">Genel İlerleme:</span>
                <span className="float-right font-medium">{project.progress}%</span>
              </div>
              <Progress value={project.progress} className="mb-4" />
              <div className="mb-4">
                <h3 className="text-sm font-semibold mb-2">İnşaat Aşamaları</h3>
                {project.constructionPhases.map((phase, index) => (
                  <div key={index} className="mb-2">
                    <p className="text-sm">
                      {phase.name}: {phase.progress}%
                    </p>
                    <Progress value={phase.progress} className="h-2" />
                  </div>
                ))}
              </div>
              <div className="mb-4">
                <h3 className="text-sm font-semibold mb-2">AI Analizleri</h3>
                <Tabs defaultValue={project.constructionPhases[0].name}>
                  <TabsList>
                    {project.constructionPhases.map((phase, index) => (
                      <TabsTrigger key={index} value={phase.name}>
                        {phase.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {project.constructionPhases.map((phase, phaseIndex) => (
                    <TabsContent key={phaseIndex} value={phase.name}>
                      {phase.aiAnalyses.map((analysis, analysisIndex) => (
                        <div key={analysisIndex} className="flex items-center mb-1">
                          {getAIAnalysisIcon(analysis.status)}
                          <span className="ml-2 text-sm">{analysis.type}</span>
                          {analysis.result && (
                            <span className="ml-auto text-sm text-muted-foreground">{analysis.result}</span>
                          )}
                        </div>
                      ))}
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
              <div className="flex justify-between text-sm mb-4">
                <span>Bekleyen Görevler: {project.pendingTasks}</span>
                <span>Tamamlanan Görevler: {project.completedTasks}</span>
              </div>
              <Link href={`/project-management/${project.id}`} passHref>
                <Button className="w-full" variant="outline">
                  Detayları Görüntüle <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}


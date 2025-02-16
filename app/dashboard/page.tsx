"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Building2,
  Clock,
  Camera,
  Brain,
  ArrowRight,
  HardHat,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Search,
  SlidersHorizontal,
  FileText,
  Users,
  Calendar,
} from "lucide-react"
import Link from "next/link"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ProjectPhase {
  name: string
  progress: number
  status: "completed" | "in-progress" | "pending"
}

interface AIInsight {
  type: "positive" | "negative" | "neutral"
  category: "schedule" | "budget" | "quality" | "safety" | "compliance"
  description: string
  impact: "low" | "medium" | "high"
}

interface Project {
  id: number
  name: string
  type: string
  status: string
  progress: number
  phases: ProjectPhase[]
  lastLidarScan?: string
  nextInspection?: string
  aiInsights: AIInsight[]
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      name: "City Center Renovation",
      type: "Commercial",
      status: "In Progress",
      progress: 65,
      phases: [
        { name: "Precon", progress: 100, status: "completed" },
        { name: "Construction", progress: 65, status: "in-progress" },
        { name: "Handover", progress: 0, status: "pending" },
      ],
      lastLidarScan: "2024-02-10",
      nextInspection: "2024-02-25",
      aiInsights: [
        {
          type: "positive",
          category: "schedule",
          description: "Project is 2 days ahead of schedule",
          impact: "medium",
        },
        { type: "negative", category: "budget", description: "Material costs increased by 5%", impact: "high" },
        { type: "neutral", category: "quality", description: "98% alignment with BIM model", impact: "low" },
      ],
    },
    {
      id: 2,
      name: "Riverside Development",
      type: "Residential",
      status: "Planning",
      progress: 20,
      phases: [
        { name: "Precon", progress: 60, status: "in-progress" },
        { name: "Construction", progress: 0, status: "pending" },
        { name: "Handover", progress: 0, status: "pending" },
      ],
      lastLidarScan: "2024-02-05",
      nextInspection: "2024-02-20",
      aiInsights: [
        {
          type: "positive",
          category: "compliance",
          description: "All permits acquired ahead of schedule",
          impact: "high",
        },
        { type: "negative", category: "schedule", description: "Potential delay in groundbreaking", impact: "medium" },
      ],
    },
    {
      id: 3,
      name: "Downtown Skyscraper",
      type: "Commercial",
      status: "In Progress",
      progress: 40,
      phases: [
        { name: "Precon", progress: 100, status: "completed" },
        { name: "Construction", progress: 40, status: "in-progress" },
        { name: "Handover", progress: 0, status: "pending" },
      ],
      lastLidarScan: "2024-02-12",
      nextInspection: "2024-02-28",
      aiInsights: [
        { type: "negative", category: "safety", description: "Minor safety incident reported", impact: "medium" },
        {
          type: "positive",
          category: "quality",
          description: "Structural integrity exceeds expectations",
          impact: "high",
        },
      ],
    },
  ])

  const [filteredProjects, setFilteredProjects] = useState(projects)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  useEffect(() => {
    const filtered = projects.filter(
      (project) =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (statusFilter === "all" || project.status === statusFilter) &&
        (typeFilter === "all" || project.type === typeFilter),
    )

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name)
      if (sortBy === "progress") return b.progress - a.progress
      if (sortBy === "status") return a.status.localeCompare(b.status)
      return 0
    })

    setFilteredProjects(sorted)
  }, [projects, searchTerm, statusFilter, typeFilter, sortBy])

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-500"
      case "in progress":
        return "bg-blue-500"
      case "planning":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
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

  const projectTypeData = [
    { name: "Commercial", value: projects.filter((p) => p.type === "Commercial").length },
    { name: "Residential", value: projects.filter((p) => p.type === "Residential").length },
  ]

  const projectStatusData = [
    { name: "Planning", value: projects.filter((p) => p.status === "Planning").length },
    { name: "In Progress", value: projects.filter((p) => p.status === "In Progress").length },
    { name: "Completed", value: projects.filter((p) => p.status === "Completed").length },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button>
          <Building2 className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">LIDAR Scans</CardTitle>
            <Camera className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-muted-foreground">Last scan 2 hours ago</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Inspections</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">Next in 3 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Analyses</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Last analysis 1 hour ago</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="chart">
            <TabsList>
              <TabsTrigger value="chart">Chart</TabsTrigger>
              <TabsTrigger value="distribution">Distribution</TabsTrigger>
            </TabsList>
            <TabsContent value="chart">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={projects}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <RechartsTooltip />
                  <Legend />
                  <Bar dataKey="progress" fill="#8884d8" name="Progress" />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
            <TabsContent value="distribution">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Project Types</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={projectTypeData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label
                      >
                        {projectTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Project Status</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={projectStatusData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label
                      >
                        {projectStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex items-center space-x-4 w-full sm:w-auto">
          <div className="relative flex-grow">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Planning">Planning</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Commercial">Commercial</SelectItem>
              <SelectItem value="Residential">Residential</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="progress">Progress</SelectItem>
              <SelectItem value="status">Status</SelectItem>
            </SelectContent>
          </Select>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                >
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle between grid and list view</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className={viewMode === "grid" ? "grid gap-6 md:grid-cols-2 lg:grid-cols-3" : "space-y-6"}>
        {filteredProjects.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <CardTitle className="text-xl flex justify-between items-center">
                <span>{project.name}</span>
                <Badge className={`${getStatusColor(project.status)} text-white`}>{project.status}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Type: {project.type}</span>
                <span className="text-sm text-muted-foreground">Overall Progress: {project.progress}%</span>
              </div>
              <Progress value={project.progress} className="h-2" />

              {/* Phase Progress */}
              <div className="space-y-4">
                {project.phases.map((phase) => (
                  <div key={phase.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`h-2 w-2 rounded-full ${getStatusColor(phase.status)}`} />
                        <span className="font-medium">{phase.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{phase.progress}%</span>
                    </div>
                    <Progress value={phase.progress} className="h-1.5" />
                  </div>
                ))}
              </div>

              {/* AI Insights */}
              <div className="space-y-2">
                <h3 className="font-semibold">AI Insights</h3>
                <div className="space-y-2">
                  {project.aiInsights.slice(0, 2).map((insight, index) => (
                    <Alert key={index} className={getInsightColor(insight.type)}>
                      <div className="flex items-center">
                        {getInsightIcon(insight.type)}
                        <AlertTitle className="ml-2">
                          {insight.category.charAt(0).toUpperCase() + insight.category.slice(1)}
                        </AlertTitle>
                      </div>
                      <AlertDescription>
                        <p className="mt-2">{insight.description}</p>
                        <Badge variant="outline" className="mt-1">
                          Impact: {insight.impact}
                        </Badge>
                      </AlertDescription>
                    </Alert>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Camera className="mr-2 h-4 w-4" />
                        LIDAR
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View latest LIDAR scan</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm">
                        <HardHat className="mr-2 h-4 w-4" />
                        Inspection
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Schedule inspection</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm">
                        <FileText className="mr-2 h-4 w-4" />
                        Documents
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View project documents</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Users className="mr-2 h-4 w-4" />
                        Team
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Manage project team</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Calendar className="mr-2 h-4 w-4" />
                        Timeline
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View project timeline</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Link href={`/project-management/${project.id}`} passHref>
                  <Button>
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}


"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, ArrowRight, Search, Filter, Calendar, User } from "lucide-react"
import type { Project } from "../types/project"

export default function ProjectManagement() {
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("dueDate")

  useEffect(() => {
    // In a real application, you would fetch this data from an API
    const mockProjects: Project[] = [
      {
        id: 1,
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
        manager: "John Doe",
        daysRemaining: 180,
      },
      {
        id: 2,
        name: "Riverside Park Development",
        type: "Residential",
        description: "Development of a new riverside park including walking trails and recreational facilities.",
        status: "Planning",
        stages: {
          precon: { status: "In Progress", progress: 20 },
          construction: { status: "Not Started", progress: 0 },
          handover: { status: "Not Started", progress: 0 },
        },
        startDate: "2024-01-01",
        endDate: "2024-06-30",
        manager: "Jane Smith",
        daysRemaining: 365,
      },
      {
        id: 3,
        name: "Downtown Skyscraper",
        type: "Commercial",
        description: "Construction of a new skyscraper in the downtown area.",
        status: "Delayed",
        stages: {
          precon: { status: "Completed", progress: 100 },
          construction: { status: "In Progress", progress: 40 },
          handover: { status: "Not Started", progress: 0 },
        },
        startDate: "2023-01-01",
        endDate: "2023-10-15",
        manager: "Bob Johnson",
        daysRemaining: 90,
      },
    ]
    setProjects(mockProjects)
    setFilteredProjects(mockProjects)
  }, [])

  useEffect(() => {
    const filtered = projects.filter((project) => {
      const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "all" || project.status === statusFilter
      return matchesSearch && matchesStatus
    })
    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === "dueDate") {
        return new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
      } else if (sortBy === "progress") {
        return getOverallProgress(b.stages) - getOverallProgress(a.stages)
      } else {
        return a.name.localeCompare(b.name)
      }
    })
    setFilteredProjects(sorted)
  }, [searchTerm, statusFilter, sortBy, projects])

  const handleCreateProject = () => {
    router.push("/project-management/create")
  }

  const handleViewDetails = (projectId: number) => {
    router.push(`/project-management/${projectId}`)
  }

  const getOverallProgress = (stages: Project["stages"]) => {
    const totalProgress = stages.precon.progress + stages.construction.progress + stages.handover.progress
    return Math.round(totalProgress / 3)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "Planning":
        return "bg-yellow-100 text-yellow-800"
      case "Delayed":
        return "bg-red-100 text-red-800"
      case "Completed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Project Management</h1>
        <Button onClick={handleCreateProject}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Project
        </Button>
      </div>

      <div className="flex space-x-4 mb-6">
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
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Planning">Planning</SelectItem>
            <SelectItem value="Delayed">Delayed</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dueDate">Due Date</SelectItem>
            <SelectItem value="progress">Progress</SelectItem>
            <SelectItem value="name">Name</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {filteredProjects.map((project) => (
              <Card key={project.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-xl">{project.name}</h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}
                        >
                          {project.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">Type: {project.type}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-2 h-4 w-4" />
                        Due: {project.endDate}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <User className="mr-2 h-4 w-4" />
                        Manager: {project.manager}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">Days Remaining</p>
                        <p className="text-2xl font-bold">{project.daysRemaining}</p>
                      </div>
                      <div className="w-full max-w-xs">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{getOverallProgress(project.stages)}%</span>
                        </div>
                        <Progress value={getOverallProgress(project.stages)} className="h-2" />
                      </div>
                      <Button onClick={() => handleViewDetails(project.id)}>
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


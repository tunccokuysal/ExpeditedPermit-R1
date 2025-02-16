"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface Project {
  id: number
  name: string
  status: string
}

export default function ProjectSelection() {
  const [projects, setProjects] = useState<Project[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  useEffect(() => {
    // In a real app, you would fetch this data from an API
    const mockProjects: Project[] = [
      { id: 1, name: "City Center Renovation", status: "In Progress" },
      { id: 2, name: "Riverside Development", status: "Planning" },
      { id: 3, name: "Metro Station Upgrade", status: "Completed" },
      { id: 4, name: "Harbor Front Expansion", status: "In Progress" },
      { id: 5, name: "Downtown Skyscraper", status: "Planning" },
    ]
    setProjects(mockProjects)
  }, [])

  const filteredProjects = projects.filter((project) => project.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleProjectSelect = (projectId: number) => {
    router.push(`/lidar-analysis/${projectId}`)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Select a Project for LIDAR Analysis</h1>
      <div className="mb-4 relative">
        <Input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <Card
            key={project.id}
            className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
            onClick={() => handleProjectSelect(project.id)}
          >
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">Status: {project.status}</p>
              <Button onClick={() => handleProjectSelect(project.id)}>Select for Analysis</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}


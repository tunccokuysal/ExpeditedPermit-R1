"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, AlertTriangle, HelpCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface PermitStep {
  id: number
  name: string
  status: "completed" | "in-progress" | "pending"
  date?: string
  description: string
}

export function PermitProcessTracker() {
  const [steps, setSteps] = useState<PermitStep[]>([
    {
      id: 1,
      name: "Application Submitted",
      status: "completed",
      date: "2023-07-01",
      description: "Initial permit application submitted for review.",
    },
    {
      id: 2,
      name: "Initial Review",
      status: "completed",
      date: "2023-07-15",
      description: "Preliminary review of the application by the permit office.",
    },
    {
      id: 3,
      name: "LIDAR Scan",
      status: "completed",
      date: "2023-07-20",
      description: "3D scanning of the construction site using LIDAR technology.",
    },
    {
      id: 4,
      name: "AI Analysis",
      status: "in-progress",
      description: "Automated analysis of LIDAR data and permit application.",
    },
    {
      id: 5,
      name: "Final Approval",
      status: "pending",
      description: "Final review and approval of the permit application.",
    },
  ])

  const getStatusIcon = (status: PermitStep["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="text-green-500" />
      case "in-progress":
        return <Clock className="text-blue-500" />
      case "pending":
        return <AlertTriangle className="text-gray-300" />
    }
  }

  const getStatusColor = (status: PermitStep["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "in-progress":
        return "bg-blue-500"
      case "pending":
        return "bg-yellow-500"
    }
  }

  const calculateProgress = () => {
    const completedSteps = steps.filter((step) => step.status === "completed").length
    return (completedSteps / steps.length) * 100
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Permit Process Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="text-sm font-medium">{Math.round(calculateProgress())}%</span>
          </div>
          <Progress value={calculateProgress()} className="h-2" />
        </div>
        <ol className="relative border-l border-gray-200 dark:border-gray-700">
          {steps.map((step, index) => (
            <li key={step.id} className="mb-10 ml-6">
              <span
                className={`absolute flex items-center justify-center w-8 h-8 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 ${getStatusColor(step.status)}`}
              >
                {getStatusIcon(step.status)}
              </span>
              <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                {step.name}
                {step.status === "completed" && (
                  <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ml-3">
                    Completed
                  </span>
                )}
              </h3>
              {step.date && (
                <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                  {step.date}
                </time>
              )}
              <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">{step.description}</p>
              {step.status === "in-progress" && (
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              )}
            </li>
          ))}
        </ol>
        <div className="mt-4 flex justify-end">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Need Help?
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Click for guidance on the permit process</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  )
}


"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle, Clock } from "lucide-react"

interface PermitStep {
  id: number
  name: string
  status: "completed" | "in-progress" | "pending"
  requiredDocuments: string[]
}

interface PermitProcessAutomationProps {
  projectId: number
  permitSteps: PermitStep[]
}

export function PermitProcessAutomation({ projectId, permitSteps }: PermitProcessAutomationProps) {
  const [steps, setSteps] = useState(permitSteps)

  const getStepIcon = (status: PermitStep["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="text-green-500" />
      case "in-progress":
        return <Clock className="text-yellow-500" />
      case "pending":
        return <AlertTriangle className="text-gray-300" />
    }
  }

  const handleAutoCheck = async () => {
    // Simulating an API call for document check
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const updatedSteps = steps.map((step) => {
      if (step.status === "in-progress") {
        return { ...step, status: "completed" }
      } else if (step.status === "pending" && steps.some((s) => s.status === "in-progress")) {
        return { ...step, status: "in-progress" }
      }
      return step
    })

    setSteps(updatedSteps)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Permit Process Automation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <div className="flex items-center mb-2 sm:mb-0">
                {getStepIcon(step.status)}
                <span className="ml-2">{step.name}</span>
              </div>
              {step.status === "in-progress" && (
                <Button onClick={handleAutoCheck} size="sm" className="w-full sm:w-auto">
                  Automatic Check
                </Button>
              )}
            </div>
          ))}
        </div>
        <div className="mt-6">
          <p className="text-sm text-muted-foreground">
            Automatic check verifies the presence and compliance of required documents. If missing or non-compliant
            documents are detected, a notification will be sent.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}


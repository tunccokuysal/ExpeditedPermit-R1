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
        <CardTitle>İzin Süreci Otomasyonu</CardTitle>
      </CardHeader>
      <CardContent>
        {steps.map((step) => (
          <div key={step.id} className="flex items-center mb-4">
            {getStepIcon(step.status)}
            <span className="ml-2">{step.name}</span>
            <div className="ml-auto">
              {step.status === "in-progress" && (
                <Button onClick={handleAutoCheck} size="sm">
                  Otomatik Kontrol
                </Button>
              )}
            </div>
          </div>
        ))}
        <div className="mt-4">
          <p className="text-sm text-muted-foreground">
            Otomatik kontrol, gerekli belgelerin varlığını ve uygunluğunu kontrol eder. Eksik veya uygun olmayan
            belgeler tespit edilirse bildirim gönderilir.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}


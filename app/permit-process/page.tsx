"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, AlertTriangle } from "lucide-react"

interface PermitStep {
  id: number
  name: string
  status: "completed" | "in-progress" | "pending"
}

export default function PermitProcess() {
  const [permitSteps, setPermitSteps] = useState<PermitStep[]>([
    { id: 1, name: "Ön İnceleme", status: "completed" },
    { id: 2, name: "Belge Kontrolü", status: "completed" },
    { id: 3, name: "Teknik İnceleme", status: "in-progress" },
    { id: 4, name: "Onay", status: "pending" },
    { id: 5, name: "İzin Belgesi Düzenleme", status: "pending" },
  ])

  const getStatusIcon = (status: PermitStep["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="text-green-500" />
      case "in-progress":
        return <Clock className="text-yellow-500" />
      case "pending":
        return <AlertTriangle className="text-gray-300" />
    }
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">İzin Süreci</h1>
      <Card>
        <CardHeader>
          <CardTitle>İzin Adımları</CardTitle>
        </CardHeader>
        <CardContent>
          {permitSteps.map((step) => (
            <div key={step.id} className="flex items-center mb-4">
              {getStatusIcon(step.status)}
              <span className="ml-2">{step.name}</span>
            </div>
          ))}
        </CardContent>
      </Card>
      <Button className="mt-4">Yeni İzin Başvurusu</Button>
    </>
  )
}


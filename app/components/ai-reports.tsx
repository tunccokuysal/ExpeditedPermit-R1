"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface AIReport {
  id: number
  date: string
  type: string
  summary: string
  confidence: number
  recommendations: string[]
  risks: {
    level: "low" | "medium" | "high"
    description: string
  }[]
}

interface AIReportsProps {
  projectId: number
}

export function AIReports({ projectId }: AIReportsProps) {
  const [reports] = useState<AIReport[]>([
    {
      id: 1,
      date: "2024-02-10",
      type: "Progress Analysis",
      summary: "Project is currently on track with a 95% confidence rate for meeting the deadline.",
      confidence: 95,
      recommendations: [
        "Consider adding additional resources to the foundation phase",
        "Schedule regular quality checks for electrical installations",
      ],
      risks: [
        { level: "high", description: "Potential weather delays in the next month" },
        { level: "medium", description: "Supply chain constraints for steel delivery" },
      ],
    },
    // Add more mock reports as needed
  ])

  const riskData = reports.flatMap((report) =>
    report.risks.map((risk) => ({
      name: risk.description,
      value: risk.level === "high" ? 3 : risk.level === "medium" ? 2 : 1,
    })),
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Analysis Reports</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="summary">
          <TabsList>
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="risks">Risk Analysis</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>
          <TabsContent value="summary">
            {reports.map((report) => (
              <div key={report.id} className="mb-4">
                <h3 className="font-semibold mb-2">
                  {report.type} - {report.date}
                </h3>
                <p className="mb-2">{report.summary}</p>
                <div className="bg-muted p-2 rounded">
                  <p className="font-medium">Confidence Score: {report.confidence}%</p>
                </div>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="risks">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={riskData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="recommendations">
            {reports.map((report) => (
              <div key={report.id} className="mb-4">
                <h3 className="font-semibold mb-2">Recommendations ({report.date})</h3>
                <ul className="list-disc pl-4">
                  {report.recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}


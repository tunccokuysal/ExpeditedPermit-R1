"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, CheckCircle, HelpCircle, Eye } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

interface Violation {
  id: number
  room: string
  description: string
  severity: "low" | "medium" | "high"
  codeReference: string
}

const violationData = [
  { category: "Structural", count: 3 },
  { category: "Electrical", count: 2 },
  { category: "Plumbing", count: 1 },
  { category: "Fire Safety", count: 4 },
  { category: "Accessibility", count: 2 },
]

const getViolationColorClass = (severity: Violation["severity"]) => {
  switch (severity) {
    case "high":
      return "bg-red-500"
    case "medium":
      return "bg-yellow-500"
    case "low":
      return "bg-blue-500"
  }
}

export function LIDARVisualization() {
  const [activeLayer, setActiveLayer] = useState("structural")
  const [violations, setViolations] = useState<Violation[]>([
    {
      id: 1,
      room: "Room 302",
      description: "Ceiling height is below the minimum requirement",
      severity: "high",
      codeReference: "IBC Section 1208.2",
    },
    {
      id: 2,
      room: "Main Corridor",
      description: "Insufficient emergency lighting",
      severity: "medium",
      codeReference: "NFPA 101 Section 7.9",
    },
    {
      id: 3,
      room: "Stairwell A",
      description: "Handrail height non-compliant",
      severity: "low",
      codeReference: "ADA Standards 505.4",
    },
  ])
  const [analysisType, setAnalysisType] = useState<"lidar" | "2d">("lidar")

  const layers = ["structural", "electrical", "plumbing", "hvac"]

  const layerExplanations = {
    structural: "Analyzes the building's framework and load-bearing elements",
    electrical: "Examines wiring, circuits, and electrical systems",
    plumbing: "Inspects pipes, fixtures, and water systems",
    hvac: "Evaluates heating, ventilation, and air conditioning systems",
  }

  const getViolationColor = (severity: Violation["severity"]) => {
    switch (severity) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-blue-500"
    }
  }

  const LIDARVisualization3D = () => {
    return (
      <div className="mb-6 relative">
        <img
          src="/placeholder.svg?height=400&width=800"
          alt="LIDAR Scan Visualization"
          className="w-full h-[400px] object-cover rounded-lg"
        />
        {violations.map((violation) => (
          <div
            key={violation.id}
            className={`absolute w-6 h-6 rounded-full ${getViolationColor(violation.severity)} animate-pulse cursor-pointer`}
            style={{
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 80 + 10}%`,
            }}
          >
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="w-full h-full rounded-full p-0">
                  <span className="sr-only">View violation details</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{violation.room}: Code Violation</DialogTitle>
                  <DialogDescription>
                    <p className="mb-2">
                      <strong>Description:</strong> {violation.description}
                    </p>
                    <p className="mb-2">
                      <strong>Severity:</strong> {violation.severity}
                    </p>
                    <p>
                      <strong>Code Reference:</strong> {violation.codeReference}
                    </p>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-2xl font-bold">
          LIDAR Scan & AI Analysis
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="ml-2 h-5 w-5" />
              </TooltipTrigger>
              <TooltipContent>
                <p>LIDAR technology creates a 3D model of your building for precise analysis</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Select value={analysisType} onValueChange={(value) => setAnalysisType(value as "lidar" | "2d")}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select analysis type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lidar">LIDAR Analysis</SelectItem>
              <SelectItem value="2d">2D Drawing Analysis</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {analysisType === "lidar" ? (
          <LIDARVisualization3D />
        ) : (
          <img
            src="/placeholder.svg?height=400&width=800"
            alt="2D Drawing"
            className="w-full h-[400px] object-cover rounded-lg"
          />
        )}
        <div className="mt-4 flex justify-between items-center">
          <div className="flex space-x-2">
            {["low", "medium", "high"].map((severity) => (
              <Badge
                key={severity}
                variant="outline"
                className={`${getViolationColorClass(severity as Violation["severity"])} text-white`}
              >
                {severity}
              </Badge>
            ))}
          </div>
          <Button onClick={() => console.log(`Running ${analysisType} analysis`)}>Run Analysis</Button>
        </div>
        {/* <div className="mb-6 relative">
          <img
            src="/placeholder.svg?height=400&width=800"
            alt="LIDAR Scan Visualization"
            className="w-full h-[400px] object-cover rounded-lg"
          />
          {violations.map((violation) => (
            <div
              key={violation.id}
              className={`absolute w-6 h-6 rounded-full ${getViolationColor(violation.severity)} animate-pulse cursor-pointer`}
              style={{
                top: `${Math.random() * 80 + 10}%`,
                left: `${Math.random() * 80 + 10}%`,
              }}
            >
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="w-full h-full rounded-full p-0">
                    <span className="sr-only">View violation details</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{violation.room}: Code Violation</DialogTitle>
                    <DialogDescription>
                      <p className="mb-2">
                        <strong>Description:</strong> {violation.description}
                      </p>
                      <p className="mb-2">
                        <strong>Severity:</strong> {violation.severity}
                      </p>
                      <p>
                        <strong>Code Reference:</strong> {violation.codeReference}
                      </p>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          ))}
        </div> */}
        <Tabs value={activeLayer} onValueChange={setActiveLayer}>
          <TabsList>
            {layers.map((layer) => (
              <TabsTrigger key={layer} value={layer} className="capitalize">
                {layer}
              </TabsTrigger>
            ))}
          </TabsList>
          {layers.map((layer) => (
            <TabsContent key={layer} value={layer}>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground mb-2">{layerExplanations[layer]}</p>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="text-green-500" />
                  <span>No issues detected in {layer} systems</span>
                </div>
                {layer === "structural" && (
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="text-yellow-500" />
                    <span>Potential code violations detected</span>
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Violation Summary</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={violationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis allowDecimals={false} />
              <RechartsTooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-6 flex justify-end">
          <Button>
            <Eye className="mr-2 h-4 w-4" />
            View Full Report
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}


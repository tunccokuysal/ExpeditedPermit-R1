"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export function AnalysisWizard() {
  const [step, setStep] = useState(1)
  const [analysisType, setAnalysisType] = useState<"lidar" | "2d" | "">("")
  const [file, setFile] = useState<File | null>(null)
  const [progress, setProgress] = useState(0)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0])
    }
  }

  const handleAnalysis = () => {
    setStep(3)
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval)
          return 100
        }
        return prevProgress + 10
      })
    }, 500)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Analysis Wizard</CardTitle>
      </CardHeader>
      <CardContent>
        {step === 1 && (
          <div className="space-y-4">
            <Select value={analysisType} onValueChange={(value) => setAnalysisType(value as "lidar" | "2d")}>
              <SelectTrigger>
                <SelectValue placeholder="Select analysis type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lidar">LIDAR Analysis</SelectItem>
                <SelectItem value="2d">2D Drawing Analysis</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={() => setStep(2)} disabled={!analysisType}>
              Next
            </Button>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-4">
            <Input
              type="file"
              onChange={handleFileChange}
              accept={analysisType === "lidar" ? ".las,.laz" : ".dwg,.dxf"}
            />
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button onClick={handleAnalysis} disabled={!file}>
                Run Analysis
              </Button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="space-y-4">
            <Progress value={progress} className="w-full" />
            <p>{progress < 100 ? "Analyzing..." : "Analysis complete!"}</p>
            {progress === 100 && (
              <div className="flex items-center space-x-2 text-yellow-500">
                <AlertTriangle />
                <span>3 potential issues detected. See full report for details.</span>
              </div>
            )}
            {progress === 100 && <Button onClick={() => console.log("View full report")}>View Full Report</Button>}
          </div>
        )}
      </CardContent>
    </Card>
  )
}


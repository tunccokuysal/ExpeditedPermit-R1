"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Upload, HelpCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface AIAnalysisProps {
  projectId: number
}

export function AIAnalysis({ projectId }: AIAnalysisProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<string | null>(null)
  const [selectedStage, setSelectedStage] = useState<string>("")
  const [file, setFile] = useState<File | null>(null)

  const runAnalysis = async () => {
    if (!selectedStage || !file) {
      alert("Please select a stage and upload a file before running the analysis.")
      return
    }

    setIsAnalyzing(true)
    // Simulating AI analysis
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setAnalysisResult(`AI analysis complete for ${selectedStage} stage. 
    The project is progressing as expected with a 95% confidence rate. 
    Potential risks identified: weather delays in the next month. 
    Recommendation: Consider adjusting the timeline to account for potential weather-related setbacks.
    Uploaded file "${file.name}" has been processed and incorporated into the analysis.`)
    setIsAnalyzing(false)
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0])
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          AI Project Analysis
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="ml-2 h-4 w-4" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Our AI analyzes your project data to provide insights and recommendations</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="stage-select">Select Project Stage</Label>
            <Select onValueChange={setSelectedStage}>
              <SelectTrigger>
                <SelectValue placeholder="Select stage to analyze" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="precon">Precon</SelectItem>
                <SelectItem value="construction">Construction</SelectItem>
                <SelectItem value="handover">Handover</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="file-upload">Upload Project Document</Label>
            <div className="flex items-center space-x-2">
              <Input id="file-upload" type="file" onChange={handleFileChange} />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="sm">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Upload project documents for AI analysis</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <Button onClick={runAnalysis} disabled={isAnalyzing || !selectedStage || !file}>
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Run AI Analysis"
            )}
          </Button>
        </div>
        {analysisResult && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Analysis Result:</h3>
            <p className="whitespace-pre-line">{analysisResult}</p>
            <div className="mt-2">
              <h4 className="font-semibold">Explanation:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>The 95% confidence rate is based on historical project data and current progress.</li>
                <li>
                  Weather delay risk is calculated using local meteorological forecasts and typical construction
                  timelines.
                </li>
                <li>
                  Timeline adjustment recommendation is provided to maintain project efficiency and meet deadlines.
                </li>
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}


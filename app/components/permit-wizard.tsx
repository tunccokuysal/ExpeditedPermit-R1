"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LIDARVisualization } from "./lidar-visualization"
import { AIAnalysis } from "./ai-analysis"
import { FileText, Camera, Activity, CheckCircle, AlertTriangle, ChevronLeft, ChevronRight, Upload } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const steps = [
  { id: "project-info", title: "Project Information", icon: FileText },
  { id: "lidar-scan", title: "LIDAR Scan", icon: Camera },
  { id: "ai-analysis", title: "AI Analysis", icon: Activity },
  { id: "submit-application", title: "Submit Application", icon: CheckCircle },
]

const focusAreas = [
  { value: "structural", label: "Structural Analysis" },
  { value: "electrical", label: "Electrical Systems" },
  { value: "plumbing", label: "Plumbing Systems" },
  { value: "hvac", label: "HVAC Systems" },
  { value: "fire-safety", label: "Fire Safety" },
  { value: "accessibility", label: "Accessibility" },
]

export function PermitWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const [projectName, setProjectName] = useState("")
  const [projectDescription, setProjectDescription] = useState("")
  const [focusArea, setFocusArea] = useState("")
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep])
      }
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const isStepComplete = (stepIndex: number) => {
    if (stepIndex === 0) {
      return projectName !== "" && focusArea !== ""
    }
    return completedSteps.includes(stepIndex)
  }

  const renderStepIndicator = (stepIndex: number) => {
    if (isStepComplete(stepIndex)) {
      return <CheckCircle className="h-6 w-6 text-green-500" />
    }
    if (stepIndex === currentStep) {
      return (
        <div className="h-6 w-6 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
          {stepIndex + 1}
        </div>
      )
    }
    return (
      <div className="h-6 w-6 rounded-full border-2 border-gray-300 text-gray-300 flex items-center justify-center font-bold">
        {stepIndex + 1}
      </div>
    )
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Permit Application Wizard</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-lg font-semibold">
              {Math.round((currentStep / (steps.length - 1)) * 100)}% Complete
            </span>
          </div>
          <Progress value={(currentStep / (steps.length - 1)) * 100} className="h-3" />
        </div>
        <div className="flex justify-between mb-8">
          {steps.map((step, index) => (
            <TooltipProvider key={step.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className={`flex flex-col items-center ${index <= currentStep ? "text-blue-500" : "text-gray-400"}`}
                    onClick={() => setCurrentStep(index)}
                    disabled={index > currentStep && !isStepComplete(index - 1)}
                  >
                    {renderStepIndicator(index)}
                    <span className="mt-2 text-sm font-medium">{step.title}</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isStepComplete(index) ? "Completed" : index === currentStep ? "Current Step" : "Incomplete"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
        <Tabs value={steps[currentStep].id} className="mb-6">
          <TabsContent value="project-info">
            <h3 className="text-xl font-semibold mb-4">Project Information</h3>
            <div className="space-y-6">
              <div>
                <Label htmlFor="project-name" className="text-lg mb-2">
                  Project Name
                </Label>
                <Input
                  id="project-name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="Enter project name (e.g., City Center Renovation)"
                  className="text-lg p-3"
                  required
                />
              </div>
              <div>
                <Label htmlFor="focus-area" className="text-lg mb-2">
                  Focus Area for Analysis
                </Label>
                <Select value={focusArea} onValueChange={setFocusArea} required>
                  <SelectTrigger className="text-lg p-3">
                    <SelectValue placeholder="Select focus area" />
                  </SelectTrigger>
                  <SelectContent>
                    {focusAreas.map((area) => (
                      <SelectItem key={area.value} value={area.value} className="text-lg">
                        {area.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="project-description" className="text-lg mb-2">
                  Project Description (Optional)
                </Label>
                <Textarea
                  id="project-description"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  placeholder="Describe your project in detail (e.g., scope, objectives, special considerations)"
                  className="text-lg p-3"
                  rows={6}
                />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="lidar-scan">
            <LIDARVisualization />
          </TabsContent>
          <TabsContent value="ai-analysis">
            <AIAnalysis projectId={1} />
          </TabsContent>
          <TabsContent value="submit-application">
            <h3 className="text-xl font-semibold mb-4">Submit Application</h3>
            <p className="text-lg mb-4">Review your application details before submitting:</p>
            <div className="space-y-4 bg-gray-100 p-6 rounded-lg">
              <p className="text-lg">
                <strong>Project Name:</strong> {projectName}
              </p>
              <p className="text-lg">
                <strong>Focus Area:</strong> {focusAreas.find((area) => area.value === focusArea)?.label}
              </p>
              {projectDescription && (
                <p className="text-lg">
                  <strong>Project Description:</strong> {projectDescription}
                </p>
              )}
            </div>
          </TabsContent>
        </Tabs>
        <div className="flex justify-between mt-8">
          <Button onClick={prevStep} disabled={currentStep === 0} variant="outline" size="lg" className="text-lg">
            <ChevronLeft className="mr-2 h-5 w-5" />
            Previous
          </Button>
          <Button
            onClick={nextStep}
            disabled={currentStep === steps.length - 1 || !isStepComplete(currentStep)}
            size="lg"
            className="text-lg"
          >
            {currentStep === steps.length - 1 ? (
              <>
                Submit
                <Upload className="ml-2 h-5 w-5" />
              </>
            ) : (
              <>
                Next
                <ChevronRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </div>
        {!isStepComplete(currentStep) && (
          <div className="mt-4 flex items-center text-yellow-600 bg-yellow-100 p-3 rounded-lg">
            <AlertTriangle className="mr-2 h-5 w-5" />
            <span className="text-lg">Please complete all required fields before proceeding.</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}


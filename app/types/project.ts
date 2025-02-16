export type ProjectStage = "Precon" | "Construction" | "Handover"

export type ProjectStatus = "Planning" | "In Progress" | "Completed" | "Delayed"

export interface StageInfo {
  status: string
  progress: number
}

export interface Project {
  id: number
  name: string
  type: string
  description: string
  status: ProjectStatus
  stages: {
    precon: StageInfo
    construction: StageInfo
    handover: StageInfo
  }
  startDate: string
  endDate: string
}


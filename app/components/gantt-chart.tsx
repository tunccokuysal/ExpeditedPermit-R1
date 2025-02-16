"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { format, addDays, differenceInDays, parseISO } from "date-fns"

interface Task {
  id: number
  name: string
  startDate: string
  endDate: string
  progress: number
  dependencies?: number[]
}

interface GanttChartProps {
  projectId: number
}

export function GanttChart({ projectId }: GanttChartProps) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(addDays(new Date(), 30))

  useEffect(() => {
    // In a real application, fetch tasks from an API
    const mockTasks: Task[] = [
      {
        id: 1,
        name: "Foundation Work",
        startDate: "2024-02-01",
        endDate: "2024-02-15",
        progress: 100,
      },
      {
        id: 2,
        name: "Structural Framework",
        startDate: "2024-02-16",
        endDate: "2024-03-15",
        progress: 50,
        dependencies: [1],
      },
      {
        id: 3,
        name: "Electrical Installation",
        startDate: "2024-03-01",
        endDate: "2024-03-20",
        progress: 20,
        dependencies: [2],
      },
    ]
    setTasks(mockTasks)

    // Set chart date range based on tasks
    const taskStartDates = mockTasks.map((task) => parseISO(task.startDate))
    const taskEndDates = mockTasks.map((task) => parseISO(task.endDate))
    setStartDate(new Date(Math.min(...taskStartDates.map((d) => d.getTime()))))
    setEndDate(new Date(Math.max(...taskEndDates.map((d) => d.getTime()))))
  }, [])

  const totalDays = differenceInDays(endDate, startDate) + 1
  const daysArray = Array.from({ length: totalDays }, (_, i) => addDays(startDate, i))

  return (
    <Card>
      <CardContent className="p-4">
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Header */}
            <div className="flex border-b">
              <div className="w-1/4 font-bold p-2">Task</div>
              <div className="w-3/4 flex">
                {daysArray.map((date) => (
                  <div key={date.toISOString()} className="flex-1 text-center text-sm p-2">
                    {format(date, "MM/dd")}
                  </div>
                ))}
              </div>
            </div>

            {/* Tasks */}
            {tasks.map((task) => {
              const taskStart = parseISO(task.startDate)
              const taskEnd = parseISO(task.endDate)
              const offsetDays = differenceInDays(taskStart, startDate)
              const duration = differenceInDays(taskEnd, taskStart) + 1
              const widthPercentage = (duration / totalDays) * 100
              const leftPercentage = (offsetDays / totalDays) * 100

              return (
                <div key={task.id} className="flex border-b">
                  <div className="w-1/4 p-2">{task.name}</div>
                  <div className="w-3/4 relative h-12">
                    <div
                      className="absolute h-8 top-2 rounded"
                      style={{
                        left: `${leftPercentage}%`,
                        width: `${widthPercentage}%`,
                        backgroundColor: task.progress === 100 ? "#22c55e" : "#3b82f6",
                        opacity: 0.8,
                      }}
                    >
                      <div
                        className="h-full bg-green-500 rounded"
                        style={{ width: `${task.progress}%`, opacity: 0.8 }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


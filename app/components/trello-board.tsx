"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusCircle } from "lucide-react"

interface Task {
  id: number
  title: string
  status: "To Do" | "In Progress" | "Done"
}

export function TrelloBoard() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Design project plan", status: "Done" },
    { id: 2, title: "Get permits", status: "In Progress" },
    { id: 3, title: "Start construction", status: "To Do" },
  ])
  const [newTaskTitle, setNewTaskTitle] = useState("")

  const addTask = () => {
    if (newTaskTitle.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), title: newTaskTitle, status: "To Do" }])
      setNewTaskTitle("")
    }
  }

  const moveTask = (taskId: number, newStatus: Task["status"]) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)))
  }

  const renderColumn = (status: Task["status"]) => (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h3 className="font-bold mb-2">{status}</h3>
      {tasks
        .filter((task) => task.status === status)
        .map((task) => (
          <Card key={task.id} className="mb-2">
            <CardContent className="p-2">
              <p>{task.title}</p>
              <div className="flex justify-end space-x-1 mt-2">
                {status !== "To Do" && (
                  <Button size="sm" variant="outline" onClick={() => moveTask(task.id, "To Do")}>
                    ←
                  </Button>
                )}
                {status !== "In Progress" && (
                  <Button size="sm" variant="outline" onClick={() => moveTask(task.id, "In Progress")}>
                    {status === "To Do" ? "→" : "←"}
                  </Button>
                )}
                {status !== "Done" && (
                  <Button size="sm" variant="outline" onClick={() => moveTask(task.id, "Done")}>
                    →
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4">
          <Input placeholder="New task" value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)} />
          <Button onClick={addTask}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {renderColumn("To Do")}
          {renderColumn("In Progress")}
          {renderColumn("Done")}
        </div>
      </CardContent>
    </Card>
  )
}


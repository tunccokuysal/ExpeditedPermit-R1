"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle, Info, Bell, Filter, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Notification {
  id: number
  message: string
  type: "critical" | "warning" | "success"
  date: string
  projectId: number
}

export function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      message: "Permit application for Project A requires immediate attention",
      type: "critical",
      date: "2023-07-01",
      projectId: 1,
    },
    { id: 2, message: "LIDAR scan for Project B is overdue", type: "warning", date: "2023-06-30", projectId: 2 },
    { id: 3, message: "Permit approved for Project C", type: "success", date: "2023-06-29", projectId: 3 },
    { id: 4, message: "Missing documents for Project D", type: "warning", date: "2023-06-28", projectId: 4 },
    { id: 5, message: "Code violation detected in Project E", type: "critical", date: "2023-06-27", projectId: 5 },
  ])

  const [filter, setFilter] = useState("all")

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "critical":
        return <AlertTriangle className="text-red-500 h-6 w-6" />
      case "warning":
        return <Info className="text-yellow-500 h-6 w-6" />
      case "success":
        return <CheckCircle className="text-green-500 h-6 w-6" />
    }
  }

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "all") return true
    return notification.type === filter
  })

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-2xl font-bold">Notifications</CardTitle>
        <Bell className="h-6 w-6 text-blue-500" />
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex justify-end">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[200px]">
              <Filter className="mr-2 h-5 w-5" />
              <SelectValue placeholder="Filter notifications" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Notifications</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="warning">Warnings</SelectItem>
              <SelectItem value="success">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-4">
          {filteredNotifications.map((notification) => (
            <Card
              key={notification.id}
              className={`
              ${
                notification.type === "critical"
                  ? "bg-red-50 border-red-200"
                  : notification.type === "warning"
                    ? "bg-yellow-50 border-yellow-200"
                    : "bg-green-50 border-green-200"
              }
            `}
            >
              <CardContent className="flex items-start space-x-4 p-4">
                {getNotificationIcon(notification.type)}
                <div className="flex-1">
                  <p className="text-lg font-medium">{notification.message}</p>
                  <p className="text-sm text-muted-foreground mt-1">{notification.date}</p>
                </div>
                <Link href={`/project-management/${notification.projectId}`}>
                  <Button variant="outline" size="sm" className="whitespace-nowrap">
                    View Project
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}


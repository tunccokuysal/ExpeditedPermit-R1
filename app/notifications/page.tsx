"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, AlertTriangle, CheckCircle } from "lucide-react"

interface Notification {
  id: number
  message: string
  type: "info" | "warning" | "success"
  date: string
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, message: "Georgetown Tower projesi için yeni bir belge yüklendi.", type: "info", date: "2023-07-01" },
    {
      id: 2,
      message: "Blacksburg Residential projesinin izin süreci tamamlandı.",
      type: "success",
      date: "2023-06-30",
    },
    { id: 3, message: "Oakwood Commercial Center projesinde eksik belgeler var.", type: "warning", date: "2023-06-29" },
  ])

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "info":
        return <Bell className="text-blue-500" />
      case "warning":
        return <AlertTriangle className="text-yellow-500" />
      case "success":
        return <CheckCircle className="text-green-500" />
    }
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Bildirimler</h1>
      <Card>
        <CardHeader>
          <CardTitle>Son Bildirimler</CardTitle>
        </CardHeader>
        <CardContent>
          {notifications.map((notification) => (
            <div key={notification.id} className="flex items-start mb-4">
              {getNotificationIcon(notification.type)}
              <div className="ml-2">
                <p>{notification.message}</p>
                <p className="text-sm text-muted-foreground">{notification.date}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  )
}


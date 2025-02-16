"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, CalendarIcon, Clock, MapPin } from "lucide-react"
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import "react-big-calendar/lib/css/react-big-calendar.css"

const localizer = momentLocalizer(moment)

interface Event {
  id: number
  title: string
  date: Date
  type: "meeting" | "deadline" | "site-visit" | "inspection"
  time?: string
  location?: string
}

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: "Project Kickoff Meeting",
      date: new Date(2023, 6, 15),
      type: "meeting",
      time: "10:00 AM",
      location: "Conference Room A",
    },
    {
      id: 2,
      title: "Site Visit - City Center",
      date: new Date(2023, 6, 20),
      type: "site-visit",
      time: "2:00 PM",
      location: "City Center Construction Site",
    },
    { id: 3, title: "Permit Submission Deadline", date: new Date(2023, 6, 25), type: "deadline" },
    {
      id: 4,
      title: "Building Inspection",
      date: new Date(2023, 6, 28),
      type: "inspection",
      time: "9:00 AM",
      location: "Project Site",
    },
  ])
  const [newEvent, setNewEvent] = useState<Partial<Event>>({})
  const [activeView, setActiveView] = useState<"month" | "week" | "day">("month")

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
  }

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.type) {
      setEvents([...events, { id: events.length + 1, ...(newEvent as Event) }])
      setNewEvent({})
    }
  }

  const getEventsForDate = (date: Date) => {
    return events.filter(
      (event) =>
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear(),
    )
  }

  const getEventTypeIcon = (type: Event["type"]) => {
    switch (type) {
      case "meeting":
        return <CalendarIcon className="h-4 w-4 text-blue-500" />
      case "deadline":
        return <Clock className="h-4 w-4 text-red-500" />
      case "site-visit":
        return <MapPin className="h-4 w-4 text-green-500" />
      case "inspection":
        return <CalendarIcon className="h-4 w-4 text-purple-500" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Project Calendar</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Event
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Event</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="event-title" className="text-right">
                  Title
                </Label>
                <Input
                  id="event-title"
                  value={newEvent.title || ""}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="event-date" className="text-right">
                  Date
                </Label>
                <Input
                  id="event-date"
                  type="date"
                  value={newEvent.date ? newEvent.date.toISOString().split("T")[0] : ""}
                  onChange={(e) => setNewEvent({ ...newEvent, date: new Date(e.target.value) })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="event-time" className="text-right">
                  Time
                </Label>
                <Input
                  id="event-time"
                  type="time"
                  value={newEvent.time || ""}
                  onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="event-type" className="text-right">
                  Type
                </Label>
                <Select onValueChange={(value) => setNewEvent({ ...newEvent, type: value as Event["type"] })}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="meeting">Meeting</SelectItem>
                    <SelectItem value="deadline">Deadline</SelectItem>
                    <SelectItem value="site-visit">Site Visit</SelectItem>
                    <SelectItem value="inspection">Inspection</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="event-location" className="text-right">
                  Location
                </Label>
                <Input
                  id="event-location"
                  value={newEvent.location || ""}
                  onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <Button onClick={handleAddEvent}>Add Event</Button>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeView} onValueChange={(value) => setActiveView(value as "month" | "week" | "day")}>
        <TabsList>
          <TabsTrigger value="month">Month</TabsTrigger>
          <TabsTrigger value="week">Week</TabsTrigger>
          <TabsTrigger value="day">Day</TabsTrigger>
        </TabsList>

        <TabsContent value="month">
          <Card>
            <CardHeader>
              <CardTitle>
                {activeView === "month" ? "Monthly" : activeView === "week" ? "Weekly" : "Daily"} View
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                events={events.map((event) => ({
                  ...event,
                  start: new Date(event.date),
                  end: new Date(event.date),
                }))}
                startAccessor="start"
                endAccessor="end"
                defaultView={activeView}
                views={["month", "week", "day"]}
                onView={(view) => setActiveView(view as "month" | "week" | "day")}
                localizer={localizer}
                style={{ height: 500 }}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="week">
          <Card>
            <CardHeader>
              <CardTitle>Weekly View</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                events={events.map((event) => ({
                  ...event,
                  start: new Date(event.date),
                  end: new Date(event.date),
                }))}
                startAccessor="start"
                endAccessor="end"
                defaultView={activeView}
                views={["month", "week", "day"]}
                onView={(view) => setActiveView(view as "month" | "week" | "day")}
                localizer={localizer}
                style={{ height: 500 }}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="day">
          <Card>
            <CardHeader>
              <CardTitle>Daily View</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                events={events.map((event) => ({
                  ...event,
                  start: new Date(event.date),
                  end: new Date(event.date),
                }))}
                startAccessor="start"
                endAccessor="end"
                defaultView={activeView}
                views={["month", "week", "day"]}
                onView={(view) => setActiveView(view as "month" | "week" | "day")}
                localizer={localizer}
                style={{ height: 500 }}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}


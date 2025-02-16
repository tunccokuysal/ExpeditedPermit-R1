"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const projectData = [
  { name: "Jan", completed: 4, inProgress: 6, planned: 2 },
  { name: "Feb", completed: 3, inProgress: 7, planned: 3 },
  { name: "Mar", completed: 5, inProgress: 5, planned: 4 },
  { name: "Apr", completed: 6, inProgress: 4, planned: 3 },
  { name: "May", completed: 4, inProgress: 6, planned: 5 },
  { name: "Jun", completed: 7, inProgress: 3, planned: 4 },
]

const permitData = [
  { name: "Jan", approved: 10, pending: 5, rejected: 2 },
  { name: "Feb", approved: 12, pending: 6, rejected: 1 },
  { name: "Mar", approved: 15, pending: 4, rejected: 3 },
  { name: "Apr", approved: 11, pending: 7, rejected: 2 },
  { name: "May", approved: 14, pending: 5, rejected: 1 },
  { name: "Jun", approved: 16, pending: 3, rejected: 2 },
]

const projectTypeData = [
  { name: "Residential", value: 35 },
  { name: "Commercial", value: 25 },
  { name: "Industrial", value: 20 },
  { name: "Infrastructure", value: 15 },
  { name: "Other", value: 5 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export default function Analytics() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Analytics Dashboard</h1>

      <Tabs defaultValue="projects">
        <TabsList>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="permits">Permits</TabsTrigger>
          <TabsTrigger value="projectTypes">Project Types</TabsTrigger>
        </TabsList>

        <TabsContent value="projects">
          <Card>
            <CardHeader>
              <CardTitle>Project Status Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={projectData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="completed" fill="#4CAF50" />
                  <Bar dataKey="inProgress" fill="#2196F3" />
                  <Bar dataKey="planned" fill="#FFC107" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permits">
          <Card>
            <CardHeader>
              <CardTitle>Permit Status Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={permitData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="approved" stroke="#4CAF50" />
                  <Line type="monotone" dataKey="pending" stroke="#FFC107" />
                  <Line type="monotone" dataKey="rejected" stroke="#F44336" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projectTypes">
          <Card>
            <CardHeader>
              <CardTitle>Project Types Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={projectTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {projectTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}


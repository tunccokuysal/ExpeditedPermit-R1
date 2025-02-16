"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface RFIFormProps {
  projectId: number
}

export function RFIForm({ projectId }: RFIFormProps) {
  const [subject, setSubject] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("")
  const [attachments, setAttachments] = useState<FileList | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would send the RFI to your backend
    console.log({
      projectId,
      subject,
      description,
      priority,
      attachments,
    })
    // Reset form
    setSubject("")
    setDescription("")
    setPriority("")
    setAttachments(null)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit RFI (Request for Information)</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter RFI subject"
              required
            />
          </div>
          <div>
            <Label htmlFor="priority">Priority</Label>
            <Select onValueChange={setPriority} required>
              <SelectTrigger>
                <SelectValue placeholder="Select priority level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your request in detail"
              required
            />
          </div>
          <div>
            <Label htmlFor="attachments">Attachments</Label>
            <Input
              id="attachments"
              type="file"
              onChange={(e) => setAttachments(e.target.files)}
              multiple
              className="mt-1"
            />
          </div>
          <Button type="submit">Submit RFI</Button>
        </form>
      </CardContent>
    </Card>
  )
}


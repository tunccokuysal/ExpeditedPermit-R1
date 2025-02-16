"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { MessageSquare } from "lucide-react"

export function FeedbackForm() {
  const [feedback, setFeedback] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the feedback to your backend
    console.log("Feedback submitted:", feedback)
    setIsSubmitted(true)
    setFeedback("")
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="fixed bottom-4 right-4">
          <MessageSquare className="mr-2 h-4 w-4" />
          Feedback
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Provide Feedback</DialogTitle>
        </DialogHeader>
        {isSubmitted ? (
          <p>Thank you for your feedback!</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <Textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Your feedback helps us improve. What do you think about this page?"
              className="mb-4"
            />
            <Button type="submit">Submit Feedback</Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}


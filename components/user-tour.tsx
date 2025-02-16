"use client"

import { useState, useEffect } from "react"
import Joyride, { type Step } from "react-joyride"

const steps: Step[] = [
  {
    target: "body",
    content: "Welcome to Expedited Permit! Let's take a quick tour of the main features.",
    placement: "center",
  },
  {
    target: ".sidebar",
    content: "This is the main navigation. You can access different sections of the app from here.",
  },
  {
    target: ".search-bar",
    content: "Use this search bar to quickly find projects, documents, or permits.",
  },
  {
    target: ".notifications",
    content: "You'll receive important updates and notifications here.",
  },
  {
    target: ".user-menu",
    content: "Access your profile and account settings from this menu.",
  },
]

export function UserTour() {
  const [run, setRun] = useState(false)

  useEffect(() => {
    const hasSeenTour = localStorage.getItem("hasSeenTour")
    if (!hasSeenTour) {
      setRun(true)
      localStorage.setItem("hasSeenTour", "true")
    }
  }, [])

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      showSkipButton
      styles={{
        options: {
          primaryColor: "#3b82f6",
        },
      }}
    />
  )
}


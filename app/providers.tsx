"use client"

import { ThemeProvider } from "next-themes"
import { AuthProvider } from "./auth/authContext"
import type React from "react" // Added import for React

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  )
}


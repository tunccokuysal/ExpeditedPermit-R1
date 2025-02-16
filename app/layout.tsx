"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Home,
  Bell,
  Settings,
  Menu,
  Calendar,
  BarChart2,
  Clock,
  CameraIcon as Camera3d,
  FileCheck,
  Building2,
  Blocks,
} from "lucide-react"
import { useAuth } from "./auth/authContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { FeedbackForm } from "@/components/feedback-form"
import { UserTour } from "@/components/user-tour"
import { Providers } from "./providers"
import type React from "react"
import { ThemeToggle } from "@/components/theme-toggle"

const navItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  {
    icon: Building2,
    label: "Projects",
    href: "/project-management",
    badge: { text: "8", variant: "default" },
  },
  {
    icon: Camera3d,
    label: "LIDAR Analysis",
    href: "/lidar-analysis",
    badge: { text: "New", variant: "secondary" },
  },
  {
    icon: FileCheck,
    label: "Documents",
    href: "/documents",
    badge: { text: "3", variant: "default" },
  },
  { icon: Blocks, label: "Blockchain Certs", href: "/blockchain-certificates" },
  { icon: Calendar, label: "Calendar", href: "/calendar" },
  { icon: BarChart2, label: "Analytics", href: "/analytics" },
]

function LayoutContent({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user && pathname !== "/login") {
      router.push("/login")
    }
  }, [user, pathname, router])

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  if (!user) {
    return <>{children}</>
  }

  const SidebarContent = () => (
    <>
      <div className="flex h-16 items-center justify-between px-4 border-b">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-blue-600">Expedited Permit</span>
        </Link>
      </div>
      <nav className="space-y-1 p-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
              pathname === item.href
                ? "bg-blue-50 text-blue-600"
                : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
            )}
          >
            <div className="flex items-center space-x-3">
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </div>
            {item.badge && <Badge variant={item.badge.variant}>{item.badge.text}</Badge>}
          </Link>
        ))}
      </nav>
    </>
  )

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out hidden md:block",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div className="flex-1 overflow-hidden md:ml-64">
        {/* Top bar */}
        <header className="flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Input
                type="search"
                placeholder="Search projects, documents, permits..."
                className="w-[300px] lg:w-[400px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
            </Button>
            <Button variant="ghost" size="icon">
              <Clock className="h-5 w-5" />
            </Button>
            <ThemeToggle />
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Avatar>
              <AvatarImage src={user.imageUrl} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Page content */}
        <main className="overflow-auto p-6">
          {children}
          <FeedbackForm />
        </main>
      </div>
    </div>
  )
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full dark:bg-gray-900">
        <Providers>
          <LayoutContent>{children}</LayoutContent>
          <UserTour />
        </Providers>
      </body>
    </html>
  )
}



import './globals.css'

export const metadata = {
      generator: 'v0.dev'
    };

import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { Home, Briefcase, Camera, FileText, Bell, Settings, LogOut, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

const menuItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: Briefcase, label: "Projects", href: "/projects" },
  { icon: Camera, label: "LIDAR Analysis", href: "/lidar-analysis" },
  { icon: FileText, label: "Documents", href: "/documents" },
]

export function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [language, setLanguage] = React.useState<"en" | "tr">("en")

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "tr" : "en")
  }

  return (
    <div className="flex h-screen bg-background">
      <aside className="w-64 bg-card shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-primary">Expedited Permit</h1>
        </div>
        <nav className="mt-8">
          <ul>
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} passHref legacyBehavior>
                  <a
                    className={`flex items-center px-4 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground ${
                      router.pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                    }`}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.label}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="absolute bottom-0 w-64 p-4">
          <ul>
            <li>
              <Link href="/notifications" passHref legacyBehavior>
                <a className="flex items-center px-4 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground">
                  <Bell className="mr-3 h-5 w-5" />
                  Notifications
                </a>
              </Link>
            </li>
            <li>
              <Link href="/settings" passHref legacyBehavior>
                <a className="flex items-center px-4 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground">
                  <Settings className="mr-3 h-5 w-5" />
                  Settings
                </a>
              </Link>
            </li>
            <li>
              <button className="flex w-full items-center px-4 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground">
                <LogOut className="mr-3 h-5 w-5" />
                Logout
              </button>
            </li>
          </ul>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto p-8">
        <div className="flex justify-end space-x-2 mb-4">
          <Button variant="outline" size="sm" onClick={toggleLanguage}>
            <Globe className="mr-2 h-4 w-4" />
            {language === "en" ? "EN" : "TR"}
          </Button>
          <ThemeToggle />
        </div>
        {children}
      </main>
    </div>
  )
}


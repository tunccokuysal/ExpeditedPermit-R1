import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { Home, Briefcase, ClipboardCheck, Bell, Settings, LogOut } from "lucide-react"

const menuItems = {
  contractor: [
    { icon: Home, label: "Dashboard", href: "/dashboard" },
    { icon: Briefcase, label: "Projects", href: "/projects" },
    { icon: ClipboardCheck, label: "Tasks", href: "/tasks" },
  ],
  subcontractor: [
    { icon: Home, label: "Dashboard", href: "/dashboard" },
    { icon: ClipboardCheck, label: "Tasks", href: "/tasks" },
  ],
  inspector: [
    { icon: Home, label: "Dashboard", href: "/dashboard" },
    { icon: Briefcase, label: "Projects", href: "/projects" },
  ],
}

export function Sidebar() {
  const [userRole, setUserRole] = useState("contractor") // This should come from authentication
  const router = useRouter()

  return (
    <div className="w-64 bg-white shadow-md">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-blue-600">Expedited Permit</h1>
      </div>
      <nav className="mt-8">
        <ul>
          {menuItems[userRole].map((item) => (
            <li key={item.href}>
              <Link href={item.href}>
                <a
                  className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                    router.pathname === item.href ? "bg-gray-100" : ""
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
      <div className="absolute bottom-0 w-full p-4">
        <ul>
          <li>
            <Link href="/notifications">
              <a className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                <Bell className="mr-3 h-5 w-5" />
                Notifications
              </a>
            </Link>
          </li>
          <li>
            <Link href="/settings">
              <a className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                <Settings className="mr-3 h-5 w-5" />
                Settings
              </a>
            </Link>
          </li>
          <li>
            <button className="flex w-full items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}


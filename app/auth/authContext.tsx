"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import type { User, UserRole, AuthContextType } from "./types"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // This is a mock login. In a real app, you'd call an API here.
    const mockUser: User = {
      id: "1",
      name: "John Doe",
      email: email,
      role: "projectManager",
    }
    setUser(mockUser)
    localStorage.setItem("user", JSON.stringify(mockUser))
    router.push("/dashboard")
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    router.push("/login")
  }

  const isAuthorized = (requiredRoles: UserRole[]) => {
    return user !== null && requiredRoles.includes(user.role)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return <AuthContext.Provider value={{ user, login, logout, isAuthorized }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}


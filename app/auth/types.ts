export type UserRole = "projectManager" | "engineer" | "municipalOfficial" | "inspector" | "contractor"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
}

export interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isAuthorized: (requiredRoles: UserRole[]) => boolean
}


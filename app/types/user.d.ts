export type UserRole = 'admin' | 'client' | 'gestionnaire'

export interface AppUser {
  id: string
  email: string
  fullName?: string
  role: UserRole
}

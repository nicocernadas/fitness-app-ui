import type { UserPlan } from "@/model/types/UserPlan"

export type CurrentUser = {
  id: number
  name: string | null
  isProfileComplete: boolean
  plan: UserPlan | null
}

export type AuthResponse = {
  token: string
  user: CurrentUser
}

export type SessionContextValue = {
  token: string | null
  user: CurrentUser | null
  isLoading: boolean
  signIn: (token: string, user: CurrentUser) => Promise<void>
  signOut: () => Promise<void>
  updateUser: (user: CurrentUser) => void
}

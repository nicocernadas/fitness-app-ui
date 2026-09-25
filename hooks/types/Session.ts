export type CurrentUser = {
  id: string
  isProfileComplete: boolean
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

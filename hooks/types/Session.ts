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
  isProfileComplete: boolean
  isLoading: boolean
  signIn: (token: string, isProfileComplete: boolean) => Promise<void>
  signOut: () => Promise<void>
  markProfileComplete: () => void
}

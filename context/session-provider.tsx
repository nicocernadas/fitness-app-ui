import type { SessionContextValue } from "@/hooks/types/session"
import { tokenStorage } from "@/services/helpers/token-storage"
import { userService } from "@/services/user-service"
import {
  createContext,
  use,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react"

const SessionContext = createContext<SessionContextValue | null>(null)

export function useSession() {
  const value = use(SessionContext)
  if (!value) {
    throw new Error("useSession must be used inside <SessionProvider>")
  }
  return value
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useState<string | null>(null)
  const [isProfileComplete, setIsProfileComplete] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    restoreSession()
  }, [])

  async function restoreSession() {
    try {
      const storedToken = await tokenStorage.read()
      if (!storedToken) return

      const user = await userService.fetchCurrentUser(storedToken)
      setToken(storedToken)
      setIsProfileComplete(user.isProfileComplete)
    } catch {
      await tokenStorage.clear()
    } finally {
      setIsLoading(false)
    }
  }

  async function signIn(newToken: string, profileComplete: boolean) {
    await tokenStorage.save(newToken)
    setToken(newToken)
    setIsProfileComplete(profileComplete)
  }

  async function signOut() {
    await tokenStorage.clear()
    setToken(null)
    setIsProfileComplete(false)
  }

  function markProfileComplete() {
    setIsProfileComplete(true)
  }

  return (
    <SessionContext
      value={{
        token,
        isProfileComplete,
        isLoading,
        signIn,
        signOut,
        markProfileComplete,
      }}
    >
      {children}
    </SessionContext>
  )
}

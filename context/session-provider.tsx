import type { CurrentUser, SessionContextValue } from "@/hooks/types/Session"
import { ApiError } from "@/services/errors/ApiError"
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
  const [user, setUser] = useState<CurrentUser | null>(null)
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
      setUser(user)
    } catch (error) {
      if (error instanceof ApiError && error.status === 401)
        await tokenStorage.clear()
    } finally {
      setIsLoading(false)
    }
  }

  async function signIn(newToken: string, user: CurrentUser) {
    await tokenStorage.save(newToken)
    setToken(newToken)
    setUser(user)
  }

  async function signOut() {
    await tokenStorage.clear()
    setToken(null)
    setUser(null)
  }

  function updateUser(user: CurrentUser | null) {
    setUser(user)
  }

  return (
    <SessionContext
      value={{
        token,
        user,
        isLoading,
        signIn,
        signOut,
        updateUser,
      }}
    >
      {children}
    </SessionContext>
  )
}

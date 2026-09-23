import type { AuthResponse } from "@/hooks/types/Session"
import { apiRequest } from "./helpers/api-client"

//* I named these login and register on purpose, so they aren't confused with the provider's signIn
//* authService.login asks the backend "are these credentials valid?"
//* session.signIn saves the token the backend gives back
export const authService = {
  login: (email: string, password: string) =>
    apiRequest<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  register: (email: string, password: string) =>
    apiRequest<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
}

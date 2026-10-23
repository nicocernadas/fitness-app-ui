import type { AuthResponse } from "@/hooks/types/Session"
import type { Credentials } from "@/model/Credentials"
import { apiRequest } from "./helpers/api-client"

//* I named these login and register on purpose, so they aren't confused with the provider's signIn
//* authService.login asks the backend "are these credentials valid?"
//* session.signIn saves the token the backend gives back
//* Callers validate() the Credentials before calling these
export const authService = {
  login: (credentials: Credentials) =>
    apiRequest<AuthResponse>("/auth/login", {
      method: "POST",
      data: credentials,
    }),

  register: (credentials: Credentials) =>
    apiRequest<AuthResponse>("/auth/register", {
      method: "POST",
      data: credentials,
    }),
}

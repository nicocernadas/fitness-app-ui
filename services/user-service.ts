import type { CurrentUser } from "@/hooks/types/Session"
import { apiRequest } from "./helpers/api-client"

export const userService = {
  fetchCurrentUser: (token: string) =>
    apiRequest<CurrentUser>("/me", {
      headers: { Authorization: `Bearer ${token}` },
    }),
}

import type { CurrentUser } from "@/hooks/types/Session"
import type { Plan } from "@/model/Plan"
import type { Profile } from "@/model/Profile"
import { apiRequest } from "./helpers/api-client"

// Callers validate() the Profile / Plan before calling these
export const userService = {
  fetchCurrentUser: (token: string) =>
    apiRequest<CurrentUser>("/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    }),

  completeOnboarding: (token: string, profile: Profile) =>
    apiRequest<CurrentUser>("/users/onboarding", {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
      data: profile,
    }),

  // Creates the user's plan, or replaces the current one
  setPlan: (token: string, plan: Plan) =>
    apiRequest<CurrentUser>("/users/plan", {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      data: plan,
    }),
}

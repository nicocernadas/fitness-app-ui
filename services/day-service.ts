import type { Day } from "@/model/types/Day"
import { apiRequest } from "./helpers/api-client"

export const dayService = {
  // The day being tracked. The backend starts one the first time
  fetchCurrentDay: (token: string) =>
    apiRequest<Day>("/days/current", {
      headers: { Authorization: `Bearer ${token}` },
    }),

  // Saves the current day as it is and returns a new one with every total at 0
  startNewDay: (token: string) =>
    apiRequest<Day>("/days", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    }),
}

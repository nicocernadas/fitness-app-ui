import type { NewDayEntry } from "@/model/NewDayEntry"
import type { Day } from "@/model/types/Day"
import { apiRequest } from "./helpers/api-client"

// Every call returns the whole current day, with its totals already updated.
// Callers validate() the NewDayEntry before calling addEntry
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

  addEntry: (token: string, entry: NewDayEntry) =>
    apiRequest<Day>("/days/current/entries", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      data: entry,
    }),

  deleteEntry: (token: string, entryId: number) =>
    apiRequest<Day>(`/days/current/entries/${entryId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }),
}

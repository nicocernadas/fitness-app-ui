import type { NewDayEntry } from "@/model/NewDayEntry"
import type { Day } from "@/model/types/Day"

export type CurrentDayContextValue = {
  day: Day | null
  loadError: string | null
  startNewDay: () => Promise<void>
  addEntry: (entry: NewDayEntry) => Promise<void>
  deleteEntry: (entryId: number) => Promise<void>
}

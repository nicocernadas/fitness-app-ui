import type { DayEntry } from "@/model/types/DayEntry"

export type DayEntryRowProps = {
  entry: DayEntry
  onRemove: (entry: DayEntry) => void
}

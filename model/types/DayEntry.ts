import type { Nutrients } from "./Nutrients"

// The backend's DayEntryDTO: something eaten during the day. The nutrients are for those grams.
// ingredientId is null if the ingredient was deleted later; the name and nutrients stay
export type DayEntry = Nutrients & {
  id: number
  ingredientId: number | null
  ingredientName: string
  grams: number
  createdAt: string
}

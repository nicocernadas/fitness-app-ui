// The backend's DayDTO: totals of what the user ingested during a tracked day.
// Calories in kcal, macros in grams. endedAt is null while it's the current day
export type Day = {
  id: number
  startedAt: string
  endedAt: string | null
  calories: number
  proteins: number
  carbs: number
  fats: number
}

import type { Goal } from "./Goal"
import type { Pace } from "./Pace"

// The plan the backend returns inside the user (its PlanDTO).
// Calories in kcal, macros in grams, all already rounded
export type UserPlan = {
  goal: Goal
  pace: Pace | null
  BMR: number
  NEAT: number
  TDEE: number
  calories: number
  proteins: number
  carbs: number
  fats: number
}

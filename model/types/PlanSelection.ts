import type { Goal } from "./Goal"
import type { Pace } from "./Pace"

// Only building muscle and losing fat have a pace
export type PacedGoal = Goal.BUILD_MUSCLE | Goal.LOSE_FAT

// Body of PUT /users/plan. pace is null when the goal is to maintain
export type PlanSelection = {
  goal: Goal
  pace: Pace | null
}

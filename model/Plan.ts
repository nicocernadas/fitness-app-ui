import { isEnumValue } from "@/utils/validators"
import { ValidationError } from "./errors/ValidationError"
import { Goal } from "./types/Goal"
import { Pace } from "./types/Pace"
import type { PlanSelection } from "./types/PlanSelection"

// The goal + pace sent in onboarding step 2 (PUT /users/plan). The backend calculates
// the targets from it and returns them as the user's UserPlan.
// validate() mirrors the backend's Plan.validate()
export class Plan {
  goal: Goal
  pace: Pace | null

  constructor({ goal, pace }: PlanSelection) {
    this.goal = goal
    // Maintaining has no pace
    this.pace = goal === Goal.MAINTAIN ? null : pace
  }

  // Throws a ValidationError on the first invalid field
  validate(): void {
    if (!isEnumValue(Goal, this.goal)) {
      throw new ValidationError(
        `Goal must be one of: ${Object.values(Goal).join(", ")}`,
      )
    }
    if (this.goal !== Goal.MAINTAIN && !isEnumValue(Pace, this.pace)) {
      throw new ValidationError(
        `Pace must be one of: ${Object.values(Pace).join(", ")}`,
      )
    }
  }
}

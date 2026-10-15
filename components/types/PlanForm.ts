import type { Goal } from "@/model/types/Goal"
import type { Pace } from "@/model/types/Pace"

export type PlanFormProps = {
  initialGoal?: Goal
  initialPace?: Pace | null
  submitTitle: string
  // Runs after the plan is saved and the session user is updated
  onSaved?: () => void
}

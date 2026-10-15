import {
  GOAL_OPTION_DESCRIPTIONS,
  PACE_DESCRIPTION,
  PACE_OPTION_DESCRIPTIONS,
} from "@/constants/field-descriptions"
import { useSession } from "@/context/session-provider"
import { useFormSubmit } from "@/hooks/use-form-submit"
import { Plan } from "@/model/Plan"
import { Goal } from "@/model/types/Goal"
import { Pace } from "@/model/types/Pace"
import { userService } from "@/services/user-service"
import { useState } from "react"
import { Text } from "react-native"
import { PrimaryButton } from "./primary-button"
import { SelectField } from "./select-field"
import type { PlanFormProps } from "./types/PlanForm"

// Goal + pace pickers that save the user's plan. Used by onboarding (first plan)
// and by the edit-plan modal (changing it later): PUT /users/plan does both
export function PlanForm({
  initialGoal = Goal.BUILD_MUSCLE,
  initialPace,
  submitTitle,
  onSaved,
}: PlanFormProps) {
  const { token, updateUser } = useSession()
  const [goal, setGoal] = useState<Goal>(initialGoal)
  const [pace, setPace] = useState<Pace>(initialPace ?? Pace.STEADY)
  // Maintaining has no pace, so the pace picker is hidden
  const isPacedGoal = goal !== Goal.MAINTAIN

  const { submit, errorMessage, isSubmitting } = useFormSubmit(async () => {
    // Only signed-in users reach this form, so token is always set
    if (!token) return

    // Plan drops the pace by itself when the goal is to maintain
    const plan = new Plan({ goal, pace })
    plan.validate()

    const user = await userService.setPlan(token, plan)
    updateUser(user)
    onSaved?.()
  })

  return (
    <>
      <SelectField
        label="Goal"
        options={Object.values(Goal)}
        value={goal}
        onChange={setGoal}
        optionDescriptions={GOAL_OPTION_DESCRIPTIONS}
      />

      {isPacedGoal && (
        <SelectField
          label="Pace"
          options={Object.values(Pace)}
          value={pace}
          onChange={setPace}
          description={PACE_DESCRIPTION}
          optionDescriptions={PACE_OPTION_DESCRIPTIONS[goal]}
        />
      )}

      {errorMessage && <Text className="text-red-600">{errorMessage}</Text>}

      <PrimaryButton
        title={submitTitle}
        onPress={submit}
        isLoading={isSubmitting}
      />
    </>
  )
}

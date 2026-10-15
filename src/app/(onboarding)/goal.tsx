import { PlanForm } from "@/components/plan-form"
import { ScreenContainer } from "@/components/screen-container"
import { Text } from "react-native"

export default function GoalScreen() {
  return (
    <ScreenContainer contentClassName="justify-center gap-4">
      <Text className="text-2xl font-bold text-font-primary">What do you want to achieve?</Text>
      <Text className="light-text">
        We'll use your goal to set your daily calories and macros
      </Text>

      {/* Saving gives the user a plan, so the root guard moves us to (tabs) */}
      <PlanForm submitTitle="Submit" />
    </ScreenContainer>
  )
}

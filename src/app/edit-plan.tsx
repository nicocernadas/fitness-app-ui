import { PlanForm } from "@/components/plan-form"
import { ScreenContainer } from "@/components/screen-container"
import { useSession } from "@/context/session-provider"
import { router } from "expo-router"
import { Pressable, Text } from "react-native"

// Opened as a modal from Settings (see the root _layout). On iOS it can also be closed
// by swiping it down
export default function EditPlanScreen() {
  const { user } = useSession()

  return (
    <ScreenContainer contentClassName="gap-4">
      <Text className="text-2xl font-bold text-font-primary">Change your plan</Text>
      <Text className="light-text">
        Your daily calories and macros will be recalculated
      </Text>

      <PlanForm
        initialGoal={user?.plan?.goal}
        initialPace={user?.plan?.pace}
        submitTitle="Save plan"
        onSaved={() => router.back()}
      />

      <Pressable onPress={() => router.back()}>
        <Text className="text-center text-font-primary">Cancel</Text>
      </Pressable>
    </ScreenContainer>
  )
}

import { useSession } from "@/context/session-provider"
import { Stack } from "expo-router"

//! One screen per onboarding step, and only the step the user is on is available.
//! When a guard turns false, Expo Router redirects to the first screen still available,
//! so saving personal-info moves the user to goal on its own (same idea as the root layout).
//! There's no anchor anymore: with only one screen available at a time, it isn't needed.
export default function OnboardingLayout() {
  const { user } = useSession()
  const hasProfile = user?.isProfileComplete ?? false

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!hasProfile}>
        <Stack.Screen name="personal-info" />
      </Stack.Protected>

      <Stack.Protected guard={hasProfile}>
        <Stack.Screen name="goal" />
      </Stack.Protected>
    </Stack>
  )
}

import { Stack } from "expo-router"

export const unstable_settings = {
  anchor: "personal-info",
}

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="personal-info" />
    </Stack>
  )
}

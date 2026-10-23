import { CurrentDayProvider } from "@/context/current-day-provider"
import { SessionProvider, useSession } from "@/context/session-provider"
import { ThemeProvider } from "@/context/theme-provider"
import "@/global.css"
import { useRestoreTheme } from "@/hooks/use-theme"
import { useFonts } from "expo-font"
import { SplashScreen, Stack } from "expo-router"
import { useEffect } from "react"

SplashScreen.preventAutoHideAsync()

export default function RootLayour() {
  return (
    <SessionProvider>
      <ThemeProvider>
        {/* Inside SessionProvider: it needs the token, and only loads once onboarding is done */}
        <CurrentDayProvider>
          <RootNavigator />
        </CurrentDayProvider>
      </ThemeProvider>
    </SessionProvider>
  )
}

function RootNavigator() {
  const { token, user, isLoading } = useSession()
  const isThemeRestored = useRestoreTheme()
  const [fontsLoaded] = useFonts({
    "sans-regular": require("../../assets/fonts/PlusJakartaSans-Regular.ttf"),
    "sans-bold": require("../../assets/fonts/PlusJakartaSans-Bold.ttf"),
    "sans-medium": require("../../assets/fonts/PlusJakartaSans-Medium.ttf"),
    "sans-semibold": require("../../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
    "sans-extrabold": require("../../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
    "sans-light": require("../../assets/fonts/PlusJakartaSans-Light.ttf"),
  })

  const isReady = fontsLoaded && !isLoading && isThemeRestored

  useEffect(() => {
    if (isReady) SplashScreen.hideAsync()
  }, [isReady])

  if (!isReady) return null

  const isSignedIn = !!token
  // Onboarding has two steps: personal info, then a goal (the plan)
  const hasFinishedOnboarding = !!user?.isProfileComplete && !!user?.plan

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!isSignedIn}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>

      <Stack.Protected guard={isSignedIn && !hasFinishedOnboarding}>
        <Stack.Screen name="(onboarding)" />
      </Stack.Protected>

      <Stack.Protected guard={isSignedIn && hasFinishedOnboarding}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="edit-plan" options={{ presentation: "modal" }} />
        <Stack.Screen name="add-entry" options={{ presentation: "modal" }} />
      </Stack.Protected>
    </Stack>
  )
}

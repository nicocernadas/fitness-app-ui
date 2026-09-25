import { SessionProvider, useSession } from "@/context/session-provider"
import "@/global.css"
import { useFonts } from "expo-font"
import { SplashScreen, Stack } from "expo-router"
import { useEffect } from "react"

SplashScreen.preventAutoHideAsync()

export default function RootLayour() {
  return (
    <SessionProvider>
      <RootNavigator />
    </SessionProvider>
  )
}

function RootNavigator() {
  const { token, user, isLoading } = useSession()
  const [fontsLoaded] = useFonts({
    "sans-regular": require("../../assets/fonts/PlusJakartaSans-Regular.ttf"),
    "sans-bold": require("../../assets/fonts/PlusJakartaSans-Bold.ttf"),
    "sans-medium": require("../../assets/fonts/PlusJakartaSans-Medium.ttf"),
    "sans-semibold": require("../../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
    "sans-extrabold": require("../../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
    "sans-light": require("../../assets/fonts/PlusJakartaSans-Light.ttf"),
  })

  const isReady = fontsLoaded && !isLoading

  useEffect(() => {
    if (isReady) SplashScreen.hideAsync()
  }, [isReady])

  if (!isReady) return null

  const isSignedIn = !!token

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!isSignedIn}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>

      <Stack.Protected guard={isSignedIn && !user?.isProfileComplete}>
        <Stack.Screen name="(onboarding)" />
      </Stack.Protected>

      <Stack.Protected guard={isSignedIn && (user?.isProfileComplete ?? false)}>
        <Stack.Screen name="(tabs)" />
      </Stack.Protected>
    </Stack>
  )
}

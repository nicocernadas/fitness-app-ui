import { Stack } from "expo-router"

//! Why anchor: according to the docs, when a guard kicks someone out,
//! Expo Router sends them to "the anchor route (usually the index screen) or
//! the first available screen". The (auth) folder has no index.tsx, so anchor: "sign-in"
//! says which screen that is. The docs don't fully spell this case out, so if ever land
//!  on sign-up first, this is the setting to look at.

export const unstable_settings = {
  anchor: "sign-in",
}

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="sign-up" />
    </Stack>
  )
}

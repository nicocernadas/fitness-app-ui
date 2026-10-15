import { themeColors } from "@/constants/theme"
import type { Theme } from "@/model/types/Theme"
import { themeStorage } from "@/services/helpers/theme-storage"
import { useEffect, useState } from "react"
import { Appearance, useColorScheme } from "react-native"

// The active theme, its JS colors, and a way to change it.
// useColorScheme() re-renders every component using this hook when the scheme changes
export function useTheme() {
  const theme: Theme = useColorScheme() === "dark" ? "dark" : "light"

  function setTheme(nextTheme: Theme) {
    // Switches the whole app, native elements included (pickers, alerts, status bar)
    Appearance.setColorScheme(nextTheme)
    // If saving fails, the theme still changes now; it just won't be remembered
    themeStorage.save(nextTheme).catch(() => {})
  }

  return { theme, colors: themeColors[theme], setTheme }
}

// Applies the saved theme on launch. Returns true once done, so the splash screen
// can stay up until then and the app never flashes in the wrong theme
export function useRestoreTheme() {
  const [isThemeRestored, setIsThemeRestored] = useState(false)

  useEffect(() => {
    themeStorage
      .read()
      .then((theme) => {
        if (theme) Appearance.setColorScheme(theme)
      })
      // Nothing saved or unreadable: the app follows the system theme
      .catch(() => {})
      .finally(() => setIsThemeRestored(true))
  }, [])

  return isThemeRestored
}

import type { Theme } from "@/model/types/Theme"
import * as SecureStore from "expo-secure-store"

const THEME_KEY = "theme"

// Appearance.setColorScheme() forgets the choice when the app closes, so it's saved here
// and restored on launch. SecureStore is meant for secrets, but it's the storage already
// installed, and it works fine for one small value
export const themeStorage = {
  read: async (): Promise<Theme | null> => {
    const value = await SecureStore.getItemAsync(THEME_KEY)
    return value === "light" || value === "dark" ? value : null
  },
  save: (theme: Theme) => SecureStore.setItemAsync(THEME_KEY, theme),
}

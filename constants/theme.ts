import type { Theme } from "@/model/types/Theme"
import { toCssVariables } from "@/utils/to-css-variables"

// Colors that change with the theme. ThemeProvider turns the active palette into CSS
// variables (fontPrimary -> --color-font-primary), so classes like `text-font-primary` follow it.
// JS style props (e.g. the tab bar) read them with useTheme().colors.
// When adding a key: add it to global.css (@theme and :root) and to metro.config.js too
export const themeColors = {
  light: {
    background: "rgba(250, 240, 230, 0.329)",
    fontPrimary: "#0f2c33",
    fontSecondary: "#1b3136",
    fontTerciary: "#33494e",
    accent: "#21616a",
    border: "rgba(0, 0, 0, 0.1)",
    tabBar: "#0f2c33",
    button: "#000000",
    buttonText: "#ffffff",
    inputBorder: "#d1d5db",
  },
  dark: {
    background: "#0f1c1f",
    fontPrimary: "#e6eff0",
    fontSecondary: "#cddadc",
    fontTerciary: "#a3b6b9",
    accent: "#2e9ca0",
    border: "rgba(255, 255, 255, 0.12)",
    tabBar: "#1b3136",
    button: "#e6eff0",
    buttonText: "#0f1c1f",
    inputBorder: "rgba(255, 255, 255, 0.2)",
  },
} as const satisfies Record<Theme, Record<string, string>>

// Built once, so ThemeProvider always passes the same object for a theme
export const themeCssVariables = {
  light: toCssVariables(themeColors.light),
  dark: toCssVariables(themeColors.dark),
}

// Colors that are the same in both themes
export const colors = {
  gray: "#868686",

  // Status colors (progress bars)
  warning: "#ffb700",
  success: "#3fa66b",
  caution: "#f28c28",
  danger: "#d64545",
} as const

export const THEMES: readonly Theme[] = ["light", "dark"]

export const THEME_LABELS: Record<Theme, string> = {
  light: "Light",
  dark: "Dark",
}

export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  11: 44,
  12: 48,
  14: 56,
  16: 64,
  18: 72,
  20: 80,
  24: 96,
  30: 120,
} as const

export const components = {
  tabBar: {
    height: spacing[18],
    horizontalInset: spacing[5],
    radius: spacing[8],
    iconFrame: spacing[12],
    itemPaddingVertical: spacing[2],
  },
} as const

export const theme = {
  themeColors,
  colors,
  spacing,
  components,
} as const

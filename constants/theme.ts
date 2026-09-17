export const colors = {
  background: "rgba(250, 240, 230, 0.329)",
  // backgroundCard: "#fff8e7",
  fontPrimary: "#0f2c33",
  fontSecondary: "#1b3136",
  fontTerciary: "#33494e",
  gray: "#868686",
  accent: "#21616a",
  border: "rgba(0, 0, 0, 0.1)",

  // Status colors (progress bars)
  warning: "#ffb700",
  success: "#3fa66b",
  caution: "#f28c28",
  danger: "#d64545",
} as const

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
  colors,
  spacing,
  components,
} as const

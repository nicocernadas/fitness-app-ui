import { themeCssVariables } from "@/constants/theme"
import { useTheme } from "@/hooks/use-theme"
import { VariableContextProvider } from "nativewind"
import type { PropsWithChildren } from "react"

// Injects the active theme's colors as CSS variables into everything below it
// (the NativeWind v5 themes guide pattern). A class like `bg-background` compiles to
// var(--color-background), and NativeWind reads that variable from the nearest
// VariableContextProvider at render time. global.css :root only holds the light defaults
export function ThemeProvider({ children }: PropsWithChildren) {
  const { theme } = useTheme()

  return (
    <VariableContextProvider value={themeCssVariables[theme]}>
      {children}
    </VariableContextProvider>
  )
}

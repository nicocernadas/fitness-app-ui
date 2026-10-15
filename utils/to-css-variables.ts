// { fontPrimary: "#0f2c33" } -> { "--color-font-primary": "#0f2c33" }
export function toCssVariables(palette: Record<string, string>) {
  return Object.fromEntries(
    Object.entries(palette).map(([key, value]) => [
      `--color-${key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`,
      value,
    ]),
  ) as Record<`--${string}`, string>
}

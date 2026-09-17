export function toPercent(value: number, scaleMax: number) {
  if (scaleMax <= 0) return 0
  return Math.min(Math.max(value / scaleMax, 0), 1) * 100
}

// The totals tracked each day. Both UserPlan (the target) and Day (what was eaten) have them
export type DailyMetricKey = "calories" | "proteins" | "carbs" | "fats"

export type DailyMetric = {
  key: DailyMetricKey
  label: string
  unit: string
}

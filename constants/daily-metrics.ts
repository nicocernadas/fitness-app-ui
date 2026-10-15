import type { DailyMetric } from "@/model/types/DailyMetric"

// One progress bar per metric on the Home screen, in this order
export const DAILY_METRICS: readonly DailyMetric[] = [
  { key: "calories", label: "Calories", unit: "kcal" },
  { key: "proteins", label: "Proteins", unit: "g" },
  { key: "carbs", label: "Carbohydrates", unit: "g" },
  { key: "fats", label: "Fats", unit: "g" },
]

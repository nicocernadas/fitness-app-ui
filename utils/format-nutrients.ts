import type { Nutrients } from "@/model/types/Nutrients"

// "195 kcal · P 4.1 g · C 42.3 g · F 0.5 g". Expects values that are already rounded
export function formatNutrients({ calories, proteins, carbs, fats }: Nutrients): string {
  return `${calories} kcal · P ${proteins} g · C ${carbs} g · F ${fats} g`
}

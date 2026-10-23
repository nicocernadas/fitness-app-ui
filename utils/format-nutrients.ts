import type { Nutrients } from "@/model/types/Nutrients"
import { roundNutrients } from "./round-nutrients"

// "195 kcal · P 3.57 g · C 42.89 g · F 0.32 g". Rounds first (kcal whole, macros MACRO_DECIMALS),
// so it takes unrounded values too, like an ingredient's or the grams preview
export function formatNutrients(nutrients: Nutrients): string {
  const { calories, proteins, carbs, fats } = roundNutrients(nutrients)
  return `${calories} kcal · P ${proteins} g · C ${carbs} g · F ${fats} g`
}

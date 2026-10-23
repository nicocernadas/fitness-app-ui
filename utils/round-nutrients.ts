import { MACRO_DECIMALS } from "@/constants/nutrient-constants"
import type { Nutrients } from "@/model/types/Nutrients"

// Same rounding as the backend's roundNutrients(), so the preview shows what will be saved
export function roundNutrients(nutrients: Nutrients): Nutrients {
  return {
    calories: roundTo(nutrients.calories, 0),
    proteins: roundTo(nutrients.proteins, MACRO_DECIMALS),
    carbs: roundTo(nutrients.carbs, MACRO_DECIMALS),
    fats: roundTo(nutrients.fats, MACRO_DECIMALS),
  }
}

// Decimals aren't exact in binary: 1.005 * 100 is 100.49999999999999, which Math.round takes down.
// Cutting to 12 significant digits first removes that noise, so halves always round up
function roundTo(value: number, decimals: number): number {
  const factor = 10 ** decimals
  return Math.round(Number((value * factor).toPrecision(12))) / factor
}

import { NUTRIENT_BASE_GRAMS } from "@/constants/nutrient-constants"
import type { Nutrients } from "@/model/types/Nutrients"

// What `grams` of an ingredient contain, from its values per 100 g. Same formula as the
// backend's Ingredient.nutrientsFor(). Only used for the preview: the backend's numbers are the saved ones
export function getNutrientsFor(per100g: Nutrients, grams: number): Nutrients {
  const portion = grams / NUTRIENT_BASE_GRAMS
  return {
    calories: per100g.calories * portion,
    proteins: per100g.proteins * portion,
    carbs: per100g.carbs * portion,
    fats: per100g.fats * portion,
  }
}

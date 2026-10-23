import type { Nutrients } from "./Nutrients"

// The backend's IngredientDTO. Its nutrients are per 100 g and unrounded:
// formatNutrients rounds them for display
export type Ingredient = Nutrients & {
  id: number
  name: string
}

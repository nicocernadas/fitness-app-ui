import type { Ingredient } from "./Ingredient"
import type { Nutrients } from "./Nutrients"

// The backend's IngredientSearchResultDTO. "saved" is already in our database; "usda" isn't saved
// yet, so picking it goes through ingredientService.importFromUsda first, to get an id.
// The user is never told which one it is
export type IngredientSearchResult =
  | (Ingredient & { kind: "saved" })
  | (Nutrients & { kind: "usda"; fdcId: number; name: string })

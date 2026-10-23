import type { Ingredient } from "@/model/types/Ingredient"

export type IngredientSearchProps = {
  onSelect: (ingredient: Ingredient) => void
  // Receives what was typed, so the create form can start with it as the name
  onCreateNew: (searchText: string) => void
}

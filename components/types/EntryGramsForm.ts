import type { Ingredient } from "@/model/types/Ingredient"

export type EntryGramsFormProps = {
  ingredient: Ingredient
  onAdded: () => void
  onChangeIngredient: () => void
}

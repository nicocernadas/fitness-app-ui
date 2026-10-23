import type { Ingredient } from "@/model/types/Ingredient"

export type IngredientFormProps = {
  initialName: string
  onCreated: (ingredient: Ingredient) => void
  onCancel: () => void
}

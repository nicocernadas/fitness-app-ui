import type { NewIngredient } from "@/model/NewIngredient"
import type { Ingredient } from "@/model/types/Ingredient"
import type { IngredientSearchResult } from "@/model/types/IngredientSearchResult"
import { apiRequest } from "./helpers/api-client"

// Callers validate() the NewIngredient before calling create
export const ingredientService = {
  // Our ingredients matching every word (any order, ignoring case and accents).
  // Only if there are none, the backend looks the text up in USDA
  search: (token: string, text: string) =>
    apiRequest<IngredientSearchResult[]>("/ingredients", {
      params: { search: text },
      headers: { Authorization: `Bearer ${token}` },
    }),

  // Saves a picked USDA result and returns it as a normal ingredient, with an id
  importFromUsda: (token: string, fdcId: number) =>
    apiRequest<Ingredient>(`/ingredients/usda/${fdcId}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    }),

  // Private: only this user will see it
  create: (token: string, ingredient: NewIngredient) =>
    apiRequest<Ingredient>("/ingredients", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      data: ingredient,
    }),
}

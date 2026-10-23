import type { NewIngredient } from "@/model/NewIngredient"
import type { Ingredient } from "@/model/types/Ingredient"
import { apiRequest } from "./helpers/api-client"

// Callers validate() the NewIngredient before calling create
export const ingredientService = {
  // The shared ingredients plus the user's own, matching the text (ignoring case and accents)
  search: (token: string, text: string) =>
    apiRequest<Ingredient[]>("/ingredients", {
      params: { search: text },
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

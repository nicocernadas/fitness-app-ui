import { useSession } from "@/context/session-provider"
import type { Ingredient } from "@/model/types/Ingredient"
import { ingredientService } from "@/services/ingredient-service"
import { useState } from "react"
import { useFormSubmit } from "./use-form-submit"

// Searches only when search(text) is called (the Search button), never while typing.
// results is null until the first search, so "No ingredients found" only shows after one.
// An empty text lists the first ingredients alphabetically
export function useIngredientSearch() {
  const { token } = useSession()
  const [results, setResults] = useState<Ingredient[] | null>(null)

  const {
    submit: search,
    errorMessage,
    isSubmitting: isSearching,
  } = useFormSubmit(async (text: string) => {
    if (!token) return
    setResults(await ingredientService.search(token, text))
  })

  return { results, search, isSearching, errorMessage }
}

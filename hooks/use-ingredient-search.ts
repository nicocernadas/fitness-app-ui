import { useSession } from "@/context/session-provider"
import type { Ingredient } from "@/model/types/Ingredient"
import type { IngredientSearchResult } from "@/model/types/IngredientSearchResult"
import { ingredientService } from "@/services/ingredient-service"
import { useState } from "react"
import { useFormSubmit } from "./use-form-submit"

// Searches only when search(text) is called (the Search button), never while typing.
// results is null until the first search, so "No ingredients found" only shows after one.
// select(result) hands an Ingredient with an id to onSelect: a USDA result gets saved first
export function useIngredientSearch(onSelect: (ingredient: Ingredient) => void) {
  const { token } = useSession()
  const [results, setResults] = useState<IngredientSearchResult[] | null>(null)

  const {
    submit: search,
    errorMessage: searchError,
    isSubmitting: isSearching,
  } = useFormSubmit(async (text: string) => {
    if (!token) return
    setResults(await ingredientService.search(token, text))
  })

  const {
    submit: select,
    errorMessage: selectError,
    isSubmitting: isSelecting,
  } = useFormSubmit(async (result: IngredientSearchResult) => {
    if (!token) return
    if (result.kind === "saved") {
      onSelect(result)
      return
    }
    onSelect(await ingredientService.importFromUsda(token, result.fdcId))
  })

  return {
    results,
    search,
    isSearching,
    select,
    isSelecting,
    errorMessage: selectError ?? searchError,
  }
}

import { SEARCH_DEBOUNCE_MS } from "@/constants/app-constants"
import { useSession } from "@/context/session-provider"
import type { Ingredient } from "@/model/types/Ingredient"
import { ingredientService } from "@/services/ingredient-service"
import { getErrorMessage } from "@/utils/get-error-message"
import { useEffect, useState } from "react"

// Searches ingredients as the user types, once they stop for SEARCH_DEBOUNCE_MS.
// An empty text lists the first ingredients alphabetically
export function useIngredientSearch(text: string) {
  const { token } = useSession()
  const [results, setResults] = useState<Ingredient[]>([])
  const [isSearching, setIsSearching] = useState<boolean>(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    if (!token) return
    // Set to false when the text changes again, so a slow, older answer never replaces a newer one
    let isLatestSearch = true
    setIsSearching(true)

    const timer = setTimeout(() => {
      ingredientService
        .search(token, text)
        .then((ingredients) => {
          if (!isLatestSearch) return
          setResults(ingredients)
          setErrorMessage(null)
        })
        .catch((error) => {
          if (isLatestSearch) setErrorMessage(getErrorMessage(error))
        })
        .finally(() => {
          if (isLatestSearch) setIsSearching(false)
        })
    }, SEARCH_DEBOUNCE_MS)

    return () => {
      isLatestSearch = false
      clearTimeout(timer)
    }
  }, [token, text])

  return { results, isSearching, errorMessage }
}

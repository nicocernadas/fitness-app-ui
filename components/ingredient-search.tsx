import { useIngredientSearch } from "@/hooks/use-ingredient-search"
import type { IngredientSearchResult } from "@/model/types/IngredientSearchResult"
import { formatNutrients } from "@/utils/format-nutrients"
import { useState } from "react"
import { Pressable, Text, View } from "react-native"
import { FormInput } from "./form-input"
import { PrimaryButton } from "./primary-button"
import type { IngredientSearchProps } from "./types/IngredientSearch"

// A USDA result has no id until it's saved, so its key uses the USDA id
const resultKey = (result: IngredientSearchResult) =>
  result.kind === "saved" ? `saved-${result.id}` : `usda-${result.fdcId}`

// Step 1 of the add-entry modal: find the ingredient, or go create it
export function IngredientSearch({ onSelect, onCreateNew }: IngredientSearchProps) {
  const [text, setText] = useState<string>("")
  const { results, search, isSearching, select, isSelecting, errorMessage } =
    useIngredientSearch(onSelect)
  const hasNoResults = results?.length === 0 && !errorMessage

  return (
    <View className="gap-4">
      <Text className="text-2xl font-bold text-font-primary">Add ingredient</Text>

      <FormInput
        placeholder="e.g. rice cooked, chicken breast raw"
        value={text}
        onChangeText={setText}
        autoCorrect={false}
        autoFocus
        returnKeyType="search"
        onSubmitEditing={() => search(text)}
      />
      <PrimaryButton title="Search" onPress={() => search(text)} isLoading={isSearching} />

      {errorMessage && <Text className="text-red-600">{errorMessage}</Text>}
      {hasNoResults && <Text className="light-text">No ingredients found</Text>}

      {results?.map((result) => (
        <Pressable
          key={resultKey(result)}
          onPress={() => select(result)}
          disabled={isSelecting}
          className="gap-1 rounded-xl border border-input-border px-4 py-3"
        >
          <Text className="font-sans-semibold text-font-primary">{result.name}</Text>
          <Text className="extra-light-text text-sm">
            {formatNutrients(result)} per 100 g
          </Text>
        </Pressable>
      ))}

      <Pressable onPress={() => onCreateNew(text)}>
        <Text className="text-center text-font-primary underline">
          Not what you&apos;re looking for? Create it yourself!
        </Text>
      </Pressable>
    </View>
  )
}

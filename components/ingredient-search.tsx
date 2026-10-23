import { useIngredientSearch } from "@/hooks/use-ingredient-search"
import { formatNutrients } from "@/utils/format-nutrients"
import { useState } from "react"
import { Pressable, Text, View } from "react-native"
import { FormInput } from "./form-input"
import type { IngredientSearchProps } from "./types/IngredientSearch"

// Step 1 of the add-entry modal: find the ingredient, or go create it
export function IngredientSearch({ onSelect, onCreateNew }: IngredientSearchProps) {
  const [text, setText] = useState<string>("")
  const { results, isSearching, errorMessage } = useIngredientSearch(text)
  const hasNoResults = !isSearching && !errorMessage && results.length === 0

  return (
    <View className="gap-4">
      <Text className="text-2xl font-bold text-font-primary">Add ingredient</Text>

      <FormInput
        placeholder="Search, e.g. boiled rice"
        value={text}
        onChangeText={setText}
        autoCorrect={false}
        autoFocus
      />

      {errorMessage && <Text className="text-red-600">{errorMessage}</Text>}
      {hasNoResults && <Text className="light-text">No ingredients found</Text>}

      {results.map((ingredient) => (
        <Pressable
          key={ingredient.id}
          onPress={() => onSelect(ingredient)}
          className="gap-1 rounded-xl border border-input-border px-4 py-3"
        >
          <Text className="font-sans-semibold text-font-primary">{ingredient.name}</Text>
          <Text className="extra-light-text text-sm">
            {formatNutrients(ingredient)} per 100 g
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

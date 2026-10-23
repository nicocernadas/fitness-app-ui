import { useCurrentDay } from "@/context/current-day-provider"
import { useFormSubmit } from "@/hooks/use-form-submit"
import { NewDayEntry } from "@/model/NewDayEntry"
import { formatNutrients } from "@/utils/format-nutrients"
import { getNutrientsFor } from "@/utils/get-nutrients-for"
import { parseNumberInput } from "@/utils/parse-number-input"
import { useState } from "react"
import { Pressable, Text, View } from "react-native"
import { PrimaryButton } from "./primary-button"
import { TextField } from "./text-field"
import type { EntryGramsFormProps } from "./types/EntryGramsForm"

// Last step of the add-entry modal: how many grams, with a live preview of what they add
export function EntryGramsForm({ ingredient, onAdded, onChangeIngredient }: EntryGramsFormProps) {
  const { addEntry } = useCurrentDay()
  const [grams, setGrams] = useState<string>("")
  const gramsValue = parseNumberInput(grams)
  // From the ingredient's unrounded values, like the backend, so it matches what gets saved
  const preview = gramsValue > 0 ? getNutrientsFor(ingredient, gramsValue) : null

  const { submit, errorMessage, isSubmitting } = useFormSubmit(async () => {
    const entry = new NewDayEntry({ ingredientId: ingredient.id, grams: gramsValue })
    entry.validate()

    await addEntry(entry)
    onAdded()
  })

  return (
    <View className="gap-4">
      <Text className="text-2xl font-bold text-font-primary">{ingredient.name}</Text>
      <Text className="light-text">{formatNutrients(ingredient)} per 100 g</Text>

      <TextField
        label="How much did you eat?"
        inputType="number"
        unit="g"
        value={grams}
        onChangeText={setGrams}
        autoFocus
      />

      {preview && (
        <Text className="font-sans-semibold text-font-primary">
          Adds {formatNutrients(preview)}
        </Text>
      )}

      {errorMessage && <Text className="text-red-600">{errorMessage}</Text>}

      <PrimaryButton title="Add" onPress={submit} isLoading={isSubmitting} />
      <Pressable onPress={onChangeIngredient}>
        <Text className="text-center text-font-primary">Choose another ingredient</Text>
      </Pressable>
    </View>
  )
}

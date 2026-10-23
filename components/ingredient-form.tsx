import { INGREDIENT_NAME_DESCRIPTION } from "@/constants/field-descriptions"
import { useSession } from "@/context/session-provider"
import { useFormSubmit } from "@/hooks/use-form-submit"
import { NewIngredient } from "@/model/NewIngredient"
import { ingredientService } from "@/services/ingredient-service"
import { parseNumberInput } from "@/utils/parse-number-input"
import { useState } from "react"
import { Pressable, Text, View } from "react-native"
import { PrimaryButton } from "./primary-button"
import { TextField } from "./text-field"
import type { IngredientFormProps } from "./types/IngredientForm"

// Creates a private ingredient (only this user sees it), then hands it on to log its grams
export function IngredientForm({ initialName, onCreated, onCancel }: IngredientFormProps) {
  const { token } = useSession()
  const [name, setName] = useState<string>(initialName)
  const [calories, setCalories] = useState<string>("")
  const [proteins, setProteins] = useState<string>("")
  const [carbs, setCarbs] = useState<string>("")
  const [fats, setFats] = useState<string>("")

  const { submit, errorMessage, isSubmitting } = useFormSubmit(async () => {
    if (!token) return

    const newIngredient = new NewIngredient({
      name,
      calories: parseNumberInput(calories),
      proteins: parseNumberInput(proteins),
      carbs: parseNumberInput(carbs),
      fats: parseNumberInput(fats),
    })
    newIngredient.validate()

    onCreated(await ingredientService.create(token, newIngredient))
  })

  return (
    <View className="gap-4">
      <Text className="text-2xl font-bold text-font-primary">Create an ingredient</Text>
      <Text className="light-text">
        Use the values per 100 g from the label. Only you will see this ingredient.
      </Text>

      <TextField
        label="Name"
        description={INGREDIENT_NAME_DESCRIPTION}
        value={name}
        onChangeText={setName}
        autoCapitalize="sentences"
      />
      <TextField label="Calories" inputType="number" unit="kcal" value={calories} onChangeText={setCalories} />
      <TextField label="Proteins" inputType="number" unit="g" value={proteins} onChangeText={setProteins} />
      <TextField label="Carbs" inputType="number" unit="g" value={carbs} onChangeText={setCarbs} />
      <TextField label="Fats" inputType="number" unit="g" value={fats} onChangeText={setFats} />

      {errorMessage && <Text className="text-red-600">{errorMessage}</Text>}

      <PrimaryButton title="Create" onPress={submit} isLoading={isSubmitting} />
      <Pressable onPress={onCancel}>
        <Text className="text-center text-font-primary">Back to search</Text>
      </Pressable>
    </View>
  )
}

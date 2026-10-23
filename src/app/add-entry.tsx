import { EntryGramsForm } from "@/components/entry-grams-form"
import { IngredientForm } from "@/components/ingredient-form"
import { IngredientSearch } from "@/components/ingredient-search"
import { ScreenContainer } from "@/components/screen-container"
import type { AddEntryStep } from "@/components/types/AddEntryStep"
import { router } from "expo-router"
import { useState } from "react"
import { Pressable, Text } from "react-native"

// Opened as a modal from Meals (see the root _layout). The steps live in one screen instead of
// separate routes, so a newly created ingredient goes straight to the grams step
export default function AddEntryScreen() {
  const [step, setStep] = useState<AddEntryStep>({ name: "search" })
  const backToSearch = () => setStep({ name: "search" })

  return (
    <ScreenContainer contentClassName="gap-4">
      {step.name === "search" && (
        <IngredientSearch
          onSelect={(ingredient) => setStep({ name: "grams", ingredient })}
          onCreateNew={(searchText) => setStep({ name: "create", initialName: searchText })}
        />
      )}

      {step.name === "create" && (
        <IngredientForm
          initialName={step.initialName}
          onCreated={(ingredient) => setStep({ name: "grams", ingredient })}
          onCancel={backToSearch}
        />
      )}

      {step.name === "grams" && (
        <EntryGramsForm
          ingredient={step.ingredient}
          onAdded={() => router.back()}
          onChangeIngredient={backToSearch}
        />
      )}

      <Pressable onPress={() => router.back()}>
        <Text className="text-center text-font-primary">Cancel</Text>
      </Pressable>
    </ScreenContainer>
  )
}

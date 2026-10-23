import { DayEntryRow } from "@/components/day-entry-row"
import { PrimaryButton } from "@/components/primary-button"
import { ScreenContainer } from "@/components/screen-container"
import { useCurrentDay } from "@/context/current-day-provider"
import { useFormSubmit } from "@/hooks/use-form-submit"
import type { DayEntry } from "@/model/types/DayEntry"
import { router } from "expo-router"
import { Alert, Text } from "react-native"

const Meals = () => {
  const { day, loadError, deleteEntry } = useCurrentDay()
  const { submit: removeEntry, errorMessage: removeError } = useFormSubmit(deleteEntry)
  const entries = day?.entries ?? []

  function confirmRemove(entry: DayEntry) {
    Alert.alert(
      `Remove ${entry.ingredientName}?`,
      `${entry.grams} g · ${entry.calories} kcal will be taken off today's totals.`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Remove", style: "destructive", onPress: () => removeEntry(entry.id) },
      ],
    )
  }

  return (
    <ScreenContainer hasTabBar contentClassName="gap-4">
      <Text className="font-sans-bold text-4xl text-font-primary">Today</Text>

      <PrimaryButton title="Add ingredient" onPress={() => router.push("/add-entry")} />

      {day && entries.length === 0 && (
        <Text className="light-text">Nothing logged yet today</Text>
      )}

      {entries.map((entry) => (
        <DayEntryRow key={entry.id} entry={entry} onRemove={confirmRemove} />
      ))}

      {(removeError ?? loadError) && (
        <Text className="text-red-600">{removeError ?? loadError}</Text>
      )}
    </ScreenContainer>
  )
}

export default Meals

import { formatNutrients } from "@/utils/format-nutrients"
import { Pressable, Text, View } from "react-native"
import type { DayEntryRowProps } from "./types/DayEntryRow"

// One thing eaten today, in the Meals list
export function DayEntryRow({ entry, onRemove }: DayEntryRowProps) {
  return (
    <View className="flex-row items-center gap-3 rounded-xl border border-input-border px-4 py-3">
      <View className="flex-1 gap-1">
        <Text className="font-sans-semibold text-font-primary">
          {entry.ingredientName} · {entry.grams} g
        </Text>
        <Text className="extra-light-text text-sm">{formatNutrients(entry)}</Text>
      </View>
      <Pressable onPress={() => onRemove(entry)} hitSlop={8}>
        <Text className="text-red-600">Remove</Text>
      </Pressable>
    </View>
  )
}

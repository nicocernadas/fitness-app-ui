import clsx from "clsx"
import { Pressable, Text, View } from "react-native"
import type { SegmentedControlProps } from "./types/SegmentedControl"

// A row of buttons where exactly one is selected (marked in blue)
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  labels,
}: SegmentedControlProps<T>) {
  return (
    <View className="flex-row gap-3">
      {options.map((option) => {
        const isSelected = option === value
        return (
          <Pressable
            key={option}
            onPress={() => onChange(option)}
            accessibilityRole="button"
            accessibilityState={{ selected: isSelected }}
            className={clsx(
              "flex-1 items-center rounded-xl border py-3",
              isSelected ? "border-selected bg-selected" : "border-border",
            )}
          >
            <Text
              className={clsx(
                "font-sans-semibold",
                isSelected ? "text-on-selected" : "text-font-primary",
              )}
            >
              {labels?.[option] ?? option}
            </Text>
          </Pressable>
        )
      })}
    </View>
  )
}

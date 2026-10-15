import { Pressable, Text } from "react-native"
import type { PrimaryButtonProps } from "./types/PrimaryButton"

export function PrimaryButton({
  title,
  onPress,
  isLoading = false,
}: PrimaryButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={isLoading}
      className="items-center rounded-xl bg-button py-4"
    >
      <Text className="font-semibold text-button-text">
        {isLoading ? "Loading..." : title}
      </Text>
    </Pressable>
  )
}

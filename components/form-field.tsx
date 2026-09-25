import { Text, View } from "react-native"
import type { FormFieldProps } from "./types/FormField"
//! Never used directly, internal component for select-field and text-field
export function FormField({ label, description, children }: FormFieldProps) {
  return (
    <View className="gap-2">
      <Text className="font-sans-semibold text-font-primary">{label}</Text>
      {description && (
        <Text className="extra-light-text text-sm">{description}</Text>
      )}
      {children}
    </View>
  )
}

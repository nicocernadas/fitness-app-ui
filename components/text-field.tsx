import { sanitizeNumberInput } from "@/utils/sanitize-number-input"
import { Text, View } from "react-native"
import { FormField } from "./form-field"
import { FormInput } from "./form-input"
import type { TextFieldProps } from "./types/TextField"

export function TextField({
  label,
  inputType = "text",
  unit,
  onChangeText,
  ...inputProps
}: TextFieldProps) {
  const isNumber = inputType === "number"

  function handleChangeText(text: string) {
    onChangeText?.(isNumber ? sanitizeNumberInput(text) : text)
  }

  return (
    <FormField label={label}>
      <View className="flex-row items-center gap-3">
        <View className="flex-1">
          <FormInput
            keyboardType={isNumber ? "decimal-pad" : "default"}
            onChangeText={handleChangeText}
            {...inputProps}
          />
        </View>
        {unit && <Text className="font-sans-semibold text-font-primary">{unit}</Text>}
      </View>
    </FormField>
  )
}

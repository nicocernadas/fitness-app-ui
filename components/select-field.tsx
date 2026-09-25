import { Host, Picker } from "@expo/ui"
import { Text } from "react-native"
import { FormField } from "./form-field"
import type { SelectFieldProps } from "./types/SelectField"

export function SelectField<T extends string>({
  label,
  options,
  value,
  onChange,
  labels,
  description,
  optionDescriptions,
}: SelectFieldProps<T>) {
  const selectedOptionDescription = optionDescriptions?.[value]

  return (
    <FormField label={label} description={description}>
      <Host matchContents ignoreSafeArea="keyboard">
        <Picker selectedValue={value} onValueChange={onChange}>
          {options.map((option) => (
            <Picker.Item
              key={option}
              label={labels?.[option] ?? option}
              value={option}
            />
          ))}
        </Picker>
      </Host>
      {selectedOptionDescription && (
        <Text className="extra-light-text text-sm">
          {selectedOptionDescription}
        </Text>
      )}
    </FormField>
  )
}

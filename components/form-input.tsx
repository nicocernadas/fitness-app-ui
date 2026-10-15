import { TextInput, type TextInputProps } from "react-native"

export function FormInput(props: TextInputProps) {
  return (
    <TextInput
      className="rounded-xl border border-input-border px-4 py-3 text-[16px] text-font-primary"
      placeholderTextColor="#9CA3AF"
      {...props}
    />
  )
}

import { TextInput, type TextInputProps } from "react-native"

export function FormInput(props: TextInputProps) {
  return (
    <TextInput
      className="rounded-xl border border-gray-300 px-4 py-3 text-[16px]"
      placeholderTextColor="#9CA3AF"
      {...props}
    />
  )
}

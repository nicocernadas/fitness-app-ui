import type { TextInputProps } from "react-native"

export type TextFieldInputType = "text" | "number"

export type TextFieldProps = Omit<TextInputProps, "keyboardType"> & {
  label: string
  inputType?: TextFieldInputType
  unit?: string
}

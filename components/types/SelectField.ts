export type SelectFieldProps<T extends string> = {
  label: string
  options: readonly T[]
  value: T
  onChange: (value: T) => void
  labels?: Partial<Record<T, string>>
  description?: string
  optionDescriptions?: Partial<Record<T, string>>
}

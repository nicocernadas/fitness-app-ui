export type SegmentedControlProps<T extends string> = {
  options: readonly T[]
  value: T
  onChange: (value: T) => void
  labels?: Partial<Record<T, string>>
}

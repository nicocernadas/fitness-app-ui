// Small checks shared by the domain classes' validate() methods

export function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0
}

export function isPositiveNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value > 0
}

export function isEnumValue<T extends string>(
  enumObject: Record<string, T>,
  value: unknown,
): value is T {
  return Object.values(enumObject).includes(value as T)
}

// Keeps only digits and a single decimal point. Commas become points,
// because some iOS regions show "," on the decimal keyboard.
export function sanitizeNumberInput(text: string) {
  const digitsAndPoints = text.replace(/,/g, ".").replace(/[^0-9.]/g, "")
  const [whole, ...decimals] = digitsAndPoints.split(".")
  return decimals.length ? `${whole}.${decimals.join("")}` : whole
}

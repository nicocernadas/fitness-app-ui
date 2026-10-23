// Number("") is 0, which would let an empty field pass as a valid 0 g.
// An empty field becomes NaN instead, so validate() rejects it
export function parseNumberInput(text: string): number {
  return text.trim() === "" ? NaN : Number(text)
}

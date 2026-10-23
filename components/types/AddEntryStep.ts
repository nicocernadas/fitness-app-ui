import type { Ingredient } from "@/model/types/Ingredient"

// The add-entry modal's steps: search -> grams, or search -> create -> grams
export type AddEntryStep =
  | { name: "search" }
  | { name: "create"; initialName: string }
  | { name: "grams"; ingredient: Ingredient }

import { MAX_ENTRY_GRAMS } from "@/constants/nutrient-constants"
import { isPositiveInteger, isPositiveNumber } from "@/utils/validators"
import { ValidationError } from "./errors/ValidationError"
import type { NewDayEntryData } from "./types/NewDayEntryData"

// Grams of an ingredient to log in the current day (POST /days/current/entries).
// validate() mirrors the backend's NewDayEntry.validate()
export class NewDayEntry {
  ingredientId: number
  grams: number

  constructor(data: NewDayEntryData) {
    this.ingredientId = data.ingredientId
    this.grams = data.grams
  }

  // Throws a ValidationError on the first invalid field
  validate(): void {
    if (!isPositiveInteger(this.ingredientId)) {
      throw new ValidationError("Choose an ingredient")
    }
    if (!isPositiveNumber(this.grams)) {
      throw new ValidationError("Grams must be a number greater than 0")
    }
    if (this.grams > MAX_ENTRY_GRAMS) {
      throw new ValidationError(`Grams can't be more than ${MAX_ENTRY_GRAMS}`)
    }
  }
}

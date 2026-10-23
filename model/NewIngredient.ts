import {
  MAX_CALORIES_PER_BASE,
  MAX_INGREDIENT_NAME_LENGTH,
  NUTRIENT_BASE_GRAMS,
} from "@/constants/nutrient-constants"
import { isNonEmptyString, isNonNegativeNumber } from "@/utils/validators"
import { ValidationError } from "./errors/ValidationError"
import type { NewIngredientData } from "./types/NewIngredientData"

// An ingredient the user creates (POST /ingredients). Nutrients per 100 g. Only its creator sees it.
// validate() mirrors the backend's NewIngredient.validate()
export class NewIngredient {
  name: string
  calories: number
  proteins: number
  carbs: number
  fats: number

  constructor(data: NewIngredientData) {
    this.name = data.name.trim()
    this.calories = data.calories
    this.proteins = data.proteins
    this.carbs = data.carbs
    this.fats = data.fats
  }

  // Throws a ValidationError on the first invalid field
  validate(): void {
    if (!isNonEmptyString(this.name)) {
      throw new ValidationError("Name is required")
    }
    if (this.name.length > MAX_INGREDIENT_NAME_LENGTH) {
      throw new ValidationError(
        `Name can't be longer than ${MAX_INGREDIENT_NAME_LENGTH} characters`,
      )
    }
    if (!isNonNegativeNumber(this.calories)) {
      throw new ValidationError("Calories must be a number of 0 or more")
    }
    if (this.calories > MAX_CALORIES_PER_BASE) {
      throw new ValidationError(
        `Calories can't be more than ${MAX_CALORIES_PER_BASE} per ${NUTRIENT_BASE_GRAMS} g`,
      )
    }
    if (!isNonNegativeNumber(this.proteins)) {
      throw new ValidationError("Proteins must be a number of 0 or more")
    }
    if (!isNonNegativeNumber(this.carbs)) {
      throw new ValidationError("Carbs must be a number of 0 or more")
    }
    if (!isNonNegativeNumber(this.fats)) {
      throw new ValidationError("Fats must be a number of 0 or more")
    }
    // 100 g of food can't hold more than 100 g of macros
    if (this.proteins + this.carbs + this.fats > NUTRIENT_BASE_GRAMS) {
      throw new ValidationError(
        `Proteins, carbs and fats can't add up to more than ${NUTRIENT_BASE_GRAMS} g per ${NUTRIENT_BASE_GRAMS} g`,
      )
    }
  }
}

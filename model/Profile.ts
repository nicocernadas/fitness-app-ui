import { isEnumValue, isNonEmptyString, isPositiveNumber } from "@/utils/validators"
import { ActivityLevel } from "./enums/ActivityLevel"
import { Gender } from "./enums/Gender"
import { Neat } from "./enums/NeatLevel"
import { ValidationError } from "./errors/ValidationError"
import type { OnboardingProfile } from "./types/OnboardingProfile"

// The body data sent in onboarding step 1 (PATCH /users/onboarding).
// validate() mirrors the backend's Profile.validate()
export class Profile {
  name: string
  age: number
  gender: Gender
  weight: number
  height_cms: number
  activity_level: ActivityLevel
  daily_life_activity: Neat

  constructor(data: OnboardingProfile) {
    this.name = data.name.trim()
    this.age = data.age
    this.gender = data.gender
    this.weight = data.weight
    this.height_cms = data.height_cms
    this.activity_level = data.activity_level
    this.daily_life_activity = data.daily_life_activity
  }

  // Throws a ValidationError on the first invalid field
  validate(): void {
    if (!isNonEmptyString(this.name)) {
      throw new ValidationError("Name is required")
    }
    if (!isPositiveNumber(this.age) || !Number.isInteger(this.age)) {
      throw new ValidationError("Age must be a whole number greater than 0")
    }
    if (!isPositiveNumber(this.weight)) {
      throw new ValidationError("Weight must be a number greater than 0")
    }
    if (!isPositiveNumber(this.height_cms)) {
      throw new ValidationError("Height must be a number greater than 0")
    }
    if (!isEnumValue(Gender, this.gender)) {
      throw new ValidationError(
        `Gender must be one of: ${Object.values(Gender).join(", ")}`,
      )
    }
    if (!isEnumValue(ActivityLevel, this.activity_level)) {
      throw new ValidationError(
        `Activity level must be one of: ${Object.values(ActivityLevel).join(", ")}`,
      )
    }
    if (!isEnumValue(Neat, this.daily_life_activity)) {
      throw new ValidationError(
        `Neat level must be one of: ${Object.values(Neat).join(", ")}`,
      )
    }
  }
}

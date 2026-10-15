import type { ActivityLevel } from "../enums/ActivityLevel"
import type { Gender } from "../enums/Gender"
import type { Neat } from "../enums/NeatLevel"

// Body of PATCH /users/onboarding. Field names match the backend's OnboardingDTO
export type OnboardingProfile = {
  name: string
  age: number
  gender: Gender
  weight: number
  height_cms: number
  activity_level: ActivityLevel
  daily_life_activity: Neat
}

import { ActivityLevel } from "@/model/enums/ActivityLevel"
import { Neat } from "@/model/enums/NeatLevel"

// Texts shown under the onboarding dropdowns. Values match the ranges in annotations.txt

export const NEAT_DESCRIPTION =
  "Your everyday movement outside of workouts, based on how many steps you take on an average day."

export const NEAT_OPTION_DESCRIPTIONS: Record<Neat, string> = {
  [Neat.VERY_LOW]: "Fewer than 4,000 steps a day",
  [Neat.LOW]: "4,000 to 7,000 steps a day",
  [Neat.MODERATE]: "7,000 to 10,000 steps a day",
  [Neat.INTENSE]: "More than 10,000 steps a day",
}

export const ACTIVITY_LEVEL_DESCRIPTION =
  "How many days a week you exercise or train."

export const ACTIVITY_LEVEL_OPTION_DESCRIPTIONS: Record<ActivityLevel, string> = {
  [ActivityLevel.SEDENTARY]: "0 to 1 days a week",
  [ActivityLevel.LIGHT]: "1 to 3 days a week",
  [ActivityLevel.MODERATE]: "3 to 5 days a week",
  [ActivityLevel.INTENSE]: "6 to 7 days a week",
}

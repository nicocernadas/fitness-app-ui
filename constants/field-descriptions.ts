import { ActivityLevel } from "@/model/enums/ActivityLevel"
import { Neat } from "@/model/enums/NeatLevel"
import { Goal } from "@/model/types/Goal"
import { Pace } from "@/model/types/Pace"
import type { PacedGoal } from "@/model/types/PlanSelection"

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

export const GOAL_OPTION_DESCRIPTIONS: Record<Goal, string> = {
  [Goal.BUILD_MUSCLE]: "Eat a bit above your maintenance calories, with plenty of protein",
  [Goal.LOSE_FAT]: "Eat below your maintenance calories, keeping protein high to hold on to muscle",
  [Goal.MAINTAIN]: "Eat at your maintenance calories to keep your current weight",
}

export const PACE_DESCRIPTION = "How fast you want to get there."

export const PACE_OPTION_DESCRIPTIONS: Record<PacedGoal, Record<Pace, string>> = {
  [Goal.BUILD_MUSCLE]: {
    [Pace.GRADUAL]: "Slow, lean gains with the least fat on the way",
    [Pace.STEADY]: "A balance between gaining fast and staying lean",
    [Pace.FAST]: "The quickest gains, with some extra fat",
  },
  [Goal.LOSE_FAT]: {
    [Pace.GRADUAL]: "The easiest to stick to, and keeps the most muscle",
    [Pace.STEADY]: "Steady weekly progress",
    [Pace.FAST]: "The quickest results, but harder to sustain",
  },
}

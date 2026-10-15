import { TARGET_RANGE_TOLERANCE } from "@/constants/app-constants"

// Turns one plan target into the min/max range a RangeProgressBar needs
export function getTargetRange(target: number) {
  return {
    min: Math.round(target * (1 - TARGET_RANGE_TOLERANCE)),
    max: Math.round(target * (1 + TARGET_RANGE_TOLERANCE)),
  }
}

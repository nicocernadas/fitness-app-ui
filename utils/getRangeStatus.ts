import { OVER_TOLERANCE } from "@/constants/appConstants"
import { RangeStatus } from "@/model/types/rangeStatus"

export function getRangeStatus(
  current: number,
  min: number,
  max: number,
): RangeStatus {
  if (current < min) return "under"
  if (current <= max) return "onTarget"
  if (current <= max * (1 + OVER_TOLERANCE)) return "over"
  return "wayOver"
}

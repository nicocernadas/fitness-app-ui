import { RangeStatus } from "@/model/types/RangeStatus"
import { colors } from "./theme"

export const statusColors: Record<RangeStatus, string> = {
  under: colors.warning,
  onTarget: colors.success,
  over: colors.caution,
  wayOver: colors.danger,
}

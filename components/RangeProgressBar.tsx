import { useEffect } from "react"
import { Text, View } from "react-native"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"

import { colors } from "@/constants/theme"

type RangeProgressBarProps = {
  /** Text shown above the numbers, e.g. "Calories" or "Protein" */
  label: string
  /** How much has been consumed so far */
  current: number
  /** Lower end of the target range */
  min: number
  /** Upper end of the target range */
  max: number
  /** Optional unit shown after the numbers, e.g. "kcal" or "g" */
  unit?: string
}

// How far past `max` still counts as "a little over" (orange) before it turns red. 0.1 = 10%
const OVER_TOLERANCE = 0.1

// The full bar represents `max` plus this fraction, so there is room to show going over the range.
// 0.2 = the bar ends at 120% of `max`
const SCALE_EXTRA = 0.2

export type RangeStatus = "under" | "onTarget" | "over" | "wayOver"

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

const statusColors: Record<RangeStatus, string> = {
  under: colors.warning,
  onTarget: colors.success,
  over: colors.caution,
  wayOver: colors.danger,
}

// Converts a value into a 0–100 position on the bar, never going outside the bar
function toPercent(value: number, scaleMax: number) {
  if (scaleMax <= 0) return 0
  return Math.min(Math.max(value / scaleMax, 0), 1) * 100
}

export default function RangeProgressBar({
  label,
  current,
  min,
  max,
  unit,
}: RangeProgressBarProps) {
  const scaleMax = max * (1 + SCALE_EXTRA)

  const fillPercent = toPercent(current, scaleMax)
  const minPercent = toPercent(min, scaleMax)
  const maxPercent = toPercent(max, scaleMax)
  const fillColor = statusColors[getRangeStatus(current, min, max)]

  // Animated value for the fill width. It starts at 0 so the bar begins empty,
  // and slides to the new width every time `current` changes.
  const animatedPercent = useSharedValue(0)

  useEffect(() => {
    animatedPercent.value = withTiming(fillPercent, { duration: 500 })
  }, [fillPercent, animatedPercent])

  const fillStyle = useAnimatedStyle(() => ({
    width: `${animatedPercent.value}%`,
  }))

  const rangeText = min === max ? `${min}` : `${min}-${max}`

  return (
    <View>
      <Text className="light-text">{label}</Text>
      <Text className="font-sans-semibold text-font-primary">
        {Math.round(current)} / {rangeText}
        {unit ? ` ${unit}` : ""}
      </Text>

      {/* Track: the empty bar. overflow-hidden clips the fill to the rounded corners */}
      <View className="mt-2 h-4 overflow-hidden rounded-full bg-border">
        {/* Fill: drawn first so the markers render on top of it */}
        <Animated.View
          style={[
            { height: "100%", backgroundColor: fillColor },
            fillStyle,
          ]}
        />

        {/* Markers: thin lines at the start and end of the target range.
            marginLeft: -1 centers the 2px line on its position */}
        <View
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            width: 2,
            marginLeft: -1,
            left: `${minPercent}%`,
            backgroundColor: colors.fontPrimary,
          }}
        />
        <View
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            width: 2,
            marginLeft: -1,
            left: `${maxPercent}%`,
            backgroundColor: colors.fontPrimary,
          }}
        />
      </View>
    </View>
  )
}

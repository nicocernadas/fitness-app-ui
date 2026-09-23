import { useEffect } from "react"
import { Text, View } from "react-native"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"

import { SCALE_EXTRA } from "@/constants/app-constants"
import { statusColors } from "@/constants/status-colors"
import { colors } from "@/constants/theme"
import { RangeProgressBarProps } from "@/model/types/RangeProgProps"
import { getRangeStatus } from "@/utils/get-range-status"
import { toPercent } from "@/utils/to-percent"

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
          style={[{ height: "100%", backgroundColor: fillColor }, fillStyle]}
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
            backgroundColor: colors.gray,
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
            backgroundColor: colors.gray,
          }}
        />
      </View>
    </View>
  )
}

import { PrimaryButton } from "@/components/primary-button"
import RangeProgressBar from "@/components/range-progress-bar"
import { ScreenContainer } from "@/components/screen-container"
import { DAILY_METRICS } from "@/constants/daily-metrics"
import { useSession } from "@/context/session-provider"
import { useCurrentDay } from "@/hooks/use-current-day"
import { getTargetRange } from "@/utils/get-target-range"
import { Alert, Text, View } from "react-native"

export default function HomeScreen() {
  const { user } = useSession()
  const { day, startNewDay, isStartingNewDay, errorMessage } = useCurrentDay()
  // The (tabs) guard only lets in users with a plan, but the type still allows null
  const plan = user?.plan

  // Starting a new day can't be undone, so it asks first
  function confirmStartNewDay() {
    Alert.alert(
      "Start a new day?",
      "Today's totals will be saved, and every counter goes back to 0.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Start new day", onPress: () => startNewDay() },
      ],
    )
  }

  return (
    <ScreenContainer hasTabBar>
      <Text className="font-sans-bold text-4xl text-font-secondary">
        Hello,
      </Text>
      <Text className="font-sans-extrabold text-5xl text-font-primary">
        {user?.name}
      </Text>
      <Text className="light-text mb-7">What are we eating today?</Text>

      {plan &&
        DAILY_METRICS.map((metric) => {
          const { min, max } = getTargetRange(plan[metric.key])
          return (
            <View key={metric.key} className="mt-5">
              <RangeProgressBar
                label={metric.label}
                current={day?.[metric.key] ?? 0}
                min={min}
                max={max}
                unit={metric.unit}
              />
            </View>
          )
        })}

      {errorMessage && (
        <Text className="mt-5 text-red-600">{errorMessage}</Text>
      )}

      <View className="mt-10">
        <PrimaryButton
          title="Start new day"
          onPress={confirmStartNewDay}
          isLoading={isStartingNewDay}
        />
      </View>
    </ScreenContainer>
  )
}

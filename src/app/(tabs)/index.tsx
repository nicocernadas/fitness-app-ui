import RangeProgressBar from "@/components/range-progress-bar"
import { ScreenContainer } from "@/components/screen-container"
import "@/global.css"
import { useState } from "react"
import { Pressable, Text, View } from "react-native"
import { Calendar } from "react-native-calendars"

export default function App() {
  const [calories, setCalories] = useState(0)
  const [proteins, setProteins] = useState(0)
  const [carbs, setCarbs] = useState(0)
  const [fats, setFats] = useState(0)

  return (
    <ScreenContainer hasTabBar>
      <Text className="font-sans-bold text-4xl text-font-secondary">
        Welcome to
      </Text>
      <Text className="font-sans-extrabold text-7xl text-font-primary">
        Mealer
      </Text>
      <Text className="light-text mb-7">What are we eating today?</Text>

      <View className="rounded-2xl">
        <Calendar
          theme={{
            calendarBackground: "bg-background",
          }}
          onDayPress={(day) => {
            console.log("selected day", day)
          }}
          hideArrows={true}
          hideExtraDays={true}
          disableMonthChange={true}
          disableArrowLeft={true}
          disableArrowRight={true}
          renderHeader={(date) => {
            return (
              <Text className="extra-light-text text-xs mb-2">
                Swipe through the days to see your progress
              </Text>
            )
          }}
        />

        {/* Get all of these in a for loop */}

        <View className="mt-5">
          <RangeProgressBar
            label="Calories"
            current={calories}
            min={2000}
            max={2300}
            unit="kcal"
          />

          {/* TEMPORARY: test buttons until adding meals exists */}
          <View className="mt-3 flex-row gap-3">
            <Pressable onPress={() => setCalories((prev) => prev + 300)}>
              <Text className="light-text">+300 kcal</Text>
            </Pressable>
            <Pressable onPress={() => setCalories(0)}>
              <Text className="light-text">Reset</Text>
            </Pressable>
          </View>
        </View>

        <View className="mt-5">
          <RangeProgressBar
            label="Proteins"
            current={proteins}
            min={80}
            max={110}
            unit="g"
          />
        </View>

        <View className="mt-5">
          <RangeProgressBar
            label="Carbohydrates"
            current={carbs}
            min={100}
            max={150}
            unit="g"
          />
        </View>

        <View className="mt-5">
          <RangeProgressBar
            label="Fats"
            current={fats}
            min={60}
            max={90}
            unit="g"
          />
        </View>
      </View>
    </ScreenContainer>
  )
}

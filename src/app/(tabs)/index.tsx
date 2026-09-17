import "@/global.css"
import { styled } from "nativewind"
import { Text, View } from "react-native"
import { Calendar } from "react-native-calendars"
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context"

const SafeAreaView = styled(RNSafeAreaView)

export default function App() {
  return (
    <SafeAreaView className="flex-1 bg-background p-5 ">
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

        <View className="mt-5">
          <Text className="light-text">Calories</Text>
          <View className="border rounded-2xl h-10 mt-1">
            <View></View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

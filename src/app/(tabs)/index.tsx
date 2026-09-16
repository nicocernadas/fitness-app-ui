import "@/global.css"
import { styled } from "nativewind"
import { Text } from "react-native"
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context"

const SafeAreaView = styled(RNSafeAreaView)

export default function App() {
  return (
    <SafeAreaView className="flex-1 bg-background p-5 text-primary">
      <Text className="font-sans-bold text-4xl">Welcome to</Text>
      <Text className="font-sans-extrabold text-7xl">Mealer</Text>
    </SafeAreaView>
  )
}

import { PrimaryButton } from "@/components/primary-button"
import { useSession } from "@/context/session-provider"
import { Text, View } from "react-native"

export default function PersonalInfoScreen() {
  const { markProfileComplete } = useSession()

  return (
    <View className="flex-1 justify-center gap-4 bg-white px-6">
      <Text className="text-2xl font-bold">Personal Info</Text>
      <PrimaryButton title="Finish (temporary)" onPress={markProfileComplete} />
    </View>
  )
}

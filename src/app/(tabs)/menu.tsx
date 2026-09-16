import { styled } from "nativewind"
import { Text } from "react-native"
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context"

const SafeAreaView = styled(RNSafeAreaView)

const UserMenu = () => {
  return (
    <SafeAreaView className="flex-1 bg-background p-5">
      <Text className="font-sans-light">
        This is where the user can create her/his own courses
      </Text>
    </SafeAreaView>
  )
}

export default UserMenu

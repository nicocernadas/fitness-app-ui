import { ScreenContainer } from "@/components/screen-container"
import { Text } from "react-native"

const UserMenu = () => {
  return (
    <ScreenContainer hasTabBar>
      <Text className="font-sans-light">
        This is where the user can create her/his own courses
      </Text>
    </ScreenContainer>
  )
}

export default UserMenu

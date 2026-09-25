import { ScreenContainer } from "@/components/screen-container"
import { Text } from "react-native"

const Meals = () => {
  return (
    <ScreenContainer hasTabBar>
      <Text className="font-sans-light">
        This is where the user uploads what he/she ate
      </Text>
    </ScreenContainer>
  )
}

export default Meals

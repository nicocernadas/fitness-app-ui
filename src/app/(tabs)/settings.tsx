import { ScreenContainer } from "@/components/screen-container"
import { Text } from "react-native"

const Settings = () => {
  return (
    <ScreenContainer hasTabBar>
      <Text className="font-sans-light">This will be the Settings tab</Text>
    </ScreenContainer>
  )
}

export default Settings

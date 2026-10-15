import { PrimaryButton } from "@/components/primary-button"
import { ScreenContainer } from "@/components/screen-container"
import { SegmentedControl } from "@/components/segmented-control"
import { THEME_LABELS, THEMES } from "@/constants/theme"
import { useSession } from "@/context/session-provider"
import { useTheme } from "@/hooks/use-theme"
import { router } from "expo-router"
import { Text, View } from "react-native"

const Settings = () => {
  const { user, signOut } = useSession()
  const { theme, setTheme } = useTheme()
  const plan = user?.plan

  return (
    <ScreenContainer hasTabBar contentClassName="gap-6">
      <Text className="font-sans-bold text-4xl text-font-primary">
        Settings
      </Text>

      <SegmentedControl
        options={THEMES}
        value={theme}
        onChange={setTheme}
        labels={THEME_LABELS}
      />

      <View className="gap-3">
        {plan && (
          <Text className="light-text">
            Current plan: {plan.goal}
            {plan.pace ? ` · ${plan.pace}` : ""}
          </Text>
        )}
        <PrimaryButton
          title="Change plan"
          onPress={() => router.push("/edit-plan")}
        />
      </View>

      {/* signOut clears the token, and the root guard sends the user back to sign-in */}
      <PrimaryButton title="Log out" onPress={() => signOut()} />
    </ScreenContainer>
  )
}

export default Settings

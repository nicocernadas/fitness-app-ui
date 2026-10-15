import { tabs } from "@/constants/tabs"
import { components } from "@/constants/theme"
import { useTheme } from "@/hooks/use-theme"
import "@/global.css"
import clsx from "clsx"
import { Tabs } from "expo-router"
import { View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const tabBar = components.tabBar

const TabLayout = () => {
  const insets = useSafeAreaInsets()
  // tabBarStyle is a JS style prop, not a className, so it reads the JS colors
  const { colors } = useTheme()
  const TabIcon = ({ focused, icon: Icon }: TabIconProps) => {
    return (
      <View className="tabs-icon">
        <View
          className={clsx(
            "tabs-pill items-center justify-center",
            focused && "tabs-active",
          )}
        >
          <Icon width={24} height={24} color="white" />
        </View>
      </View>
    )
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: Math.max(insets.bottom, tabBar.horizontalInset),
          height: tabBar.height,
          marginHorizontal: tabBar.horizontalInset,
          borderRadius: tabBar.radius,
          backgroundColor: colors.tabBar,
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarItemStyle: {
          paddingVertical: tabBar.height / 2 - tabBar.iconFrame / 1.6,
        },
        tabBarIconStyle: {
          width: tabBar.iconFrame,
          height: tabBar.iconFrame,
        },
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={tab.icon} />
            ),
          }}
        />
      ))}
    </Tabs>
  )
}

export default TabLayout

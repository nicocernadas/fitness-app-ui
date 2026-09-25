import { components, spacing } from "@/constants/theme"
import clsx from "clsx"
import { styled } from "nativewind"
import { ScrollView } from "react-native"
import {
  SafeAreaView as RNSafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context"
import type { ScreenContainerProps } from "./types/ScreenContainer"

const SafeAreaView = styled(RNSafeAreaView)
const tabBar = components.tabBar

//! Every page goes inside this: safe area on top, scrollable content, and
//! tapping outside an input closes the keyboard.
//! The bottom inset is handled here instead of by SafeAreaView, so content
//! can scroll behind the floating tab bar.
export function ScreenContainer({
  hasTabBar = false,
  contentClassName,
  children,
}: ScreenContainerProps) {
  const insets = useSafeAreaInsets()
  const tabBarSpace = hasTabBar ? tabBar.height + tabBar.horizontalInset : 0
  const paddingBottom = insets.bottom + tabBarSpace + spacing[5]

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-background">
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerClassName={clsx("grow px-5 pt-5", contentClassName)}
        contentContainerStyle={{ paddingBottom }}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  )
}

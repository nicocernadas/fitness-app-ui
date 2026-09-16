import type { FC } from "react"
import type { SvgProps } from "react-native-svg"

declare global {
  interface TabIconProps {
    focused: boolean
    icon: FC<SvgProps>
  }
}

export { }


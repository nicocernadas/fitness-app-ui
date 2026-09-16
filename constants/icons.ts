import home from "@/assets/icons/home.svg"
import mealed from "@/assets/icons/mealed.svg"
import menu from "@/assets/icons/menu.svg"
import settings from "@/assets/icons/settings.svg"

export const icons = {
  home,
  mealed,
  menu,
  settings,
} as const

export type IconKey = keyof typeof icons

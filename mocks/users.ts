import { ActivityLevel } from "@/model/enums/activityLevel"
import { Gender } from "@/model/enums/gender"
import { NeatLevel } from "@/model/enums/neatLevel"
import { User } from "@/model/User"

export const carlos: User = {
  name: "Carlos Roberto",
  gender: Gender.MALE,
  weight: 72,
  height_cms: 168,
  activity_level: ActivityLevel.MODERATE,
  daily_life_activity: NeatLevel.VERY_LOW,
}

export const matilda: User = {
  name: "Carlos Roberto",
  gender: Gender.FEMALE,
  weight: 60,
  height_cms: 150,
  activity_level: ActivityLevel.MODERATE,
  daily_life_activity: NeatLevel.INTENSE,
}

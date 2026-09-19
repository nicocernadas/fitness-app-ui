import { ActivityLevel } from "./enums/activityLevel"
import { Gender } from "./enums/gender"
import { NeatLevel } from "./enums/neatLevel"

export class User {
  public name: string
  public age: number
  public gender: Gender
  public weight: number
  public height_cms: number
  public activity_level: ActivityLevel
  public daily_life_activity: NeatLevel

  constructor(
    name: string,
    age: number,
    gender: Gender,
    weight: number,
    height_cms: number,
    activity_level: ActivityLevel,
    daily_life_activity: NeatLevel,
  ) {
    this.name = name
    this.age = age
    this.gender = gender
    this.weight = weight
    this.height_cms = height_cms
    this.activity_level = activity_level
    this.daily_life_activity = daily_life_activity
  }
}

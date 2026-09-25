import { ActivityLevel } from "./enums/ActivityLevel"
import { Gender } from "./enums/Gender"
import { Neat } from "./enums/NeatLevel"

export class User {
  private id: number
  public name: string
  public age: number
  public gender: Gender
  public weight: number
  public height_cms: number
  public activity_level: ActivityLevel
  public daily_life_activity: Neat

  constructor(
    id: number,
    name: string,
    age: number,
    gender: Gender,
    weight: number,
    height_cms: number,
    activity_level: ActivityLevel,
    daily_life_activity: Neat,
  ) {
    this.id = id
    this.name = name
    this.age = age
    this.gender = gender
    this.weight = weight
    this.height_cms = height_cms
    this.activity_level = activity_level
    this.daily_life_activity = daily_life_activity
  }
}

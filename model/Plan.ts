import { Goal } from "./types/Goal"
import { Pace } from "./types/Pace"
import { User } from "./User"

//@ A user has 1 plan - which calculates all of the statistics
class Plan {
  private id: number
  private user: User
  private goal: Goal
  private pace: Pace

  constructor(id: number, user: User, goal: Goal, pace: Pace) {
    this.id = id
    this.user = user
    this.goal = goal
    this.pace = pace
  }
}

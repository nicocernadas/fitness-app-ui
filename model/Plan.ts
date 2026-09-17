import { User } from "./User"

class Plan {
  private user: User
  public calories: number = 0
  public proteins: number = 0
  public carbs: number = 0
  public fats: number = 0

  constructor(user: User) {
    this.user = user
  }

  // TODO: implement
  public calculateCalories(): number {
    return 1
  }

  public calculateProteins(): number {
    return 1
  }

  public calculateCarbs(): number {
    return 1
  }

  public calculateFats(): number {
    return 1
  }
}

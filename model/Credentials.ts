import { isNonEmptyString } from "@/utils/validators"
import { ValidationError } from "./errors/ValidationError"

// Email + password sent to POST /auth/login and /auth/register.
// validate() mirrors the backend's Credentials.validate()
export class Credentials {
  email: string
  password: string

  constructor(email: string, password: string) {
    this.email = email.trim()
    this.password = password
  }

  // Throws a ValidationError on the first invalid field
  validate(): void {
    if (!isNonEmptyString(this.email)) {
      throw new ValidationError("Email is required")
    }
    if (!isNonEmptyString(this.password)) {
      throw new ValidationError("Password is required")
    }
  }
}

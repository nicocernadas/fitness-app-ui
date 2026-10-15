// Thrown by a domain class's validate() when a field is invalid, before any request is sent.
// Its message is written for the user, so getErrorMessage shows it as is
export class ValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "ValidationError"
  }
}

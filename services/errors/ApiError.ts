export class ApiError extends Error {
  constructor(
    readonly status: number,
    readonly serverMessage: string | null,
    fallbackMessage: string,
  ) {
    super(serverMessage ?? fallbackMessage)
    this.name = "ApiError"
  }
}

import { ERROR_MESSAGES } from "@/constants/app-constants"
import { ApiError } from "@/services/errors/ApiError"
import { NetworkError } from "@/services/errors/NetworkError"

export function getErrorMessage(error: unknown): string {
  if (error instanceof NetworkError) return ERROR_MESSAGES.network
  if (error instanceof ApiError && error.status < 500 && error.serverMessage) {
    return error.serverMessage
  }
  return ERROR_MESSAGES.unexpected
}

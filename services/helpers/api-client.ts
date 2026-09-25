import { API_URL } from "@/constants/app-constants"
import { ApiError } from "../errors/ApiError"
import { NetworkError } from "../errors/NetworkError"

//@ Helper
export async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { "Content-type": "application/json", ...options.headers },
    // .catch only runs when the fetch promise rejects, and fetch rejects only when no response comes back at all
  }).catch(() => {
    throw new NetworkError()
  })

  if (!response.ok) {
    const body = await response.json().catch(() => null)
    const serverMessage =
      typeof body?.message === "string" ? body.message : null
    throw new ApiError(
      response.status,
      serverMessage,
      `${options.method ?? "GET"} ${path} failed: ${response.status}`,
    )
  }

  return response.json()
}

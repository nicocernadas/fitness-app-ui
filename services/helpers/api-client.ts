import { API_URL } from "@/constants/app-constants"

//@ Helper
export async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { "Content-type": "application/json", ...options.headers },
  })
  if (!response.ok) {
    throw new Error(
      `${options.method ?? "GET"} ${path} failed: ${response.status}`,
    )
  }
  return response.json()
}

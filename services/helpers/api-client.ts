import axios, { type AxiosRequestConfig } from "axios"
import { API_TIMEOUT_MS, API_URL } from "@/constants/app-constants"
import { ApiError } from "../errors/ApiError"
import { NetworkError } from "../errors/NetworkError"

// One instance for the whole app. Axios sends `data` as JSON and parses the response JSON by itself
const apiClient = axios.create({ baseURL: API_URL, timeout: API_TIMEOUT_MS })

//@ Helper
export async function apiRequest<T>(
  path: string,
  config: AxiosRequestConfig = {},
): Promise<T> {
  try {
    const response = await apiClient.request<T>({ ...config, url: path })
    return response.data
  } catch (error) {
    if (!axios.isAxiosError(error)) throw error

    // Axios rejects on any non-2xx status. No response at all means the server was never reached (or timed out)
    if (!error.response) throw new NetworkError()

    const body = error.response.data
    const serverMessage =
      typeof body?.message === "string" ? body.message : null
    throw new ApiError(
      error.response.status,
      serverMessage,
      `${config.method ?? "GET"} ${path} failed: ${error.response.status}`,
    )
  }
}

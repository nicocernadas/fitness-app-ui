// Used for progress bars
export const OVER_TOLERANCE = 0.1
// The full bar represents `max` plus this fraction, so there is room to show going over the range.
// 0.2 = the bar ends at 120% of `max`
export const SCALE_EXTRA = 0.2
// The plan gives one target per metric. The bars treat anything within this fraction of it as
// on target (green). 0.05 = ±5%. Display only: it doesn't change the plan's numbers.
// Set it to 0 to show the exact target instead of a range
export const TARGET_RANGE_TOLERANCE = 0.05
export const API_PORT = 3000
export const API_URL = `http://192.168.1.25:${API_PORT}`
// A request that gets no answer within this time fails with the network error message
export const API_TIMEOUT_MS = 10_000
export const ERROR_MESSAGES = {
  network: "Couldn't reach the server. Check your connection and try again",
  unexpected: "Something went wrong. Please try again later",
}

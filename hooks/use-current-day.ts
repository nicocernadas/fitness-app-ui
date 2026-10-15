import { useSession } from "@/context/session-provider"
import type { Day } from "@/model/types/Day"
import { dayService } from "@/services/day-service"
import { getErrorMessage } from "@/utils/get-error-message"
import { useEffect, useState } from "react"
import { useFormSubmit } from "./use-form-submit"

// Loads the day being tracked, and starts a new one on request
export function useCurrentDay() {
  const { token } = useSession()
  const [day, setDay] = useState<Day | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)

  useEffect(() => {
    if (!token) return
    dayService
      .fetchCurrentDay(token)
      .then(setDay)
      .catch((error) => setLoadError(getErrorMessage(error)))
  }, [token])

  const {
    submit: startNewDay,
    errorMessage: startError,
    isSubmitting: isStartingNewDay,
  } = useFormSubmit(async () => {
    if (!token) return
    setDay(await dayService.startNewDay(token))
  })

  return {
    day,
    startNewDay,
    isStartingNewDay,
    errorMessage: startError ?? loadError,
  }
}

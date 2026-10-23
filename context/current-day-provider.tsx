import type { CurrentDayContextValue } from "@/hooks/types/CurrentDay"
import type { NewDayEntry } from "@/model/NewDayEntry"
import type { Day } from "@/model/types/Day"
import { dayService } from "@/services/day-service"
import { getErrorMessage } from "@/utils/get-error-message"
import { createContext, use, useEffect, useState, type PropsWithChildren } from "react"
import { useSession } from "./session-provider"

const CurrentDayContext = createContext<CurrentDayContextValue | null>(null)

export function useCurrentDay() {
  const value = use(CurrentDayContext)
  if (!value) {
    throw new Error("useCurrentDay must be used inside <CurrentDayProvider>")
  }
  return value
}

// One copy of the current day for the whole app. Home, Meals and the add-entry modal read it,
// so logging something in the modal updates the Home bars too (the tabs stay mounted).
// The actions throw on failure, so screens run them through useFormSubmit
export function CurrentDayProvider({ children }: PropsWithChildren) {
  const { token, user } = useSession()
  const [day, setDay] = useState<Day | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  // Days are tracked once onboarding is finished. Signing out turns it false and clears the day
  const canTrackDays = !!token && !!user?.isProfileComplete && !!user?.plan

  useEffect(() => {
    setDay(null)
    setLoadError(null)
    if (!token || !canTrackDays) return
    dayService
      .fetchCurrentDay(token)
      .then(setDay)
      .catch((error) => setLoadError(getErrorMessage(error)))
  }, [token, canTrackDays])

  async function startNewDay() {
    if (!token) return
    setDay(await dayService.startNewDay(token))
  }

  async function addEntry(entry: NewDayEntry) {
    if (!token) return
    setDay(await dayService.addEntry(token, entry))
  }

  async function deleteEntry(entryId: number) {
    if (!token) return
    setDay(await dayService.deleteEntry(token, entryId))
  }

  return (
    <CurrentDayContext value={{ day, loadError, startNewDay, addEntry, deleteEntry }}>
      {children}
    </CurrentDayContext>
  )
}

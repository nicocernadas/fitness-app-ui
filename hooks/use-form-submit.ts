import { getErrorMessage } from "@/utils/get-error-message"
import { useState } from "react"

// Runs a form's async action and tracks its loading and error state,
// so every screen doesn't repeat the same try/catch/finally.
export function useFormSubmit(action: () => Promise<void>) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  async function submit() {
    setErrorMessage(null)
    setIsSubmitting(true)
    try {
      await action()
    } catch (error) {
      setErrorMessage(getErrorMessage(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  return { submit, errorMessage, isSubmitting }
}

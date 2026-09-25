import { FormInput } from "@/components/form-input"
import { PrimaryButton } from "@/components/primary-button"
import { ScreenContainer } from "@/components/screen-container"
import { useSession } from "@/context/session-provider"
import { authService } from "@/services/auth-service"
import { getErrorMessage } from "@/utils/get-error-message"
import { router } from "expo-router"
import { useState } from "react"
import { Pressable, Text } from "react-native"

export default function SignUpScreen() {
  const { signIn } = useSession()
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  async function handleSignUp() {
    setErrorMessage(null)
    setIsSubmitting(true)
    try {
      const { token, user } = await authService.register(email, password)
      await signIn(token, user)
    } catch (error) {
      setErrorMessage(getErrorMessage(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <ScreenContainer contentClassName="justify-center gap-4">
      <Text className="text-3xl font-bold">Create account</Text>

      <FormInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
        autoComplete="email"
      />

      <FormInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        textContentType="newPassword"
        autoComplete="new-password"
      />

      {errorMessage && <Text className="text-red-600">{errorMessage}</Text>}

      <PrimaryButton
        title="Create account"
        onPress={handleSignUp}
        isLoading={isSubmitting}
      />

      <Pressable onPress={() => router.back()}>
        <Text className="text-center">Already have an account? Sign In</Text>
      </Pressable>
    </ScreenContainer>
  )
}

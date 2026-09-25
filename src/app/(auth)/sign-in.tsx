import { FormInput } from "@/components/form-input"
import { PrimaryButton } from "@/components/primary-button"
import { useSession } from "@/context/session-provider"
import { authService } from "@/services/auth-service"
import { getErrorMessage } from "@/utils/get-error-message"
import { router } from "expo-router"
import { useState } from "react"
import { Pressable, Text, View } from "react-native"

export default function SignInScreen() {
  const { signIn } = useSession()
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  async function handleSignIn() {
    setErrorMessage(null)
    setIsSubmitting(true)
    try {
      const { token, user } = await authService.login(email, password)
      await signIn(token, user.isProfileComplete)
    } catch (error) {
      setErrorMessage(getErrorMessage(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <View className="flex-1 justify-center gap-4 bg-white px-6">
      <Text className="text-3xl font-bold">Sign In</Text>

      <FormInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <FormInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        textContentType="password"
        autoComplete="current-password"
      />

      {errorMessage && <Text className="text-red-600">{errorMessage}</Text>}

      <PrimaryButton
        title="Sign In"
        onPress={handleSignIn}
        isLoading={isSubmitting}
      />

      <Pressable onPress={() => router.push("/sign-up")}>
        <Text className="text-center">Don't have an account? Sign Up!</Text>
      </Pressable>
    </View>
  )
}

import { FormInput } from "@/components/form-input"
import { PrimaryButton } from "@/components/primary-button"
import { ScreenContainer } from "@/components/screen-container"
import { useSession } from "@/context/session-provider"
import { useFormSubmit } from "@/hooks/use-form-submit"
import { Credentials } from "@/model/Credentials"
import { authService } from "@/services/auth-service"
import { router } from "expo-router"
import { useState } from "react"
import { Pressable, Text } from "react-native"

export default function SignUpScreen() {
  const { signIn } = useSession()
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const {
    submit: handleSignUp,
    errorMessage,
    isSubmitting,
  } = useFormSubmit(async () => {
    const credentials = new Credentials(email, password)
    credentials.validate()

    const { token, user } = await authService.register(credentials)
    await signIn(token, user)
  })

  return (
    <ScreenContainer contentClassName="justify-center gap-4">
      <Text className="text-3xl font-bold text-font-primary">Create account</Text>

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
        <Text className="text-center text-font-primary">Already have an account? Sign In</Text>
      </Pressable>
    </ScreenContainer>
  )
}

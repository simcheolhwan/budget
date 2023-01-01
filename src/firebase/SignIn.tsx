import { signInWithEmailAndPassword } from "firebase/auth"
import { Box, Button, PasswordInput, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { auth } from "./config"
import translate from "./translate"

const SignIn = () => {
  const { getInputProps, onSubmit } = useForm({ initialValues: { email: "", password: "" } })

  const submit = onSubmit(async ({ email, password }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      alert(error)
    }
  })

  return (
    <Box component="form" onSubmit={submit} sx={{ maxWidth: 400 }} mx="auto" my="xl">
      <TextInput label={translate("email")} {...getInputProps("email")} required />
      <PasswordInput label={translate("password")} {...getInputProps("password")} required mt="md" />
      <Button type="submit" mt="md">
        {translate("sign in")}
      </Button>
    </Box>
  )
}

export default SignIn

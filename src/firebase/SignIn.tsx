import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { AppShell, Button, Container, PasswordInput, Stack, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { auth } from "./config"

const SignIn = () => {
  const { getInputProps, onSubmit } = useForm({ initialValues: { email: "", password: "" } })
  const [submitting, setSubmitting] = useState(false)

  const submit = onSubmit(async ({ email, password }) => {
    setSubmitting(true)

    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      alert(error)
    }

    setSubmitting(false)
  })

  return (
    <AppShell>
      <Container size="xs">
        <form onSubmit={submit}>
          <Stack>
            <TextInput label="이메일" {...getInputProps("email")} required />
            <PasswordInput label="비밀번호" {...getInputProps("password")} required />
            <Button type="submit" color="blue" loading={submitting}>
              로그인
            </Button>
          </Stack>
        </form>
      </Container>
    </AppShell>
  )
}

export default SignIn

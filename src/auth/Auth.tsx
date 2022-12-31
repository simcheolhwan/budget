import { PropsWithChildren, useEffect, useState } from "react"
import { auth } from "../firebase"
import SignIn from "./SignIn"

const Auth = ({ children }: PropsWithChildren) => {
  const [authenticated, setAuthenticated] = useState<boolean>()

  useEffect(() => {
    auth.onAuthStateChanged((user) => setAuthenticated(!!user))
  }, [])

  if (typeof authenticated !== "boolean") return null
  if (!authenticated) return <SignIn />
  return <>{children}</>
}

export default Auth

import { PropsWithChildren, useEffect } from "react"
import { useRecoilState } from "recoil"
import { onValue, ref } from "firebase/database"
import { db } from "./config"
import { databaseState } from "./data"

const Database = ({ children }: PropsWithChildren) => {
  const [database, setDatabase] = useRecoilState(databaseState)

  useEffect(() => {
    onValue(ref(db), (snapshot) => setDatabase(snapshot.val()))
  }, [setDatabase])

  if (!database) return null
  return <>{children}</>
}

export default Database

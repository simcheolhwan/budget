import { PropsWithChildren, useEffect } from "react"
import { atom, useRecoilState, useRecoilValue } from "recoil"
import { onValue, ref } from "firebase/database"
import { db } from "./config"

const databaseState = atom<Database | undefined>({
  key: "database",
  default: undefined,
})

export const useDatabase = () => {
  const database = useRecoilValue(databaseState)
  if (!database) throw new Error("Database is not loaded")
  return database
}

const Database = ({ children }: PropsWithChildren) => {
  const [database, setDatabase] = useRecoilState(databaseState)

  useEffect(() => {
    onValue(ref(db), (snapshot) => setDatabase(snapshot.val()))
  }, [setDatabase])

  if (!database) return null
  return <>{children}</>
}

export default Database

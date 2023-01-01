import { atom, useRecoilValue } from "recoil"

export const databaseState = atom<Database | undefined>({
  key: "database",
  default: undefined,
})

export const useDatabase = () => {
  const database = useRecoilValue(databaseState)
  if (!database) throw new Error("Database is not loaded")
  return database
}

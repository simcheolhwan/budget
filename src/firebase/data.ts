import { atom, useRecoilValue } from "recoil"

/* database */
export const databaseState = atom<Database | undefined>({
  key: "database",
  default: undefined,
})

export const useDatabase = () => {
  const database = useRecoilValue(databaseState)
  if (!database) throw new Error("Database is not loaded")
  return database
}

/* date */
const now = new Date()
export const thisYear = now.getFullYear()
export const thisMonth = now.getMonth() + 1
export const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

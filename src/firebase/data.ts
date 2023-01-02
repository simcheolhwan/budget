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

export const yearState = atom({
  key: "year",
  default: thisYear,
})

export const useYear = () => {
  return useRecoilValue(yearState)
}

export const monthState = atom({
  key: "month",
  default: thisMonth,
})

export const useMonth = () => {
  return useRecoilValue(monthState)
}

import { useDatabase } from "../firebase/data"

/* balance */
export const useBalance = () => {
  const { balance } = useDatabase()
  return balance
}

export const useBank = () => {
  const { bank } = useBalance()
  return bank
}

export const useReceivable = () => {
  const { receivable } = useBalance()
  return receivable
}

export const useCustody = () => {
  const { custody } = useBalance()
  return custody
}

/* annual */
const date = new Date()
export const thisYear = date.getFullYear()
export const thisMonth = date.getMonth()

export const useThisYearData = () => {
  const { annual } = useDatabase()
  return annual[String(thisYear)]
}

export const useIncome = () => {
  const { income } = useThisYearData()
  return income
}

export const useExpense = () => {
  const { expense } = useThisYearData()
  return expense
}

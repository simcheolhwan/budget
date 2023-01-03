import { useDatabase, useYear } from "../firebase/data"

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
export const useAnnual = () => {
  const { annual } = useDatabase()
  return annual
}

export const useYearData = () => {
  const annual = useAnnual()
  const year = useYear()
  return annual[String(year)]
}

export const useIncome = () => {
  const { income } = useYearData()
  return income
}

export const useExpense = () => {
  const { expense } = useYearData()
  return expense
}

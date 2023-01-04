import { sum } from "ramda"
import { thisYear } from "./data"
import { useBalance, useYear } from "./read"

export const useBalanceError = () => {
  const { bank, receivable, custody } = useBalance()
  const { income, expense } = useYear(thisYear)

  const totalBank = sum(bank.map(({ amount }) => amount))
  const totalReceivable = sum(receivable.map(({ amount }) => amount))
  const totalCustody = sum(custody.map(({ amount }) => amount))
  const totalIncome = sum(income.map(({ amount }) => amount))
  const totalExpense = sum(expense.map(({ amount }) => amount))

  return totalBank + totalReceivable - totalCustody - (totalIncome - totalExpense)
}

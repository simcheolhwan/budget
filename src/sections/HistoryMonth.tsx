import { Table, Text } from "@mantine/core"
import { useThisYearData } from "../firebase/read"

const HistoryMonth = ({ month }: { month: number }) => {
  const { income, expense } = useThisYearData()

  const incomeThisMonth = income.filter((item) => item.month === month)
  const expenseThisMonth = expense.filter((item) => item.month === month)

  if (incomeThisMonth.length === 0 && expenseThisMonth.length === 0) return null

  const getRows = (list: Item[], sign: "+" | "-") => {
    return list.map((item) => (
      <tr key={JSON.stringify(item)}>
        <td>
          {item.category} {item.name}
        </td>
        <Text component="td" align="right" color={{ "+": "green", "-": "red" }[sign]}>
          {sign} {item.amount.toLocaleString()}
        </Text>
      </tr>
    ))
  }

  return (
    <Table withBorder>
      <caption>{month}월</caption>
      <tbody>
        {getRows(incomeThisMonth, "+")}
        {getRows(expenseThisMonth, "-")}
      </tbody>
    </Table>
  )
}

export default HistoryMonth

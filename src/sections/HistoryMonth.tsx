import { Badge, Group, Table, Text } from "@mantine/core"
import { useYearData } from "../firebase/read"

const HistoryMonth = ({ month }: { month: number }) => {
  const { income, expense } = useYearData()

  const incomeMonth = income.filter((item) => item.month === month)
  const expenseMonth = expense.filter((item) => item.month === month)

  if (incomeMonth.length === 0 && expenseMonth.length === 0) return null

  const getRows = (list: Item[], sign: "+" | "-") => {
    return list.map((item) => {
      const { category, name, amount } = item
      return (
        <tr key={JSON.stringify(item)}>
          <td>
            <Group>
              {category && (
                <Badge variant="light" color="gray" radius="xs">
                  {category}
                </Badge>
              )}
              {name}
            </Group>
          </td>
          <Text component="td" align="right" color={{ "+": "green", "-": "red" }[sign]}>
            {sign} {amount.toLocaleString()}
          </Text>
        </tr>
      )
    })
  }

  return (
    <Table withBorder>
      <caption>{month}월</caption>
      <tbody>
        {getRows(incomeMonth, "+")}
        {getRows(expenseMonth, "-")}
      </tbody>
    </Table>
  )
}

export default HistoryMonth

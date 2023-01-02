import { Group, Table, Text } from "@mantine/core"
import { openModal } from "@mantine/modals"
import { useYearData } from "../firebase/read"
import { ListController } from "../firebase/write"
import AddButton from "./AddButton"
import DeleteButton from "./DeleteButton"
import SetItemForm from "./SetItemForm"

const HistoryItemTable = ({ month }: { month: number }) => {
  const { income, expense } = useYearData()

  const incomeMonth = income.filter((item) => item.month === month)
  const expenseMonth = expense.filter((item) => item.month === month)

  if (incomeMonth.length === 0 && expenseMonth.length === 0) return null

  const getRows = (list: Item[], listKey: ListKey) => {
    return list.map((item) => {
      const { month, category = "", name, amount } = item

      const color = { income: "green", expense: "red" }[listKey]
      const sign = { income: "+", expense: "-" }[listKey]

      const list = new ListController(listKey)

      const open = () =>
        openModal({
          title: (
            <DeleteButton title={name} onDelete={() => list.deleteItem(item)}>
              {name}
            </DeleteButton>
          ),
          children: <SetItemForm listKey={listKey} initial={item} />,
        })

      return (
        <tr onClick={open} key={String(month) + category + name}>
          <td>
            <Text color="dimmed">{category}</Text>
          </td>

          <td>{name}</td>

          <td align="right">
            <Text color={color}>
              {sign} {amount.toLocaleString()}
            </Text>
          </td>
        </tr>
      )
    })
  }

  return (
    <Table>
      <caption>
        <Group position="apart">
          {month}월
          <Group spacing={0}>
            <AddButton title="수입">
              <SetItemForm listKey="income" />
            </AddButton>
            <AddButton title="지출" minus>
              <SetItemForm listKey="expense" />
            </AddButton>
          </Group>
        </Group>
      </caption>

      <tbody>
        {getRows(incomeMonth, "income")}
        {getRows(expenseMonth, "expense")}
      </tbody>
    </Table>
  )
}

export default HistoryItemTable

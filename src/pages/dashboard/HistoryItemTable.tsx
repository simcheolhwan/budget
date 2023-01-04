import { Group, Table, Text } from "@mantine/core"
import { openModal } from "@mantine/modals"
import { thisYear } from "../../firebase/data"
import { ListController } from "../../firebase/write"
import AddButton from "./AddButton"
import DeleteButton from "./DeleteButton"
import SetItemForm from "./SetItemForm"

const HistoryItemTable = ({ title, list, listKey }: { title: string; list: Item[]; listKey: ListKey }) => {
  const year = thisYear

  const renderAmount = (amount: number) => {
    if (!amount) return <Text color="dimmed">0</Text>
    if (listKey === "income") return <Text color="green">+ {amount.toLocaleString()}</Text>
    if (amount < 0) return <Text color="green">+ {Math.abs(amount).toLocaleString()}</Text>
    return <Text color="red">- {amount.toLocaleString()}</Text>
  }

  const rows = list.map((item) => {
    const { amount, category, name, memo } = item

    const list = new ListController(listKey)

    const open = () =>
      openModal({
        title: (
          <DeleteButton title={name ?? category ?? ""} onDelete={() => list.deleteItem(item)}>
            {name}
          </DeleteButton>
        ),
        children: <SetItemForm year={year} listKey={listKey} initial={item} />,
      })

    return (
      <tr onClick={open} key={JSON.stringify(item)}>
        <td>{category && <Text color="dimmed">{category}</Text>}</td>

        <td>
          <Group>
            {name}
            {memo && (
              <Text size="xs" color="dimmed">
                {memo}
              </Text>
            )}
          </Group>
        </td>

        <td align="right">{renderAmount(amount)}</td>
      </tr>
    )
  })

  return (
    <Table>
      <caption>
        <Group position="apart">
          {title}
          <AddButton title={title} minus={listKey === "expense"}>
            <SetItemForm year={year} listKey={listKey} />
          </AddButton>
        </Group>
      </caption>

      <tbody>{rows}</tbody>
    </Table>
  )
}

export default HistoryItemTable

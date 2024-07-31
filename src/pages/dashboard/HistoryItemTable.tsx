import { Group, Menu, Table, Text } from "@mantine/core"
import { openModal } from "@mantine/modals"
import { promptNumber } from "../../data/utils"
import { useBalanceError } from "../../firebase/calc"
import { ListController } from "../../firebase/write"
import { useViewYearMonth } from "./viewMonth"
import AddButton from "./AddButton"
import DeleteButton from "./DeleteButton"
import SetItemForm from "./SetItemForm"

const HistoryItemTable = ({ title, list, listKey }: { title: string; list: Item[]; listKey: ListKey }) => {
  const { year } = useViewYearMonth()
  const balanceError = useBalanceError()

  const rows = list.map((item) => {
    const { amount, category, name, memo } = item

    const list = new ListController(listKey, year)
    const title = name ?? category ?? ""

    const open = () => {
      openModal({
        title: (
          <DeleteButton title={title} onDelete={() => list.deleteItem(item)}>
            {name}
          </DeleteButton>
        ),
        children: <SetItemForm year={year} listKey={listKey} initial={item} />,
      })
    }

    const edit = () => {
      promptNumber(title, amount, async (amount) => list.updateItem(item, { amount }))
    }

    const auto = () => {
      const result = { income: amount + balanceError, expense: amount - balanceError }[listKey]
      list.updateItem(item, { amount: result })
    }

    return (
      <Table.Tr key={JSON.stringify(item)}>
        <Table.Td width={80} onClick={open}>
          {category && <Text c="dimmed">{category}</Text>}
        </Table.Td>

        <Table.Td onClick={open}>
          <Group>
            {name}
            {memo && (
              <Text c="dimmed" fz="xs">
                {memo}
              </Text>
            )}
          </Group>
        </Table.Td>

        <Table.Td align="right">
          {balanceError ? (
            <Menu>
              <Menu.Target>
                <Text>{amount.toLocaleString()}</Text>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item onClick={edit}>편집</Menu.Item>
                <Menu.Item onClick={auto}>자동</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          ) : (
            <Text onClick={edit}>{amount.toLocaleString()}</Text>
          )}
        </Table.Td>
      </Table.Tr>
    )
  })

  return (
    <Table>
      <Table.Caption>
        <Group justify="space-between">
          {title}
          <AddButton title={title} minus={listKey === "expense"}>
            <SetItemForm year={year} listKey={listKey} />
          </AddButton>
        </Group>
      </Table.Caption>

      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  )
}

export default HistoryItemTable

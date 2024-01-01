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
      <tr key={JSON.stringify(item)}>
        <td width={80} onClick={open}>
          {category && <Text color="dimmed">{category}</Text>}
        </td>

        <td onClick={open}>
          <Group>
            {name}
            {memo && (
              <Text size="xs" color="dimmed">
                {memo}
              </Text>
            )}
          </Group>
        </td>

        <td align="right">
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
        </td>
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

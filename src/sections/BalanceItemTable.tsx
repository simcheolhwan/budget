import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { Box, Group, Table, Text, useMantineTheme } from "@mantine/core"
import { openModal } from "@mantine/modals"
import { uniq } from "ramda"
import { useBalance } from "../firebase/read"
import { BalanceController } from "../firebase/write"
import AddButton from "./AddButton"
import DeleteButton from "./DeleteButton"
import SetAccountForm from "./SetAccountForm"

interface Props {
  title: string
  balanceKey: BalanceKey
}

const BalanceItemTable = ({ title, balanceKey }: Props) => {
  const { colors } = useMantineTheme()
  const balance = useBalance()
  const accounts = balance[balanceKey]

  const categories = uniq(accounts.map(({ category }) => category).filter(Boolean))
  const hasCategory = categories.length > 0

  const rows = accounts.map((account, index) => {
    const { category = "", name, amount } = account

    const categoryIndex = categories.indexOf(category)
    const color = ["red", "green", "orange", "cyan", "gray"][categoryIndex]

    const balance = new BalanceController(balanceKey)

    const open = () =>
      openModal({
        title: (
          <DeleteButton title={name} onDelete={() => balance.deleteAccount(account)}>
            {name}
          </DeleteButton>
        ),
        children: <SetAccountForm balanceKey={balanceKey} initial={account} />,
      })

    const id = [category, name].filter(Boolean).join(" ")

    return (
      <Draggable index={index} draggableId={id} key={id}>
        {(provided) => (
          <tr {...provided.draggableProps} ref={provided.innerRef}>
            {hasCategory && (
              <td {...provided.dragHandleProps}>
                <Text color={colors[color]?.[3]} size="sm">
                  {category}
                </Text>
              </td>
            )}

            <td onClick={open}>{name}</td>

            <td align="right">{amount.toLocaleString()}</td>
          </tr>
        )}
      </Draggable>
    )
  })

  return (
    <Box>
      <DragDropContext onDragEnd={({ destination, source }) => console.log({ from: source.index, to: destination?.index || 0 })}>
        <Table>
          <caption>
            <Group position="apart">
              {title}
              <AddButton title={title}>
                <SetAccountForm balanceKey={balanceKey} />
              </AddButton>
            </Group>
          </caption>

          <Droppable droppableId={balanceKey} direction="vertical">
            {(provided) => (
              <tbody {...provided.droppableProps} ref={provided.innerRef}>
                {rows}
                {provided.placeholder}
              </tbody>
            )}
          </Droppable>
        </Table>
      </DragDropContext>
    </Box>
  )
}

export default BalanceItemTable

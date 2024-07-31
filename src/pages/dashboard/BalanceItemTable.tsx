import { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { IconGripVertical } from "@tabler/icons-react"
import { Box, Flex, Group, Menu, Table, Text, useMantineTheme } from "@mantine/core"
import { openModal } from "@mantine/modals"
import { uniq } from "ramda"
import { useBalanceError } from "../../firebase/calc"
import { useBalance } from "../../firebase/read"
import { BalanceController } from "../../firebase/write"
import { reorder } from "../../firebase/sort"
import { promptNumber } from "../../data/utils"
import AddButton from "./AddButton"
import DeleteButton from "./DeleteButton"
import SetAccountForm from "./SetAccountForm"

interface Props {
  title: string
  balanceKey: BalanceKey
}

const BalanceItemTable = ({ title, balanceKey }: Props) => {
  const { colors } = useMantineTheme()
  const balanceError = useBalanceError()
  const balance = useBalance()
  const balanceController = new BalanceController(balanceKey)
  const accounts = balance[balanceKey] ?? []

  const categories = uniq(accounts.map(({ category }) => category).filter(Boolean))
  const hasCategory = categories.length > 0
  const [showDragHandle, setShowDragHandle] = useState(false)

  const rows = accounts.map((account, index) => {
    const { category = "", name, amount } = account

    const categoryIndex = categories.indexOf(category)
    const color = ["red", "green", "orange", "cyan", "grape", "teal", "yellow", "indigo", "gray"][categoryIndex]

    const open = () => {
      openModal({
        title: (
          <DeleteButton title={name} onDelete={() => balanceController.deleteAccount(account)}>
            {name}
          </DeleteButton>
        ),
        children: <SetAccountForm balanceKey={balanceKey} initial={account} />,
      })
    }

    const edit = () => {
      promptNumber(title, amount, async (amount) => balanceController.updateAccount(account, { amount }))
    }

    const auto = () => {
      const next = balanceKey === "custody" ? amount + balanceError : amount - balanceError
      balanceController.updateAccount(account, { amount: next })
    }

    return (
      <Draggable index={index} draggableId={JSON.stringify(account)} key={JSON.stringify(account)}>
        {(provided) => (
          <Table.Tr ref={provided.innerRef} {...provided.draggableProps}>
            <Table.Td {...provided.dragHandleProps} hidden={!showDragHandle}>
              <Flex>
                <IconGripVertical size="1rem" stroke={1.5} />
              </Flex>
            </Table.Td>

            {hasCategory && (
              <Table.Td onClick={open}>
                <Text c={colors[color]?.[3]} fz="sm">
                  {category}
                </Text>
              </Table.Td>
            )}

            <Table.Td onClick={open}>{name}</Table.Td>

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
        )}
      </Draggable>
    )
  })

  return (
    <Box>
      <DragDropContext
        onDragEnd={({ destination, source }) =>
          balanceController.update(reorder(accounts, { from: source.index, to: destination?.index || 0 }))
        }
      >
        <Table>
          <Table.Caption>
            <Group justify="space-between">
              <Text onClick={() => setShowDragHandle((value) => !value)}>{title}</Text>
              <AddButton title={title}>
                <SetAccountForm balanceKey={balanceKey} />
              </AddButton>
            </Group>
          </Table.Caption>

          <Droppable droppableId="dnd-list" direction="vertical">
            {(provided) => (
              <Table.Tbody {...provided.droppableProps} ref={provided.innerRef}>
                {rows}
                {provided.placeholder}
              </Table.Tbody>
            )}
          </Droppable>
        </Table>
      </DragDropContext>
    </Box>
  )
}

export default BalanceItemTable

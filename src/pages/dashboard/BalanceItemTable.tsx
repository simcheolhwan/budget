import { Box, Group, Menu, Table, Text, useMantineTheme } from "@mantine/core"
import { openModal } from "@mantine/modals"
import { uniq } from "ramda"
import { useBalanceError } from "../../firebase/calc"
import { useBalance } from "../../firebase/read"
import { BalanceController } from "../../firebase/write"
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
  const accounts = balance[balanceKey] ?? []

  const categories = uniq(accounts.map(({ category }) => category).filter(Boolean))
  const hasCategory = categories.length > 0

  const rows = accounts.map((account) => {
    const { category = "", name, amount } = account

    const index = categories.indexOf(category)
    const color = ["red", "green", "orange", "cyan", "gray"][index]

    const balance = new BalanceController(balanceKey)

    const open = () => {
      openModal({
        title: (
          <DeleteButton title={name} onDelete={() => balance.deleteAccount(account)}>
            {name}
          </DeleteButton>
        ),
        children: <SetAccountForm balanceKey={balanceKey} initial={account} />,
      })
    }

    const edit = () => {
      promptNumber(title, amount, async (amount) => balance.updateAccount(account, { amount }))
    }

    const auto = () => {
      const next = balanceKey === "custody" ? amount + balanceError : amount - balanceError
      balance.updateAccount(account, { amount: next })
    }

    return (
      <tr key={JSON.stringify(account)}>
        {hasCategory && (
          <td onClick={open}>
            <Text color={colors[color]?.[3]} size="sm">
              {category}
            </Text>
          </td>
        )}

        <td onClick={open}>{name}</td>

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
    <Box>
      <Table>
        <caption>
          <Group position="apart">
            {title}
            <AddButton title={title}>
              <SetAccountForm balanceKey={balanceKey} />
            </AddButton>
          </Group>
        </caption>

        <tbody>{rows}</tbody>
      </Table>
    </Box>
  )
}

export default BalanceItemTable

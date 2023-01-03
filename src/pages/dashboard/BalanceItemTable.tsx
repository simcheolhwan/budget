import { Box, Group, Table, Text, useMantineTheme } from "@mantine/core"
import { openModal } from "@mantine/modals"
import { uniq } from "ramda"
import { useBalance } from "../../firebase/read"
import { BalanceController } from "../../firebase/write"
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

  const rows = accounts.map((account) => {
    const { category = "", name, amount } = account

    const index = categories.indexOf(category)
    const color = ["red", "green", "orange", "cyan", "gray"][index]

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

    return (
      <tr onClick={open} key={JSON.stringify(account)}>
        {hasCategory && (
          <td>
            <Text color={colors[color]?.[3]} size="sm">
              {category}
            </Text>
          </td>
        )}

        <td>{name}</td>

        <td align="right">{amount.toLocaleString()}</td>
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

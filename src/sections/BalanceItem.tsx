import { Box, Table, Text, useMantineTheme } from "@mantine/core"
import { uniq } from "ramda"

interface Props {
  title: string
  accounts: Account[]
}

const BalanceItem = ({ title, accounts }: Props) => {
  const { colors } = useMantineTheme()

  const categories = uniq(accounts.map(({ category }) => category).filter(Boolean))
  const hasCategory = categories.length > 0

  const rows = accounts.map(({ category, name, amount }) => {
    const index = categories.indexOf(category)
    const color = [colors.red, colors.green, colors.gray][index]?.[3]

    return (
      <tr key={name}>
        {hasCategory && (
          <Text component="td" color={color}>
            {category}
          </Text>
        )}
        <td>{name}</td>
        <Text component="td" align="right">
          {amount.toLocaleString()}
        </Text>
      </tr>
    )
  })

  return (
    <Box>
      <Table withBorder>
        <caption>{title}</caption>
        <tbody>{rows}</tbody>
      </Table>
    </Box>
  )
}

export default BalanceItem

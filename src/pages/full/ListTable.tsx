import { Group, Table, Text } from "@mantine/core"
import { sum } from "ramda"
import { useFilter } from "./Filter"

interface Props {
  caption?: string
  list: Item[]
  onRowClick?: (item: Item) => void
}

const ListTable = ({ caption, list, onRowClick }: Props) => {
  const { groupKey } = useFilter()

  if (!list.length) return null

  return (
    <Table>
      {caption && <Table.Caption>{caption}</Table.Caption>}

      <thead>
        <Table.Tr>
          {groupKey !== "month" && <Table.Th>월</Table.Th>}
          {groupKey !== "category" && <Table.Th>분류</Table.Th>}
          <Table.Th>이름</Table.Th>
          <Table.Th>
            <Text ta="right">{sum(list.map(({ amount }) => amount)).toLocaleString()}</Text>
          </Table.Th>
        </Table.Tr>
      </thead>

      <Table.Tbody>
        {list.map((item) => {
          const { month, category, name, memo, amount } = item
          return (
            <Table.Tr onClick={() => onRowClick?.(item)} key={JSON.stringify(item)}>
              {groupKey !== "month" && <Table.Td style={{ width: "3rem" }}>{month}</Table.Td>}
              {groupKey !== "category" && <Table.Td style={{ width: "5rem" }}>{category}</Table.Td>}

              <Table.Td>
                <Group>
                  {name}
                  <Text c="dimmed" fz="xs">
                    {memo}
                  </Text>
                </Group>
              </Table.Td>

              <Table.Td align="right">{amount.toLocaleString()}</Table.Td>
            </Table.Tr>
          )
        })}
      </Table.Tbody>
    </Table>
  )
}

export default ListTable

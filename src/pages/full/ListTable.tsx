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
      {caption && <caption>{caption}</caption>}

      <thead>
        <tr>
          {groupKey !== "month" && <th>월</th>}
          {groupKey !== "category" && <th>분류</th>}
          <th>이름</th>
          <th>
            <Text align="right">{sum(list.map(({ amount }) => amount)).toLocaleString()}</Text>
          </th>
        </tr>
      </thead>

      <tbody>
        {list.map((item) => {
          const { month, category, name, memo, amount } = item
          return (
            <tr onClick={() => onRowClick?.(item)} key={JSON.stringify(item)}>
              {groupKey !== "month" && <td style={{ width: "3rem" }}>{month}</td>}
              {groupKey !== "category" && <td style={{ width: "5rem" }}>{category}</td>}

              <td>
                <Group>
                  {name}
                  <Text size="xs" color="dimmed">
                    {memo}
                  </Text>
                </Group>
              </td>

              <td align="right">{amount.toLocaleString()}</td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}

export default ListTable

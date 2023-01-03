import { Box, Group, Table, Text } from "@mantine/core"
import { openModal } from "@mantine/modals"
import { sum } from "ramda"
import { useAnnual } from "../../firebase/read"
import EditList from "./EditList"

const ListTable = ({ year, listKey }: { year: number; listKey: ListKey }) => {
  const annual = useAnnual()
  const list = annual[year][listKey]

  return (
    <Box onClick={() => openModal({ children: <EditList year={year} listKey={listKey} /> })}>
      <Table>
        <thead>
          <tr>
            <th>월</th>
            <th>분류</th>
            <th>이름</th>
            <th>{sum(list.map(({ amount }) => amount)).toLocaleString()}</th>
          </tr>
        </thead>

        <tbody>
          {list.map((item) => {
            const { month, category, name, memo, amount } = item
            return (
              <tr key={JSON.stringify(item)}>
                <td>{month}</td>
                <td>{category}</td>
                <td>
                  <Group>
                    {name}
                    <Text color="dimmed">{memo}</Text>
                  </Group>
                </td>
                <td align="right">{amount.toLocaleString()}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </Box>
  )
}

export default ListTable

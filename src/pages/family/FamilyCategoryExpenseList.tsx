import { Box, Group, Text } from "@mantine/core"

const FamilyCategoryExpenseList = ({ list }: { list: FamilyExpenseItem[] }) => {
  return (
    <Box fz="xs">
      {list.map(({ month, amount, name, memo }, index) => (
        <Group justify="space-between" key={index}>
          <Group gap="xs">
            <Text>{month}월</Text>
            {(name || memo) && (
              <Text>
                {name} {memo && <Text span>({memo})</Text>}
              </Text>
            )}
          </Group>

          <Text style={{ fontFeatureSettings: `"tnum"` }}>{amount}</Text>
        </Group>
      ))}
    </Box>
  )
}

export default FamilyCategoryExpenseList

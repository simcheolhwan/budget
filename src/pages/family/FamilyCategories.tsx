import { Group, Stack, Text } from "@mantine/core"
import { useFamilyBudget, useFamilyCategories, useFamilyExpenses } from "../../firebase/read"
import FamilyCategoryCard from "./FamilyCategoryCard"
import { thisYear } from "../../firebase/data"
import { evolve, multiply, prop, sum } from "ramda"
import { getSpentText } from "./format"

const FamilyCategories = () => {
  const budget = useFamilyBudget()
  const { annual, monthly } = useFamilyCategories()
  const expenses = useFamilyExpenses(thisYear)
  const totalBudget = sum([...annual, ...monthly.map(evolve({ budget: multiply(12) }))].map(prop("budget")))
  const totalSpent = sum(Object.values(expenses).map((items) => sum(items.map(prop("amount")))))

  const renderList = (list: FamilyCategoryItem[], monthly?: boolean) => {
    return list.map((item) => <FamilyCategoryCard {...item} monthly={monthly} key={item.name} />)
  }

  const spentText = getSpentText(totalSpent, totalBudget)

  return (
    <Stack gap="xs" pos="relative">
      <Group gap="xs" justify="flex-end" fz="sm" pos="absolute" right={0} top={0}>
        {budget} → {spentText.balance}
        <Text c="dimmed" fz="xs">
          {spentText.ratio}
        </Text>
      </Group>

      <Text fw="bold">연간</Text>
      {renderList(annual)}

      <Text fw="bold">월간</Text>
      {renderList(monthly, true)}
    </Stack>
  )
}

export default FamilyCategories

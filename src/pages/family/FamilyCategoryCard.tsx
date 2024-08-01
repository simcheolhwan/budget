import { prop, sum, uniq } from "ramda"
import { useMemo } from "react"
import { Badge, Group, HoverCard, Paper, Text } from "@mantine/core"
import { thisYear } from "../../firebase/data"
import { useFamilyCategories, useFamilyExpenses } from "../../firebase/read"
import { getSpentText } from "./format"
import FamilyCategoryExpenseList from "./FamilyCategoryExpenseList"

interface Props extends FamilyCategoryItem {
  monthly?: boolean
}

const COLORS = ["red", "pink", "grape", "violet", "indigo", "blue", "cyan", "teal", "green", "lime", "yellow", "orange"]

const FamilyCategoryCard = ({ tag, name, description, period, budget, ratio, monthly }: Props) => {
  const tags = useTags()

  const ratioText = useMemo(() => {
    if (!ratio) return null
    if (typeof ratio === "number") return `${ratio * 100}%`
    const { min, max } = ratio
    return `${min * 100}-${max * 100}%`
  }, [ratio])

  const { [name]: expenses = [] } = useFamilyExpenses(thisYear)
  const spent = sum(expenses.map(prop("amount")))
  const annualBudget = monthly ? budget * 12 : budget
  const spentText = getSpentText(spent, annualBudget)

  return (
    <Paper p="xs" fz="sm" withBorder>
      <Group justify="space-between">
        <Group gap="xs">
          <Group>
            {tag && <Badge color={COLORS[tags.indexOf(tag)]}>{tag}</Badge>}
            <Text>{name}</Text>
          </Group>

          {(ratioText || period || description) && (
            <Text c="dimmed" fz="xs">
              {[ratioText, period, description].filter(Boolean).join(" | ")}
            </Text>
          )}
        </Group>

        <Group gap="xs">
          <HoverCard position="right">
            <HoverCard.Target>
              <Text>{spentText.balance}</Text>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <FamilyCategoryExpenseList list={expenses} />
            </HoverCard.Dropdown>
          </HoverCard>

          <Text c="dimmed" fz="xs">
            {spentText.ratio}
          </Text>
        </Group>
      </Group>
    </Paper>
  )
}

export default FamilyCategoryCard

function useTags() {
  const { annual, monthly } = useFamilyCategories()
  return useMemo(() => {
    return uniq([...annual, ...monthly].map(prop("tag")))
  }, [annual, monthly])
}

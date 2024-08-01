import { prop, sum } from "ramda"
import { useCallback, useMemo } from "react"
import { HoverCard, Table, Text } from "@mantine/core"
import { modals } from "@mantine/modals"
import { promptNumber } from "../../data/utils"
import { months, thisYear } from "../../firebase/data"
import { useFamilyCategories, useFamilyExpenses } from "../../firebase/read"
import { FamilyExpensesController } from "../../firebase/write"
import FamilyCategoryExpenseList from "./FamilyCategoryExpenseList"
import FamilyCategoryExpenses from "./FamilyCategoryExpenses"

const FamilyMonthly = () => {
  const { annual, monthly } = useFamilyCategories()
  const expenses = useFamilyExpenses(thisYear)

  const mapExpenses = useCallback(
    (categories: FamilyCategoryItem[], month: number, monthly?: boolean) =>
      categories.flatMap(({ name: category }) => {
        const list = expenses[category] ?? []
        return list.filter((item) => item.month === month).map((item) => ({ category, ...item, monthly }))
      }),
    [expenses],
  )

  const findExpensesByMonth = useCallback(
    (month: number) => {
      const annualExpenses = mapExpenses(annual, month)
      const monthlyExpenses = mapExpenses(monthly, month, true)
      return [...annualExpenses, ...monthlyExpenses]
    },
    [annual, mapExpenses, monthly],
  )

  const expensesByMonth = useMemo(() => {
    return Object.fromEntries(months.map((month) => [month, findExpensesByMonth(month)]))
  }, [findExpensesByMonth])

  const findExpenses = useCallback(
    (month: number, category: string) => {
      return expensesByMonth[month].filter((item) => item.category === category)
    },
    [expensesByMonth],
  )

  const renderRows = (categories: FamilyCategoryItem[], monthly?: boolean) => {
    return categories.map(({ name: categoryName }) => (
      <Table.Tr key={categoryName}>
        <Table.Th ta="center">
          <Text
            onClick={() =>
              modals.open({
                title: categoryName,
                children: <FamilyCategoryExpenses name={categoryName} list={expenses[categoryName]} />,
                size: "lg",
              })
            }
          >
            {categoryName}
          </Text>
        </Table.Th>

        {months.map((month) => {
          const expenses = findExpenses(month, categoryName)
          const total = sum(expenses.map(prop("amount")))

          const handleClick = () => {
            if (monthly) {
              promptNumber(`${month}월 ${categoryName}`, total, (input) =>
                new FamilyExpensesController(categoryName).setMonthExpense(month, input),
              )
            }
          }

          return (
            <Table.Td key={month}>
              <HoverCard position="top" disabled={monthly || !total}>
                <HoverCard.Target>
                  <Text c={total === 0 ? "dimmed" : undefined} onClick={handleClick}>
                    {total}
                  </Text>
                </HoverCard.Target>

                <HoverCard.Dropdown>
                  <FamilyCategoryExpenseList list={expenses} />
                </HoverCard.Dropdown>
              </HoverCard>
            </Table.Td>
          )
        })}
      </Table.Tr>
    ))
  }

  return (
    <Table ta="center">
      <Table.Thead>
        <Table.Tr>
          <Table.Th></Table.Th>
          {months.map((month) => (
            <Table.Th ta="center" key={month}>
              {month}월
            </Table.Th>
          ))}
        </Table.Tr>
      </Table.Thead>

      <Table.Tbody>
        <Table.Tr>
          <Table.Th ta="center">합계</Table.Th>
          {months.map((month) => (
            <Table.Td key={month}>{sum(expensesByMonth[month].map(prop("amount")))}</Table.Td>
          ))}
        </Table.Tr>

        {renderRows(annual)}
        {renderRows(monthly, true)}
      </Table.Tbody>
    </Table>
  )
}

export default FamilyMonthly

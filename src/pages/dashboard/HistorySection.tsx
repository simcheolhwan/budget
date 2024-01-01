import { Flex, Stack } from "@mantine/core"
import { useList } from "../../firebase/read"
import { useViewYearMonth } from "./viewMonth"
import HistoryItemTable from "./HistoryItemTable"
import HistoryFooter from "./HistoryFooter"

const HistorySection = () => {
  const { year, month } = useViewYearMonth()

  const income = useList("income", { year, month })
  const expense = useList("expense", { year, month })

  return (
    <Stack justify="space-between" h="100%">
      <Flex gap="md" direction={!income.length && expense.length ? "column-reverse" : "column"}>
        <HistoryItemTable title="수입" list={income} listKey="income" />
        <HistoryItemTable title="지출" list={expense} listKey="expense" />
      </Flex>

      <HistoryFooter />
    </Stack>
  )
}

export default HistorySection

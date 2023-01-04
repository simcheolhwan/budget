import { Flex } from "@mantine/core"
import { thisMonth, thisYear } from "../../firebase/data"
import { useList } from "../../firebase/read"
import HistoryItemTable from "./HistoryItemTable"

const HistorySection = () => {
  const year = thisYear
  const month = thisMonth

  const income = useList("income", { year, month })
  const expense = useList("expense", { year, month })

  return (
    <Flex gap="md" direction={!income.length && expense.length ? "column-reverse" : "column"}>
      <HistoryItemTable title="수입" list={income} listKey="income" />
      <HistoryItemTable title="지출" list={expense} listKey="expense" />
    </Flex>
  )
}

export default HistorySection

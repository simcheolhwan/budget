import { useState } from "react"
import { Button, Flex } from "@mantine/core"
import { thisMonth, thisYear } from "../../firebase/data"
import { useList } from "../../firebase/read"
import HistoryItemTable from "./HistoryItemTable"

const HistorySection = () => {
  const [viewLastMonth, setViewLastMonth] = useState(false)

  const year = thisYear
  const month = viewLastMonth ? thisMonth - 1 : thisMonth

  const income = useList("income", { year, month })
  const expense = useList("expense", { year, month })

  return (
    <Flex gap="md" direction={!income.length && expense.length ? "column-reverse" : "column"}>
      <HistoryItemTable title="수입" list={income} listKey="income" />
      <HistoryItemTable title="지출" list={expense} listKey="expense" />

      {!income.length && !expense.length && (
        <Button onClick={() => setViewLastMonth(true)} variant="outline" size="xs" color="gray">
          지난 달 보기
        </Button>
      )}

      {viewLastMonth && (
        <Button onClick={() => setViewLastMonth(false)} variant="outline" size="xs" color="gray">
          이번 달 보기
        </Button>
      )}
    </Flex>
  )
}

export default HistorySection

import { Stack } from "@mantine/core"
import HistoryItemTable from "./HistoryItemTable"

const HistorySection = () => {
  return (
    <Stack>
      <HistoryItemTable title="수입" listKey="income" />
      <HistoryItemTable title="지출" listKey="expense" />
    </Stack>
  )
}

export default HistorySection

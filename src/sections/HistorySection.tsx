import { Stack } from "@mantine/core"
import HistoryMonth from "./HistoryMonth"

const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

const HistorySection = () => {
  return (
    <Stack>
      {MONTHS.map((month) => (
        <HistoryMonth month={month} key={month} />
      ))}
    </Stack>
  )
}

export default HistorySection

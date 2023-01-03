import { Button, Group, Stack } from "@mantine/core"
import { useRecoilState } from "recoil"
import { months, thisYear, yearState } from "../../firebase/data"
import HistoryItemTable from "./HistoryItemTable"

const HistorySection = () => {
  const [year, setYear] = useRecoilState(yearState)

  return (
    <Stack>
      {months.map((month) => (
        <HistoryItemTable month={month} key={month} />
      ))}

      {import.meta.env.DEV && (
        <Group>
          {year === thisYear && (
            <Button onClick={() => setYear(year - 1)} variant="outline" color="gray" compact>
              작년 보기
            </Button>
          )}
        </Group>
      )}
    </Stack>
  )
}

export default HistorySection

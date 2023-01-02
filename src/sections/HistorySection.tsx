import { Button, Group, Stack } from "@mantine/core"
import { useRecoilState } from "recoil"
import { thisYear, yearState } from "../firebase/data"
import HistoryMonth from "./HistoryMonth"

const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

const HistorySection = () => {
  const [year, setYear] = useRecoilState(yearState)

  return (
    <Stack>
      {MONTHS.map((month) => (
        <HistoryMonth month={month} key={month} />
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

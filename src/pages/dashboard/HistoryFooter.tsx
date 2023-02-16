import { useRecoilState } from "recoil"
import { Group, Text, UnstyledButton } from "@mantine/core"
import { useYearBalance } from "../../firebase/calc"
import { viewLastMonthState } from "./HistorySection"

const HistoryFooter = () => {
  const [viewLastMonth, setViewLastMonth] = useRecoilState(viewLastMonthState)
  const yearBalance = useYearBalance()

  return (
    <Group position="apart">
      {viewLastMonth ? (
        <UnstyledButton onClick={() => setViewLastMonth(false)} c="dimmed" fz="xs">
          이번 달 보기
        </UnstyledButton>
      ) : (
        <UnstyledButton onClick={() => setViewLastMonth(true)} c="dimmed" fz="xs">
          지난 달 보기
        </UnstyledButton>
      )}

      <Text size="xs" color="dimmed" align="right">
        잔고 {yearBalance.toLocaleString()}
      </Text>
    </Group>
  )
}

export default HistoryFooter

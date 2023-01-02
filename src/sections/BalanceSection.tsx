import { Stack } from "@mantine/core"
import { useDatabase } from "../firebase/data"
import BalanceError from "./BalanceError"
import BalanceItem from "./BalanceItem"

const BalanceSection = () => {
  const { balance } = useDatabase()
  const { bank, custody, receivable } = balance

  return (
    <Stack>
      <BalanceError />
      <BalanceItem title="은행" accounts={bank} />
      <BalanceItem title="미수" accounts={receivable} />
      <BalanceItem title="예치" accounts={custody} />
    </Stack>
  )
}

export default BalanceSection

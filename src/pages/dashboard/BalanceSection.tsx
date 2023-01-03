import { Stack } from "@mantine/core"
import BalanceError from "./BalanceError"
import BalanceItemTable from "./BalanceItemTable"

const BalanceSection = () => {
  return (
    <Stack>
      <BalanceError />
      <BalanceItemTable title="은행" balanceKey="bank" />
      <BalanceItemTable title="미수" balanceKey="receivable" />
      <BalanceItemTable title="예치" balanceKey="custody" />
    </Stack>
  )
}

export default BalanceSection

import { Stack } from "@mantine/core"
import { useDatabase } from "../firebase/Database"
import translate from "../translate"
import BalanceItem from "./BalanceItem"

const BalanceSection = () => {
  const { balance } = useDatabase()
  const { bank, custody, receivable } = balance

  return (
    <Stack>
      <BalanceItem title={translate("bank")} accounts={bank} />
      <BalanceItem title={translate("receivable")} accounts={receivable} />
      <BalanceItem title={translate("custody")} accounts={custody} />
    </Stack>
  )
}

export default BalanceSection

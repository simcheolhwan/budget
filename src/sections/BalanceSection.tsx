import { Stack } from "@mantine/core"
import { useDatabase } from "../firebase/data"
import translate from "../firebase/translate"
import BalanceError from "./BalanceError"
import BalanceItem from "./BalanceItem"

const BalanceSection = () => {
  const { balance } = useDatabase()
  const { bank, custody, receivable } = balance

  return (
    <Stack>
      <BalanceError />
      <BalanceItem title={translate("bank")} accounts={bank} />
      <BalanceItem title={translate("receivable")} accounts={receivable} />
      <BalanceItem title={translate("custody")} accounts={custody} />
    </Stack>
  )
}

export default BalanceSection

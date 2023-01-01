import { Alert } from "@mantine/core"
import { useBalanceError } from "../firebase/calc"

const BalanceError = () => {
  const balanceError = useBalanceError()
  if (!balanceError) return null

  const excessive = balanceError > 0
  const title = excessive ? "잔고 초과" : "잔고 부족"
  const color = excessive ? "green" : "red"

  return (
    <Alert title={title} color={color}>
      {balanceError}
    </Alert>
  )
}

export default BalanceError

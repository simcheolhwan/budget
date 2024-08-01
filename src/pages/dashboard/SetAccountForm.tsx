import { Button, Group, Stack, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { modals } from "@mantine/modals"
import { BalanceController } from "../../firebase/write"

const SetAccountForm = ({ balanceKey, initial }: { balanceKey: BalanceKey; initial?: Account }) => {
  const initialValues = { category: "", name: "", amount: "" }
  const { getInputProps, onSubmit } = useForm({ initialValues: { ...initialValues, ...initial } })

  const submit = onSubmit(async (values) => {
    const balance = new BalanceController(balanceKey)
    if (initial) await balance.updateAccount(initial, values)
    else await balance.addAccount(values)
    modals.closeAll()
  })

  return (
    <form onSubmit={submit}>
      <Stack>
        <Group grow>
          <TextInput label="이름" {...getInputProps("name")} required />
          <TextInput label="카테고리" {...getInputProps("category")} />
        </Group>

        <TextInput label="금액" {...getInputProps("amount")} required data-autofocus />

        <Button type="submit" color="green">
          제출
        </Button>
      </Stack>
    </form>
  )
}

export default SetAccountForm

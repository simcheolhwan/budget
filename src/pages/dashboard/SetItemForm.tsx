import { Button, Group, Stack, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { closeAllModals } from "@mantine/modals"
import { thisMonth, useYear } from "../../firebase/data"
import { ListController } from "../../firebase/write"

const SetItemForm = ({ listKey, initial }: { listKey: ListKey; initial?: Item }) => {
  const year = useYear()

  const initialValues = { month: thisMonth, category: "", name: "", amount: "" }
  const { getInputProps, onSubmit } = useForm({ initialValues: { ...initialValues, ...initial } })

  const submit = onSubmit(async (values) => {
    const list = new ListController(listKey, year)
    if (initial) await list.updateItem(initial, values)
    else await list.addItem(values)
    closeAllModals()
  })

  return (
    <form onSubmit={submit}>
      <Stack>
        <Group grow>
          <TextInput label="월" {...getInputProps("month")} required />
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

export default SetItemForm

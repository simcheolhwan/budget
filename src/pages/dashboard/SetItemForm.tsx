import { Button, Group, Stack, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { closeAllModals } from "@mantine/modals"
import { thisMonth, useYear } from "../../firebase/data"
import { ListController } from "../../firebase/write"

const SetItemForm = ({ listKey, initial, ...props }: { listKey: ListKey; initial?: Item; year?: number }) => {
  const currentYear = useYear()
  const year = props.year ?? currentYear

  const initialValues = { month: String(thisMonth), category: "", name: "", amount: "", memo: "" }
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
          <TextInput label="월" {...getInputProps("month")} />
          <TextInput label="이름" {...getInputProps("name")} />
          <TextInput label="카테고리" {...getInputProps("category")} />
        </Group>

        <TextInput label="금액" {...getInputProps("amount")} required data-autofocus />
        <TextInput label="메모" {...getInputProps("memo")} />

        <Button type="submit" color="green">
          제출
        </Button>
      </Stack>
    </form>
  )
}

export default SetItemForm

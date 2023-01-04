import { Button, Select, Stack, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { closeAllModals } from "@mantine/modals"
import { thisMonth } from "../../firebase/data"
import { useUI } from "../../firebase/read"
import { ListController } from "../../firebase/write"

const SetItemForm = ({ year, listKey, initial }: { year: number; listKey: ListKey; initial?: Item }) => {
  const ui = useUI()

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
        <TextInput label="월" {...getInputProps("month")} />

        {listKey === "expense" ? (
          <Select label="카테고리" {...getInputProps("category")} data={ui.groups.flat()} searchable clearable />
        ) : (
          <TextInput label="카테고리" {...getInputProps("category")} />
        )}

        <TextInput label="이름" {...getInputProps("name")} />
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

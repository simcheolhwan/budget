import { Button, Stack, Textarea } from "@mantine/core"
import { getHotkeyHandler } from "@mantine/hooks"
import { useForm } from "@mantine/form"
import { modals } from "@mantine/modals"
import { ListController } from "../../firebase/write"
import { useFilter, useFilteredList } from "./Filter"

const EditList = () => {
  const { year, listKey } = useFilter()
  const list = useFilteredList()
  const { getInputProps, onSubmit } = useForm({ initialValues: { value: JSON.stringify(list, null, 2) } })

  const submit = onSubmit(async ({ value }) => {
    const list = new ListController(listKey, Number(year))

    try {
      await list.update(JSON.parse(value))
      modals.closeAll()
    } catch (error) {
      alert(error)
    }
  })

  return (
    <form onSubmit={submit}>
      <Stack>
        <Textarea
          {...getInputProps("value")}
          onKeyDown={getHotkeyHandler([
            ["mod+Enter", () => submit()],
            ["mod+S", () => submit()],
          ])}
          autosize
        />

        <Button type="submit" color="green">
          제출
        </Button>
      </Stack>
    </form>
  )
}

export default EditList

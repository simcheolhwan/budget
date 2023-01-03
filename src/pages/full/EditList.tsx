import { Button, Stack, Textarea } from "@mantine/core"
import { useForm } from "@mantine/form"
import { closeAllModals } from "@mantine/modals"
import { useAnnual } from "../../firebase/read"
import { ListController } from "../../firebase/write"

const EditList = ({ year, listKey }: { year: number; listKey: ListKey }) => {
  const annual = useAnnual()
  const list = annual[year][listKey]
  const { getInputProps, onSubmit } = useForm({ initialValues: { value: JSON.stringify(list, null, 2) } })

  const submit = onSubmit(async ({ value }) => {
    const list = new ListController(listKey, year)

    try {
      await list.update(JSON.parse(value))
      closeAllModals()
    } catch (error) {
      alert(error)
    }
  })

  return (
    <form onSubmit={submit}>
      <Stack>
        <Textarea {...getInputProps("value")} autosize />
        <Button type="submit" color="green">
          제출
        </Button>
      </Stack>
    </form>
  )
}

export default EditList

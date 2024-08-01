import { IconPlus, IconTrash } from "@tabler/icons-react"
import { ActionIcon, Button, Stack, Table, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { modals } from "@mantine/modals"
import { thisMonth } from "../../firebase/data"
import { FamilyExpensesController } from "../../firebase/write"

const FamilyCategoryExpenses = ({ name, list = [] }: { name: string; list?: FamilyExpenseItem[] }) => {
  const { getInputProps, getValues, onSubmit, insertListItem, removeListItem, key } = useForm({
    mode: "uncontrolled",
    initialValues: { list },
  })

  const submit = onSubmit(async ({ list }) => {
    modals.closeAll()
    await new FamilyExpensesController(name).setCategoryExpenses(list)
  })

  return (
    <form onSubmit={submit}>
      <Stack>
        <Table highlightOnHover={false}>
          <Table.Tbody>
            {getValues().list.map((item, index) => (
              <Table.Tr key={JSON.stringify(item)}>
                <Table.Td w={80}>
                  <TextInput {...getInputProps(`list.${index}.month`)} key={key(`list.${index}.month`)} withAsterisk />
                </Table.Td>
                <Table.Td>
                  <TextInput
                    {...getInputProps(`list.${index}.name`)}
                    placeholder="내역"
                    key={key(`list.${index}.name`)}
                  />
                </Table.Td>
                <Table.Td>
                  <TextInput
                    {...getInputProps(`list.${index}.memo`)}
                    placeholder="메모"
                    key={key(`list.${index}.memo`)}
                  />
                </Table.Td>
                <Table.Td w={100}>
                  <TextInput
                    {...getInputProps(`list.${index}.amount`)}
                    key={key(`list.${index}.amount`)}
                    withAsterisk
                  />
                </Table.Td>
                <Table.Td w={48} ta="right">
                  <ActionIcon color="red" onClick={() => removeListItem("list", index)}>
                    <IconTrash size="1rem" />
                  </ActionIcon>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>

          <Table.Tfoot>
            <Table.Tr>
              <Table.Td></Table.Td>
              <Table.Td></Table.Td>
              <Table.Td></Table.Td>
              <Table.Td></Table.Td>
              <Table.Td w={48} ta="right">
                <ActionIcon color="green" onClick={() => insertListItem("list", { month: thisMonth, amount: 0 })}>
                  <IconPlus size="1rem" />
                </ActionIcon>
              </Table.Td>
            </Table.Tr>
          </Table.Tfoot>
        </Table>

        <Button type="submit">Submit</Button>
      </Stack>
    </form>
  )
}

export default FamilyCategoryExpenses

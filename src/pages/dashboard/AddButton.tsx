import { PropsWithChildren } from "react"
import { IconMinus, IconPlus } from "@tabler/icons-react"
import { ActionIcon } from "@mantine/core"
import { modals } from "@mantine/modals"

const AddButton = ({ minus, title, children }: PropsWithChildren<{ minus?: boolean; title: string }>) => {
  return (
    <ActionIcon size="sm" color={minus ? "red" : "green"} onClick={() => modals.open({ title, children })}>
      {minus ? <IconMinus size={12} /> : <IconPlus size={12} />}
    </ActionIcon>
  )
}

export default AddButton

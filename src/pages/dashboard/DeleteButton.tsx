import { PropsWithChildren } from "react"
import { Button, Group } from "@mantine/core"
import { closeAllModals } from "@mantine/modals"

interface Props {
  title: string
  onDelete: () => Promise<void>
}

const DeleteButton = ({ title, children, onDelete }: PropsWithChildren<Props>) => {
  const submit = async () => {
    if (!window.confirm(`"${title}" 삭제`)) return
    await onDelete()
    closeAllModals()
  }

  return (
    <Group>
      {children}
      <Button onClick={submit} variant="light" color="red" size="compact-xs">
        삭제
      </Button>
    </Group>
  )
}

export default DeleteButton

import { PropsWithChildren } from "react"
import { Button, Group } from "@mantine/core"
import { closeAllModals } from "@mantine/modals"

const DeleteButton = ({ title, children, onDelete }: PropsWithChildren<{ title: string; onDelete: () => Promise<void> }>) => {
  const submit = async () => {
    if (!window.confirm(`"${title}" 삭제`)) return
    await onDelete()
    closeAllModals()
  }

  return (
    <Group>
      {children}
      <Button onClick={submit} variant="light" color="red" size="xs" compact>
        삭제
      </Button>
    </Group>
  )
}

export default DeleteButton

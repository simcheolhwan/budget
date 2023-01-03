import { Alert } from "@mantine/core"
import { useFilteredList } from "./Filter"

const ItemError = () => {
  const list = useFilteredList()
  const isKeyValid = (key: string) => ["month", "category", "name", "memo", "amount"].includes(key)
  const isItemValid = (item: Item) => Object.keys(item).every(isKeyValid)
  const invalidItems = list.filter((item) => !isItemValid(item))
  if (!invalidItems.length) return null
  return (
    <Alert title="데이터 경고" color="red">
      {JSON.stringify(invalidItems)}
    </Alert>
  )
}

export default ItemError

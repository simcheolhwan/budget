import { compose, sort } from "ramda"
import { useUI } from "./read"

export const sortList = (categories: string[]) => {
  const getIndex = (category = "") => [...categories, ""].indexOf(category)

  return compose(
    sort<Item>(({ category: a = "" }, { category: b = "" }) => getIndex(a) - getIndex(b)),
    sort<Item>(({ month: a = 0 }, { month: b = 0 }) => a - b)
  )
}

export const useSortList = () => {
  const ui = useUI()
  return sortList(ui.groups.flat())
}

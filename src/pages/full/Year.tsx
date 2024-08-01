import { Stack, Tabs } from "@mantine/core"
import { modals } from "@mantine/modals"
import { months } from "../../firebase/data"
import { useUI } from "../../firebase/read"
import SetItemForm from "../dashboard/SetItemForm"
import { useFilter, useFilteredList } from "./Filter"
import ListTable from "./ListTable"

const Year = () => {
  const ui = useUI()
  const { year, listKey, groupKey } = useFilter()
  const list = useFilteredList()

  if (groupKey === "month") {
    return (
      <Stack>
        <ListTable list={list.filter((item) => !item.month)} />

        {months.map((month) => {
          return <ListTable caption={month + "월"} list={list.filter((item) => item.month === month)} key={month} />
        })}
      </Stack>
    )
  }

  if (groupKey === "category") {
    const getIndex = (category: string) => ui.groups.flat().indexOf(category)
    const categories = [...new Set(list.map((item) => item.category))].sort(
      (a = "", b = "") => getIndex(a) - getIndex(b),
    )

    const defaultValue = { income: "근로소득", expense: "전자제품" }[listKey]

    return (
      <Tabs variant="outline" orientation="vertical" defaultValue={defaultValue} key={listKey}>
        <Tabs.List>
          {categories.map((category) => {
            const tabKey = category ?? "분류 없음"
            return (
              <Tabs.Tab value={tabKey} key={tabKey}>
                {tabKey}
              </Tabs.Tab>
            )
          })}
        </Tabs.List>

        {categories.map((category) => {
          const tabKey = category ?? "분류 없음"
          const onRowClick = (item: Item) =>
            modals.open({ children: <SetItemForm listKey={listKey} initial={item} year={Number(year)} /> })

          return (
            <Tabs.Panel value={tabKey} pl="xs" key={tabKey}>
              <ListTable list={list.filter((item) => item.category === category)} onRowClick={onRowClick} />
            </Tabs.Panel>
          )
        })}
      </Tabs>
    )
  }

  return <ListTable list={list} />
}

export default Year

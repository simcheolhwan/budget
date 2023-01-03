import { Stack, Tabs } from "@mantine/core"
import { openModal } from "@mantine/modals"
import { months } from "../../firebase/data"
import SetItemForm from "../dashboard/SetItemForm"
import { useFilter, useFilteredList } from "./Filter"
import ListTable from "./ListTable"

const Year = () => {
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
    const categories = [...new Set(list.map((item) => item.category))].sort((a = "", b = "") => a.localeCompare(b))

    return (
      <Tabs variant="outline" orientation="vertical" defaultValue={"전자제품"}>
        <Tabs.List>
          {categories.map((category) => {
            const tabKey = category ?? "미분류"
            return (
              <Tabs.Tab value={tabKey} key={tabKey}>
                {tabKey}
              </Tabs.Tab>
            )
          })}
        </Tabs.List>

        {categories.map((category) => {
          const tabKey = category ?? "미분류"
          const onRowClick = (item: Item) => openModal({ children: <SetItemForm listKey={listKey} initial={item} year={Number(year)} /> })
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

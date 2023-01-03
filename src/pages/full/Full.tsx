import { useState } from "react"
import { Container, Group, SegmentedControl, Tabs } from "@mantine/core"
import { useAnnual } from "../../firebase/read"
import ListTable from "./ListTable"

const Full = () => {
  const annual = useAnnual()
  const years = Object.keys(annual)

  const [listKey, setListKey] = useState<ListKey>("income")

  return (
    <Container>
      <Tabs defaultValue={years.at(-2)}>
        <Group position="apart">
          <Tabs.List>
            {years.map((year) => (
              <Tabs.Tab value={year} key={year}>
                {year}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          <SegmentedControl
            value={listKey}
            onChange={(key) => setListKey(key as ListKey)}
            data={[
              { label: "수입", value: "income" },
              { label: "지출", value: "expense" },
            ]}
          />
        </Group>

        {years.map((year) => (
          <Tabs.Panel value={year} pt="xs" key={year}>
            <ListTable year={Number(year)} listKey={listKey} />
          </Tabs.Panel>
        ))}
      </Tabs>
    </Container>
  )
}

export default Full

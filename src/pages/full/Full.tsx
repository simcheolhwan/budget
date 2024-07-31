import { Container, Stack, Tabs } from "@mantine/core"
import { useAnnual } from "../../firebase/read"
import Filter, { useFilterState } from "./Filter"
import ItemError from "./ItemError"
import Year from "./Year"

const Full = () => {
  const [{ year }, setFilter] = useFilterState()
  const annual = useAnnual()
  const years = Object.keys(annual)

  return (
    <Container size="sm">
      <Stack gap="xs">
        <Filter />
        <ItemError />

        <Tabs value={year} onChange={(year) => year && setFilter({ year })} orientation="vertical">
          <Tabs.List>
            {years.map((year) => (
              <Tabs.Tab value={year} key={year}>
                {year}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          {years.map((year) => (
            <Tabs.Panel value={year} pl="xs" key={year}>
              <Year />
            </Tabs.Panel>
          ))}
        </Tabs>
      </Stack>
    </Container>
  )
}

export default Full

import { Container, Tabs } from "@mantine/core"
import FamilyCategories from "./FamilyCategories"
import FamilyMonthly from "./FamilyMonthly"

const Family = () => {
  return (
    <Container size="sm">
      <Tabs variant="outline" defaultValue="categories">
        <Tabs.List mb="md">
          <Tabs.Tab value="categories">카테고리별</Tabs.Tab>
          <Tabs.Tab value="monthly">월별</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="categories">
          <FamilyCategories />
        </Tabs.Panel>
        <Tabs.Panel value="monthly">
          <FamilyMonthly />
        </Tabs.Panel>
      </Tabs>
    </Container>
  )
}

export default Family

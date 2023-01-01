import { Grid } from "@mantine/core"
import BalanceSection from "../sections/BalanceSection"
import HistorySection from "../sections/HistorySection"

const AppMain = () => {
  return (
    <Grid>
      <Grid.Col md={6}>
        <BalanceSection />
      </Grid.Col>
      <Grid.Col md={6}>
        <HistorySection />
      </Grid.Col>
    </Grid>
  )
}

export default AppMain

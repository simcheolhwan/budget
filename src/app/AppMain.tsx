import { Grid } from "@mantine/core"
import BalanceSection from "../sections/BalanceSection"

const AppMain = () => {
  return (
    <Grid>
      <Grid.Col md={4}>
        <BalanceSection />
      </Grid.Col>
    </Grid>
  )
}

export default AppMain

import { Container, Grid } from "@mantine/core"
import BalanceSection from "./BalanceSection"
import HistorySection from "./HistorySection"

const Dashboard = () => {
  return (
    <Container size="sm">
      <Grid>
        <Grid.Col md={6}>
          <BalanceSection />
        </Grid.Col>
        <Grid.Col md={6}>
          <HistorySection />
        </Grid.Col>
      </Grid>
    </Container>
  )
}

export default Dashboard

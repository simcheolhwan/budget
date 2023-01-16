import { Container, Grid, Text } from "@mantine/core"
import { useYearBalance } from "../../firebase/calc"
import BalanceSection from "./BalanceSection"
import HistorySection from "./HistorySection"

const Dashboard = () => {
  const yearBalance = useYearBalance()

  return (
    <Container size="sm">
      <Grid>
        <Grid.Col md={6}>
          <BalanceSection />
        </Grid.Col>
        <Grid.Col md={6}>
          <HistorySection />
          <Text size="xs" mt="xs" color="dimmed" align="right">
            잔고 {yearBalance.toLocaleString()}
          </Text>
        </Grid.Col>
      </Grid>
    </Container>
  )
}

export default Dashboard

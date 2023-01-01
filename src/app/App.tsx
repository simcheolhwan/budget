import { AppShell, Container } from "@mantine/core"
import AppMain from "./AppMain"

const App = () => {
  return (
    <AppShell>
      <Container>
        <AppMain />
      </Container>
    </AppShell>
  )
}

export default App

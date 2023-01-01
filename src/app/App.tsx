import { AppShell, Container } from "@mantine/core"
import AppMain from "./AppMain"

const App = () => {
  return (
    <AppShell>
      <Container size="sm">
        <AppMain />
      </Container>
    </AppShell>
  )
}

export default App

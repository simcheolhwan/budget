import { AppShell } from "@mantine/core"
import { Outlet } from "react-router-dom"
import AppHeader from "./AppHeader"

const App = () => {
  return (
    <AppShell header={{ height: 48 }} padding="md">
      <AppShell.Header>
        <AppHeader />
      </AppShell.Header>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}

export default App

import { AppShell } from "@mantine/core"
import { Outlet } from "react-router-dom"
import AppHeader from "./AppHeader"

const App = () => {
  return (
    <AppShell header={<AppHeader />}>
      <Outlet />
    </AppShell>
  )
}

export default App

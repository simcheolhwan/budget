import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { MantineProvider } from "@mantine/core"
import "./styles/index.scss"
import App from "./app/App"
import Auth from "./auth/Auth"

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme: "dark" }}>
      <Auth>
        <App />
      </Auth>
    </MantineProvider>
  </StrictMode>
)

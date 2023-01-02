import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RecoilRoot } from "recoil"
import { MantineProvider } from "@mantine/core"
import App from "./app/App"
import Auth from "./firebase/Auth"
import Database from "./firebase/Database"

const components = {
  Table: { styles: { root: { fontFeatureSettings: `"tnum"` } } },
}

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <RecoilRoot>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme: "dark", components, defaultRadius: "xs" }}>
        <Auth>
          <Database>
            <App />
          </Database>
        </Auth>
      </MantineProvider>
    </RecoilRoot>
  </StrictMode>
)

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RecoilRoot } from "recoil"
import { MantineProvider, MantineThemeOverride } from "@mantine/core"
import { ModalsProvider } from "@mantine/modals"
import App from "./app/App"
import Auth from "./firebase/Auth"
import Database from "./firebase/Database"

const theme: MantineThemeOverride = {
  colorScheme: "dark",
  defaultRadius: "xs",
  components: {
    Table: {
      defaultProps: { highlightOnHover: true, withBorder: true },
      styles: { root: { fontFeatureSettings: `"tnum"` } },
    },
    Modal: {
      defaultProps: { transitionDuration: 0 },
    },
  },
}

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <RecoilRoot>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
        <ModalsProvider>
          <Auth>
            <Database>
              <App />
            </Database>
          </Auth>
        </ModalsProvider>
      </MantineProvider>
    </RecoilRoot>
  </StrictMode>
)

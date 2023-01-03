import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { RecoilRoot } from "recoil"
import { MantineProvider, MantineThemeOverride } from "@mantine/core"
import { ModalsProvider } from "@mantine/modals"
import routes from "./app/routes"
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
      defaultProps: { transitionDuration: 0, overflow: "inside" },
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
              <RouterProvider router={createBrowserRouter(routes)} />
            </Database>
          </Auth>
        </ModalsProvider>
      </MantineProvider>
    </RecoilRoot>
  </StrictMode>
)

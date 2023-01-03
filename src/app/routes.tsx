import Dashboard from "../pages/dashboard/Dashboard"
import Full from "../pages/full/Full"
import App from "./App"

export const nav = [
  { to: "/", children: "현황" },
  { to: "/full", children: "전체" },
]

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "full", element: <Full /> },
    ],
  },
]

export default routes

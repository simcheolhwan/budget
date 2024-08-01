import { Group } from "@mantine/core"
import { NavLink } from "react-router-dom"
import { nav } from "./routes"
import classes from "./AppHeader.module.css"

const AppHeader = () => {
  return (
    <Group gap={0} justify="center" style={{ height: "100%" }}>
      {nav.map(({ path, label }) => (
        <NavLink to={path} className={classes.link} key={path}>
          {label}
        </NavLink>
      ))}
    </Group>
  )
}

export default AppHeader

import { Group } from "@mantine/core"
import { NavLink } from "react-router-dom"
import { nav } from "./routes"
import classes from "./AppHeader.module.css"

const AppHeader = () => {
  return (
    <Group gap={0} justify="center" style={{ height: "100%" }}>
      {nav.map((link) => (
        <NavLink {...link} className={classes.link} key={link.to} />
      ))}
    </Group>
  )
}

export default AppHeader

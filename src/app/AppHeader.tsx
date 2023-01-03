import { Header, Group, createStyles } from "@mantine/core"
import { NavLink } from "react-router-dom"
import { nav } from "./routes"

const useStyles = createStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: theme.white,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    ...theme.fn.hover({
      backgroundColor: theme.colors.dark[6],
    }),
  },
}))

const AppHeader = () => {
  const { classes } = useStyles()

  return (
    <Header height={48} px="md">
      <Group position="center" sx={{ height: "100%" }} spacing={0}>
        {nav.map((link) => (
          <NavLink {...link} className={classes.link} key={link.to} />
        ))}
      </Group>
    </Header>
  )
}

export default AppHeader

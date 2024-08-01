import { ActionIcon, HoverCard, MantineThemeOverride, Menu, Modal, Table, Text } from "@mantine/core"

const theme: MantineThemeOverride = {
  defaultRadius: "xs",
  cursorType: "pointer",
  components: {
    Table: Table.extend({
      defaultProps: {
        highlightOnHover: true,
        highlightOnHoverColor: "dark.8",
        withTableBorder: true,
        captionSide: "top",
        style: { whiteSpace: "nowrap", fontFeatureSettings: `"tnum"` },
      },
    }),
    Modal: Modal.extend({ defaultProps: { transitionProps: { duration: 0 } } }),
    Menu: Menu.extend({ defaultProps: { transitionProps: { duration: 0 } } }),
    Text: Text.extend({ defaultProps: { inherit: true } }),
    ActionIcon: ActionIcon.extend({ defaultProps: { variant: "subtle" } }),
    HoverCard: HoverCard.extend({ defaultProps: { withArrow: true } }),
  },
}

export default theme

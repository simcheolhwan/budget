import { ActionIcon, MantineThemeOverride, Menu, Modal, Table, Text } from "@mantine/core"

const theme: MantineThemeOverride = {
  defaultRadius: "xs",
  components: {
    Table: Table.extend({
      defaultProps: {
        highlightOnHover: true,
        withTableBorder: true,
        captionSide: "top",
        style: { fontFeatureSettings: `"tnum"` },
      },
    }),
    Modal: Modal.extend({ defaultProps: { transitionProps: { duration: 0 } } }),
    Menu: Menu.extend({ defaultProps: { transitionProps: { duration: 0 } } }),
    Text: Text.extend({ defaultProps: { inherit: true } }),
    ActionIcon: ActionIcon.extend({ defaultProps: { variant: "subtle" } }),
  },
}

export default theme

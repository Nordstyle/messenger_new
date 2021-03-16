import { Tooltip, withStyles } from "@material-ui/core";

export const MessengerTooltip = withStyles(() => ({
  tooltip: {
    fontSize: "12px",
    padding: "6px 12px",
  },
}))(Tooltip);

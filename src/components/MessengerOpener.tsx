import React from "react";
import { Drawer, DrawerProps, makeStyles } from "@material-ui/core";

interface MessengerOpener extends DrawerProps {}

const useStyles = makeStyles(() => ({
  paper: {
    background: "transparent",
    boxShadow: "none",
  },
}));

export const MessengerOpener: React.FC<MessengerOpener> = (props) => {
  const { children, ...restProps } = props;
  const classes = useStyles();

  return (
    <Drawer
      {...restProps}
      classes={{ paper: classes.paper }}
      style={{ zIndex: 1400 }}
      anchor="right"
    >
      {children}
    </Drawer>
  );
};

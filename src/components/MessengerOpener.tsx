import React from "react";
import { Drawer, DrawerProps, makeStyles } from "@material-ui/core";
import { useStore } from "effector-react";
import { $widthSettings } from "../stores/resize.effector";

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
  const widthSettings = useStore($widthSettings);

  return (
    <Drawer
      {...restProps}
      PaperProps={{
        style: {
          width: widthSettings.isFull && "100%",
        },
      }}
      classes={{ paper: classes.paper }}
      style={{ zIndex: 1400 }}
      anchor="right"
    >
      {children}
    </Drawer>
  );
};

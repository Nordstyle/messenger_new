import { Drawer, DrawerProps } from "@material-ui/core";
import React from "react";

interface MessengerOpener extends DrawerProps {}

export const MessengerOpener: React.FC<MessengerOpener> = (props) => {
  const { children, ...restProps } = props;

  return (
    <Drawer {...restProps} style={{ zIndex: 1400 }} anchor="right">
      {children}
    </Drawer>
  );
};
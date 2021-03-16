import React from "react";
import { Box, Drawer, makeStyles, createStyles } from "@material-ui/core";
import { useStore } from "effector-react";
import { DrawerProps } from "@material-ui/core/Drawer";
import { $widthSettings } from "../stores/resize.effector";
import { useResize } from "../hooks/useResize";

interface MessengerOpener extends DrawerProps {}

const useStyles = makeStyles(
  () =>
    createStyles({
      paper: {
        background: "transparent",
        boxShadow: "none",
      },
      resizer: {
        position: "absolute",
        left: "44px",
        top: 0,
        bottom: 0,
        width: "4px",
        height: "100%",
        userSelect: "none",
        cursor: "col-resize",
        zIndex: 100,
      },
    }),
  { name: "MessengerOpener" }
);

export const MessengerOpener: React.FC<MessengerOpener> = (props) => {
  const { children, ...restProps } = props;
  const classes = useStyles();
  const widthSettings = useStore($widthSettings);
  const [containerWidth, handleMove] = useResize(widthSettings.containerWidth);

  return (
    <Drawer
      {...restProps}
      disablePortal
      PaperProps={{
        style: {
          maxWidth: "100%",
          width: widthSettings.isFull ? "100%" : `${containerWidth}px`,
        },
      }}
      classes={{ paper: classes.paper }}
      style={{ zIndex: 1400 }}
      anchor="right"
    >
      <>
        {!widthSettings.isFull && (
          <Box className={classes.resizer} onMouseDown={handleMove} />
        )}
        {children}
      </>
    </Drawer>
  );
};

import React, { useEffect, useState } from "react";
import {
  Button,
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from "@material-ui/core";
import { useStore } from "effector-react";
import { LoaderIcon } from "../helpers/SvgComponents/LoaderIcon";
import { ChatIcon } from "../helpers/SvgComponents/ChatIcon";
import { $ButtonActive } from "../stores/button.effector";
import { getChatsFx } from "../stores/chats.effector";

const useStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {
        position: "fixed",
        width: 56,
        height: 56,
        right: 18,
        bottom: 40,
        borderRadius: "50%",
        minWidth: theme.spacing(6),
        minHeight: theme.spacing(4),
        zIndex: 1350,
        padding: 0,
        lineHeight: 0,
      },
    }),
  { name: "MessengerButton" }
);

export interface MessengerButtonProps {
  count?: number;
  onClick: () => void;
  classes?: any;
}

const MessengerButton: React.FC<MessengerButtonProps> = (props) => {
  const { onClick } = props;
  const classes = useStyles(props);
  const theme: Theme = useTheme();
  const $buttonActive = useStore($ButtonActive);
  const isLoading = useStore(getChatsFx.pending);

  return (
    <Button
      {...props}
      className={classes.root}
      disabled={!$buttonActive}
      style={{
        background: !$buttonActive
          ? "rgba(0, 0, 0, 0.26)"
          : theme.palette.primary.main,
      }}
      onClick={onClick}
    >
      {isLoading ? <LoaderIcon size={40} /> : <ChatIcon />}
    </Button>
  );
};

export default MessengerButton;

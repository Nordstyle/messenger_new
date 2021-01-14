import React from "react";
import { Box, makeStyles, Theme } from "@material-ui/core";
import clsx from "clsx";

import { ReactComponent as PinnedIcon } from "../assets/pinned.svg";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  container: {
    cursor: "pointer",
    transition: "0.2s",
    padding: theme.spacing(1, 2),
    "&:hover": {
      backgroundColor: "#EFF8FF",
    },
  },
  title: {
    fontSize: "14px",
    lineHeight: "20px",
    fontWeight: "bolder",
  },
  name: {
    fontSize: "12px",
    lineHeight: "16px",
    fontWeight: "normal",
  },
  message: {
    fontSize: "12px",
    lineHeight: "16px",
    fontWeight: "normal",
    color: theme.palette.text.secondary,
  },
  ellepsis: {
    width: "100%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

interface MessengerChatItem {
  title: string;
  name: string;
  message?: string;
  pinned?: boolean;
}

export const MessengerChatItem: React.FC<MessengerChatItem> = (props) => {
  const { title, name, message, pinned } = props;
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.container}>
        <Box className={clsx([classes.title, classes.ellepsis])}>{title}</Box>
        <Box className={clsx([classes.name, classes.ellepsis])}>{name}</Box>
        <Box className={clsx([classes.message, classes.ellepsis])}>
          {pinned && <PinnedIcon />} {message}
        </Box>
      </Box>
    </Box>
  );
};

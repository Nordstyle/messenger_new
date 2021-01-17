import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import { ITheme } from "../theme";

import { ReactComponent as PinnedIcon } from "../assets/pinned.svg";

const useStyles = makeStyles((theme: ITheme) => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  container: {
    cursor: "pointer",
    transition: "0.2s",
    padding: theme.spacing(1, 2),
    "&:hover": {
      backgroundColor: theme.palette.themeColors.primary,
    },
  },
  title: {
    fontSize: "14px",
    lineHeight: "20px",
  },
  name: {
    fontSize: "12px",
    lineHeight: "16px",
    fontWeight: "normal",
    padding: "2px 0",
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
        <Box
          title={title}
          className={clsx([classes.title, classes.ellepsis])}
          fontWeight={500}
        >
          {title}
        </Box>
        <Box title={name} className={clsx([classes.name, classes.ellepsis])}>
          {name}
        </Box>
        <Box
          title={message}
          className={clsx([classes.message, classes.ellepsis])}
        >
          {pinned && <PinnedIcon />} {message}
        </Box>
      </Box>
    </Box>
  );
};

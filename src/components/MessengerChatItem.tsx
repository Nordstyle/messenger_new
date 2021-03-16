import React from "react";
import {
  Box,
  makeStyles,
  Theme,
  createStyles,
  useTheme,
} from "@material-ui/core";
import clsx from "clsx";
import { PinnedIcon } from "../helpers/SvgComponents/PinnedIcon";
import { MessengerTooltip } from "./MessengerTooltip";

const useStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
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
      container: {
        width: "100%",
        cursor: "pointer",
        transition: "0.2s",
        padding: theme.spacing(1, 2),
        borderBottom: `1px solid ${theme.palette.divider}`,
        "&:hover": {
          backgroundColor: theme.themeColors.primary,
        },
      },
    }),
  { name: "MessengerChatItem" }
);

interface MessengerChatItem {
  chatName: string;
  name: string;
  message?: string;
  pinned: boolean;
  isActive: boolean;
  isHidden: boolean;
  onClick: () => void;
}

export const MessengerChatItem: React.FC<MessengerChatItem> = (props) => {
  const {
    chatName,
    name,
    message,
    pinned,
    isActive,
    isHidden,
    onClick,
  } = props;
  const classes = useStyles();
  const theme = useTheme();

  if (isHidden) return null;

  return (
    <Box
      className={classes.container}
      style={{
        backgroundColor: isActive ? theme.themeColors.primary : "",
      }}
      onClick={onClick}
    >
      <MessengerTooltip title={chatName}>
        <Box
          className={clsx([classes.title, classes.ellepsis])}
          fontWeight={500}
        >
          {chatName}
        </Box>
      </MessengerTooltip>
      <MessengerTooltip title={name}>
        <Box className={clsx([classes.name, classes.ellepsis])}>{name}</Box>
      </MessengerTooltip>
      <MessengerTooltip title={message ?? ""}>
        <Box className={clsx([classes.message, classes.ellepsis])}>
          {pinned && (
            <Box component="span" mr="2px">
              <PinnedIcon />
            </Box>
          )}
          {message}
        </Box>
      </MessengerTooltip>
    </Box>
  );
};

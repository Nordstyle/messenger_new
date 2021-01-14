import React from "react";
import { Box, makeStyles, Theme } from "@material-ui/core";
import clsx from "clsx";

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

export const MessengerChatItem: React.FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.container}>
        <Box className={clsx([classes.title, classes.ellepsis])}>
          СК002004560
        </Box>
        <Box className={clsx([classes.name, classes.ellepsis])}>
          Евгений Шумилин
        </Box>
        <Box className={clsx([classes.message, classes.ellepsis])}>
          Ждём результат по следующим этапам Ждём результат по следующим
          этапам...
        </Box>
      </Box>
    </Box>
  );
};

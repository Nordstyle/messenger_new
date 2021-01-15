import React from "react";
import { Box, makeStyles, Theme } from "@material-ui/core";
import { MessengerChatItem } from "./MessengerChatItem";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "288px",
    height: "100%",
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  header: {
    padding: theme.spacing(1.5, 2),
    fontSize: "20px",
    lineHeight: "28px",
    fontWeight: "bold",
    borderBottom: `1px solid ${theme.palette.divider}`,
    height: "52px",
  },
  chatList: {
    height: "calc(100% - 53px)",
    overflowY: "auto",
  },
}));

export const MessengerChatList = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.header}>Чаты</Box>
      <Box className={classes.chatList}>
        <MessengerChatItem
          pinned
          title="СК002004560"
          name="Евгений Шумилин"
          message="Ждём результат по следующим этапам Ждём результат по следующим этапам завтра"
        />
        <MessengerChatItem
          title="СК002004560"
          name="Евгений Шумилин"
          message="Ждём результат по следующим этапам Ждём результат по следующим этапам завтра"
        />
        <MessengerChatItem
          title="СК002004560"
          name="Евгений Шумилин"
          message="Ждём результат по следующим этапам Ждём результат по следующим этапам завтра"
        />
        <MessengerChatItem
          title="СК002004560"
          name="Евгений Шумилин"
          message="Ждём результат по следующим этапам Ждём результат по следующим этапам завтра"
        />
        <MessengerChatItem
          title="СК002004560"
          name="Евгений Шумилин"
          message="Ждём результат по следующим этапам Ждём результат по следующим этапам завтра"
        />
        <MessengerChatItem
          title="СК002004560"
          name="Евгений Шумилин"
          message="Ждём результат по следующим этапам Ждём результат по следующим этапам завтра"
        />
        <MessengerChatItem
          title="СК002004560"
          name="Евгений Шумилин"
          message="Ждём результат по следующим этапам Ждём результат по следующим этапам завтра"
        />
        <MessengerChatItem
          title="СК002004560"
          name="Евгений Шумилин"
          message="Ждём результат по следующим этапам Ждём результат по следующим этапам завтра"
        />
        <MessengerChatItem
          title="СК002004560"
          name="Евгений Шумилин"
          message="Ждём результат по следующим этапам Ждём результат по следующим этапам завтра"
        />
        <MessengerChatItem
          title="СК002004560"
          name="Евгений Шумилин"
          message="Ждём результат по следующим этапам Ждём результат по следующим этапам завтра"
        />
        <MessengerChatItem
          title="СК002004560"
          name="Евгений Шумилин"
          message="Ждём результат по следующим этапам Ждём результат по следующим этапам завтра"
        />
        <MessengerChatItem
          title="СК002004560"
          name="Евгений Шумилин"
          message="Ждём результат по следующим этапам Ждём результат по следующим этапам завтра"
        />
        <MessengerChatItem
          title="СК002004560"
          name="Евгений Шумилин"
          message="Ждём результат по следующим этапам Ждём результат по следующим этапам завтра"
        />
        <MessengerChatItem
          title="СК002004560"
          name="Евгений Шумилин"
          message="Ждём результат по следующим этапам Ждём результат по следующим этапам завтра"
        />
      </Box>
    </Box>
  );
};

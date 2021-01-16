import React from "react";
import { Box, makeStyles, Theme } from "@material-ui/core";
import { MessengerChatItem } from "./MessengerChatItem";
import { MessengerLoader } from "./MessengerLoader";

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

export const MessengerChatList: React.FC = () => {
  const classes = useStyles();
  /* TODO: заглушка isLoading */
  const isLoading = false;

  return (
    <Box className={classes.root}>
      <Box className={classes.header}>Чаты</Box>
      <Box className={classes.chatList}>
        {isLoading ? (
          <MessengerLoader size={150} />
        ) : (
          <>
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
          </>
        )}
      </Box>
    </Box>
  );
};

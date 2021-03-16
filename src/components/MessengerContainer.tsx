import React from "react";
import { Grid, Box, makeStyles, createStyles } from "@material-ui/core";
import { MessengerChatList } from "./MessengerChatList";
import { MessengerChatContainer } from "./MessengerChatContainer";

const useStyles = makeStyles(
  () =>
    createStyles({
      fullHeight: {
        height: "100%",
      },
      chatWrapper: {
        width: "60%",
        height: "100%",
      },
      listWrapper: {
        width: "40%",
        height: "100%",
      },
    }),
  { name: "MessengerContainer" }
);

export const MessengerContainer: React.FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.fullHeight}>
      <Grid container className={classes.fullHeight} wrap="nowrap">
        <Grid item className={classes.listWrapper}>
          <MessengerChatList />
        </Grid>
        <Grid item className={classes.chatWrapper}>
          <MessengerChatContainer />
        </Grid>
      </Grid>
    </Box>
  );
};

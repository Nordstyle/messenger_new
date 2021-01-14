import React from "react";
import { Grid, Box, makeStyles } from "@material-ui/core";
import { MessengerChatList } from "./MessengerChatList";
import { MessengerChatContainer } from "./MessengerChatContainer";

const useStyles = makeStyles(() => ({
  fullHeight: {
    height: "100%",
  },
}));

export const MessengerContainer = () => {
  const classes = useStyles();

  return (
    <Box width="732px" height="100%" overflow="hidden">
      <Grid container className={classes.fullHeight}>
        <Grid item className={classes.fullHeight}>
          <MessengerChatList />
        </Grid>
        <Grid item>
          <MessengerChatContainer />
        </Grid>
      </Grid>
    </Box>
  );
};

import React from "react";
import { Grid, Box, makeStyles } from "@material-ui/core";
import { MessengerChatList } from "./MessengerChatList";
import { MessengerChatContainer } from "./MessengerChatContainer";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
  },
}));

export const MessengerContainer = (props: any) => {
  const { height } = props;
  const classes = useStyles();

  return (
    <Box width="732px" height={height}>
      <Grid container className={classes.root}>
        <Grid item>
          <MessengerChatList />
        </Grid>
        <Grid item>
          <MessengerChatContainer />
        </Grid>
      </Grid>
    </Box>
  );
};

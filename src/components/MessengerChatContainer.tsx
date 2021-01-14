import React, { useEffect, useRef } from "react";
import { Box, makeStyles, RootRef, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    width: "100%",
    height: "52px",
    padding: theme.spacing(1.5, 2),
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  heading: {
    width: "90%",
    fontSize: "14px",
    lineHeight: "28px",
    fontWeight: "bolder",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  chatContainer: {
    position: "relative",
    flexGrow: 1,
  },
  chatView: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    overflow: "auto",
  },
}));

export const MessengerChatContainer = () => {
  const classes = useStyles();
  const viewRef = useRef<Nullable<HTMLDivElement>>(null);

  useEffect(() => {
    if (viewRef && viewRef.current) {
      const { scrollHeight, clientHeight } = viewRef.current;
      const maxScrollTop = scrollHeight - clientHeight;

      viewRef.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
  }, [viewRef]);

  return (
    <Box width="443px">
      <Box className={classes.header}>
        <Box className={classes.heading}>СК002004560</Box>
      </Box>
      <Box className={classes.chatContainer}>
        <RootRef rootRef={viewRef}>
          <Box className={classes.chatView}>1</Box>
        </RootRef>
      </Box>
    </Box>
  );
};

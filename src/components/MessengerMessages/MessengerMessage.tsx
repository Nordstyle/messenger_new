import React, { useMemo } from "react";
import { Box, makeStyles, Theme, useTheme } from "@material-ui/core";
import { File, VotingClient } from "../../types";
import { MessengerFileMessage } from "./MessengerFileMessage";

import { ReactComponent as PinnedIcon } from "../../assets/pinned.svg";
import { ITheme } from "../../theme";
import { MessengerVotingMessage } from "./MessengerVotingMessage/MessengerVotingMessage";

interface MessengerMessageProps {
  isCurrentUserMessage: boolean;
  name: string;
  date: string;
  message: string;
  file?: File;
  pinned?: boolean;
  votingClient?: VotingClient;
}

const useStyles = makeStyles((theme: Theme) => ({
  message: {
    display: "inline-flex",
    width: "100%",
    fontSize: "12px",
    padding: theme.spacing(1, 2),
    borderRadius: theme.spacing(1),
  },
}));

export const MessengerMessage: React.FC<MessengerMessageProps> = (props) => {
  const {
    isCurrentUserMessage,
    name,
    date,
    message,
    file,
    pinned,
    votingClient,
  } = props;
  const classes = useStyles();
  const theme: ITheme = useTheme();

  const newDate =
    date.indexOf("Z") === -1
      ? new Date(Date.parse(`${date}Z`))
      : new Date(Date.parse(date));
  const options = {
    hour: "numeric",
    minute: "numeric",
  };

  const currentMessage = useMemo(() => {
    if (file) return <MessengerFileMessage {...file} />;

    if (votingClient) return <MessengerVotingMessage client={votingClient} />;

    return <>{message}</>;
  }, [message, file, votingClient]);

  return (
    <Box mb={2} textAlign={isCurrentUserMessage ? "right" : "left"}>
      <Box mb="4px">
        {!isCurrentUserMessage && (
          <Box
            display="inline"
            marginRight="4px"
            fontSize="12px"
            fontWeight={500}
          >
            {name}
          </Box>
        )}
        <Box
          display="inline"
          color="text.secondary"
          marginRight="4px"
          fontSize="12px"
          fontWeight={500}
        >
          {newDate.toLocaleString("ru", options)}
        </Box>
        {pinned && (
          <Box display="inline">
            <PinnedIcon />
          </Box>
        )}
      </Box>
      <Box
        className={classes.message}
        style={{
          width: votingClient ? "100%" : "90%",
          justifyContent: isCurrentUserMessage ? "flex-end" : "flex-start",
          maxWidth: "568px",
          backgroundColor: isCurrentUserMessage
            ? theme.palette.themeColors.primary
            : theme.palette.themeColors.secondary,
        }}
      >
        {currentMessage}
      </Box>
    </Box>
  );
};

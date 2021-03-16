import React, { useMemo } from "react";
import { Box, makeStyles, Theme, createStyles } from "@material-ui/core";
import { File, Poll } from "../../types";
import { MessengerFileMessage } from "./MessengerFileMessage";
import { MessengerVotingOption } from "./MessengerVotingMessage/MessengerVotingOption";
import { PinnedIcon } from "../../helpers/SvgComponents/PinnedIcon";
import clsx from "clsx";
import { MessengerTooltip } from "../MessengerTooltip";

export interface MessengerMessageProps {
  isCurrentUserMessage: boolean;
  name: string;
  date: Nullable<string>;
  message: string;
  file: Nullable<File>;
  pinned?: boolean;
  poll: Nullable<Poll>;
}

const useStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      message: {
        display: "inline-flex",
        fontSize: "12px",
        padding: theme.spacing(1, 2),
        borderRadius: theme.spacing(1),
        whiteSpace: "pre-wrap",
      },
      ellepsis: {
        display: "block",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
    }),
  { name: "MessengerMessage" }
);

const MessengerMessage: React.FC<MessengerMessageProps> = (props) => {
  const {
    isCurrentUserMessage,
    name,
    date,
    message,
    file,
    pinned,
    poll,
  } = props;
  const classes = useStyles();
  // eslint-disable-next-line no-nested-ternary
  const newDate = date
    ? date.indexOf("Z") === -1
      ? new Date(Date.parse(`${date}Z`))
      : new Date(Date.parse(date))
    : null;

  const options = {
    hour: "numeric",
    minute: "numeric",
  };

  const currentMessage = useMemo(() => {
    if (file) return <MessengerFileMessage {...file} />;

    if (poll)
      return poll.options.map((option, idx) => (
        <Box
          key={option.id}
          width="100%"
          mb={idx === poll.options.length - 1 ? 0 : 2}
        >
          <MessengerVotingOption
            pollId={poll.id}
            option={option}
            voters={poll.voters}
            isClosed={poll.pollStatus.name === "closed"}
          />
        </Box>
      ));

    return <>{message}</>;
  }, [message, file, poll]);

  return (
    <Box mb={2} textAlign={isCurrentUserMessage ? "right" : "left"}>
      <Box
        display="flex"
        justifyContent={isCurrentUserMessage ? "flex-end" : "flex-start"}
        flexWrap="nowrap"
        mb="4px"
      >
        {!isCurrentUserMessage && (
          <MessengerTooltip title={poll ? poll.name : name}>
            <Box
              className={classes.ellepsis}
              marginRight="4px"
              fontSize="12px"
              fontWeight={500}
            >
              {poll ? poll.name : name}
            </Box>
          </MessengerTooltip>
        )}
        {newDate && (
          <Box
            color="text.secondary"
            marginRight="4px"
            fontSize="12px"
            fontWeight={500}
          >
            {newDate.toLocaleString("ru", options)}
          </Box>
        )}
        {pinned && (
          <Box display="inline" mr={0.2}>
            <PinnedIcon />
          </Box>
        )}
      </Box>
      <Box
        className={classes.message}
        style={{
          width: poll ? "100%" : "",
          justifyContent: isCurrentUserMessage ? "flex-end" : "flex-start",
          maxWidth: "568px",
          backgroundColor: isCurrentUserMessage ? "#EFF8FF" : "#F7F7FA",
        }}
      >
        {currentMessage}
      </Box>
    </Box>
  );
};

export default MessengerMessage;

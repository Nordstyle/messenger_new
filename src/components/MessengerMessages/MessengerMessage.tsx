import React from "react";
import { Box, makeStyles, Theme } from "@material-ui/core";
import { File } from "../../types";
import { MessengerFileMessage } from "./MessengerFileMessage";

interface MessengerMessageProps {
  isCurrentUserMessage: boolean;
  name: string;
  date: string;
  message: string;
  file?: File;
}

const useStyles = makeStyles((theme: Theme) => ({
  message: {
    display: "inline-flex",
    fontSize: "12px",
    padding: theme.spacing(1, 2),
    borderRadius: theme.spacing(1),
    maxWidth: "80%",
  },
}));

export const MessengerMessage: React.FC<MessengerMessageProps> = (props) => {
  const { isCurrentUserMessage, name, date, message, file } = props;
  const classes = useStyles();

  const newDate =
    date.indexOf("Z") === -1
      ? new Date(Date.parse(`${date}Z`))
      : new Date(Date.parse(date));
  const options = {
    hour: "numeric",
    minute: "numeric",
  };

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
          fontSize="12px"
          fontWeight={500}
        >
          {newDate.toLocaleString("ru", options)}
        </Box>
      </Box>
      <Box
        className={classes.message}
        style={{
          backgroundColor: isCurrentUserMessage ? "#EFF8FF" : "#F7F7FA",
        }}
      >
        {file ? <MessengerFileMessage {...file} /> : message}
      </Box>
    </Box>
  );
};

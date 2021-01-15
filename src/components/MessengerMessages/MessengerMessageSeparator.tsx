import React from "react";
import { Box, makeStyles, Theme } from "@material-ui/core";

interface MessengerMessageSeparatorProps {
  date: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  date: {
    position: "relative",
    fontSize: "12px",
    textAlign: "center",
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(2),
    "&::before": {
      content: '""',
      display: "block",
      position: "absolute",
      width: "34%",
      height: "1px",
      borderBottom: `1px solid ${theme.palette.divider}`,
      left: 0,
      top: "50%",
      transform: "translateY(-50%)",
    },
    "&::after": {
      content: '""',
      display: "block",
      position: "absolute",
      width: "34%",
      height: "1px",
      borderBottom: `1px solid ${theme.palette.divider}`,
      right: 0,
      top: "50%",
      transform: "translateY(-50%)",
    },
  },
}));

export const MessengerMessageSeparator: React.FC<MessengerMessageSeparatorProps> = (
  props
) => {
  const { date } = props;
  const classes = useStyles();
  const newDate =
    date.indexOf("Z") === -1
      ? new Date(Date.parse(`${date}Z`))
      : new Date(Date.parse(date));

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  if (!date) return null;

  return (
    <Box className={classes.date} fontWeight={500}>
      {newDate.toLocaleString("ru", options)}
    </Box>
  );
};

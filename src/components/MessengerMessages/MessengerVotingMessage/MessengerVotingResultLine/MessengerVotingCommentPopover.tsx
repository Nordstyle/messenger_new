import React, { useState } from "react";
import {
  Popover,
  Box,
  TextField,
  Button,
  makeStyles,
  createStyles,
} from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    text: {
      width: "300px",
    },
    button: {
      marginLeft: "8px",
      width: "40px",
      height: "100%",
      minWidth: "unset",
      backgroundColor: "#E4EBEC",
    },
  })
);

interface MessengerVotingCommentPopoverProps {
  // eslint-disable-next-line no-unused-vars
  onSubmit: (comment: string) => void;
  anchorEl: HTMLButtonElement | null;
  onClose: () => void;
}

export const MessengerVotingCommentPopover: React.FC<MessengerVotingCommentPopoverProps> = (
  props
) => {
  const { onSubmit, anchorEl, onClose } = props;
  const classes = useStyles();

  const [comment, setComment] = useState<string>("");

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover-dislike" : undefined;

  const handleSubmit = () => {
    onSubmit(comment);
  };

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      style={{ zIndex: 1500 }}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      <Box p={3} display="inline-flex" alignItems="center">
        <TextField
          label="Введите комментарий"
          id="outlined-size-small"
          defaultValue=""
          variant="outlined"
          color="primary"
          className={classes.text}
          onChange={(event) => setComment(event.target.value)}
        />
        <Button
          color="primary"
          onClick={handleSubmit}
          className={classes.button}
        >
          check
        </Button>
      </Box>
    </Popover>
  );
};

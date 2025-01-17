import React, { useState } from "react";
import {
  Popover,
  Box,
  TextField,
  IconButton,
  makeStyles,
  createStyles,
} from "@material-ui/core";

import { SendIcon } from "../../../../helpers/SvgComponents/SendIcon";

interface MessengerVotingCommentPopoverProps {
  // eslint-disable-next-line no-unused-vars
  onSubmit: (comment: string) => void;
  anchorEl: HTMLButtonElement | null;
  onClose: () => void;
}

const useStyles = makeStyles(
  () =>
    createStyles({
      root: {
        width: "300px",
        marginRight: "16px",
      },
      inputRoot: {
        padding: "10px 12px",
      },
      inputLabel: {
        transform: "translate(14px, 11px) scale(1)",
      },
    }),
  { name: "MessengerVotingCommentPopover" }
);

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
      <Box px={2} py={2} display="inline-flex" alignItems="center">
        <TextField
          label="Почему вы против?"
          rowsMax={8}
          multiline
          defaultValue=""
          variant="outlined"
          className={classes.root}
          InputLabelProps={{
            classes: {
              root: classes.inputLabel,
            },
          }}
          InputProps={{
            classes: {
              root: classes.inputRoot,
            },
          }}
          color="primary"
          onChange={(event) => setComment(event.target.value)}
        />
        <IconButton size="small" onClick={handleSubmit}>
          <SendIcon />
        </IconButton>
      </Box>
    </Popover>
  );
};

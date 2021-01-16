import React, { useState } from "react";
import { makeStyles, Theme, TextField, IconButton } from "@material-ui/core";

import { ReactComponent as ClipIcon } from "../assets/clip.svg";
import { ReactComponent as SendIcon } from "../assets/send.svg";

const useStyles = makeStyles((theme: Theme) => ({
  inputRoot: {
    borderTop: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
    padding: "12px 44px 10px",
  },
  inputMultiline: {
    padding: 0,
  },
  startAdornment: {
    position: "absolute",
    left: "-28px",
    cursor: "pointer",
  },
  endAdornment: {
    position: "absolute",
    right: "-28px",
    cursor: "pointer",
  },
}));

export const MessengerTextArea: React.FC = () => {
  const classes = useStyles();
  const [value, setValue] = useState("");

  return (
    <TextField
      className={classes.inputRoot}
      InputProps={{
        classes: {
          multiline: classes.inputMultiline,
        },
        startAdornment: (
          <IconButton size="small" className={classes.startAdornment}>
            <ClipIcon />
          </IconButton>
        ),
        endAdornment: value && (
          <IconButton size="small" className={classes.endAdornment}>
            <SendIcon />
          </IconButton>
        ),
      }}
      focused={false}
      fullWidth
      rowsMax={8}
      multiline
      value={value}
      onChange={(e) => setValue(e.currentTarget.value)}
    />
  );
};

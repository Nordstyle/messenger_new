import React, { useState } from "react";
import {
  Button,
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from "@material-ui/core";

import { ReactComponent as ChatIcon } from "../assets/chat_button.svg";
import { ReactComponent as PreloaderIcon } from "../assets/loader.svg";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "fixed",
      width: 56,
      height: 56,
      right: 18,
      bottom: 40,
      borderRadius: "50%",
      minWidth: theme.spacing(6),
      minHeight: theme.spacing(4),
      zIndex: 1350,
      padding: 0,
      lineHeight: 0,
    },
  })
);

export interface ChatButton {
  count?: number;
  onClick: () => void;
  disabled?: boolean;
  classes?: any;
}

const MessengerButton: React.FC<ChatButton> = (props) => {
  const { onClick, disabled } = props;
  const classes = useStyles(props);
  const theme: Theme = useTheme();

  const [isDisabled] = useState(true);
  const [isLoading] = useState(false);

  // useEffect(() => {
  //   setIsLoading(true);

  //   if (chats) {
  //     setIsLoading(false);
  //     if (chats.length > 0) {
  //       setIsDisabled(false);
  //     } else {
  //       setIsDisabled(true);
  //     }
  //   }
  // }, [chats, disabled]);

  return (
    <Button
      className={classes.root}
      disabled={isLoading || disabled || isDisabled}
      style={{
        background:
          isLoading || disabled || isDisabled
            ? "rgba(0, 0, 0, 0.26)"
            : theme.palette.primary.main,
      }}
      onClick={onClick}
      {...props}
    >
      {isLoading ? <PreloaderIcon style={{ width: 50 }} /> : <ChatIcon />}
    </Button>
  );
};

export default MessengerButton;

import React, { useEffect } from "react";
import { Box, CssBaseline, Grid, IconButton } from "@material-ui/core";
import WebFont from "webfontloader";
import {
  createStyles,
  makeStyles,
  Theme,
  ThemeProvider,
} from "@material-ui/core/styles";
import { MessengerOpener } from "./MessengerOpener";
import { MessengerContainer } from "./MessengerContainer";
import { ServiceBase } from "../services/ServiceBase";
import { theme } from "../theme";
import SignalRProvider, {
  NotificationCommands,
} from "../services/SignalRProvider/SignalRProvider";
import { Locations } from "../constants";
import {
  getChatsFx,
  getChatFx,
  updateChatArchive,
  updateChatDeleted,
  updateChatNameFx,
} from "../stores/chats.effector";
import { setSettings } from "../stores/settings.effector";
import { setCurrentChat } from "../stores/currentChat.effector";

import { CrossIcon } from "../helpers/SvgComponents/CrossIcon";

WebFont.load({
  google: {
    families: ["Montserrat:300,400,500,600,700,800,900"],
  },
});

export interface MessengerProps {
  settings: {
    url: string;
    documentId: string;
    defaultChatId?: Nullable<string>;
    userNotificationFields?: Record<string, string>;
  };
  user: {
    userId: number;
    authToken: string;
    email: string;
  };
  modalProps: {
    open: boolean;
    onClose: () => void;
  };
}

const useStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {
        position: "relative",
        width: "100%",
        overflow: "hidden",
        height: "100%",
        paddingLeft: "44px",
      },
      closeContainer: {
        position: "absolute",
        height: "100%",
        left: 0,
        top: 0,
        bottom: 0,
      },
      paper: {
        width: "100%",
        background: theme.palette.background.paper,
      },
    }),
  { name: "Messenger" }
);

const Messenger: React.FC<MessengerProps> = (props) => {
  const { settings, user, modalProps } = props;
  const classes = useStyles();

  useEffect(() => {
    ServiceBase.setAuthToken(user.authToken);
    ServiceBase.setBaseUrl(settings.url);
  }, [user.authToken, settings.url]);

  useEffect(() => {
    setSettings(props);
  }, [props]);

  useEffect(() => {
    const defaulChatId = settings.defaultChatId;
    if (defaulChatId) setCurrentChat(defaulChatId);

    return () => {
      setCurrentChat(null);
    };
  }, [settings.defaultChatId]);

  useEffect(() => {
    SignalRProvider.documentId = String(settings.documentId);

    if (SignalRProvider.isConnected) {
      if (SignalRProvider.documentId) {
        getChatsFx(settings.documentId);
      }
    } else {
      SignalRProvider.Connect(
        user.authToken,
        settings.url + Locations.singalR,
        (notificationCommand) => {
          if (notificationCommand.contextId === settings.documentId) {
            switch (notificationCommand.command) {
              case NotificationCommands.chatUpdateCollection:
                getChatFx(notificationCommand.chatId);
                break;
              case NotificationCommands.chatUpdateDeleted:
                updateChatDeleted(notificationCommand);
                break;
              case NotificationCommands.chatUpdateArchive:
                updateChatArchive(notificationCommand);
                break;
              case NotificationCommands.chatUpdateName:
                updateChatNameFx(notificationCommand.chatId);
                break;
              default:
                // eslint-disable-next-line no-console
                console.log("Unhandled command", { notificationCommand });
                break;
            }
          }
        }
      ).then(() => {
        getChatsFx(settings.documentId);
      });
    }
    return () => SignalRProvider.connection?.off("notificationCommand");
  }, [user.authToken, settings.documentId, settings.url]);

  useEffect(() => {
    if (modalProps.open) {
      getChatsFx(settings.documentId);
    }
  }, [settings.documentId, modalProps.open]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MessengerOpener open={modalProps.open} onClose={modalProps.onClose}>
        <Grid container wrap="nowrap" className={classes.root}>
          <Grid
            item
            className={classes.closeContainer}
            onClick={modalProps.onClose}
          >
            <Box>
              <IconButton onClick={modalProps.onClose}>
                <CrossIcon />
              </IconButton>
            </Box>
          </Grid>
          <Grid item className={classes.paper}>
            <MessengerContainer />
          </Grid>
        </Grid>
      </MessengerOpener>
    </ThemeProvider>
  );
};
export default Messenger;

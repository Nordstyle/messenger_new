import React, { useEffect } from "react";
import { Grid, IconButton } from "@material-ui/core";
import WebFont from "webfontloader";
import { makeStyles, Theme, ThemeProvider } from "@material-ui/core/styles";
import { MessengerOpener } from "./MessengerOpener";
import { MessengerContainer } from "./MessengerContainer";
import { createMyTheme } from "../theme";
import { ServiceBase } from "../services/ServiceBase";
import { ModuleName } from "../constants";

import { ReactComponent as CrossIcon } from "../assets/big_cross.svg";

WebFont.load({
  google: {
    families: ["Montserrat:300,400,500,600,700,800,900"],
  },
});

export interface MessengerProps {
  idUser: number;
  authToken: string;
  documentId: string;
  moduleName: ModuleName;
  messengerApi: string;
  email: string;
  server?: string;
  open: boolean;
  defaultChatId?: number;
  userNotificationFields?: Record<string, string>;
  onClose: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: "relative",
    width: "100%",
    overflow: "hidden",
    height: "100%",
    paddingLeft: "44px",
  },
  closeContainer: {
    position: "absolute",
    left: 0,
    top: 0,
  },
  paper: {
    width: "100%",
    background: theme.palette.background.paper,
  },
}));

const Messenger: React.FC<MessengerProps> = (props) => {
  const { authToken, messengerApi, open, onClose } = props;
  const myTheme = createMyTheme();
  const classes = useStyles();

  useEffect(() => {
    ServiceBase.setAuthToken(authToken);
    ServiceBase.setBaseUrl(messengerApi);
  }, [authToken, messengerApi]);

  return (
    <ThemeProvider theme={myTheme}>
      <MessengerOpener open={open} onClose={onClose}>
        <Grid container wrap="nowrap" className={classes.root}>
          <Grid item className={classes.closeContainer}>
            <IconButton onClick={onClose}>
              <CrossIcon />
            </IconButton>
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

import React, { useEffect } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { MessengerOpener } from "./MessengerOpener";
import { MessengerContainer } from "./MessengerContainer";

import { createMyTheme } from "../theme";
import { ServiceBase } from "../services/ServiceBase";
import { ModuleName } from "../constants";

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

const Messenger: React.FC<MessengerProps> = (props) => {
  const { authToken, messengerApi, open, onClose } = props;
  const myTheme = createMyTheme();

  useEffect(() => {
    ServiceBase.setAuthToken(authToken);
    ServiceBase.setBaseUrl(messengerApi);
  }, [authToken, messengerApi]);

  return (
    <ThemeProvider theme={myTheme}>
      <MessengerOpener open={open} onClose={onClose}>
        <MessengerContainer />
      </MessengerOpener>
    </ThemeProvider>
  );
};
export default Messenger;

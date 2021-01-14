import React, { useEffect } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { ServiceBase } from "../services/ServiceBase";
import { ModuleName } from "../constants";
import { MessengerOpener } from "./MessengerOpener";
import { createMyTheme } from "../theme";

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
  const { idUser, authToken, messengerApi, open, onClose } = props;
  const myTheme = createMyTheme();

  useEffect(() => {
    ServiceBase.setAuthToken(authToken);
    ServiceBase.setBaseUrl(messengerApi);
  }, [authToken, messengerApi]);

  return (
    <ThemeProvider theme={myTheme}>
      <MessengerOpener open={open} onClose={onClose}>
        {idUser}
      </MessengerOpener>
    </ThemeProvider>
  );
};
export default Messenger;

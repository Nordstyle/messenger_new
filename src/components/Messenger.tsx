import React, { useEffect } from "react";
import { Box } from "@material-ui/core";
import { ModuleName } from "../constants";
import { ServiceBase } from "../services/ServiceBase";

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
  onClose: () => any;
}

const Messenger: React.FC<MessengerProps> = (props) => {
  const { idUser, authToken, messengerApi } = props;

  useEffect(() => {
    ServiceBase.setAuthToken(authToken);
    ServiceBase.setBaseUrl(messengerApi);
  }, [authToken, messengerApi]);

  useEffect(() => {}, []);

  return <Box>{idUser}</Box>;
};
export default Messenger;

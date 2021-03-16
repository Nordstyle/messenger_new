/* eslint-disable no-unused-vars */
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { Message, PollVoter } from "../../types";

export interface NewMessageEvent {
  authorId: number;
  chatId: string;
  message: Message;
}

export interface NotificationCommand {
  command: string;
  chatId: string;
  messageId: string;
  authorId: number;
  contextId: string;
}

export interface UpdatePollCommand {
  chatId: string;
  messageId: string;
  voters: PollVoter[];
}

export enum NotificationCommands {
  chatAddUser = "messenger.chat.add.user",
  chatDeleteUser = "messenger.chat.delete.user",
  chatUpdateName = "messenger.chat.update.name",
  chatUpdateDeleted = "messenger.chat.update.deleted",
  chatUpdateArchive = "messenger.chat.update.archive",
  chatUpdateCollection = "messenger.chat.update.collection",
  messageDeleted = "messenger.message.deleted",
  messageSent = "messenger.message.sent",
  messageDelivered = "messenger.message.delivered",
}

export default class SignalRProvider {
  public static connection: Nullable<HubConnection> = null;

  public static isConnected: boolean = false;

  public static documentId: string;

  public static email: string;

  public static async Connect(
    token: string,
    url: string,
    notificationCommandCallback: (notification: NotificationCommand) => void
  ) {
    const connectionBuilder = new HubConnectionBuilder();

    this.connection = connectionBuilder
      .withUrl(url, { accessTokenFactory: () => token })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();

    await this.StartConnect(notificationCommandCallback);
  }

  public static async StartConnect(
    notificationCommandCallback: (notification: NotificationCommand) => void
  ) {
    if (this.connection) {
      try {
        this.connection.start();
        this.isConnected = true;

        if (this.connection && this.isConnected) {
          try {
            if (notificationCommandCallback) {
              this.connection.on("onNotification", notificationCommandCallback);
            }
          } catch (e) {
            // eslint-disable-next-line no-console
            console.log(`Can't connection, error: ${e}`);
          }
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(`process failed, error: ${e}`);
      } finally {
        // eslint-disable-next-line no-console
        console.log("end connecting proccess");
      }
    }
  }
}

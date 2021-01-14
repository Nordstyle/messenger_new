import { ServiceBase } from "./ServiceBase";
import { Message } from "../types";

interface GetMessagesParams {
  chatId: number;
  content: string;
}

interface GetMessagesByChatParams {
  pageIndex: number;
  pageSize: number;
  filter: {
    chatId: number;
    authorId: number;
    search: string;
  };
}

interface MessagesByChatResponse {
  data: Message[];
  totalCount: number;
}

interface MessageFilesParams {
  chatId: number;
  link: string;
  description: string;
}

export default class MessageService extends ServiceBase {
  protected static BASE_URL = "/messages";

  public static getMessages(params: GetMessagesParams) {
    return this.post("", params);
  }

  public static getMessagesByChat(params: GetMessagesByChatParams) {
    return this.post<MessagesByChatResponse>("/messages-by-chat", params);
  }

  public static getMessageById(id: number) {
    return this.get<Message>(`/${id}`);
  }

  public static messageFiles(params: MessageFilesParams) {
    return this.post<Message>("/files", params);
  }
}

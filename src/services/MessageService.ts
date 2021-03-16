import { ResponseData, ServiceBase } from "./ServiceBase";
import { Message } from "../types";
import { Locations } from "../constants";

export interface SendMessageParams {
  chatId: Nullable<string>;
  content: string;
}

interface GetMessagesByChatParams {
  pageIndex: number;
  pageSize: number;
  filter: {
    chatId: string;
    authorId?: number;
    search?: string;
  };
}

interface MessagesByChatResponse {
  data: Message[];
  totalCount: number;
}

interface MessageFilesParams {
  chatId: string;
  link: string;
}

export default class MessageService extends ServiceBase {
  protected static BASE_URL = `${Locations.hub}/api/v1/messages`;

  public static sendMessage(params: SendMessageParams) {
    return this.post<ResponseData<string>>("", params);
  }

  public static getMessagesByChat(params: GetMessagesByChatParams) {
    return this.post<MessagesByChatResponse>("/messages-by-chat", params);
  }

  public static getMessageById(id: number) {
    return this.get<Message>(`/${id}`);
  }

  public static messageFiles(params: MessageFilesParams) {
    return this.post<ResponseData<string>>("/files", params);
  }
}

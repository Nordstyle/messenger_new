import { ServiceBase } from "./ServiceBase";
import { Chat } from "../types";
import { Locations } from "../constants";

interface ChatsParams {}

export default class ChatService extends ServiceBase {
  protected static BASE_URL = `${Locations.hub}/api/v1/chats`;

  public static chats(params: ChatsParams) {
    return this.post("", params);
  }

  public static getChatById(id: string) {
    return this.get<Chat>(`/by-chat/${id}`);
  }

  public static getChatsByContext(id: string) {
    return this.get<Chat[]>(`/chats-by-context/${id}`);
  }
}

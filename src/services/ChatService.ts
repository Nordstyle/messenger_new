import { ServiceBase } from "./ServiceBase";
import { Chat } from "../types";

interface ChatsParams {}

export default class ChatService extends ServiceBase {
  protected static BASE_URL = "/chats";

  public static chats(params: ChatsParams) {
    return this.post("", params);
  }

  public static getChatsByContext(id: string) {
    return this.get<Chat[]>(`/chats-by-context/${id}`);
  }
}

import { ServiceBase } from "./ServiceBase";
import { PollStateOption } from "../types";

interface PollParams {
  pollId: string;
  pollOptionId: string;
  like: boolean;
  comment: string;
}

interface GetPollResponse {
  chatId: number;
  messageId: number;
  pollId: string;
  pollStateOptions: PollStateOption;
}

export default class PollService extends ServiceBase {
  protected static BASE_URL = "/poll";

  public static poll(params: PollParams) {
    return this.post("", params);
  }

  public static getPollById(id: string) {
    return this.get<GetPollResponse[]>(`/${id}`);
  }
}

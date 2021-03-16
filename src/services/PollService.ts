import { ServiceBase } from "./ServiceBase";
import { Locations } from "../constants";
import { PollOption } from "../types";

interface PollParams {
  pollId: string;
  pollOptionId: string;
  like: boolean;
  comment: Nullable<string>;
}

interface GetPollResponse {
  chatId: number;
  messageId: number;
  pollId: string;
  pollStateOptions: PollOption;
}

export default class PollService extends ServiceBase {
  protected static BASE_URL = `${Locations.hub}/api/v1/poll`;

  public static poll(params: PollParams) {
    return this.post("", params);
  }

  public static getPollById(id: string) {
    return this.get<GetPollResponse[]>(`/${id}`);
  }
}

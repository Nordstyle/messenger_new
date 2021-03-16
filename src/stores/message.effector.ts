import {
  createEffect,
  createEvent,
  createStore,
  guard,
  sample,
} from "effector";
import { createStoreConsumer } from "effector-react";
import MessageService, { SendMessageParams } from "../services/MessageService";
import { $CurrentChat, setCurrentChat } from "./currentChat.effector";

export const sendMessage = createEffect(async (params: SendMessageParams) => {
  const response = await MessageService.sendMessage(params);
  return response.data;
});

sendMessage.doneData.watch(() => {
  const box = document.querySelector("#MessageBox");

  if (box) {
    box.scrollTop = box.scrollHeight;
  }
});

export const onChangeMessage = createEvent<string>("On change event");

const $Message = createStore<string>("")
  .on(onChangeMessage, (_, message) => message)
  .on(sendMessage.doneData, () => "");

export const MessageText = createStoreConsumer($Message);

export const submitMessage = createEvent();

sample({
  source: $Message,
  clock: setCurrentChat,
  fn: () => "",
  target: onChangeMessage,
});

guard({
  source: sample({
    source: [$Message, $CurrentChat],
    clock: submitMessage,
    fn: ([content, chatId]: [string, Nullable<string>]) => ({
      content,
      chatId,
    }),
  }),
  filter: (message: SendMessageParams) => message.content.length > 0,
  target: sendMessage,
});

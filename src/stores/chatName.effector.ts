import { createEvent, createStore, sample } from "effector";
import { createStoreConsumer } from "effector-react";
import { chatFindById } from "../helpers/findById";
import { $CurrentChat, setCurrentChat } from "./currentChat.effector";
import { $Chats } from "./chats.effector";

const setChatName = createEvent<Nullable<string>>("Set chat name");

export const $ChatName = createStore<Nullable<string>>(null).on(
  setChatName,
  (_, name) => name
);

export const ChatName = createStoreConsumer($ChatName);

sample({
  source: $Chats,
  clock: [$CurrentChat, setCurrentChat],
  fn: (chats, currentChat) => {
    if (currentChat) {
      const selectedChat = chatFindById(chats, currentChat);

      return selectedChat?.name ?? null;
    }

    return null;
  },
  target: setChatName,
});

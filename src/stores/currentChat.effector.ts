import { createEvent, createStore, sample } from "effector";
import { getChatsFx } from "./chats.effector";

export const setCurrentChat = createEvent<Nullable<string>>("Set current chat");

export const $CurrentChat = createStore<Nullable<string>>(null).on(
  setCurrentChat,
  (_, id) => id
);

sample({
  source: $CurrentChat,
  clock: getChatsFx.doneData,
  fn: (currentChatId, chats) => {
    if (!currentChatId) return chats[0]?.id ?? null;

    return currentChatId;
  },
  target: setCurrentChat,
});

/* eslint-disable no-console */
$CurrentChat.updates.watch((currentChat) => console.log({ currentChat }));

import { createStore, createEffect, createEvent } from "effector";
import uniqBy from "lodash.uniqby";
import { chatFindById, chatFindByParentId } from "../helpers/findById";
import ChatService from "../services/ChatService";
import { NotificationCommand } from "../services/SignalRProvider/SignalRProvider";
import { Chat, Message } from "../types";
import { setButtonActive } from "./button.effector";

export enum ChatStatus {
  "active" = 1,
  "archive" = 2,
  "deleted" = 3,
}

export const chatUpdateName = createEvent("Chat update name");
export const chatUpdateLastMessage = createEvent<Message>(
  "Chat update last message"
);

export const getChatFx = createEffect(async (id: string) => {
  const response = await ChatService.getChatById(id);

  return response.data;
});

export const updateChatNameFx = createEffect(async (id: string) => {
  const response = await ChatService.getChatById(id);

  return response.data;
});

export const getChatsFx = createEffect(async (id: string) => {
  const response = await ChatService.getChatsByContext(id);

  return response.data;
});

export const updateChatArchive = createEvent<NotificationCommand>(
  "Update archive chat"
);

export const updateChatDeleted = createEvent<NotificationCommand>(
  "Update deleted chat"
);

export const setChatsFilter = createEvent<ChatStatus>("Set chats filter");

export const $ChatsFilter = createStore<ChatStatus>(ChatStatus.active).on(
  setChatsFilter,
  (_, filter) => filter
);

export const $Chats = createStore<Chat[]>([])
  .on(getChatsFx.doneData, (_, chats) => uniqBy(chats, "id"))
  .on(getChatFx.doneData, (state, chat) => {
    if (chat.parentId) {
      const currentChat = chatFindByParentId(state, chat.parentId);

      if (currentChat) {
        currentChat.childChats = uniqBy(
          [...currentChat.childChats, chat],
          "id"
        );

        return [...state];
      }
    }

    return uniqBy([...state, chat], "id");
  })
  .on(updateChatNameFx.doneData, (state, chat) => {
    if (chat.parentId) {
      const currentChat = chatFindByParentId(state, chat.parentId);

      if (currentChat) {
        currentChat.name = chat.name;

        return [...state];
      }
    }

    return [...state, chat];
  })
  .on(updateChatArchive, (state, command) => {
    const currentChat = chatFindById(state, command.chatId);

    if (currentChat) {
      currentChat.chatStatus = { id: 2, name: "archive" };
    }

    return [...state];
  })
  .on(updateChatDeleted, (state, command) => {
    const currentChat = chatFindById(state, command.chatId);

    if (currentChat) {
      currentChat.chatStatus = { id: 2, name: "deleted" };
    }

    return [...state];
  })
  .on(chatUpdateLastMessage, (state, message) => {
    const currentChat = chatFindById(state, message.chatId);

    if (currentChat) {
      currentChat.lastMessage = {
        id: message.id,
        author: message.author,
        message: message.content,
      };
    }

    return [...state];
  });

/* eslint-disable no-console */
$Chats.updates.watch((chats) => {
  console.log({ chats });
  setButtonActive(Boolean(chats.length));
});

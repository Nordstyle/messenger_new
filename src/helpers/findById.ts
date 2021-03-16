import { Chat } from "../types";

export const chatFindById = (
  data: Chat[] | Chat,
  id: Nullable<string>
): Nullable<Chat> => {
  if (Array.isArray(data)) {
    // eslint-disable-next-line no-restricted-syntax
    for (const item of data) {
      const result = chatFindById(item, id);
      if (result) return result;
    }
  } else if (typeof data === "object" && data !== null) {
    if (data.id === id) return data;
    if (data.childChats) return chatFindById(data.childChats, id);
  }

  return null;
};

export const chatFindByParentId = (
  data: Chat[] | Chat,
  parentId: Nullable<string>
): Nullable<Chat> => {
  if (Array.isArray(data)) {
    // eslint-disable-next-line no-restricted-syntax
    for (const item of data) {
      const result = chatFindById(item, parentId);
      if (result) return result;
    }
  } else if (typeof data === "object" && data !== null) {
    if (data.id === parentId) return data;
    if (data.childChats) return chatFindById(data.childChats, parentId);
  }

  return null;
};

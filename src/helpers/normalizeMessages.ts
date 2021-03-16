import { Message } from "../types";

export interface MessageList {
  [key: string]: Message[];
}

export const normalizeMessages = (messages: Message[]): MessageList => {
  const groupped = messages.reduce((previousValue, currentValue) => {
    const date =
      currentValue.created.split("T")[0] ??
      new Date().toUTCString().split("T")[0];

    // eslint-disable-next-line no-param-reassign
    if (!previousValue[date]) previousValue[date] = [];

    previousValue[date].unshift(currentValue);

    return previousValue;
  }, {});

  Object.keys(groupped).forEach((date) => {
    // @ts-ignore
    groupped[date].sort((a: any, b: any) => new Date(a[0]) - new Date(b[0]));
  });

  return (Object.fromEntries(
    Object.entries(groupped).sort(
      // @ts-ignore
      (a: any, b: any) => new Date(a[0]) - new Date(b[0])
    )
  ) as unknown) as MessageList;
};

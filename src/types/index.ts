export interface Author {
  authorId: number;
  email: string;
  firstName: string;
  lastName: string;
  middleName: string;
}

export interface MessageType {
  id: number;
  name: string;
}

export interface File {
  contentType: string;
  fileName: string;
  url: string;
  length: number;
  extension: string;
}

export interface Poll {
  id: string;
  name: string;
  options: PollOptions;
}

export interface PollOptions {
  id: string;
  name: string;
  contractors: Contractor[];
  users: User[];
}

export interface PollStateOption {
  pollOptionId: string;
  users: User[];
}

export interface Contractor {
  contractorName: string;
  contractorId: number;
  priceOffer: number;
  deviationBestPrice: number;
  term: string;
  termDeviation: number;
  defermentPayment: number;
  defermentDeviation: number;
  percentDifferentByPurchase: number;
  percentDifferentByBestContractorOffer: number;
  termLimit: number;
}

export interface User {
  accountId: number;
  email: string;
  firstName: string;
  lastName: string;
  middleName: string;
  isLike: boolean;
}

export interface Message {
  id: number;
  date: string;
  content: string;
  messageType: MessageType;
  author: Author;
  file: File;
  poll: Poll;
  userCount: number;
  isClosed: boolean;
}

export interface Chat {
  chatId: number;
  parentId: number;
  name: string;
  chatType: ChatType;
  status: ChatStatus;
  message: Message;
  children: Chat[];
}

export interface ChatType {
  id: number;
  name: string;
  description: string;
}

export interface ChatStatus {
  id: number;
  name: string;
  description: string;
}

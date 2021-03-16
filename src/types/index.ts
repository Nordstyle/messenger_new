export interface MessageType {
  id: number;
  name: string;
}

export interface File {
  contentType: Nullable<string>;
  fileName: Nullable<string>;
  url: Nullable<string>;
  extension?: Nullable<string>;
}

export interface Contractor {
  contractorName: string;
  contractorId: number;
  decisionId: string;
  defermentPayment: number;
  defermentDeviation: number;
  protocolNumber: string;
  priceOffer: number;
  deviationBestPrice: number;
  term: Nullable<string>;
  termDeviation: number;
  termLimit: number;
  percentDifferentByPurchase: number;
  percentDifferentByBestContractorOffer: number;
}

export interface User {
  id: number;
  email: Nullable<string>;
  firstName: Nullable<string>;
  lastName: Nullable<string>;
  middleName: Nullable<string>;
  organizations: Organization[];
}

export interface Organization {
  id: number;
  name: string;
}

export interface Message {
  chatId: string;
  id: string;
  created: string;
  content: Nullable<string>;
  messageType: Nullable<MessageType>;
  author: Nullable<User>;
  file: Nullable<File>;
  poll: Nullable<Poll>;
  userCount?: number;
  isClosed?: boolean;
}

export interface ShortMessage {
  author: Nullable<User>;
  id: string;
  message: Nullable<string>;
}

export interface Chat {
  id: string;
  parentId: Nullable<string>;
  name: Nullable<string>;
  chatType: Nullable<ChatType>;
  chatStatus: ChatStatus;
  lastMessage: Nullable<ShortMessage>;
  childChats: Chat[];
  modified: Nullable<string>;
  contextType: ChatContextType;
  pinnedMessage: Nullable<ShortMessage>;
}

export interface ChatContextType {
  id: number;
  mnemonic: string;
  name: string;
}

export interface ChatType {
  id: number;
  name: Nullable<string>;
}

export interface ChatStatus {
  id: number;
  name: Nullable<string>;
}
export interface Poll {
  id: string;
  name: string;
  options: PollOption[];
  pollStatus: PollStatus;
  voters: Voter[];
  votersCount: number;
}

export interface Voter {
  id: number;
  firstName: Nullable<string>;
  lastName: Nullable<string>;
  middleName: Nullable<string>;
  isLike: boolean;
  login: Nullable<string>;
}

export interface PollOption {
  id: string;
  name: string;
  pollMeta: PollMeta;
}

export interface PollStatus {
  id: number;
  name: string;
}

export interface Voters {}

export interface PollMeta {
  contractorName: string;
  contractorId: number;
  decisionId: string;
  defermentPayment: number;
  defermentDeviation: number;
  protocolNumber: string;
  priceOffer: number;
  deviationBestPrice: number;
  term: Nullable<string>;
  termDeviation: number;
  termLimit: number;
  percentDifferentByPurchase: number;
  percentDifferentByBestContractorOffer: number;
}

export interface PollVoter {
  id: string;
  pollId: string;
  pollOptionId: Nullable<string>;
  voterId: number;
  voter: User;
  isLike: boolean;
  comment: string;
}

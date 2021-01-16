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
  lenght: number;
  extension: Nullable<string>;
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

export interface VotingClient {
  votingId: string;
  name: string;
  votingObjects: VotingObject[];
  accountCount: number;
  isClosed: boolean; // запрещается голосовать в чате комиссии из-за отказа от проведения закупки
}

export interface VotingObject {
  variantId: string;
  name: string;
  contractors: VotingContractor[];
  accounts: VotedAccount[];
}

export interface VotingContractor {
  contractorName: string;
  contractorId: number;
  priceOffer?: number; // ценовое предложение
  deviationBestPrice?: number; // отклонение от лучших ц.п. - не используется, вместо него - percentDifferentByPurchase
  term?: string; // срок поставки (DateTime) - уже не используется
  termLimit?: number; // срок поставки
  termDeviation?: number; // срок поставки - отклонение - уже не используется
  defermentPayment?: number; // отсрочка платежа
  defermentDeviation?: number; // отклонение отсрочки платежа
  percentDifferentByBestContractorOffer: number;
  percentDifferentByPurchase: number; // отклонение от лучших ц.п.
}

export interface UpdatedVotingMessage {
  chatId: number;
  messageId: number;
  documentId: string;
  votingId: string;
  stateVotingObjects: StateVotingObject[];
}

export interface StateVotingObject {
  variantId: string;
  accounts: VotedAccount[];
  like: boolean;
}

export interface VotedAccount {
  accountId: number;
  email: string;
  firstName: string;
  lastName: string;
  middleName: string;
  isLike?: boolean; // голос "за" или "против"
}

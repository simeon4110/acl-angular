export interface MessageModel {
  id: number;
  userFrom: string;
  userTo: string;
  subject: string;
  content: string;
  read: boolean;
}

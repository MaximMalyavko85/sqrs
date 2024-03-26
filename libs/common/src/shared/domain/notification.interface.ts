
export interface INotification<T> {
  type: string;
  recipientId: string;
  senderId?: string;
  payload: T
}
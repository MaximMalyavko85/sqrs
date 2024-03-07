
export class CreateNotificationDto <T> {
  type?: string;
  recipientId: string;
  senderId?: string;
  payload: T
}
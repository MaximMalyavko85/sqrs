import { IsNotEmpty, IsString, validateSync } from "class-validator";
import { DomainError } from "@common/errors";
import { NotificationService } from "../services";
import { CreateNotificationDto } from "../dto";
import { Escape } from "class-sanitizer";
import { INotification } from "./interfaces";


export class NotificationAggregate extends NotificationService implements INotification<any> {
  @IsString()
  @IsNotEmpty()
  type: string= 'email';

  @IsString()
  @IsNotEmpty()
  recipientId: string;

  senderId?: string;

  payload: any;

  private constructor() {
    super();
  }

  static create(notificatinDto: CreateNotificationDto<any>){
    const _notification = new NotificationAggregate();

    Object.assign(_notification, notificatinDto);
    

    const errors = validateSync(_notification);
    if (!!errors.length) throw new DomainError(errors, 'User not valid.');

    return _notification;
  }
}
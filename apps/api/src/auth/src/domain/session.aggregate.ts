import { IsNotEmpty, IsString, IsUUID, validateSync } from "class-validator";
import { ISessian } from "./session.interface";
import {v4 as uuidv4} from 'uuid';
import { SessionService } from "./services";
import { DomainError } from "@common/errors";
import { SessionDto } from "../dto";
import { CreateUserDto } from "apps/users/src/dto";


export class SessionAggregate extends SessionService implements ISessian {
  @IsUUID()
  _id: string = uuidv4();

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  refreshToken: string;

  constructor(userAggregate) {
    super();

    this.userId = userAggregate.id;
    this.refreshToken = "asdasdsa";
  }

  static create(userAggregate: CreateUserDto): any{
    const _sessian = new SessionAggregate(userAggregate);
    
    const errors = validateSync(_sessian);

    if (!!errors.length) throw new DomainError(errors, 'Session not valid.');

    return _sessian;
  }
}
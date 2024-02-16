import { IsNotEmpty, IsNumber, IsString, IsUUID, validateSync } from "class-validator";
import { ISessian } from "./interfaces";
import {v4 as uuidv4} from 'uuid';
import { DomainError } from "@common/errors";
import { CreateSessionDto } from "../dto";


export class SessionAggregate implements ISessian {
  @IsUUID()
  _id?: string = uuidv4();

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  refreshToken: string;

  constructor(createSessionDto: CreateSessionDto) {
    this.userId = createSessionDto.userId;
    this.refreshToken = createSessionDto.refreshToken;
  }

  static create(userAggregate: CreateSessionDto): any{
    const _sessian = new SessionAggregate(userAggregate);
    
    const errors = validateSync(_sessian);

    if (!!errors.length) throw new DomainError(errors, 'Session not valid.');

    return _sessian;
  }
}
import { IsNotEmpty, IsString, IsUUID } from "class-validator";
import {v4 as uuidv4} from 'uuid';

export class SessionDto {
  @IsUUID()
  _id: string = uuidv4();

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}